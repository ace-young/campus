import time
import motor.motor_tornado
from tornado.web import gen


class DBContorller:
    client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')
    db = client.campus

    @classmethod
    def insert(cls):
        pass

    @classmethod
    @gen.coroutine
    def get_organization(cls, organization):
        result = yield cls.db.organization.find_one({}, {organization: 1})
        print(result)
        return result
