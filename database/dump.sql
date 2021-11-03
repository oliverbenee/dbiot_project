DROP TABLE IF EXISTS parkingSlot;
DROP TABLE IF EXISTS parkingZone;

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

INSERT INTO parkingZone VALUES ("KALKVAERKSVEJ", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "KALKVAERKSVEJ");

INSERT INTO parkingZone VALUES ("DOKK1", 12.12, 34.34, 1234, 5678);
INSERT INTO parkingSlot VALUES (1, false, "DOKK1");

SELECT * FROM parkingZone;
SELECT * FROM parkingSlot;