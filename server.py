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
        self.write("Test")


class WSHandler(tornado.websocket.WebSocketHandler):
    #array to store connected users
    users = []

    def open(self):
        WSHandler.users.append(self)
        #assign to unique id to each user
        id = uuid.uuid4()
        self.write_message(str(id))

    def on_message(self, message):
        print str(message)
        for user in self.users:
            user.write_message(message)

    def close(self):
        self.write_message("serv")
        WSHandler.users.remove(self)

class Application(tornado.web.Application):
    def __init__(self):
        handlers=[
            (r"/", IndexHandler),
            (r"/ws", WSHandler),
        ]
        tornado.web.Application.__init__(self, handlers, debug=True)

if __name__ == "__main__":
    tornado.options.parse_command_line()
    app = Application()
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()