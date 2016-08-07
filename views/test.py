import motor.motor_tornado
import pprint
from tornado.ioloop import IOLoop
from tornado import gen

client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')

db = client.foo


async def do_insert():
    for i in range(2000):
        result = await db.test_collection.insert({'i': i})


async def do_find_one():
    document = await db.test_collection.find_one({'i': {'$lt': 1}})
    pprint.pprint(document)

IOLoop.current().run_sync(do_find_one)
