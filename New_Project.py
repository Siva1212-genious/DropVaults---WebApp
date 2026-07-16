from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr
from .Database import *
from . import Models
from sqlalchemy.orm import session
from passlib.context import CryptContext
import os, shutil
from fastapi import UploadFile, File, Form
from .oauth2 import *
from .Config import settings
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

pwd_hashing = CryptContext(schemes=["bcrypt"], deprecated= "auto")

Models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers=["*"],
)

app.mount("/Uploads", StaticFiles(directory="Uploads"), name="Uploads")

class Users(BaseModel):
    Name: str
    Email: EmailStr
    Password: str
    Phone_Number: str

class Users_Response(BaseModel):
    Id: int
    Name: str
    Email: str
    Phone_Number: str

    class Config:
        orm_mode = True




class Posts_Response(BaseModel):
    Id: int
    Title: str
    Content: str
    Upload_File: str
    Owner_Id: int

    class Config:
        orm_mode = True


class Login(BaseModel):
    Email: EmailStr
    Password: str

class Login_Response(BaseModel):
    Access_token: str
    token_type: str

    class Config:
        orm_mode = True



@app.post("/Login", response_model = Login_Response)
def root2(login_data: Login, db:session = Depends(get_db)):

    print("================================")
    print("Incoming Email:", login_data.Email)
    print("Incoming Password:", login_data.Password)

    validation = db.query(Models.Userss).filter(
        Models.Userss.Email == login_data.Email
    ).first()

    print("Database User:", validation)

    if not validation:
        print("EMAIL NOT FOUND")
        raise HTTPException(
            status_code=401,
            detail="Email does not exist"
        )

    print("Stored Hash:", validation.Password)

    password_validation = pwd_hashing.verify(
        login_data.Password,
        validation.Password
    )

    print("Password Match:", password_validation)

    if not password_validation:
        print("PASSWORD FAILED")
        raise HTTPException(
            status_code=401,
            detail="Wrong Password"
        )

    token_data = Token_Creation(
        {"user_id": validation.Id}
    )

    print("TOKEN CREATED FOR USER:", validation.Id)

    return {
        "Access_token": token_data,
        "token_type": "Bearer"
    }



@app.post("/Userss/Create", response_model = Users_Response)
def root(data:Users, db:session = Depends(get_db)):

    Hashed_password = pwd_hashing.hash(data.Password)
    data.Password = Hashed_password

    Create_user = Models.Userss(**data.dict())

    if not Create_user:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User Not Created")
    
    db.add(Create_user)
    db.commit()
    db.refresh(Create_user)

    return Create_user



@app.post("/Postss/post", response_model = Posts_Response)
def root1(Title: str =  Form(...),
          Content: str = Form(...),
          Upload_File: UploadFile = File(...),
          db:session = Depends(get_db),
          current_user:int = Depends(get_current_user)):
    
    upload_file = "Uploads"
    
    if not os.path.exists(upload_file):
        os.makedirs(upload_file)
    
    file_path = os.path.join(upload_file, Upload_File.filename)

    with open(file_path, 'wb') as buffer:
        shutil.copyfileobj(Upload_File.file, buffer)
    
    Post_Creation = Models.Postss(Title = Title,
                                  Content = Content,
                                  Upload_File = file_path,
                                  Owner_Id = current_user.Id)


    db.add(Post_Creation)
    db.commit()
    db.refresh(Post_Creation)

    return Post_Creation



@app.get("/User/search")
def root(db: session = Depends(get_db)):

    data = db.query(Models.Userss).all()

    if not data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail = "Data not found")
    
    return data


@app.get("/Posts/search")
def root12(db:session = Depends(get_db), current_user: int = Depends(get_current_user)):

    owner_id = current_user.Id
    data = db.query(Models.Postss).filter(Models.Postss.Owner_Id == owner_id).all()

    if not data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Posts are not found")
    
    return data


@app.get("/Posts/search/{id}")
def root14(id:int, db:session = Depends(get_db), current_user:int = Depends(get_current_user)):

    data = db.query(Models.Postss).filter(Models.Postss.Id == id).first()
    
    #users_data = db.query(Models.Postss).filter(Models.Postss.Owner_Id == current_user.Id)

    if not data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post Not Found")
    
    return data


@app.delete("/Posts/delete/{Post_Id}")
def root4(Post_Id:int, db:session = Depends(get_db), current_user: int = Depends(get_current_user)):

    data = db.query(Models.Postss).filter(Models.Postss.Id == Post_Id, Models.Postss.Owner_Id == current_user.Id).first()

    if not data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    
    db.delete(data)
    db.commit()

    return {"Message": "Succesfully deleted"}
    