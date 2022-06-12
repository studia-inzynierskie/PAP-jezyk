import os;

SQLALCHEMY_TRACK_MODIFICATIONS = False

# SECRET_KEY = 'Change me!'

# Linux:
#SQLALCHEMY_DATABASE_URI = 'sqlite:////{instance}/papiezyk.sqlite3'

# Windows:
#SQLALCHEMY_DATABASE_URI = 'sqlite:///{instance}\\papiezyk.sqlite3'

# Docker:

SECRET_KEY = os.environ['SECRET_KEY']

pg_db = os.environ['PG_DB']
pg_addr = os.environ['PG_ADDR']
pg_port = os.environ['PG_PORT']
pg_user = os.environ['PG_USER']
pg_password = os.environ['PG_PASSWORD']

SQLALCHEMY_DATABASE_URI = f'postgresql://{pg_user}:{pg_password}@{pg_addr}:{pg_port}/{pg_db}'
