SET GLOBAL sql_mode = '';

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

# Historical data from opendata.dk
CREATE TABLE historical
  (time timestamp default current_timestamp,
  parkingZoneID VARCHAR(50),
  freeSlots INT(4),
  totalCapacity INT(4)
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



-- # Sample historical data. 
-- INSERT INTO historical(parkingZoneID, freeSlots, totalCapacity) VALUES ("KALKVAERKSVEJ", 5, 10);
-- INSERT INTO historical(parkingZoneID, freeSlots, totalCapacity) VALUES ("KALKVAERKSVEJ", 4, 10);
-- INSERT INTO historical(parkingZoneID, freeSlots, totalCapacity) VALUES ("KALKVAERKSVEJ", 3, 10);
-- INSERT INTO historical(parkingZoneID, freeSlots, totalCapacity) VALUES ("KALKVAERKSVEJ", 2, 10);

# All historical data. 
select * from historical;

# dayofweek: 1 for sunday, 2 for monday, 7 for saturday.
# Fetch all historical data from KALKVAERKSVEJ on ALL fridays. 
SELECT AVG(freeSlots) FROM historical WHERE parkingZoneID = "KALKVAERKSVEJ" AND dayofweek(time) = 4;

# Insert for every day of the week. KALKVAERKSVEJ
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-30 23:47:19', "KALKVAERKSVEJ", 50, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-31 23:47:19', "KALKVAERKSVEJ", 60, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-1 23:47:19', "KALKVAERKSVEJ", 40, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-2 23:47:19', "KALKVAERKSVEJ", 80, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-3 23:47:19', "KALKVAERKSVEJ", 90, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-4 23:47:19', "KALKVAERKSVEJ", 110, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-5 23:47:19', "KALKVAERKSVEJ", 120, 200);

# Insert for every day of the week. NewBusgadehuset
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-30 23:47:19', "NewBusgadehuset", 180, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-31 23:47:19', "NewBusgadehuset", 90, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-1 23:47:19', "NewBusgadehuset", 80, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-2 23:47:19', "NewBusgadehuset", 20, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-3 23:47:19', "NewBusgadehuset", 10, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-4 23:47:19', "NewBusgadehuset", 130, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-5 23:47:19', "NewBusgadehuset", 150, 200);

# Insert for every day of the week. BRUUNS
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-30 23:47:19', "BRUUNS", 0, 0);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-31 23:47:19', "BRUUNS", 0, 0);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-1 23:47:19', "BRUUNS", 0, 0);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-2 23:47:19', "BRUUNS", 0, 0);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-3 23:47:19', "BRUUNS", 0, 0);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-4 23:47:19', "BRUUNS", 0, 0);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-5 23:47:19', "BRUUNS", 0, 0);

# Insert for every day of the week. SALLING
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-30 23:47:19', "SALLING", 0, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-31 23:47:19', "SALLING", 150, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-1 23:47:19', "SALLING", 120, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-2 23:47:19', "SALLING", 30, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-3 23:47:19', "SALLING", 160, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-4 23:47:19', "SALLING", 200, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-5 23:47:19', "SALLING", 200, 200);

# Insert for every day of the week. NORREPORT
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-30 23:47:19', "NORREPORT", 0, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-31 23:47:19', "NORREPORT", 150, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-1 23:47:19', "NORREPORT", 120, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-2 23:47:19', "NORREPORT", 30, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-3 23:47:19', "NORREPORT", 160, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-4 23:47:19', "NORREPORT", 200, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-5 23:47:19', "NORREPORT", 200, 200);

# Insert for every day of the week. Urban Level 1
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-30 23:47:19', "Urban Level 1", 0, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-31 23:47:19', "Urban Level 1", 150, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-1 23:47:19', "Urban Level 1", 120, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-2 23:47:19', "Urban Level 1", 30, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-3 23:47:19', "Urban Level 1", 160, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-4 23:47:19', "Urban Level 1", 200, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-5 23:47:19', "Urban Level 1", 200, 200);

# Insert for every day of the week. Urban Level 2+3
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-30 23:47:19', "Urban Level 2+3", 0, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-31 23:47:19', "Urban Level 2+3", 150, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-1 23:47:19', "Urban Level 2+3", 120, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-2 23:47:19', "Urban Level 2+3", 30, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-3 23:47:19', "Urban Level 2+3", 160, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-4 23:47:19', "Urban Level 2+3", 200, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-5 23:47:19', "Urban Level 2+3", 200, 200);

# Insert for every day of the week. MAGASIN
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-30 23:47:19', "MAGASIN", 0, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-31 23:47:19', "MAGASIN", 150, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-1 23:47:19', "MAGASIN", 120, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-2 23:47:19', "MAGASIN", 30, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-3 23:47:19', "MAGASIN", 160, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-4 23:47:19', "MAGASIN", 200, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-5 23:47:19', "MAGASIN", 200, 200);

# Insert for every day of the week. SCANDCENTER
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-30 23:47:19', "SCANDCENTER", 0, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-31 23:47:19', "SCANDCENTER", 150, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-1 23:47:19', "SCANDCENTER", 120, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-2 23:47:19', "SCANDCENTER", 30, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-3 23:47:19', "SCANDCENTER", 160, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-4 23:47:19', "SCANDCENTER", 200, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-5 23:47:19', "SCANDCENTER", 200, 200);

# Insert for every day of the week. Navitas
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-30 23:47:19', "Navitas", 0, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-31 23:47:19', "Navitas", 150, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-1 23:47:19', "Navitas", 120, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-2 23:47:19', "Navitas", 30, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-3 23:47:19', "Navitas", 160, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-4 23:47:19', "Navitas", 200, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-5 23:47:19', "Navitas", 200, 200);

# Insert for every day of the week. New Bruuns Galleri
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-30 23:47:19', "New Bruuns Galleri", 0, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-10-31 23:47:19', "New Bruuns Galleri", 150, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-1 23:47:19', "New Bruuns Galleri", 120, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-2 23:47:19', "New Bruuns Galleri", 30, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-3 23:47:19', "New Bruuns Galleri", 160, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-4 23:47:19', "New Bruuns Galleri", 200, 200);
INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES ('2021-11-5 23:47:19', "New Bruuns Galleri", 200, 200);


