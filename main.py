from fastapi import FastAPI, Request, Response, File, UploadFile, Form
import pymongo
from bson.json_util import dumps
from bson.json_util import loads
from pydantic import BaseModel
import secrets
import time
from fastapi.middleware.cors import CORSMiddleware
import hashlib
import identifyFood

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Login(BaseModel):
    username: str
    password: str

class Register(BaseModel):
    username: str
    password: str

class SetWeight(BaseModel):
    username: str
    secret_token: str
    weight: int

class SetHeight(BaseModel):
    username: str
    secret_token: str
    height: int

class SetAge(BaseModel):
    username: str
    secret_token: str
    age: int

class SetTargetWeight(BaseModel):
    username: str
    secret_token: str
    target_weight: int

class SetSex(BaseModel):
    username: str
    secret_token: str
    sex: str
    

@app.get("/logout")
async def root(response: Response):

    response.set_cookie(key="isLoggedIn", path="/", max_age=-1)
    response.set_cookie(key="username", path="/", max_age=-1)
    response.set_cookie(key="secret_token", path="/", max_age=-1)
    return{"message": "logout!"}

@app.get("/get_user_properties")
async def root(username: str, secret_token: str):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017")
    db = myclient["hungryHokies"]
    col = db["users"]

    count = col.count_documents({"username" : username, "secret_token": secret_token})

    if count < 0:
        return{"message" : "user_not_found"}

    userProps = col.find_one({"username": username, "secret_token": secret_token}, {'_id': 0, "password": 0, "secret_token": 0})

    col = db["weight"]
    mostRecentWeight = col.find({"username": username}, {'_id': 0}).sort({"time":-1}).limit(1)

    print(userProps)

    responseJson = {
        "username": userProps["username"],
        "height": userProps["height"],
        "age": userProps["age"],
        "target_weight": userProps["target_weight"],
        "sex": userProps["sex"],
        "weight": mostRecentWeight[0]["weight"]
    }

    return loads(dumps(responseJson))

@app.get("/get_weight_history")
async def root(username: str, secret_token: str):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017")
    db = myclient["hungryHokies"]
    col = db["users"]

    count = col.count_documents({"username" : username, "secret_token": secret_token})

    if count < 0:
        return{"message" : "user_not_found"}

    col = db["weight"]
    mostRecentWeight = col.find({"username": username}, {'_id': 0}).sort({"time":-1}).limit(10)

    return loads(dumps(mostRecentWeight))
    

@app.post("/login")
async def root(response: Response, login: Login):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017")
    db = myclient["hungryHokies"]
    col = db["users"]

    count = col.count_documents({"username" : login.username})

    if count < 0:
        return{"message" : "user_not_found"}

    password = login.password.encode(encoding = 'UTF-8', errors = 'strict')
    user = col.find_one({"username": login.username}, {'_id': 0})
    
    if user["password"] == hashlib.sha256(password).hexdigest():
        userData = {
            "username": user["username"],
            "secret_token": user["secret_token"]
        }

        return({
            "isLoggedIn": "true",
            "username": userData["username"],
            "secret_token": userData["secret_token"]
        })


    return {"message": "fail!"}

@app.post("/register")
async def root(register: Register):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017")
    db = myclient["hungryHokies"]
    col = db["users"]

    count = col.count_documents({"username" : register.username})

    if count > 0:
        return{"message" : "fail!"}

    secret_token = secrets.token_hex(4)

    password = register.password.encode(encoding = 'UTF-8', errors = 'strict')
    ins_user = {
        "username": f'{register.username}',
        "password": f'{hashlib.sha256(password).hexdigest()}',
        "secret_token": f'{secret_token}',
        "height": 'unset',
        "age": 'unset',
        "target_weight": 'unset',
        "sex": 'unset'
    }

    print(register.username)
    print(ins_user["password"])
    col.insert_one(ins_user)

    set_time = int(time.time())

    ins_weight = {
        "username": f'{register.username}',
        "weight": "unset",
        "time": set_time
    }

    col = db["weight"]
    col.insert_one(ins_weight)
    
    return {"message" : "success!"}

@app.post("/set_height")
async def root(setHeight: SetHeight):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017")
    db = myclient["hungryHokies"]
    col = db["users"]

    count = col.count_documents({"username" : setHeight.username, "secret_token": setHeight.secret_token})

    if count < 1:
        return {"message" : "failed!"}
    
    col.update_one({"username" : setHeight.username, "secret_token": setHeight.secret_token}, {"$set":{"height":setHeight.height}})
    return { "message" : "success!"}

@app.post("/set_age")
async def root(setAge: SetAge):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017")
    db = myclient["hungryHokies"]
    col = db["users"]

    count = col.count_documents({"username" : setAge.username, "secret_token": setAge.secret_token})

    if count < 1:
        return {"message" : "failed!"}
    
    col.update_one({"username" : setAge.username, "secret_token": setAge.secret_token}, {"$set":{"age":setAge.age}})
    return { "message" : "success!"}

@app.post("/set_target_weight")
async def root(setTargetWeight: SetTargetWeight):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017")
    db = myclient["hungryHokies"]
    col = db["users"]

    count = col.count_documents({"username" : setTargetWeight.username, "secret_token": setTargetWeight.secret_token})

    if count < 1:
        return {"message" : "failed!"}
    
    col.update_one({"username" : setTargetWeight.username, "secret_token": setTargetWeight.secret_token}, {"$set":{"target_weight":setTargetWeight.target_weight}})
    return { "message" : "success!"}

@app.post("/set_sex")
async def root(setSex: SetSex):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017")
    db = myclient["hungryHokies"]
    col = db["users"]

    count = col.count_documents({"username" : setSex.username, "secret_token": setSex.secret_token})

    if count < 1:
        return {"message" : "failed!"}
    
    col.update_one({"username" : setSex.username, "secret_token": setSex.secret_token}, {"$set":{"sex":setSex.sex}})
    return { "message" : "success!"}

@app.post("/set_weight")
async def root(setWeight: SetWeight):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017")
    db = myclient["hungryHokies"]
    col = db["users"]

    count = col.count_documents({"username" : setWeight.username, "secret_token": setWeight.secret_token})

    if count < 1:
        return {"message" : "failed!"}
    
    set_time = int(time.time())

    ins_weight = {
        "username": f'{setWeight.username}',
        "weight": setWeight.weight,
        "time": set_time
    }

    col = db["weight"]
    col.insert_one(ins_weight)
    return { "message" : "success!"}

@app.post("/upload_log")
async def submit(request: Request, username: str = Form(...), secret_token: str = Form(), file: UploadFile = File(...)):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017")
    db = myclient["hungryHokies"]
    col = db["users"]

    count = col.count_documents({"username" : username, "secret_token": secret_token})

    print(username)
    print(secret_token)

    if count < 1:
        return {"message" : "failed!"}
    
    file_name = secrets.token_hex(4)

    filename = f"{file_name}.jpg"
    contents = await file.read()
    with open(f"./images/{filename}", "wb") as f:
        f.write(contents)

    jsonReturn = identifyFood.main(f"./images/{filename}")

    set_time = int(time.time())

    data_ins={
        "username": username,
        "time": set_time,
        "data": jsonReturn
    }

    col = db["logs"]
    col.insert_one(data_ins)

    return jsonReturn

@app.get("/get_log")
async def root(username: str, secret_token: str, timestamp: int):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017")
    db = myclient["hungryHokies"]
    col = db["users"]

    count = col.count_documents({"username" : username, "secret_token": secret_token})

    if count < 0:
        return{"message" : "user_not_found"}
    
    col =  db["logs"]
    logs = col.find({"username": username, "time": {"$gte": (timestamp - 86400), "$lt": timestamp}}, {'_id': 0}).sort({"time":-1})

    return loads(dumps(logs))