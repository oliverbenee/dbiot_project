DROP DATABASE IF EXISTS buildingiot;
DROP TABLE IF EXISTS parkingSlot;
DROP TABLE IF EXISTS parkingZone;

# FIXME: this should not be needed.
# This fixes NO_SUCH_TABLE errors from mysql where the table doesnt exist.
CREATE DATABASE buildingiot;

# FIXME: Use buildingiot database.
USE buildingiot;

# Overview of latest data from all tables. 
CREATE TABLE parkingZone
    ( parkingZoneID VARCHAR(50),
      PRIMARY KEY (parkingZoneID),
      latitude FLOAT(4,2),
      longitude FLOAT(4,2),
      totalCapacity INT(4),
      freeSlots INT(4)
);

# Data for each parking slot. 
CREATE TABLE parkingSlot
    ( slotID INT(10),
      isOccupied BOOLEAN,
      parkingZoneID VARCHAR(50),
      FOREIGN KEY (parkingZoneID) REFERENCES parkingZone(parkingZoneID),
      PRIMARY KEY(slotID, parkingZoneID)
);

# Sample parking spots and zones.
INSERT INTO parkingZone VALUES ("KALKVAERKSVEJ", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "KALKVAERKSVEJ");
INSERT INTO parkingSlot VALUES (2, false, "KALKVAERKSVEJ");

INSERT INTO parkingZone VALUES ("NewBusgadehuset", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "NewBusgadehuset");

INSERT INTO parkingZone VALUES ("SALLING", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "SALLING");

INSERT INTO parkingZone VALUES ("NORREPORT", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "NORREPORT");

INSERT INTO parkingZone VALUES ("Urban Level 1", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "Urban Level 1");

INSERT INTO parkingZone VALUES ("BRUUNS", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "BRUUNS");

INSERT INTO parkingZone VALUES ("MAGASIN", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "MAGASIN");

INSERT INTO parkingZone VALUES ("SCANDCENTER", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "SCANDCENTER");

INSERT INTO parkingZone VALUES ("Urban Level 2+3", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "Urban Level 2+3");

INSERT INTO parkingZone VALUES ("Navitas", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "Navitas");

INSERT INTO parkingZone VALUES ("New Bruuns Galleri", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "New Bruuns Galleri");

INSERT INTO parkingZone VALUES ("DOKK1", 12.12, 34.34, 1234, 5678);
INSERT INTO parkingSlot VALUES (1, false, "DOKK1");

# test for updating a single parking slot with a new occupation.
UPDATE parkingSlot SET isOccupied =false WHERE slotID =11 AND parkingZoneID="KALKVAERKSVEJ";

# Fetching all data. What happens?
SELECT * FROM parkingZone;
SELECT * FROM parkingSlot;

# Fetch all data from a single parking zone. 
SELECT * FROM parkingSlot WHERE parkingZoneID="KALKVAERKSVEJ";

# Historical data from opendata.dk
CREATE TABLE historical
( parkingZoneID VARCHAR(50),
  time timestamp default current_timestamp,
  freeSlots INT(4),
  totalCapacity INT(4)
);

# Sample historical data. 
INSERT INTO historical(parkingZoneID, freeSlots, totalCapacity) VALUES ("KALKVAERKSVEJ", 5, 10);
INSERT INTO historical(parkingZoneID, freeSlots, totalCapacity) VALUES ("KALKVAERKSVEJ", 4, 10);
INSERT INTO historical(parkingZoneID, freeSlots, totalCapacity) VALUES ("KALKVAERKSVEJ", 3, 10);
INSERT INTO historical(parkingZoneID, freeSlots, totalCapacity) VALUES ("KALKVAERKSVEJ", 2, 10);

# All historical data. 
select * from historical;

# dayofweek: 1 for sunday, 2 for monday, 7 for saturday.
# Fetch all historical data from KALKVAERKSVEJ on ALL fridays. 
SELECT * FROM historical WHERE parkingZoneID = "KALKVAERKSVEJ" AND dayofweek(time) = 4;

# Insert for every day of the week.
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-30 23:47:19', "KALKVAERKSVEJ", 2, 10);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-31 23:47:19', "KALKVAERKSVEJ", 2, 10);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-1 23:47:19', "KALKVAERKSVEJ", 2, 10);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-2 23:47:19', "KALKVAERKSVEJ", 2, 10);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-3 23:47:19', "KALKVAERKSVEJ", 2, 10);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-4 23:47:19', "KALKVAERKSVEJ", 2, 10);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-5 23:47:19', "KALKVAERKSVEJ", 2, 10);

SELECT AVG(Price) AS AveragePrice FROM Products;

SELECT AVG(freeSlots) FROM historical WHERE parkingZoneID = "KALKVAERKSVEJ" AND dayofweek(time) = 4;
