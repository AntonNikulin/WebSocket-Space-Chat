class Ship:

    def __init__(self, uid):
        self.__uid = uid
        self.__x = 20
        self.__y = 20

    def getUID(self):
        return self.__uid

    def getX(self):
        return self.__x

    def getY(self):
        return self.__y

    def computeShipPosition(self, vx, vy):
        self.__x += vx
        self.__y += vy