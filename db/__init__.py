import motor.motor_tornado
from datetime import datetime
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

    @classmethod
    @gen.coroutine
    def get_message(cls, org):
        messages = []
        cursor = cls.db.message.find({'org': org}, {'_id': 0, 'org': 0})
        while (yield cursor.fetch_next):
            document = cursor.next_object()
            messages.append({'title': document['title'], 'content': document['content'],
                             'time': str(datetime.strptime(document['time'], '%Y%m%d%H%M%S'))})
        return messages
