import os
import tornado.ioloop
import tornado.web
from views.admin import LoginHandler, Check, LoadOrganization, PostMessage, LoadMessage
from views.to_client import  ClientLoadMessage

'''
    运行入口
'''

settings = {
    'static_path': os.path.join(os.path.dirname(__file__), 'static'),
    'cookie_secret': '61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=',
    'login_url': '/api/0.01/admin/login',
}


def make_app():
    return tornado.web.Application(
        [
            (r'/api/0.01/admin/login', LoginHandler),
            (r'/api/0.01/admin/check', Check),
            (r'/api/0.01/admin/organization', LoadOrganization),
            (r'/api/0.01/admin/postMessage', PostMessage),
            (r'/api/0.01/admin/loadMessage', LoadMessage),
            (r'/api/0.01/client/loadMessage', ClientLoadMessage)
        ],
        **settings, debug=True
    )


if __name__ == '__main__':
    app = make_app()
    app.listen(8000)
    tornado.ioloop.IOLoop.current().start()
