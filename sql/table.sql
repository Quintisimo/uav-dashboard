CREATE TABLE "Readings" (
	"id"	INTEGER NOT NULL,
	"target type"	TEXT NOT NULL,
	"temperature"	REAL NOT NULL,
	"humidity"	REAL NOT NULL,
	"light"	REAL NOT NULL,
	"noise"	REAL NOT NULL,
	"pressure"	REAL NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "Gas" (
	"id"	INTEGER NOT NULL,
	"carbon monoxide"	REAL NOT NULL,
	"nitrogen dioxide"	REAL NOT NULL,
	"ethanol"	REAL NOT NULL,
	"hydrogen"	REAL NOT NULL,
	"propane"	REAL NOT NULL,
	"iso-butane"	REAL NOT NULL,
	"ammonia"	REAL NOT NULL,
	"methane"	REAL NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);