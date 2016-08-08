import tornado.ioloop
import tornado.web
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
        print(organization)
        password = self.get_argument('password')

        # value from database
        result = yield DBContorller.get_organization(organization)
        if name == result['username'] and password == result['password']:
            self.set_secure_cookie('user', self.get_argument('adminname'))
            self.write('登录成功')
        self.write('登录- ERROR')


class PostMessage(tornado.web.RequestHandler):
    @gen.coroutine
    def post(self, *args, **kwargs):
        title = self.get_argument('title')
        content = self.get_argument('content')
        res = yield
