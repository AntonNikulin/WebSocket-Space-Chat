import os

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
import tornado.websocket

from Handlers import IndexHandler, WSHandler

from tornado.options import define, options
define("port", default=8000, help="run on the given port", type=int)

class Application(tornado.web.Application):
    def __init__(self):
        handlers=[
            (r"/", IndexHandler.IndexHandler),
            (r"/ws", WSHandler.WSHandler),
        ]
        settings = {
            'template_path': os.path.dirname(__file__),
            'static_path': os.path.join(os.path.dirname(__file__), "static")
        }
        tornado.web.Application.__init__(self, handlers, debug=True, **settings)

if __name__ == "__main__":
    tornado.options.parse_command_line()
    app = Application()
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()