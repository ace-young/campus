import time
import motor.motor_tornado
from tornado.web import gen


class DBContorller:
    client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')
    db = client.campus

    @classmethod
    @gen.coroutine
    def insert(cls, collection, document):
        result = True
        try:
            yield cls.db[collection].insert(document)
        except Exception as e:
            print(e)
            result = False
        finally:
            return result

    @classmethod
    @gen.coroutine
    def get_organization(cls, organization):
        result = yield cls.db.organization.find_one({}, {organization: 1})
        return result
