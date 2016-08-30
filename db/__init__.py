import motor.motor_tornado
from datetime import datetime
from tornado.web import gen
from bson.objectid import ObjectId


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
    def get_messages(cls, org):
        messages = []
        cursor = cls.db.message.find({'org': org}, {'org': 0})
        while (yield cursor.fetch_next):
            document = cursor.next_object()
            messages.append({'title': document['title'], 'content': document['content'][:20],
                             'time': str(datetime.strptime(document['time'], '%Y%m%d%H%M%S')),
                             'id': str(document['_id'])})
        return messages

    @classmethod
    @gen.coroutine
    def get_message_detail(cls, _id):
        res = {}
        result = yield cls.db.message.find_one({'_id': ObjectId(_id)})
        res['title'] = result['title']
        res['content'] = result['content']
        res['time'] = result['time']
        res['org'] = result['org']
        return res
