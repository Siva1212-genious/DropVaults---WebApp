from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_username: str 
    database_password: str
    database_host: str
    database_host_port: int
    database_name: str
    secret_key: str
    Algorithm: str

    class Config:
        env_file = ".env"



settings = Settings()