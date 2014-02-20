import os
import uuid
import json

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
import tornado.websocket

from tornado.options import define, options
define("port", default=8000, help="run on the given port", type=int)


class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")


class WSHandler(tornado.websocket.WebSocketHandler):
    #array to store connected users
    users = []

    def open(self):
        WSHandler.users.append(self)
        #assign to unique id to each user
        uid = uuid.uuid4()
        d = {
            "messageType": "uid",
            "id": str(uid)
        }
        jObj = json.dumps(d)
        self.write_message(d)

    def on_message(self, message):
        self.write_message(message)
        #for user in self.users:
        #    user.write_message(message)

    def close(self):
        self.write_message("serv")
        WSHandler.users.remove(self)

class Application(tornado.web.Application):
    def __init__(self):
        handlers=[
            (r"/", IndexHandler),
            (r"/ws", WSHandler),
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