import tornado.ioloop
import tornado.web
from tornado import gen

'''
    管理员视图函数
'''


class PostMessage(tornado.web.RequestHandler):
    @gen.coroutine
    def post(self, *args, **kwargs):
        title = self.get_argument('title')
        content = self.get_argument('content')
        res = yield
