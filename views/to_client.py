from tornado import web, gen
from db import DBContorller

import json, time


class ClientLoadMessage(web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    @gen.coroutine
    def get(self):
        _organization = self.get_argument('organization')
        # print('organization:',_organization)
        result = yield DBContorller.get_messages(_organization)
        # yield gen.sleep(8)
        # print('result:',result)
        self.write(json.dumps(result, ensure_ascii=False))

    def options(self):
        self.set_status(204)
        self.finish()


class ClientMessageDetail(web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    @gen.coroutine
    def get(self):
        _id = self.get_argument('id')
        res = yield DBContorller.get_message_detail(_id)
        self.write(json.dumps(res, ensure_ascii=False))

    def options(self):
        self.set_status(204)
        self.finish()
