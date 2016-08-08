import motor.motor_tornado
import pprint
from database_example import example
from tornado.ioloop import IOLoop
from tornado import gen

client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')

db = client.campus


@gen.coroutine
def do_insert():
    future = db.orgization.insert(example)
    result = yield future


IOLoop.current().run_sync(do_insert)
