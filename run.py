import tornado.ioloop
import tornado.web

'''
    运行入口
'''


def make_app():
    return tornado.web.Application(
        [
            (),
            (),
            (),
        ]
    )


if __name__ == '__main__':
    app = make_app()
    app.listen(8000)
    tornado.ioloop.IOLoop.current().start()
