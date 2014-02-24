class Ship:

    def __init__(self, uid):
        self.__uid = uid
        self.__x = 20
        self.__y = 20

    def setPosition(self, x, y):
        self.__x = x
        self.__y = y

    def computeShipPosition(self, vx, vy):
        self.setPosition(self.__x + vx, self.__y + vy)