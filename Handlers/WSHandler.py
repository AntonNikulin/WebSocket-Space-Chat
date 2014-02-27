import sys
import uuid
import json

import tornado

from Objects import Ship

class WSHandler(tornado.websocket.WebSocketHandler):
    #array to store connected users
    users = []
    ships = {}

    def open(self):
        WSHandler.users.append(self)
        #assign unique id to each ship
        uid = str(uuid.uuid4())
        ship = Ship(uid)
        WSHandler.ships[uid] = ship
        d = {
            "messageType": "uid",
            "id": uid
        }
        jObj = json.dumps(d)
        self.write_message(jObj)

        #send new user already connected ships
        conShips = {"messageType": "connectedShips", "ships": []}
        for k in WSHandler.ships.keys():
            sh = WSHandler.ships[k]
            conShips["ships"].append(str(sh))
        print conShips
        self.write_message(json.dumps(conShips))

    def on_message(self, message):
        #READ and parse client message and react according to message type
        messageObject = json.loads(message)
        if messageObject["messageType"] == "shipPosition":
            try:
                ship = WSHandler.ships[messageObject['uid']]
                vx = messageObject["vx"]
                vy = messageObject["vy"]
                ship.computeShipPosition(vx,vy)
                response = {
                    "messageType": "shipPosition",
                    "id": ship.getUID(),
                    "x": ship.getX(),
                    "y": ship.getY()
                }
                #WRITE response to clients
                for user in WSHandler.users:
                    user.write_message(response)

            except:
                print "____ERR_____", sys.exc_info()

    def on_close(self):
        print "-------CLOSED--------"
        WSHandler.users.remove(self)