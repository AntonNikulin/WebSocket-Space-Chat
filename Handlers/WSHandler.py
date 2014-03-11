# -*- coding: utf-8 -*-
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
        self.uid = None
        WSHandler.users.append(self)
        WSHandler.sendWorldStatus()


    def on_message(self, message):
        #READ and parse client message and react according to message type
        messageObject = json.loads(message)
        #print "Message: ",messageObject

        if messageObject["messageType"] == "shipPosition":
            #Set new position of sended ship
            try:
                ship = WSHandler.ships[messageObject['uid']]
                vx = messageObject["vx"]
                vy = messageObject["vy"]
                ship.computeShipPosition(vx, vy)
                response = {
                    "messageType": "shipPosition",
                    "id": ship.getUID(),
                    "x": ship.getX(),
                    "y": ship.getY()
                }
                WSHandler.notifyUsers(response)
            except KeyError:
                print "SHipPosition: ", messageObject

        elif messageObject["messageType"] == "CreateShip":
            #Create unique id for new player's ship and save ship in class variable
            uid = str(uuid.uuid4())
            self.uid = uid
            ship = Ship(uid)
            WSHandler.ships[uid] = ship
            d = {
                "messageType": "myShipCreated",
                "id": ship.getUID(),
                "x": ship.getX(),
                "y": ship.getY()
            }
            jObj = json.dumps(d)
            self.write_message(jObj)
            # send to all: new ship was created.
            newShip = d
            newShip["messageType"] = "ShipCreated"
            WSHandler.notifyUsers(json.dumps(newShip))
            print "ShipCreated: ", WSHandler.ships


    def on_close(self):
        WSHandler.users.remove(self)
        del WSHandler.ships[self.uid]
        message = {
            "messageType": "ShipDeleted",
                "id": self.uid
        }
        WSHandler.notifyUsers(json.dumps(message))
        print "Close: ", WSHandler.ships
        print "-------CLOSED--------"

    @classmethod
    def notifyUsers(cls, message):
        """Рассылает сообщение всем подключенным пользователям"""
        for user in cls.users:
            user.write_message(message)

    @classmethod
    def sendWorldStatus(cls):
        """Отправляет всем подключенным пользователям расположение всех кораблей"""
        worldStatus = {"messageType": "connectedShips", "ships": []}

        #Получаем координаты всех кораблей, и сохраняем в массив
        for k in cls.ships.keys():
            sh = cls.ships[k]
            worldStatus["ships"].append({
                "shipId": sh.getUID(),
                "x": sh.getX(),
                "y": sh.getY()
            })
        jWorldStatus = json.dumps(worldStatus)
        print "Sending World Status: ",jWorldStatus
        cls.notifyUsers(jWorldStatus)
