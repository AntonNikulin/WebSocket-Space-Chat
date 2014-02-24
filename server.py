import sys
import os
import uuid
import json

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
import tornado.websocket

from Objects import Ship

from tornado.options import define, options
define("port", default=8000, help="run on the given port", type=int)


class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")


class WSHandler(tornado.websocket.WebSocketHandler):
    #array to store connected users
    users = []
    ships = {}

    def open(self):
        WSHandler.users.append(self)
        #assign to unique id to each user
        uid = str(uuid.uuid4())
        ship = Ship(uid)
        WSHandler.ships[uid] = ship
        d = {
            "messageType": "uid",
            "id": uid
        }
        jObj = json.dumps(d)
        self.write_message(jObj)

    def on_message(self, message):
        #READ and parse client message and react according to message type
        messageObject = json.loads(message)
        if messageObject["messageType"] == "shipPosition":
            try:
                ship = WSHandler.ships[messageObject['uid']]
            except:
                print "____ERR_____", messageObject

        #WRITE response to clients
        for user in WSHandler.users:
            try:
                user.write_message(message)
            except:
                print sys.exc_info()
                print "ERR users: ", len(self.users)

    def on_close(self):
        print "-------CLOSED--------"
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