import time
import json
import tornado
import tornado.ioloop
import tornado.web
from datetime import datetime
from tornado import gen
from db import DBContorller

'''
    管理员视图函数
'''


class BaseHandler(tornado.web.RequestHandler):
    def get_current_user(self):
        return self.get_secure_cookie('user')


class LoginHandler(BaseHandler):
    @gen.coroutine
    def post(self):
        # value from html form
        name = self.get_argument('adminname')
        organization = self.get_argument('organization')
        password = self.get_argument('password')

        # value from database
        result = yield DBContorller.get_organization(organization)

        # check and response
        if name == result[organization]['username'] and password == result[organization]['password']:
            # 15 * 60 mean cookies could remain in 15 minutes.
            self.set_secure_cookie('user', name, expires=time.time() + 15 * 60)
            self.set_secure_cookie('organization', organization, expires=time.time() + 15 * 60)
            self.redirect('/static/index.html')
        else:
            self.write('ERROR')


class PostMessage(BaseHandler):
    @tornado.web.authenticated
    @gen.coroutine
    def post(self, *args, **kwargs):
        title = self.get_argument('title')
        content = self.get_argument('content')
        _time = datetime.now().strftime("%Y%m%d%H%M%S")
        org = self.get_secure_cookie('organization').decode('utf8')
        document = {
            'title': title,
            'content': content,
            'time': _time,
            'org': org
        }
        result = DBContorller.insert(collection='message', document=document)
        if result:
            self.write('1')
        else:
            self.write('0')


class Check(BaseHandler):
    def post(self):
        _type = self.get_argument('type')
        if _type == 'login':
            if not self.current_user:
                self.write('0')
            else:
                self.write('1')  # 1 mean had login
        else:
            pass


class LoadOrganization(BaseHandler):
    @tornado.web.authenticated
    def get(self, *args, **kwargs):
        org = self.get_secure_cookie('organization')
        self.write(org)


class LoadMessage(BaseHandler):
    @tornado.web.authenticated
    @gen.coroutine
    def get(self):
        '''
        org:database query response
        :return:
            ret : str
        '''
        org = self.get_argument('org')
        result = yield DBContorller.get_message(org)
        print('result->In LoadMessage:', result)
        for document in result:
            print('In for loop->', document)
        self.write(json.dumps(result, ensure_ascii=False))
