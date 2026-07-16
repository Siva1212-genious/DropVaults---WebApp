from jose import jwt, JWTError, ExpiredSignatureError
from datetime import datetime, timedelta
from .Config import settings
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import session
from .Database import *
from . import Models
from fastapi.security.oauth2 import OAuth2PasswordBearer

outh2_schema = OAuth2PasswordBearer(tokenUrl="/Login")


SECRET_KEY = settings.secret_key
ALGORITHM = settings.Algorithm
token_time = 10


def Token_Creation(token_data: dict):
    
    data = token_data.copy()

    expire_time = datetime.utcnow()+timedelta(minutes = token_time)
    data.update({"exp": expire_time})

    jwt_token = jwt.encode( data, SECRET_KEY, algorithm=ALGORITHM)

    return jwt_token


def token_verification(actual_token: str):

    print("Received token:", actual_token)

    try:
        jwt_decodetoken = jwt.decode( actual_token, SECRET_KEY, algorithms=[ALGORITHM])
    
    except ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token Has Expired")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could Not Validate Credentials")



    id : int = jwt_decodetoken.get("user_id")

    if not jwt_decodetoken:
        raise JWTError(detail = "Token is incorrect")

    return id

def get_current_user(token: str = Depends(outh2_schema), db: session = Depends(get_db)):

    data = token_verification(token)

    if not data:
        raise JWTError(detail = "The token is expired")
    
    current_user = db.query(Models.Userss).filter(Models.Userss.Id == data).first()

    return current_user




