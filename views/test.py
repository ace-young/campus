import motor.motor_tornado
import os
import pprint
from database_example import example
from tornado.ioloop import IOLoop
from tornado import gen

client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')

db = client.campus


@gen.coroutine
def do_insert():
    future = db.organization.insert(example)
    result = yield future


@gen.coroutine
def do_query():
    result = yield db.organization.find_one({}, {'计算机学院/软件学院': 1})
    print(result['计算机学院/软件学院']['username'])
    return result


IOLoop.current().run_sync(do_insert)
