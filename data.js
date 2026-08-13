const DATA =
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "id": 1,
                "name": "Innere Stadt",
                "name_de": "Innere Stadt",
                "website": "https://www.wien.gv.at/bezirke/innere-stadt/",
                "keywords": [
                    "historic center",
                    "tourist hub",
                    "luxury",
                    "high density",
                    "UNESCO",
                    "pedestrian zone"
                ],
                "landmarks": [
                    {
                        "name": "St. Stephen's Cathedral",
                        "lat": 48.2082,
                        "lng": 16.3731
                    },
                    {
                        "name": "Hofburg Palace",
                        "lat": 48.2064,
                        "lng": 16.3655
                    },
                    {
                        "name": "Vienna State Opera",
                        "lat": 48.2027,
                        "lng": 16.3691
                    }
                ],
                "costOfLiving": {
                    "tier": "very_expensive",
                    "rank": 1,
                    "description": "Most expensive district. Prime rents €22-30/m²."
                },
                "transport": {
                    "ubahn": [
                        "U1",
                        "U2",
                        "U3",
                        "U4"
                    ],
                    "sbahn": [],
                    "tram": [
                        "1",
                        "2",
                        "D",
                        "71"
                    ],
                    "bus": [
                        "2A",
                        "3A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Karlsplatz",
                        "lat": 48.2003,
                        "lng": 16.3698,
                        "lines": [
                            "U1",
                            "U2",
                            "U4",
                            "tram"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 2,
                        "modes": [
                            "U1",
                            "U2",
                            "tram"
                        ]
                    },
                    {
                        "districtId": 3,
                        "modes": [
                            "U3",
                            "U4",
                            "tram"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.363164983803465,
                                48.200377853267504
                            ],
                            [
                                16.37243812909773,
                                48.200645502478245
                            ],
                            [
                                16.38212528640086,
                                48.212048550268115
                            ],
                            [
                                16.36737600282262,
                                48.21918853374676
                            ],
                            [
                                16.353737152842204,
                                48.21503691565174
                            ],
                            [
                                16.3531036596632,
                                48.207605815436416
                            ],
                            [
                                16.35876568322656,
                                48.20335556178468
                            ],
                            [
                                16.363164983803465,
                                48.200377853267504
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 2,
                "name": "Leopoldstadt",
                "name_de": "Leopoldstadt",
                "website": "https://www.wien.gv.at/bezirke/leopoldstadt/",
                "keywords": [
                    "parks",
                    "prater",
                    "family-friendly",
                    "gentrifying",
                    "riverfront"
                ],
                "landmarks": [
                    {
                        "name": "Prater & Ferris Wheel",
                        "lat": 48.2166,
                        "lng": 16.3959
                    },
                    {
                        "name": "Augarten",
                        "lat": 48.2263,
                        "lng": 16.3772
                    }
                ],
                "costOfLiving": {
                    "tier": "expensive",
                    "rank": 6,
                    "description": "High demand due to parks and proximity to center. Rents €16-20/m²."
                },
                "transport": {
                    "ubahn": [
                        "U1",
                        "U2"
                    ],
                    "sbahn": [
                        "S1",
                        "S2",
                        "S3",
                        "S7"
                    ],
                    "tram": [
                        "O",
                        "2",
                        "5"
                    ],
                    "bus": [
                        "11A",
                        "80A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Wien Praterstern",
                        "lat": 48.2197,
                        "lng": 16.3923,
                        "lines": [
                            "S1",
                            "S2",
                            "S3",
                            "S7",
                            "U1",
                            "U2"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 1,
                        "modes": [
                            "U1",
                            "U2"
                        ]
                    },
                    {
                        "districtId": 20,
                        "modes": [
                            "U6",
                            "tram"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.38212528640086,
                                48.212048550268115
                            ],
                            [
                                16.42832360798286,
                                48.18703753510934
                            ],
                            [
                                16.49429743446746,
                                48.16696870541775
                            ],
                            [
                                16.39536823597344,
                                48.237052160215605
                            ],
                            [
                                16.364683976653293,
                                48.225800730741234
                            ],
                            [
                                16.36737600282262,
                                48.21918853374676
                            ],
                            [
                                16.38212528640086,
                                48.212048550268115
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 3,
                "name": "Landstraße",
                "name_de": "Landstraße",
                "website": "https://www.wien.gv.at/bezirke/landstrasse/",
                "keywords": [
                    "embassies",
                    "belvedere",
                    "transit hub",
                    "residential",
                    "upscale"
                ],
                "landmarks": [
                    {
                        "name": "Belvedere Palace",
                        "lat": 48.1915,
                        "lng": 16.3808
                    },
                    {
                        "name": "Hundertwasserhaus",
                        "lat": 48.2075,
                        "lng": 16.3939
                    }
                ],
                "costOfLiving": {
                    "tier": "expensive",
                    "rank": 7,
                    "description": "Premium residential areas near embassies. Rents €15-20/m²."
                },
                "transport": {
                    "ubahn": [
                        "U3",
                        "U4"
                    ],
                    "sbahn": [
                        "S1",
                        "S2",
                        "S3",
                        "S7"
                    ],
                    "tram": [
                        "O",
                        "71",
                        "18"
                    ],
                    "bus": [
                        "4A",
                        "74A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Wien Mitte",
                        "lat": 48.2062,
                        "lng": 16.3841,
                        "lines": [
                            "S1",
                            "S2",
                            "S3",
                            "S7",
                            "U3",
                            "U4"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 1,
                        "modes": [
                            "U3",
                            "U4",
                            "tram"
                        ]
                    },
                    {
                        "districtId": 4,
                        "modes": [
                            "tram",
                            "sbahn"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.39267600676061,
                                48.17622171989469
                            ],
                            [
                                16.42832360798286,
                                48.18703753510934
                            ],
                            [
                                16.38212528640086,
                                48.212048550268115
                            ],
                            [
                                16.37243812909773,
                                48.200645502478245
                            ],
                            [
                                16.378218102650727,
                                48.18881172078526
                            ],
                            [
                                16.39267600676061,
                                48.17622171989469
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 4,
                "name": "Wieden",
                "name_de": "Wieden",
                "website": "https://www.wien.gv.at/bezirke/wieden/",
                "keywords": [
                    "students",
                    "karlsplatz",
                    "trendy",
                    "central",
                    "urban"
                ],
                "landmarks": [
                    {
                        "name": "Karlskirche",
                        "lat": 48.1983,
                        "lng": 16.3714
                    },
                    {
                        "name": "Naschmarkt (border)",
                        "lat": 48.1981,
                        "lng": 16.3601
                    }
                ],
                "costOfLiving": {
                    "tier": "expensive",
                    "rank": 4,
                    "description": "Highly sought after by young professionals and students. Rents €17-21/m²."
                },
                "transport": {
                    "ubahn": [
                        "U1",
                        "U4"
                    ],
                    "sbahn": [
                        "S1",
                        "S2",
                        "S3",
                        "S4"
                    ],
                    "tram": [
                        "1",
                        "62",
                        "WLB"
                    ],
                    "bus": [
                        "13A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Hauptbahnhof (North)",
                        "lat": 48.1851,
                        "lng": 16.3732,
                        "lines": [
                            "U1",
                            "S-Bahn",
                            "trains"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 1,
                        "modes": [
                            "U1",
                            "U4"
                        ]
                    },
                    {
                        "districtId": 5,
                        "modes": [
                            "bus",
                            "tram"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.366064581523357,
                                48.18452442136732
                            ],
                            [
                                16.378218102650727,
                                48.18881172078526
                            ],
                            [
                                16.37243812909773,
                                48.200645502478245
                            ],
                            [
                                16.363164983803465,
                                48.200377853267504
                            ],
                            [
                                16.356594178328507,
                                48.19740658388773
                            ],
                            [
                                16.366064581523357,
                                48.18452442136732
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 5,
                "name": "Margareten",
                "name_de": "Margareten",
                "website": "https://www.wien.gv.at/bezirke/margareten/",
                "keywords": [
                    "working class roots",
                    "bohemian",
                    "design",
                    "dense",
                    "central"
                ],
                "landmarks": [
                    {
                        "name": "Margaretenhof",
                        "lat": 48.1917,
                        "lng": 16.3575
                    }
                ],
                "costOfLiving": {
                    "tier": "moderate",
                    "rank": 12,
                    "description": "Historically affordable but gentrifying rapidly. Rents €14-18/m²."
                },
                "transport": {
                    "ubahn": [
                        "U4"
                    ],
                    "sbahn": [],
                    "tram": [
                        "18",
                        "62"
                    ],
                    "bus": [
                        "12A",
                        "13A",
                        "14A",
                        "59A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Pilgramgasse",
                        "lat": 48.1925,
                        "lng": 16.3541,
                        "lines": [
                            "U4",
                            "bus"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 4,
                        "modes": [
                            "bus"
                        ]
                    },
                    {
                        "districtId": 6,
                        "modes": [
                            "U4",
                            "bus"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.346959470980305,
                                48.179913743479226
                            ],
                            [
                                16.366064581523357,
                                48.18452442136732
                            ],
                            [
                                16.356594178328507,
                                48.19740658388773
                            ],
                            [
                                16.338966838058703,
                                48.189160488653506
                            ],
                            [
                                16.346959470980305,
                                48.179913743479226
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 6,
                "name": "Mariahilf",
                "name_de": "Mariahilf",
                "website": "https://www.wien.gv.at/bezirke/mariahilf/",
                "keywords": [
                    "shopping",
                    "mariahilfer strasse",
                    "hip",
                    "cafes",
                    "dense"
                ],
                "landmarks": [
                    {
                        "name": "Haus des Meeres",
                        "lat": 48.1976,
                        "lng": 16.3529
                    },
                    {
                        "name": "Naschmarkt",
                        "lat": 48.1981,
                        "lng": 16.3601
                    }
                ],
                "costOfLiving": {
                    "tier": "expensive",
                    "rank": 5,
                    "description": "Popular urban district with premium shopping. Rents €16-21/m²."
                },
                "transport": {
                    "ubahn": [
                        "U2",
                        "U3",
                        "U4"
                    ],
                    "sbahn": [],
                    "tram": [
                        "5",
                        "6"
                    ],
                    "bus": [
                        "13A",
                        "14A",
                        "57A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Westbahnhof (East)",
                        "lat": 48.1967,
                        "lng": 16.3392,
                        "lines": [
                            "U3",
                            "U6",
                            "tram"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 7,
                        "modes": [
                            "U3",
                            "bus"
                        ]
                    },
                    {
                        "districtId": 1,
                        "modes": [
                            "U2",
                            "U3"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.338966838058703,
                                48.189160488653506
                            ],
                            [
                                16.356594178328507,
                                48.19740658388773
                            ],
                            [
                                16.363164983803465,
                                48.200377853267504
                            ],
                            [
                                16.35876568322656,
                                48.20335556178468
                            ],
                            [
                                16.336475834812877,
                                48.196572007869946
                            ],
                            [
                                16.336288687561304,
                                48.18900327191591
                            ],
                            [
                                16.338966838058703,
                                48.189160488653506
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 7,
                "name": "Neubau",
                "name_de": "Neubau",
                "website": "https://www.wien.gv.at/bezirke/neubau/",
                "keywords": [
                    "arts",
                    "museums",
                    "creatives",
                    "bars",
                    "boutiques"
                ],
                "landmarks": [
                    {
                        "name": "MuseumsQuartier",
                        "lat": 48.2033,
                        "lng": 16.3581
                    },
                    {
                        "name": "Spittelberg",
                        "lat": 48.2028,
                        "lng": 16.3547
                    }
                ],
                "costOfLiving": {
                    "tier": "expensive",
                    "rank": 3,
                    "description": "Cultural hub, highly demanded by creatives. Rents €17-22/m²."
                },
                "transport": {
                    "ubahn": [
                        "U2",
                        "U3"
                    ],
                    "sbahn": [],
                    "tram": [
                        "5",
                        "46",
                        "49"
                    ],
                    "bus": [
                        "13A",
                        "48A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Volkstheater",
                        "lat": 48.2052,
                        "lng": 16.3582,
                        "lines": [
                            "U2",
                            "U3",
                            "tram"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 1,
                        "modes": [
                            "U2",
                            "U3",
                            "tram"
                        ]
                    },
                    {
                        "districtId": 8,
                        "modes": [
                            "bus",
                            "tram"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.336475834812877,
                                48.196572007869946
                            ],
                            [
                                16.35876568322656,
                                48.20335556178468
                            ],
                            [
                                16.3531036596632,
                                48.207605815436416
                            ],
                            [
                                16.33567147915875,
                                48.2092779811175
                            ],
                            [
                                16.334242917059946,
                                48.20488486077469
                            ],
                            [
                                16.336475834812877,
                                48.196572007869946
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 8,
                "name": "Josefstadt",
                "name_de": "Josefstadt",
                "website": "https://www.wien.gv.at/bezirke/josefstadt/",
                "keywords": [
                    "smallest district",
                    "exclusive",
                    "academics",
                    "quiet",
                    "historic"
                ],
                "landmarks": [
                    {
                        "name": "Theater in der Josefstadt",
                        "lat": 48.2096,
                        "lng": 16.3492
                    },
                    {
                        "name": "Palais Auersperg",
                        "lat": 48.2072,
                        "lng": 16.3551
                    }
                ],
                "costOfLiving": {
                    "tier": "very_expensive",
                    "rank": 2,
                    "description": "Vienna's smallest district, favored by academics and politicians. Rents €18-24/m²."
                },
                "transport": {
                    "ubahn": [
                        "U2"
                    ],
                    "sbahn": [],
                    "tram": [
                        "2",
                        "5",
                        "33",
                        "46"
                    ],
                    "bus": [
                        "13A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Rathaus",
                        "lat": 48.2105,
                        "lng": 16.3547,
                        "lines": [
                            "U2"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 1,
                        "modes": [
                            "U2",
                            "tram"
                        ]
                    },
                    {
                        "districtId": 9,
                        "modes": [
                            "tram",
                            "bus"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.33567147915875,
                                48.2092779811175
                            ],
                            [
                                16.3531036596632,
                                48.207605815436416
                            ],
                            [
                                16.353737152842204,
                                48.21503691565174
                            ],
                            [
                                16.33810467534275,
                                48.21586921041474
                            ],
                            [
                                16.33648511228829,
                                48.2128420242543
                            ],
                            [
                                16.33567147915875,
                                48.2092779811175
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 9,
                "name": "Alsergrund",
                "name_de": "Alsergrund",
                "website": "https://www.wien.gv.at/bezirke/alsergrund/",
                "keywords": [
                    "university",
                    "medical",
                    "freud",
                    "students",
                    "votivkirche"
                ],
                "landmarks": [
                    {
                        "name": "Votivkirche",
                        "lat": 48.2155,
                        "lng": 16.3598
                    },
                    {
                        "name": "Sigmund Freud Museum",
                        "lat": 48.2185,
                        "lng": 16.3629
                    }
                ],
                "costOfLiving": {
                    "tier": "expensive",
                    "rank": 8,
                    "description": "Academic center with beautiful old buildings. Rents €15-20/m²."
                },
                "transport": {
                    "ubahn": [
                        "U2",
                        "U4",
                        "U6"
                    ],
                    "sbahn": [
                        "S40"
                    ],
                    "tram": [
                        "D",
                        "1",
                        "5",
                        "33",
                        "37",
                        "38",
                        "40",
                        "41",
                        "42"
                    ],
                    "bus": [
                        "40A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Franz-Josefs-Bahnhof",
                        "lat": 48.2261,
                        "lng": 16.3603,
                        "lines": [
                            "S40",
                            "tram"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 1,
                        "modes": [
                            "U2",
                            "U4",
                            "tram"
                        ]
                    },
                    {
                        "districtId": 18,
                        "modes": [
                            "U6",
                            "tram"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.33810467534275,
                                48.21586921041474
                            ],
                            [
                                16.353737152842204,
                                48.21503691565174
                            ],
                            [
                                16.36737600282262,
                                48.21918853374676
                            ],
                            [
                                16.364683976653293,
                                48.225800730741234
                            ],
                            [
                                16.358846251589924,
                                48.23700266218906
                            ],
                            [
                                16.350989610071032,
                                48.23268540818413
                            ],
                            [
                                16.33922033172304,
                                48.217940226421995
                            ],
                            [
                                16.33810467534275,
                                48.21586921041474
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 10,
                "name": "Favoriten",
                "name_de": "Favoriten",
                "website": "https://www.wien.gv.at/bezirke/favoriten/",
                "keywords": [
                    "multicultural",
                    "most populous",
                    "hauptbahnhof",
                    "affordable",
                    "parks"
                ],
                "landmarks": [
                    {
                        "name": "Hauptbahnhof",
                        "lat": 48.1851,
                        "lng": 16.3732
                    },
                    {
                        "name": "Oberlaa Park",
                        "lat": 48.1404,
                        "lng": 16.4025
                    }
                ],
                "costOfLiving": {
                    "tier": "affordable",
                    "rank": 20,
                    "description": "Working-class and multicultural, highly affordable except near Hbf. Rents €11-15/m²."
                },
                "transport": {
                    "ubahn": [
                        "U1"
                    ],
                    "sbahn": [
                        "S1",
                        "S2",
                        "S3",
                        "S4"
                    ],
                    "tram": [
                        "O",
                        "11",
                        "67"
                    ],
                    "bus": [
                        "15A",
                        "68A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Reumannplatz",
                        "lat": 48.1745,
                        "lng": 16.3783,
                        "lines": [
                            "U1",
                            "tram"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 4,
                        "modes": [
                            "U1",
                            "tram"
                        ]
                    },
                    {
                        "districtId": 11,
                        "modes": [
                            "tram",
                            "bus"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.434246243952863,
                                48.12062596106924
                            ],
                            [
                                16.43344804359402,
                                48.13867258550262
                            ],
                            [
                                16.39267600676061,
                                48.17622171989469
                            ],
                            [
                                16.378218102650727,
                                48.18881172078526
                            ],
                            [
                                16.366064581523357,
                                48.18452442136732
                            ],
                            [
                                16.346959470980305,
                                48.179913743479226
                            ],
                            [
                                16.332868971180666,
                                48.159973743076364
                            ],
                            [
                                16.362860914712996,
                                48.12936740383815
                            ],
                            [
                                16.363113841196046,
                                48.129094678210095
                            ],
                            [
                                16.38556577135256,
                                48.12606494554488
                            ],
                            [
                                16.410046375913776,
                                48.118937473447055
                            ],
                            [
                                16.434246243952863,
                                48.12062596106924
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 11,
                "name": "Simmering",
                "name_de": "Simmering",
                "website": "https://www.wien.gv.at/bezirke/simmering/",
                "keywords": [
                    "industrial",
                    "central cemetery",
                    "gasometer",
                    "affordable"
                ],
                "landmarks": [
                    {
                        "name": "Zentralfriedhof",
                        "lat": 48.1517,
                        "lng": 16.4402
                    },
                    {
                        "name": "Gasometer",
                        "lat": 48.1856,
                        "lng": 16.4223
                    }
                ],
                "costOfLiving": {
                    "tier": "affordable",
                    "rank": 23,
                    "description": "One of the cheapest districts, heavily industrial with new developments. Rents €10-14/m²."
                },
                "transport": {
                    "ubahn": [
                        "U3"
                    ],
                    "sbahn": [
                        "S7"
                    ],
                    "tram": [
                        "11",
                        "71"
                    ],
                    "bus": [
                        "69A",
                        "73A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Simmering",
                        "lat": 48.1705,
                        "lng": 16.4208,
                        "lines": [
                            "U3",
                            "S-Bahn",
                            "tram"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 3,
                        "modes": [
                            "U3",
                            "tram"
                        ]
                    },
                    {
                        "districtId": 10,
                        "modes": [
                            "tram",
                            "bus"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.43344804359402,
                                48.13867258550262
                            ],
                            [
                                16.511013602174128,
                                48.1596215500773
                            ],
                            [
                                16.49429743446746,
                                48.16696870541775
                            ],
                            [
                                16.42832360798286,
                                48.18703753510934
                            ],
                            [
                                16.39267600676061,
                                48.17622171989469
                            ],
                            [
                                16.43344804359402,
                                48.13867258550262
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 12,
                "name": "Meidling",
                "name_de": "Meidling",
                "website": "https://www.wien.gv.at/bezirke/meidling/",
                "keywords": [
                    "transit hub",
                    "residential",
                    "working class",
                    "market"
                ],
                "landmarks": [
                    {
                        "name": "Meidlinger Markt",
                        "lat": 48.1786,
                        "lng": 16.3323
                    },
                    {
                        "name": "Schloss Hetzendorf",
                        "lat": 48.1672,
                        "lng": 16.3089
                    }
                ],
                "costOfLiving": {
                    "tier": "moderate",
                    "rank": 16,
                    "description": "Solid residential district with excellent transit. Rents €12-16/m²."
                },
                "transport": {
                    "ubahn": [
                        "U4",
                        "U6"
                    ],
                    "sbahn": [
                        "S1",
                        "S2",
                        "S3",
                        "S80"
                    ],
                    "tram": [
                        "62",
                        "WLB"
                    ],
                    "bus": [
                        "7A",
                        "8A",
                        "9A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Bahnhof Meidling",
                        "lat": 48.1743,
                        "lng": 16.3339,
                        "lines": [
                            "U6",
                            "S-Bahn",
                            "trains"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 5,
                        "modes": [
                            "U4",
                            "tram"
                        ]
                    },
                    {
                        "districtId": 13,
                        "modes": [
                            "U4",
                            "bus"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.332868971180666,
                                48.159973743076364
                            ],
                            [
                                16.346959470980305,
                                48.179913743479226
                            ],
                            [
                                16.338966838058703,
                                48.189160488653506
                            ],
                            [
                                16.336288687561304,
                                48.18900327191591
                            ],
                            [
                                16.317364555237564,
                                48.18651014352038
                            ],
                            [
                                16.289044072582637,
                                48.162996520563695
                            ],
                            [
                                16.332868971180666,
                                48.159973743076364
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 13,
                "name": "Hietzing",
                "name_de": "Hietzing",
                "website": "https://www.wien.gv.at/bezirke/hietzing/",
                "keywords": [
                    "schönbrunn",
                    "villas",
                    "green",
                    "wealthy",
                    "suburban"
                ],
                "landmarks": [
                    {
                        "name": "Schönbrunn Palace",
                        "lat": 48.1848,
                        "lng": 16.3122
                    },
                    {
                        "name": "Lainzer Tiergarten",
                        "lat": 48.1752,
                        "lng": 16.2307
                    }
                ],
                "costOfLiving": {
                    "tier": "expensive",
                    "rank": 9,
                    "description": "Traditional wealth, villas, and abundant green space. Rents €15-22/m²."
                },
                "transport": {
                    "ubahn": [
                        "U4"
                    ],
                    "sbahn": [
                        "S80"
                    ],
                    "tram": [
                        "10",
                        "60"
                    ],
                    "bus": [
                        "56A",
                        "58A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Hietzing",
                        "lat": 48.1883,
                        "lng": 16.3039,
                        "lines": [
                            "U4",
                            "tram"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 12,
                        "modes": [
                            "U4",
                            "tram"
                        ]
                    },
                    {
                        "districtId": 14,
                        "modes": [
                            "U4",
                            "tram"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.289044072582637,
                                48.162996520563695
                            ],
                            [
                                16.317364555237564,
                                48.18651014352038
                            ],
                            [
                                16.311432636107966,
                                48.18787313462468
                            ],
                            [
                                16.20461564491174,
                                48.20303439441751
                            ],
                            [
                                16.179122869495856,
                                48.17172505807664
                            ],
                            [
                                16.195198488648696,
                                48.155241722116926
                            ],
                            [
                                16.22042735257546,
                                48.15387843224085
                            ],
                            [
                                16.289044072582637,
                                48.162996520563695
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 14,
                "name": "Penzing",
                "name_de": "Penzing",
                "website": "https://www.wien.gv.at/bezirke/penzing/",
                "keywords": [
                    "wienerwald",
                    "nature",
                    "otto wagner",
                    "spacious"
                ],
                "landmarks": [
                    {
                        "name": "Otto Wagner Hospital",
                        "lat": 48.2091,
                        "lng": 16.2796
                    },
                    {
                        "name": "Technisches Museum",
                        "lat": 48.1906,
                        "lng": 16.3187
                    }
                ],
                "costOfLiving": {
                    "tier": "moderate",
                    "rank": 14,
                    "description": "Large district reaching into the Vienna Woods. Rents €12-16/m²."
                },
                "transport": {
                    "ubahn": [
                        "U3",
                        "U4"
                    ],
                    "sbahn": [
                        "S45",
                        "S50"
                    ],
                    "tram": [
                        "10",
                        "49",
                        "52"
                    ],
                    "bus": [
                        "47A",
                        "51A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Hütteldorf",
                        "lat": 48.1972,
                        "lng": 16.2612,
                        "lines": [
                            "U4",
                            "S-Bahn",
                            "trains"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 15,
                        "modes": [
                            "U3",
                            "tram"
                        ]
                    },
                    {
                        "districtId": 13,
                        "modes": [
                            "U4",
                            "tram"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.20461564491174,
                                48.20303439441751
                            ],
                            [
                                16.311432636107966,
                                48.18787313462468
                            ],
                            [
                                16.30791912399246,
                                48.20356168512081
                            ],
                            [
                                16.25085257467259,
                                48.222143847696614
                            ],
                            [
                                16.253842706615437,
                                48.24057601187154
                            ],
                            [
                                16.205295593469874,
                                48.264791213360155
                            ],
                            [
                                16.18239186839708,
                                48.22390134272117
                            ],
                            [
                                16.20461564491174,
                                48.20303439441751
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 15,
                "name": "Rudolfsheim-Fünfhaus",
                "name_de": "Rudolfsheim-Fünfhaus",
                "website": "https://www.wien.gv.at/bezirke/rudolfsheim-fuenfhaus/",
                "keywords": [
                    "westbahnhof",
                    "multicultural",
                    "affordable",
                    "up-and-coming",
                    "stadthalle"
                ],
                "landmarks": [
                    {
                        "name": "Wiener Stadthalle",
                        "lat": 48.2014,
                        "lng": 16.3328
                    },
                    {
                        "name": "Westbahnhof",
                        "lat": 48.1967,
                        "lng": 16.3392
                    }
                ],
                "costOfLiving": {
                    "tier": "affordable",
                    "rank": 21,
                    "description": "Dense, highly urban, and gentrifying near the center. Rents €11-15/m²."
                },
                "transport": {
                    "ubahn": [
                        "U3",
                        "U6"
                    ],
                    "sbahn": [
                        "S50"
                    ],
                    "tram": [
                        "9",
                        "18",
                        "49",
                        "52",
                        "60"
                    ],
                    "bus": [
                        "10A",
                        "12A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Westbahnhof",
                        "lat": 48.1967,
                        "lng": 16.3392,
                        "lines": [
                            "U3",
                            "U6",
                            "tram"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 6,
                        "modes": [
                            "U3",
                            "tram"
                        ]
                    },
                    {
                        "districtId": 7,
                        "modes": [
                            "U3",
                            "tram"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.317364555237564,
                                48.18651014352038
                            ],
                            [
                                16.336288687561304,
                                48.18900327191591
                            ],
                            [
                                16.336475834812877,
                                48.196572007869946
                            ],
                            [
                                16.334242917059946,
                                48.20488486077469
                            ],
                            [
                                16.30791912399246,
                                48.20356168512081
                            ],
                            [
                                16.311432636107966,
                                48.18787313462468
                            ],
                            [
                                16.317364555237564,
                                48.18651014352038
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 16,
                "name": "Ottakring",
                "name_de": "Ottakring",
                "website": "https://www.wien.gv.at/bezirke/ottakring/",
                "keywords": [
                    "brunnenmarkt",
                    "brewery",
                    "multicultural",
                    "hills",
                    "hip"
                ],
                "landmarks": [
                    {
                        "name": "Brunnenmarkt",
                        "lat": 48.2114,
                        "lng": 16.3364
                    },
                    {
                        "name": "Ottakringer Brewery",
                        "lat": 48.2127,
                        "lng": 16.3235
                    }
                ],
                "costOfLiving": {
                    "tier": "moderate",
                    "rank": 15,
                    "description": "Mix of dense multicultural areas and wealthy hillside villas. Rents €12-17/m²."
                },
                "transport": {
                    "ubahn": [
                        "U3"
                    ],
                    "sbahn": [
                        "S45"
                    ],
                    "tram": [
                        "2",
                        "9",
                        "44",
                        "46"
                    ],
                    "bus": [
                        "10A",
                        "48A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Ottakring",
                        "lat": 48.2109,
                        "lng": 16.3117,
                        "lines": [
                            "U3",
                            "S45",
                            "tram"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 7,
                        "modes": [
                            "tram",
                            "bus"
                        ]
                    },
                    {
                        "districtId": 17,
                        "modes": [
                            "tram",
                            "sbahn"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.25085257467259,
                                48.222143847696614
                            ],
                            [
                                16.30791912399246,
                                48.20356168512081
                            ],
                            [
                                16.334242917059946,
                                48.20488486077469
                            ],
                            [
                                16.33567147915875,
                                48.2092779811175
                            ],
                            [
                                16.33648511228829,
                                48.2128420242543
                            ],
                            [
                                16.25085257467259,
                                48.222143847696614
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 17,
                "name": "Hernals",
                "name_de": "Hernals",
                "website": "https://www.wien.gv.at/bezirke/hernals/",
                "keywords": [
                    "residential",
                    "wienerwald",
                    "quiet",
                    "parks"
                ],
                "landmarks": [
                    {
                        "name": "Schwarzenbergpark",
                        "lat": 48.2434,
                        "lng": 16.2825
                    },
                    {
                        "name": "Jörgerbad",
                        "lat": 48.2185,
                        "lng": 16.3374
                    }
                ],
                "costOfLiving": {
                    "tier": "moderate",
                    "rank": 13,
                    "description": "Quiet residential district stretching into the woods. Rents €13-17/m²."
                },
                "transport": {
                    "ubahn": [
                        "U6"
                    ],
                    "sbahn": [
                        "S45"
                    ],
                    "tram": [
                        "9",
                        "43"
                    ],
                    "bus": [
                        "10A",
                        "42A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Hernals",
                        "lat": 48.2231,
                        "lng": 16.3155,
                        "lines": [
                            "S45",
                            "tram"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 8,
                        "modes": [
                            "tram"
                        ]
                    },
                    {
                        "districtId": 18,
                        "modes": [
                            "tram",
                            "bus"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.33810467534275,
                                48.21586921041474
                            ],
                            [
                                16.33922033172304,
                                48.217940226421995
                            ],
                            [
                                16.28563386933175,
                                48.25167121738468
                            ],
                            [
                                16.282784673675316,
                                48.25901822523876
                            ],
                            [
                                16.253842706615437,
                                48.24057601187154
                            ],
                            [
                                16.25085257467259,
                                48.222143847696614
                            ],
                            [
                                16.33648511228829,
                                48.2128420242543
                            ],
                            [
                                16.33810467534275,
                                48.21586921041474
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 18,
                "name": "Währing",
                "name_de": "Währing",
                "website": "https://www.wien.gv.at/bezirke/waehring/",
                "keywords": [
                    "upscale",
                    "parks",
                    "villas",
                    "family-friendly",
                    "quiet"
                ],
                "landmarks": [
                    {
                        "name": "Türkenschanzpark",
                        "lat": 48.2346,
                        "lng": 16.3323
                    },
                    {
                        "name": "Sternwarte (Observatory)",
                        "lat": 48.2314,
                        "lng": 16.3344
                    }
                ],
                "costOfLiving": {
                    "tier": "expensive",
                    "rank": 10,
                    "description": "Highly desirable bourgeois district with green spaces. Rents €15-20/m²."
                },
                "transport": {
                    "ubahn": [
                        "U6"
                    ],
                    "sbahn": [
                        "S45"
                    ],
                    "tram": [
                        "40",
                        "41",
                        "42"
                    ],
                    "bus": [
                        "10A",
                        "40A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Gersthof",
                        "lat": 48.2307,
                        "lng": 16.3245,
                        "lines": [
                            "S45",
                            "tram"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 9,
                        "modes": [
                            "U6",
                            "tram",
                            "bus"
                        ]
                    },
                    {
                        "districtId": 19,
                        "modes": [
                            "sbahn",
                            "bus"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.33922033172304,
                                48.217940226421995
                            ],
                            [
                                16.350989610071032,
                                48.23268540818413
                            ],
                            [
                                16.28563386933175,
                                48.25167121738468
                            ],
                            [
                                16.33922033172304,
                                48.217940226421995
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 19,
                "name": "Döbling",
                "name_de": "Döbling",
                "website": "https://www.wien.gv.at/bezirke/doebling/",
                "keywords": [
                    "heuriger",
                    "wine",
                    "villas",
                    "wealthy",
                    "kahlenberg"
                ],
                "landmarks": [
                    {
                        "name": "Kahlenberg",
                        "lat": 48.2758,
                        "lng": 16.3329
                    },
                    {
                        "name": "Karl-Marx-Hof",
                        "lat": 48.2483,
                        "lng": 16.3639
                    }
                ],
                "costOfLiving": {
                    "tier": "very_expensive",
                    "rank": 11,
                    "description": "Home to Vienna's elite, vineyards, and luxury villas. Rents €16-25/m²."
                },
                "transport": {
                    "ubahn": [
                        "U4",
                        "U6"
                    ],
                    "sbahn": [
                        "S40",
                        "S45"
                    ],
                    "tram": [
                        "37",
                        "38",
                        "D"
                    ],
                    "bus": [
                        "38A",
                        "39A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Heiligenstadt",
                        "lat": 48.2486,
                        "lng": 16.3659,
                        "lines": [
                            "U4",
                            "S-Bahn",
                            "bus"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 9,
                        "modes": [
                            "U4",
                            "U6",
                            "tram"
                        ]
                    },
                    {
                        "districtId": 20,
                        "modes": [
                            "U6",
                            "bus"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.28563386933175,
                                48.25167121738468
                            ],
                            [
                                16.350989610071032,
                                48.23268540818413
                            ],
                            [
                                16.358846251589924,
                                48.23700266218906
                            ],
                            [
                                16.369613744122102,
                                48.26341786956094
                            ],
                            [
                                16.353184316827658,
                                48.284042653322786
                            ],
                            [
                                16.282784673675316,
                                48.25901822523876
                            ],
                            [
                                16.28563386933175,
                                48.25167121738468
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 20,
                "name": "Brigittenau",
                "name_de": "Brigittenau",
                "website": "https://www.wien.gv.at/bezirke/brigittenau/",
                "keywords": [
                    "river",
                    "island",
                    "working class",
                    "affordable",
                    "millennium tower"
                ],
                "landmarks": [
                    {
                        "name": "Millennium Tower",
                        "lat": 48.2403,
                        "lng": 16.3875
                    },
                    {
                        "name": "Hannovermarkt",
                        "lat": 48.2325,
                        "lng": 16.3681
                    }
                ],
                "costOfLiving": {
                    "tier": "affordable",
                    "rank": 19,
                    "description": "Island district between Danube and canal, budget-friendly. Rents €11-15/m²."
                },
                "transport": {
                    "ubahn": [
                        "U6"
                    ],
                    "sbahn": [
                        "S1",
                        "S2",
                        "S3",
                        "S4",
                        "S45"
                    ],
                    "tram": [
                        "2",
                        "31",
                        "33"
                    ],
                    "bus": [
                        "5A",
                        "11A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Handelskai",
                        "lat": 48.2415,
                        "lng": 16.3854,
                        "lines": [
                            "U6",
                            "S-Bahn",
                            "bus"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 2,
                        "modes": [
                            "tram",
                            "bus"
                        ]
                    },
                    {
                        "districtId": 21,
                        "modes": [
                            "U6",
                            "sbahn"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.364683976653293,
                                48.225800730741234
                            ],
                            [
                                16.39536823597344,
                                48.237052160215605
                            ],
                            [
                                16.369613744122102,
                                48.26341786956094
                            ],
                            [
                                16.358846251589924,
                                48.23700266218906
                            ],
                            [
                                16.364683976653293,
                                48.225800730741234
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 21,
                "name": "Floridsdorf",
                "name_de": "Floridsdorf",
                "website": "https://www.wien.gv.at/bezirke/floridsdorf/",
                "keywords": [
                    "transdanubia",
                    "suburban",
                    "wine",
                    "affordable",
                    "alte donau"
                ],
                "landmarks": [
                    {
                        "name": "Alte Donau",
                        "lat": 48.2435,
                        "lng": 16.4258
                    },
                    {
                        "name": "Stammersdorf (Heurigen)",
                        "lat": 48.3106,
                        "lng": 16.4111
                    }
                ],
                "costOfLiving": {
                    "tier": "moderate",
                    "rank": 17,
                    "description": "Suburban feel across the river, lower housing costs. Rents €11-16/m²."
                },
                "transport": {
                    "ubahn": [
                        "U6"
                    ],
                    "sbahn": [
                        "S1",
                        "S2",
                        "S3",
                        "S4",
                        "S7"
                    ],
                    "tram": [
                        "25",
                        "26",
                        "30",
                        "31"
                    ],
                    "bus": [
                        "29A",
                        "33A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Floridsdorf",
                        "lat": 48.2562,
                        "lng": 16.4005,
                        "lines": [
                            "U6",
                            "S-Bahn",
                            "tram"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 20,
                        "modes": [
                            "U6",
                            "sbahn",
                            "tram"
                        ]
                    },
                    {
                        "districtId": 22,
                        "modes": [
                            "tram",
                            "bus"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.39536823597344,
                                48.237052160215605
                            ],
                            [
                                16.471936075452582,
                                48.276008516001454
                            ],
                            [
                                16.425226930412876,
                                48.32107384619422
                            ],
                            [
                                16.39239950424916,
                                48.323256351480374
                            ],
                            [
                                16.360411753940745,
                                48.28299603442784
                            ],
                            [
                                16.353184316827658,
                                48.284042653322786
                            ],
                            [
                                16.369613744122102,
                                48.26341786956094
                            ],
                            [
                                16.39536823597344,
                                48.237052160215605
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 22,
                "name": "Donaustadt",
                "name_de": "Donaustadt",
                "website": "https://www.wien.gv.at/bezirke/donaustadt/",
                "keywords": [
                    "largest district",
                    "UNO city",
                    "donauinsel",
                    "modern",
                    "lakes"
                ],
                "landmarks": [
                    {
                        "name": "Vienna International Centre (UNO City)",
                        "lat": 48.2343,
                        "lng": 16.4168
                    },
                    {
                        "name": "Donauturm",
                        "lat": 48.2403,
                        "lng": 16.4101
                    }
                ],
                "costOfLiving": {
                    "tier": "moderate",
                    "rank": 18,
                    "description": "Vienna's largest district. Mix of high-rises and single-family homes. Rents €12-18/m²."
                },
                "transport": {
                    "ubahn": [
                        "U1",
                        "U2"
                    ],
                    "sbahn": [
                        "S80"
                    ],
                    "tram": [
                        "25",
                        "26"
                    ],
                    "bus": [
                        "26A",
                        "93A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Kaisermühlen-VIC",
                        "lat": 48.2321,
                        "lng": 16.4159,
                        "lines": [
                            "U1",
                            "bus"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 2,
                        "modes": [
                            "U1",
                            "U2"
                        ]
                    },
                    {
                        "districtId": 21,
                        "modes": [
                            "tram",
                            "bus"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.574217561105915,
                                48.14513007099916
                            ],
                            [
                                16.533509707881418,
                                48.177768384145324
                            ],
                            [
                                16.549971211397587,
                                48.23969285403885
                            ],
                            [
                                16.54420825354776,
                                48.26369178826104
                            ],
                            [
                                16.512124331592528,
                                48.28622670147884
                            ],
                            [
                                16.4994138251528,
                                48.291052237931495
                            ],
                            [
                                16.471936075452582,
                                48.276008516001454
                            ],
                            [
                                16.39536823597344,
                                48.237052160215605
                            ],
                            [
                                16.49429743446746,
                                48.16696870541775
                            ],
                            [
                                16.511013602174128,
                                48.1596215500773
                            ],
                            [
                                16.57325705011586,
                                48.13591277512623
                            ],
                            [
                                16.574217561105915,
                                48.14513007099916
                            ]
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 23,
                "name": "Liesing",
                "name_de": "Liesing",
                "website": "https://www.wien.gv.at/bezirke/liesing/",
                "keywords": [
                    "suburban",
                    "industrial",
                    "wienerwald",
                    "family-friendly"
                ],
                "landmarks": [
                    {
                        "name": "Wotruba Church",
                        "lat": 48.1477,
                        "lng": 16.2522
                    },
                    {
                        "name": "Schloss Alterlaa",
                        "lat": 48.1502,
                        "lng": 16.3155
                    }
                ],
                "costOfLiving": {
                    "tier": "affordable",
                    "rank": 22,
                    "description": "Southernmost suburban district. Good for families. Rents €11-15/m²."
                },
                "transport": {
                    "ubahn": [
                        "U6"
                    ],
                    "sbahn": [
                        "S2",
                        "S3",
                        "S4"
                    ],
                    "tram": [
                        "60"
                    ],
                    "bus": [
                        "60A",
                        "66A"
                    ]
                },
                "majorStations": [
                    {
                        "name": "Alterlaa",
                        "lat": 48.1523,
                        "lng": 16.3157,
                        "lines": [
                            "U6",
                            "bus"
                        ]
                    },
                    {
                        "name": "Liesing",
                        "lat": 48.1348,
                        "lng": 16.2828,
                        "lines": [
                            "S-Bahn",
                            "bus"
                        ]
                    }
                ],
                "directConnections": [
                    {
                        "districtId": 12,
                        "modes": [
                            "U6",
                            "sbahn"
                        ]
                    },
                    {
                        "districtId": 10,
                        "modes": [
                            "bus"
                        ]
                    }
                ]
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                16.215319946458333,
                                48.12876260702782
                            ],
                            [
                                16.222751181809326,
                                48.12616536751681
                            ],
                            [
                                16.226346919323102,
                                48.12784698736299
                            ],
                            [
                                16.29577743156106,
                                48.126017999864594
                            ],
                            [
                                16.309429782935833,
                                48.12022714306248
                            ],
                            [
                                16.362860914712996,
                                48.12936740383815
                            ],
                            [
                                16.332868971180666,
                                48.159973743076364
                            ],
                            [
                                16.289044072582637,
                                48.162996520563695
                            ],
                            [
                                16.22042735257546,
                                48.15387843224085
                            ],
                            [
                                16.215319946458333,
                                48.12876260702782
                            ]
                        ]
                    ]
                ]
            }
        }
    ]
};

  const LINE_STYLES = {
    U1: { color: "#E6332A", label: "U1", mode: "ubahn" },
    U2: { color: "#A05EB5", label: "U2", mode: "ubahn" },
    U3: { color: "#F6821F", label: "U3", mode: "ubahn" },
    U4: { color: "#008E5A", label: "U4", mode: "ubahn" },
    U6: { color: "#825A2D", label: "U6", mode: "ubahn" },
    S1: { color: "#1E88E5", label: "S1", mode: "sbahn" },
    S2: { color: "#00ACC1", label: "S2", mode: "sbahn" },
    S3: { color: "#00897B", label: "S3", mode: "sbahn" },
    S4: { color: "#558B2F", label: "S4", mode: "sbahn" },
    S7: { color: "#F9A825", label: "S7", mode: "sbahn" },
    S40: { color: "#546E7A", label: "S40", mode: "sbahn" },
    S45: { color: "#8E24AA", label: "S45", mode: "sbahn" },
    S50: { color: "#00529B", label: "S50", mode: "sbahn" },
    S80: { color: "#00529B", label: "S80", mode: "sbahn" }
  };

  const LINE_ROUTES = {
    U1: [
      [48.2710, 16.4120], [48.2685, 16.4118], [48.2658, 16.4130],
      [48.2640, 16.4150], [48.2615, 16.4162], [48.2590, 16.4180],
      [48.2570, 16.4208], [48.2553, 16.4235], [48.2530, 16.4255],
      [48.2505, 16.4278], [48.2480, 16.4290], [48.2458, 16.4285],
      [48.2430, 16.4270], [48.2400, 16.4248], [48.2375, 16.4225],
      [48.2348, 16.4195], [48.2321, 16.4159], [48.2295, 16.4125],
      [48.2270, 16.4088], [48.2255, 16.4048], [48.2238, 16.4005],
      [48.2220, 16.3978], [48.2205, 16.3948], [48.2197, 16.3923],
      [48.2190, 16.3892], [48.2184, 16.3865], [48.2179, 16.3836],
      [48.2173, 16.3810], [48.2162, 16.3792], [48.2152, 16.3776],
      [48.2135, 16.3760], [48.2116, 16.3779], [48.2098, 16.3756],
      [48.2082, 16.3731], [48.2058, 16.3720], [48.2030, 16.3710],
      [48.2003, 16.3698], [48.1975, 16.3698], [48.1948, 16.3702],
      [48.1915, 16.3710], [48.1885, 16.3722], [48.1851, 16.3732],
      [48.1825, 16.3748], [48.1792, 16.3768], [48.1768, 16.3775],
      [48.1745, 16.3783], [48.1718, 16.3790], [48.1690, 16.3796],
      [48.1663, 16.3800], [48.1635, 16.3802], [48.1605, 16.3805],
      [48.1570, 16.3810], [48.1540, 16.3820], [48.1520, 16.3830],
      [48.1495, 16.3855], [48.1475, 16.3885], [48.1456, 16.3910],
      [48.1438, 16.3955], [48.1425, 16.3995], [48.1418, 16.4031]
    ],
    U2: [
      [48.2003, 16.3698], [48.2012, 16.3668], [48.2020, 16.3640],
      [48.2028, 16.3615], [48.2038, 16.3598], [48.2052, 16.3582],
      [48.2070, 16.3565], [48.2088, 16.3555], [48.2105, 16.3547],
      [48.2120, 16.3568], [48.2132, 16.3592], [48.2142, 16.3610],
      [48.2147, 16.3625], [48.2152, 16.3648], [48.2158, 16.3675],
      [48.2164, 16.3700], [48.2170, 16.3730], [48.2175, 16.3758],
      [48.2180, 16.3785], [48.2185, 16.3805], [48.2189, 16.3816],
      [48.2192, 16.3845], [48.2195, 16.3875], [48.2197, 16.3923],
      [48.2193, 16.3950], [48.2188, 16.3985], [48.2183, 16.4015],
      [48.2179, 16.4059], [48.2170, 16.4085], [48.2160, 16.4115],
      [48.2150, 16.4148], [48.2145, 16.4180], [48.2140, 16.4236],
      [48.2130, 16.4258], [48.2120, 16.4278], [48.2110, 16.4300],
      [48.2105, 16.4328], [48.2102, 16.4360], [48.2105, 16.4395],
      [48.2110, 16.4430], [48.2120, 16.4460], [48.2125, 16.4480],
      [48.2130, 16.4500], [48.2125, 16.4530], [48.2120, 16.4560],
      [48.2120, 16.4590], [48.2130, 16.4615], [48.2142, 16.4635],
      [48.2155, 16.4655], [48.2175, 16.4665], [48.2190, 16.4675],
      [48.2210, 16.4685], [48.2230, 16.4710], [48.2250, 16.4738],
      [48.2270, 16.4750], [48.2295, 16.4750], [48.2315, 16.4752],
      [48.2335, 16.4755], [48.2350, 16.4780], [48.2365, 16.4805],
      [48.2370, 16.4825]
    ],
    U3: [
      [48.2109, 16.3117], [48.2102, 16.3140], [48.2095, 16.3170],
      [48.2090, 16.3195], [48.2085, 16.3220], [48.2082, 16.3245],
      [48.2075, 16.3270], [48.2068, 16.3292], [48.2063, 16.3310],
      [48.2050, 16.3325], [48.2035, 16.3338], [48.2020, 16.3348],
      [48.1995, 16.3370], [48.1978, 16.3385], [48.1967, 16.3392],
      [48.1980, 16.3415], [48.1990, 16.3440], [48.2000, 16.3465],
      [48.2008, 16.3485], [48.2015, 16.3510], [48.2025, 16.3535],
      [48.2038, 16.3558], [48.2052, 16.3582], [48.2060, 16.3610],
      [48.2068, 16.3640], [48.2075, 16.3670], [48.2078, 16.3695],
      [48.2082, 16.3731], [48.2078, 16.3755], [48.2075, 16.3775],
      [48.2073, 16.3785], [48.2068, 16.3810], [48.2062, 16.3841],
      [48.2048, 16.3865], [48.2035, 16.3888], [48.2025, 16.3905],
      [48.2005, 16.3930], [48.1988, 16.3955], [48.1976, 16.3968],
      [48.1960, 16.3995], [48.1948, 16.4025], [48.1940, 16.4050],
      [48.1920, 16.4075], [48.1900, 16.4095], [48.1885, 16.4110],
      [48.1865, 16.4135], [48.1850, 16.4150], [48.1845, 16.4160],
      [48.1825, 16.4170], [48.1808, 16.4178], [48.1795, 16.4185],
      [48.1772, 16.4192], [48.1755, 16.4198], [48.1745, 16.4200],
      [48.1730, 16.4202], [48.1715, 16.4205], [48.1705, 16.4208],
      [48.1690, 16.4210], [48.1675, 16.4215], [48.1655, 16.4220],
      [48.1635, 16.4225]
    ],
    U4: [
      [48.2486, 16.3659], [48.2445, 16.3645], [48.2405, 16.3630],
      [48.2368, 16.3618], [48.2335, 16.3610], [48.2310, 16.3610],
      [48.2280, 16.3610], [48.2255, 16.3615], [48.2235, 16.3622],
      [48.2215, 16.3630], [48.2195, 16.3655], [48.2180, 16.3685],
      [48.2170, 16.3710], [48.2160, 16.3740], [48.2150, 16.3760],
      [48.2138, 16.3772], [48.2125, 16.3780], [48.2116, 16.3779],
      [48.2095, 16.3805], [48.2078, 16.3825], [48.2062, 16.3841],
      [48.2050, 16.3820], [48.2038, 16.3798], [48.2027, 16.3775],
      [48.2015, 16.3740], [48.2003, 16.3698], [48.1988, 16.3668],
      [48.1975, 16.3640], [48.1961, 16.3615], [48.1945, 16.3580],
      [48.1932, 16.3555], [48.1920, 16.3530], [48.1910, 16.3490],
      [48.1902, 16.3460], [48.1897, 16.3440], [48.1890, 16.3400],
      [48.1885, 16.3370], [48.1881, 16.3352], [48.1878, 16.3320],
      [48.1875, 16.3285], [48.1875, 16.3265], [48.1876, 16.3235],
      [48.1878, 16.3205], [48.1880, 16.3180], [48.1881, 16.3145],
      [48.1882, 16.3105], [48.1883, 16.3060], [48.1885, 16.3030],
      [48.1888, 16.2995], [48.1892, 16.2970], [48.1895, 16.2955],
      [48.1902, 16.2915], [48.1910, 16.2885], [48.1917, 16.2855],
      [48.1922, 16.2810], [48.1925, 16.2760], [48.1932, 16.2720],
      [48.1942, 16.2680], [48.1952, 16.2645], [48.1962, 16.2625],
      [48.1972, 16.2612]
    ],
    U6: [
      [48.2562, 16.4005], [48.2540, 16.3990], [48.2515, 16.3970],
      [48.2500, 16.3950], [48.2465, 16.3915], [48.2440, 16.3885],
      [48.2415, 16.3854], [48.2390, 16.3822], [48.2370, 16.3795],
      [48.2350, 16.3770], [48.2330, 16.3748], [48.2310, 16.3728],
      [48.2305, 16.3705], [48.2295, 16.3668], [48.2285, 16.3622],
      [48.2282, 16.3580], [48.2285, 16.3535], [48.2265, 16.3515],
      [48.2242, 16.3495], [48.2220, 16.3475], [48.2195, 16.3458],
      [48.2178, 16.3445], [48.2165, 16.3440], [48.2142, 16.3432],
      [48.2115, 16.3420], [48.2090, 16.3412], [48.2065, 16.3405],
      [48.2035, 16.3400], [48.2010, 16.3398], [48.1967, 16.3392],
      [48.1945, 16.3388], [48.1928, 16.3382], [48.1915, 16.3378],
      [48.1895, 16.3362], [48.1881, 16.3352], [48.1860, 16.3350],
      [48.1838, 16.3345], [48.1820, 16.3340], [48.1795, 16.3340],
      [48.1768, 16.3339], [48.1743, 16.3339], [48.1715, 16.3320],
      [48.1692, 16.3300], [48.1670, 16.3280], [48.1645, 16.3258],
      [48.1620, 16.3235], [48.1600, 16.3220], [48.1568, 16.3195],
      [48.1545, 16.3175], [48.1523, 16.3157], [48.1495, 16.3135],
      [48.1470, 16.3115], [48.1450, 16.3100], [48.1422, 16.3088],
      [48.1398, 16.3078], [48.1380, 16.3070], [48.1350, 16.3058],
      [48.1325, 16.3042], [48.1300, 16.3030], [48.1275, 16.3015],
      [48.1250, 16.3000]
    ],
    S1: [
      [48.2562, 16.4005], [48.2535, 16.3979], [48.2500, 16.3938],
      [48.2465, 16.3905], [48.2440, 16.3878], [48.2415, 16.3854],
      [48.2388, 16.3835], [48.2350, 16.3810], [48.2320, 16.3825],
      [48.2275, 16.3855], [48.2238, 16.3890], [48.2215, 16.3910],
      [48.2197, 16.3923], [48.2162, 16.3905], [48.2120, 16.3875],
      [48.2088, 16.3850], [48.2062, 16.3841], [48.2025, 16.3828],
      [48.1990, 16.3812], [48.1960, 16.3800], [48.1925, 16.3780],
      [48.1888, 16.3755], [48.1851, 16.3732], [48.1830, 16.3715],
      [48.1810, 16.3690], [48.1785, 16.3610], [48.1765, 16.3500],
      [48.1743, 16.3339], [48.1730, 16.3275], [48.1710, 16.3215],
      [48.1680, 16.3160], [48.1645, 16.3120], [48.1605, 16.3090],
      [48.1560, 16.3048], [48.1510, 16.2995], [48.1460, 16.2958],
      [48.1405, 16.2900], [48.1348, 16.2828]
    ],
    S2: [
      [48.2562, 16.4005], [48.2535, 16.3979], [48.2500, 16.3938],
      [48.2465, 16.3905], [48.2440, 16.3878], [48.2415, 16.3854],
      [48.2388, 16.3835], [48.2350, 16.3810], [48.2320, 16.3825],
      [48.2275, 16.3855], [48.2238, 16.3890], [48.2215, 16.3910],
      [48.2197, 16.3923], [48.2162, 16.3905], [48.2120, 16.3875],
      [48.2088, 16.3850], [48.2062, 16.3841], [48.2025, 16.3828],
      [48.1990, 16.3812], [48.1960, 16.3800], [48.1925, 16.3780],
      [48.1888, 16.3755], [48.1851, 16.3732], [48.1830, 16.3715],
      [48.1810, 16.3690], [48.1785, 16.3610], [48.1765, 16.3500],
      [48.1743, 16.3339], [48.1730, 16.3275], [48.1710, 16.3215],
      [48.1680, 16.3160], [48.1645, 16.3120], [48.1605, 16.3090],
      [48.1580, 16.3040], [48.1535, 16.3010], [48.1480, 16.2960],
      [48.1415, 16.2895], [48.1348, 16.2828]
    ],
    S3: [
      [48.2562, 16.4005], [48.2535, 16.3979], [48.2500, 16.3938],
      [48.2465, 16.3905], [48.2440, 16.3878], [48.2415, 16.3854],
      [48.2388, 16.3835], [48.2350, 16.3810], [48.2320, 16.3825],
      [48.2275, 16.3855], [48.2238, 16.3890], [48.2215, 16.3910],
      [48.2197, 16.3923], [48.2162, 16.3905], [48.2120, 16.3875],
      [48.2088, 16.3850], [48.2062, 16.3841], [48.2025, 16.3828],
      [48.1990, 16.3812], [48.1960, 16.3800], [48.1925, 16.3780],
      [48.1888, 16.3755], [48.1851, 16.3732], [48.1830, 16.3715],
      [48.1810, 16.3690], [48.1785, 16.3610], [48.1765, 16.3500],
      [48.1743, 16.3339], [48.1730, 16.3275], [48.1710, 16.3215],
      [48.1680, 16.3160], [48.1645, 16.3120], [48.1605, 16.3090],
      [48.1560, 16.3048], [48.1520, 16.3005], [48.1480, 16.2965],
      [48.1425, 16.2910], [48.1355, 16.2840]
    ],
    S4: [
      [48.2562, 16.4005], [48.2535, 16.3979], [48.2500, 16.3938],
      [48.2465, 16.3905], [48.2440, 16.3878], [48.2430, 16.3870],
      [48.2415, 16.3854], [48.2388, 16.3835], [48.2350, 16.3810],
      [48.2310, 16.3805], [48.2265, 16.3800], [48.2210, 16.3788],
      [48.2160, 16.3765], [48.2110, 16.3750], [48.2068, 16.3740],
      [48.2020, 16.3730], [48.1980, 16.3725], [48.1935, 16.3728],
      [48.1892, 16.3730], [48.1851, 16.3732], [48.1830, 16.3715],
      [48.1810, 16.3690], [48.1785, 16.3610], [48.1765, 16.3500],
      [48.1743, 16.3339], [48.1730, 16.3275], [48.1710, 16.3215],
      [48.1680, 16.3160], [48.1645, 16.3120], [48.1605, 16.3090],
      [48.1580, 16.3040], [48.1535, 16.3010], [48.1480, 16.2960],
      [48.1415, 16.2895], [48.1348, 16.2828]
    ],
    S7: [
      [48.2562, 16.4005], [48.2535, 16.3979], [48.2500, 16.3938],
      [48.2465, 16.3905], [48.2440, 16.3878], [48.2415, 16.3854],
      [48.2388, 16.3835], [48.2350, 16.3810], [48.2320, 16.3825],
      [48.2275, 16.3855], [48.2238, 16.3890], [48.2215, 16.3910],
      [48.2197, 16.3923], [48.2162, 16.3905], [48.2120, 16.3875],
      [48.2088, 16.3850], [48.2062, 16.3841], [48.2035, 16.3830],
      [48.1995, 16.3815], [48.1960, 16.3800], [48.1935, 16.3840],
      [48.1915, 16.3885], [48.1890, 16.3950], [48.1860, 16.4005],
      [48.1830, 16.4055], [48.1800, 16.4100], [48.1765, 16.4142],
      [48.1735, 16.4175], [48.1705, 16.4208], [48.1660, 16.4260],
      [48.1623, 16.4320], [48.1570, 16.4500], [48.1540, 16.4585],
      [48.1510, 16.4675], [48.1480, 16.4780], [48.1440, 16.4880],
      [48.1395, 16.4990], [48.1350, 16.5100], [48.1285, 16.5260],
      [48.1240, 16.5355], [48.1200, 16.5450], [48.1160, 16.5530],
      [48.1130, 16.5615], [48.1103, 16.5697]
    ],
    S40: [
      [48.2261, 16.3603], [48.2280, 16.3610], [48.2300, 16.3615],
      [48.2320, 16.3625], [48.2345, 16.3630], [48.2370, 16.3635],
      [48.2395, 16.3640], [48.2420, 16.3645], [48.2445, 16.3650],
      [48.2470, 16.3655], [48.2486, 16.3659], [48.2505, 16.3680],
      [48.2525, 16.3720], [48.2538, 16.3770], [48.2545, 16.3825],
      [48.2552, 16.3890], [48.2558, 16.3950], [48.2562, 16.4005]
    ],
    S45: [
      [48.1972, 16.2612], [48.1990, 16.2680], [48.2010, 16.2755],
      [48.2025, 16.2805], [48.2040, 16.2850], [48.2058, 16.2910],
      [48.2080, 16.2980], [48.2092, 16.3040], [48.2102, 16.3085],
      [48.2109, 16.3117], [48.2130, 16.3122], [48.2152, 16.3128],
      [48.2170, 16.3135], [48.2190, 16.3140], [48.2208, 16.3145],
      [48.2220, 16.3150], [48.2231, 16.3155], [48.2245, 16.3170],
      [48.2258, 16.3185], [48.2270, 16.3200], [48.2282, 16.3215],
      [48.2295, 16.3230], [48.2307, 16.3245], [48.2325, 16.3295],
      [48.2345, 16.3355], [48.2358, 16.3400], [48.2370, 16.3450],
      [48.2392, 16.3485], [48.2415, 16.3515], [48.2430, 16.3535],
      [48.2440, 16.3550], [48.2455, 16.3578], [48.2470, 16.3615],
      [48.2482, 16.3640], [48.2486, 16.3659], [48.2470, 16.3700],
      [48.2448, 16.3755], [48.2428, 16.3800], [48.2415, 16.3854]
    ],
    S50: [
      [48.1967, 16.3392], [48.1955, 16.3340], [48.1940, 16.3275],
      [48.1928, 16.3220], [48.1915, 16.3160], [48.1905, 16.3115],
      [48.1898, 16.3070], [48.1892, 16.3020], [48.1888, 16.2960],
      [48.1895, 16.2890], [48.1908, 16.2840], [48.1918, 16.2790],
      [48.1925, 16.2760], [48.1945, 16.2710], [48.1970, 16.2640],
      [48.1972, 16.2612]
    ],
    S80: [
      [48.1743, 16.3339], [48.1760, 16.3300], [48.1780, 16.3265],
      [48.1795, 16.3220], [48.1810, 16.3185], [48.1825, 16.3155],
      [48.1838, 16.3120], [48.1850, 16.3085], [48.1862, 16.3055],
      [48.1870, 16.3020], [48.1875, 16.2985], [48.1880, 16.2945],
      [48.1882, 16.2900], [48.1890, 16.2850], [48.1905, 16.2820],
      [48.1915, 16.2790], [48.1920, 16.2765], [48.1928, 16.2720],
      [48.1940, 16.2675], [48.1955, 16.2635], [48.1972, 16.2612]
    ]
  };

  const TRAM_CORRIDORS = [
    {
      label: "Ring (1,2,D,71)",
      color: "#E91E63",
      coords: [
        [48.2003, 16.3698], [48.2015, 16.3660], [48.2020, 16.3635],
        [48.2032, 16.3610], [48.2042, 16.3595], [48.2052, 16.3582],
        [48.2065, 16.3565], [48.2080, 16.3550], [48.2090, 16.3548],
        [48.2105, 16.3547], [48.2115, 16.3560], [48.2125, 16.3580],
        [48.2135, 16.3600], [48.2142, 16.3618], [48.2147, 16.3625],
        [48.2145, 16.3650], [48.2142, 16.3675], [48.2140, 16.3698],
        [48.2132, 16.3720], [48.2125, 16.3740], [48.2120, 16.3760],
        [48.2112, 16.3770], [48.2107, 16.3778], [48.2095, 16.3795],
        [48.2088, 16.3805], [48.2080, 16.3815], [48.2070, 16.3828],
        [48.2062, 16.3841], [48.2050, 16.3820], [48.2045, 16.3800],
        [48.2038, 16.3780], [48.2028, 16.3760], [48.2017, 16.3740],
        [48.2010, 16.3720], [48.2003, 16.3698]
      ]
    },
    {
      label: "D (Hbf → Nußdorf)",
      color: "#43A047",
      coords: [
        [48.1851, 16.3732], [48.1865, 16.3730], [48.1880, 16.3728],
        [48.1887, 16.3725], [48.1910, 16.3718], [48.1917, 16.3715],
        [48.1935, 16.3712], [48.1955, 16.3710], [48.1970, 16.3708],
        [48.1985, 16.3705], [48.2003, 16.3698], [48.2015, 16.3675],
        [48.2025, 16.3650], [48.2035, 16.3638], [48.2045, 16.3622],
        [48.2052, 16.3582], [48.2070, 16.3565], [48.2080, 16.3550],
        [48.2088, 16.3550], [48.2105, 16.3547], [48.2120, 16.3568],
        [48.2132, 16.3592], [48.2142, 16.3610], [48.2147, 16.3625],
        [48.2158, 16.3612], [48.2170, 16.3600], [48.2185, 16.3588],
        [48.2198, 16.3578], [48.2210, 16.3568], [48.2220, 16.3575],
        [48.2235, 16.3588], [48.2248, 16.3598], [48.2261, 16.3603],
        [48.2285, 16.3610], [48.2310, 16.3620], [48.2330, 16.3625],
        [48.2350, 16.3628], [48.2370, 16.3630], [48.2395, 16.3635],
        [48.2420, 16.3640], [48.2445, 16.3650], [48.2470, 16.3655],
        [48.2486, 16.3659], [48.2500, 16.3670], [48.2510, 16.3685]
      ]
    },
    {
      label: "O (Raxstr → Praterstern)",
      color: "#1E88E5",
      coords: [
        [48.1745, 16.3783], [48.1765, 16.3775], [48.1785, 16.3765],
        [48.1800, 16.3760], [48.1820, 16.3750], [48.1835, 16.3740],
        [48.1851, 16.3732], [48.1872, 16.3725], [48.1895, 16.3720],
        [48.1917, 16.3715], [48.1940, 16.3710], [48.1965, 16.3705],
        [48.1988, 16.3700], [48.2003, 16.3698], [48.2020, 16.3668],
        [48.2030, 16.3640], [48.2040, 16.3610], [48.2052, 16.3582],
        [48.2065, 16.3610], [48.2078, 16.3645], [48.2088, 16.3670],
        [48.2100, 16.3700], [48.2110, 16.3728], [48.2120, 16.3760],
        [48.2130, 16.3780], [48.2140, 16.3795], [48.2150, 16.3805],
        [48.2160, 16.3825], [48.2170, 16.3845], [48.2180, 16.3860],
        [48.2188, 16.3885], [48.2192, 16.3905], [48.2197, 16.3923]
      ]
    },
    {
      label: "2 (Friedrich-Engels-Pl → Dornbach)",
      color: "#FB8C00",
      coords: [
        [48.2197, 16.3923], [48.2185, 16.3910], [48.2172, 16.3900],
        [48.2160, 16.3880], [48.2148, 16.3845], [48.2135, 16.3800],
        [48.2120, 16.3760], [48.2115, 16.3730], [48.2108, 16.3690],
        [48.2105, 16.3645], [48.2105, 16.3598], [48.2105, 16.3547],
        [48.2110, 16.3525], [48.2118, 16.3505], [48.2125, 16.3480],
        [48.2135, 16.3460], [48.2148, 16.3440], [48.2160, 16.3420],
        [48.2175, 16.3400], [48.2188, 16.3380], [48.2195, 16.3365],
        [48.2210, 16.3335], [48.2220, 16.3290], [48.2228, 16.3245],
        [48.2230, 16.3200], [48.2231, 16.3155], [48.2235, 16.3110]
      ]
    },
    {
      label: "5 (Praterstern → Westbf)",
      color: "#8E24AA",
      coords: [
        [48.2197, 16.3923], [48.2180, 16.3910], [48.2168, 16.3895],
        [48.2150, 16.3880], [48.2135, 16.3850], [48.2122, 16.3810],
        [48.2112, 16.3792], [48.2107, 16.3778], [48.2090, 16.3795],
        [48.2078, 16.3812], [48.2068, 16.3828], [48.2062, 16.3841],
        [48.2050, 16.3810], [48.2040, 16.3780], [48.2035, 16.3740],
        [48.2030, 16.3700], [48.2022, 16.3660], [48.2015, 16.3610],
        [48.2010, 16.3575], [48.2005, 16.3540], [48.2000, 16.3500],
        [48.1990, 16.3465], [48.1985, 16.3440], [48.1975, 16.3410],
        [48.1967, 16.3392]
      ]
    },
    {
      label: "6/18",
      color: "#FBC02D",
      coords: [
        [48.2062, 16.3841], [48.2050, 16.3810], [48.2040, 16.3780],
        [48.2035, 16.3740], [48.2030, 16.3700], [48.2015, 16.3702],
        [48.2003, 16.3698], [48.1995, 16.3675], [48.1982, 16.3620],
        [48.1975, 16.3580], [48.1970, 16.3550], [48.1967, 16.3392],
        [48.1980, 16.3372], [48.1993, 16.3355], [48.2000, 16.3340],
        [48.2012, 16.3320], [48.2025, 16.3300], [48.2035, 16.3290],
        [48.2042, 16.3275], [48.2055, 16.3250], [48.2060, 16.3225],
        [48.2065, 16.3200], [48.2075, 16.3180], [48.2085, 16.3160],
        [48.2095, 16.3140], [48.2109, 16.3117]
      ]
    },
    {
      label: "9 (Westbf → Gersthof)",
      color: "#00ACC1",
      coords: [
        [48.1967, 16.3392], [48.1980, 16.3372], [48.1993, 16.3355],
        [48.2000, 16.3340], [48.2012, 16.3320], [48.2025, 16.3300],
        [48.2035, 16.3290], [48.2042, 16.3275], [48.2055, 16.3250],
        [48.2060, 16.3225], [48.2065, 16.3200], [48.2075, 16.3180],
        [48.2085, 16.3160], [48.2095, 16.3140], [48.2109, 16.3117],
        [48.2125, 16.3120], [48.2135, 16.3122], [48.2148, 16.3125],
        [48.2160, 16.3128], [48.2172, 16.3130], [48.2182, 16.3132],
        [48.2190, 16.3135], [48.2202, 16.3140], [48.2212, 16.3145],
        [48.2222, 16.3150], [48.2231, 16.3155], [48.2242, 16.3162],
        [48.2252, 16.3168], [48.2260, 16.3170], [48.2272, 16.3182],
        [48.2282, 16.3198], [48.2290, 16.3210], [48.2298, 16.3225],
        [48.2303, 16.3238], [48.2307, 16.3245]
      ]
    },
    {
      label: "38 (Schottentor → Grinzing)",
      color: "#FF7043",
      coords: [
        [48.2147, 16.3625], [48.2158, 16.3612], [48.2170, 16.3600],
        [48.2185, 16.3588], [48.2198, 16.3578], [48.2210, 16.3568],
        [48.2220, 16.3575], [48.2235, 16.3588], [48.2248, 16.3598],
        [48.2261, 16.3603], [48.2275, 16.3598], [48.2290, 16.3590],
        [48.2305, 16.3585], [48.2320, 16.3570], [48.2340, 16.3555],
        [48.2355, 16.3540], [48.2375, 16.3525], [48.2390, 16.3510],
        [48.2405, 16.3500], [48.2420, 16.3485], [48.2430, 16.3470],
        [48.2440, 16.3450], [48.2450, 16.3440], [48.2460, 16.3430]
      ]
    },
    {
      label: "41 (Schottentor → Pötzleinsdorf)",
      color: "#3949AB",
      coords: [
        [48.2147, 16.3625], [48.2152, 16.3605], [48.2158, 16.3585],
        [48.2165, 16.3560], [48.2172, 16.3530], [48.2178, 16.3500],
        [48.2185, 16.3460], [48.2190, 16.3425], [48.2195, 16.3390],
        [48.2200, 16.3360], [48.2205, 16.3330], [48.2210, 16.3295],
        [48.2215, 16.3270], [48.2220, 16.3240], [48.2228, 16.3210],
        [48.2235, 16.3180], [48.2242, 16.3150], [48.2250, 16.3125],
        [48.2262, 16.3145], [48.2275, 16.3180], [48.2288, 16.3210],
        [48.2300, 16.3230], [48.2307, 16.3245]
      ]
    },
    {
      label: "43 (Schottentor → Neuwaldegg)",
      color: "#2E7D32",
      coords: [
        [48.2147, 16.3625], [48.2152, 16.3605], [48.2158, 16.3585],
        [48.2165, 16.3560], [48.2172, 16.3530], [48.2178, 16.3500],
        [48.2185, 16.3460], [48.2190, 16.3425], [48.2195, 16.3390],
        [48.2200, 16.3360], [48.2205, 16.3330], [48.2210, 16.3295],
        [48.2215, 16.3270], [48.2220, 16.3240], [48.2225, 16.3205],
        [48.2230, 16.3185], [48.2235, 16.3170], [48.2245, 16.3165],
        [48.2255, 16.3168], [48.2260, 16.3170], [48.2272, 16.3182],
        [48.2282, 16.3198], [48.2290, 16.3210], [48.2298, 16.3225],
        [48.2303, 16.3238], [48.2307, 16.3245], [48.2315, 16.3260]
      ]
    },
    {
      label: "44 (Schottentor → Ottakring)",
      color: "#EC407A",
      coords: [
        [48.2147, 16.3625], [48.2152, 16.3605], [48.2158, 16.3585],
        [48.2165, 16.3560], [48.2172, 16.3530], [48.2178, 16.3500],
        [48.2185, 16.3460], [48.2190, 16.3425], [48.2195, 16.3390],
        [48.2200, 16.3360], [48.2205, 16.3330], [48.2210, 16.3295],
        [48.2215, 16.3270], [48.2220, 16.3240], [48.2225, 16.3205],
        [48.2230, 16.3185], [48.2231, 16.3155], [48.2222, 16.3150],
        [48.2212, 16.3145], [48.2202, 16.3140], [48.2190, 16.3135],
        [48.2172, 16.3130], [48.2160, 16.3128], [48.2148, 16.3125],
        [48.2135, 16.3122], [48.2125, 16.3120], [48.2109, 16.3117]
      ]
    },
    {
      label: "WLB (Baden line)",
      color: "#5D4037",
      coords: [
        [48.1972, 16.2612], [48.1965, 16.2645], [48.1958, 16.2680],
        [48.1950, 16.2720], [48.1942, 16.2760], [48.1932, 16.2800],
        [48.1925, 16.2835], [48.1920, 16.2850], [48.1910, 16.2895],
        [48.1902, 16.2935], [48.1895, 16.2975], [48.1888, 16.3010],
        [48.1883, 16.3039], [48.1878, 16.3075], [48.1870, 16.3110],
        [48.1858, 16.3140], [48.1850, 16.3160], [48.1835, 16.3188],
        [48.1820, 16.3215], [48.1805, 16.3240], [48.1790, 16.3265],
        [48.1770, 16.3295], [48.1755, 16.3320], [48.1743, 16.3339],
        [48.1720, 16.3320], [48.1700, 16.3310], [48.1685, 16.3295],
        [48.1670, 16.3280], [48.1648, 16.3260], [48.1625, 16.3240],
        [48.1600, 16.3220], [48.1578, 16.3200], [48.1550, 16.3180],
        [48.1523, 16.3157]
      ]
    },
    {
      label: "West corridor",
      color: "#455A64",
      coords: [
        [48.1883, 16.3039], [48.1888, 16.3065], [48.1892, 16.3090],
        [48.1900, 16.3120], [48.1908, 16.3150], [48.1915, 16.3178],
        [48.1922, 16.3205], [48.1930, 16.3235], [48.1938, 16.3265],
        [48.1945, 16.3295], [48.1952, 16.3330], [48.1960, 16.3360],
        [48.1967, 16.3392]
      ]
    },
    {
      label: "North link",
      color: "#FF8F00",
      coords: [
        [48.2486, 16.3659], [48.2495, 16.3705], [48.2505, 16.3750],
        [48.2515, 16.3795], [48.2520, 16.3820], [48.2535, 16.3880],
        [48.2550, 16.3940], [48.2562, 16.4005], [48.2540, 16.3990],
        [48.2520, 16.3968], [48.2505, 16.3945], [48.2490, 16.3930],
        [48.2475, 16.3910], [48.2455, 16.3885], [48.2438, 16.3870],
        [48.2415, 16.3854]
      ]
    },
    {
      label: "South link",
      color: "#5C6BC0",
      coords: [
        [48.1745, 16.3783], [48.1760, 16.3778], [48.1775, 16.3772],
        [48.1792, 16.3768], [48.1810, 16.3758], [48.1828, 16.3745],
        [48.1840, 16.3738], [48.1851, 16.3732], [48.1872, 16.3725],
        [48.1895, 16.3720], [48.1917, 16.3715], [48.1940, 16.3710],
        [48.1965, 16.3705], [48.1988, 16.3700], [48.2003, 16.3698]
      ]
    },
    {
      label: "71 (Zentralfriedhof → Schottenring)",
      color: "#D32F2F",
      coords: [
        [48.1520, 16.4300], [48.1545, 16.4280], [48.1570, 16.4260],
        [48.1595, 16.4240], [48.1625, 16.4220], [48.1655, 16.4220],
        [48.1680, 16.4210], [48.1705, 16.4208], [48.1735, 16.4190],
        [48.1758, 16.4180], [48.1775, 16.4175], [48.1792, 16.4168],
        [48.1815, 16.4160], [48.1835, 16.4150], [48.1855, 16.4140],
        [48.1875, 16.4125], [48.1892, 16.4110], [48.1915, 16.4085],
        [48.1935, 16.4060], [48.1955, 16.4025], [48.1975, 16.3990],
        [48.1995, 16.3955], [48.2015, 16.3925], [48.2035, 16.3890],
        [48.2050, 16.3865], [48.2062, 16.3841], [48.2078, 16.3820],
        [48.2092, 16.3795], [48.2105, 16.3775], [48.2120, 16.3760],
        [48.2130, 16.3730], [48.2140, 16.3698], [48.2147, 16.3625],
        [48.2152, 16.3648], [48.2158, 16.3675], [48.2164, 16.3700],
        [48.2170, 16.3730], [48.2175, 16.3758], [48.2180, 16.3785],
        [48.2183, 16.3805], [48.2188, 16.3830], [48.2193, 16.3860]
      ]
    },
    {
      label: "11 (Floridsdorf → Prater)",
      color: "#FF8A65",
      coords: [
        [48.2562, 16.4005], [48.2540, 16.3990], [48.2515, 16.3970],
        [48.2495, 16.3955], [48.2465, 16.3915], [48.2440, 16.3885],
        [48.2415, 16.3854], [48.2390, 16.3820], [48.2370, 16.3790],
        [48.2350, 16.3765], [48.2335, 16.3740], [48.2315, 16.3700],
        [48.2290, 16.3665], [48.2260, 16.3635], [48.2240, 16.3615],
        [48.2215, 16.3585], [48.2190, 16.3565], [48.2172, 16.3552],
        [48.2155, 16.3545], [48.2142, 16.3548], [48.2125, 16.3560],
        [48.2110, 16.3580], [48.2095, 16.3600], [48.2078, 16.3625],
        [48.2062, 16.3655], [48.2048, 16.3690], [48.2030, 16.3725],
        [48.2010, 16.3760], [48.1990, 16.3795], [48.1970, 16.3825],
        [48.1948, 16.3845], [48.1930, 16.3860], [48.1912, 16.3880]
      ]
    },
    {
      label: "26 (Kagran → Strebersdorf)",
      color: "#00BFA5",
      coords: [
        [48.2430, 16.4270], [48.2445, 16.4240], [48.2460, 16.4210],
        [48.2475, 16.4180], [48.2495, 16.4150], [48.2515, 16.4120],
        [48.2530, 16.4090], [48.2545, 16.4055], [48.2558, 16.4030],
        [48.2562, 16.4005], [48.2570, 16.3975], [48.2575, 16.3940],
        [48.2580, 16.3905], [48.2590, 16.3870], [48.2605, 16.3835],
        [48.2625, 16.3800], [48.2645, 16.3775], [48.2660, 16.3760]
      ]
    },
    {
      label: "10 (Dornbach → Hietzing)",
      color: "#F44336",
      coords: [
        [48.2285, 16.2850], [48.2265, 16.2885], [48.2240, 16.2925],
        [48.2215, 16.2960], [48.2195, 16.2990], [48.2170, 16.3010],
        [48.2145, 16.3035], [48.2120, 16.3055], [48.2095, 16.3070],
        [48.2068, 16.3082], [48.2040, 16.3088], [48.2015, 16.3080],
        [48.1990, 16.3070], [48.1970, 16.3055], [48.1945, 16.3045],
        [48.1920, 16.3040], [48.1902, 16.3038], [48.1883, 16.3039],
        [48.1875, 16.3010], [48.1870, 16.2975], [48.1868, 16.2945]
      ]
    },
    {
      label: "25 (Floridsdorf → Kagran)",
      color: "#2196F3",
      coords: [
        [48.2562, 16.4005], [48.2545, 16.4030], [48.2530, 16.4058],
        [48.2515, 16.4085], [48.2500, 16.4112], [48.2485, 16.4140],
        [48.2472, 16.4168], [48.2460, 16.4198], [48.2450, 16.4215],
        [48.2440, 16.4240], [48.2430, 16.4270], [48.2418, 16.4295],
        [48.2408, 16.4320]
      ]
    },
    {
      label: "30 (Floridsdorf → Stammersdorf)",
      color: "#4CAF50",
      coords: [
        [48.2562, 16.4005], [48.2585, 16.4010], [48.2610, 16.4015],
        [48.2638, 16.4018], [48.2668, 16.4022], [48.2700, 16.4028],
        [48.2735, 16.4035], [48.2770, 16.4048], [48.2805, 16.4058],
        [48.2840, 16.4065], [48.2875, 16.4070], [48.2910, 16.4075],
        [48.2945, 16.4080], [48.2980, 16.4088], [48.3015, 16.4095],
        [48.3050, 16.4102], [48.3080, 16.4108], [48.3106, 16.4111]
      ]
    },
    {
      label: "31 (Stammersdorf → Schottenring)",
      color: "#FF5722",
      coords: [
        [48.3106, 16.4111], [48.3070, 16.4105], [48.3035, 16.4100],
        [48.3000, 16.4095], [48.2965, 16.4090], [48.2930, 16.4085],
        [48.2890, 16.4080], [48.2850, 16.4072], [48.2810, 16.4062],
        [48.2770, 16.4048], [48.2735, 16.4035], [48.2700, 16.4028],
        [48.2668, 16.4022], [48.2638, 16.4018], [48.2610, 16.4015],
        [48.2585, 16.4010], [48.2562, 16.4005], [48.2540, 16.3990],
        [48.2510, 16.3965], [48.2485, 16.3940], [48.2458, 16.3915],
        [48.2435, 16.3895], [48.2415, 16.3854], [48.2390, 16.3822],
        [48.2365, 16.3800], [48.2340, 16.3785], [48.2315, 16.3790],
        [48.2285, 16.3810], [48.2255, 16.3830], [48.2230, 16.3840],
        [48.2210, 16.3848], [48.2193, 16.3860]
      ]
    },
    {
      label: "33 (Josefstädter Str → Friedrich-Engels-Pl)",
      color: "#9C27B0",
      coords: [
        [48.2105, 16.3400], [48.2110, 16.3425], [48.2118, 16.3450],
        [48.2125, 16.3475], [48.2132, 16.3500], [48.2140, 16.3525],
        [48.2148, 16.3550], [48.2155, 16.3575], [48.2162, 16.3600],
        [48.2168, 16.3625], [48.2175, 16.3650], [48.2185, 16.3675],
        [48.2195, 16.3700], [48.2210, 16.3725], [48.2225, 16.3745],
        [48.2240, 16.3765], [48.2255, 16.3785], [48.2270, 16.3800],
        [48.2288, 16.3815], [48.2308, 16.3822], [48.2328, 16.3825],
        [48.2348, 16.3830], [48.2368, 16.3835], [48.2388, 16.3835]
      ]
    },
    {
      label: "37 (Hohe Warte → Schottentor)",
      color: "#009688",
      coords: [
        [48.2505, 16.3590], [48.2485, 16.3590], [48.2465, 16.3592],
        [48.2445, 16.3595], [48.2425, 16.3598], [48.2405, 16.3600],
        [48.2382, 16.3602], [48.2358, 16.3605], [48.2335, 16.3610],
        [48.2310, 16.3610], [48.2285, 16.3610], [48.2261, 16.3603],
        [48.2240, 16.3605], [48.2220, 16.3610], [48.2200, 16.3615],
        [48.2180, 16.3620], [48.2165, 16.3625], [48.2152, 16.3625],
        [48.2147, 16.3625]
      ]
    },
    {
      label: "40 (Schottentor → Herbeckstraße)",
      color: "#795548",
      coords: [
        [48.2147, 16.3625], [48.2160, 16.3622], [48.2175, 16.3618],
        [48.2190, 16.3612], [48.2202, 16.3608], [48.2215, 16.3615],
        [48.2230, 16.3625], [48.2248, 16.3630], [48.2265, 16.3618],
        [48.2280, 16.3600], [48.2292, 16.3575], [48.2300, 16.3550],
        [48.2308, 16.3520], [48.2312, 16.3500], [48.2310, 16.3475],
        [48.2312, 16.3450], [48.2315, 16.3420]
      ]
    },
    {
      label: "42 (Schottentor → Antonigasse)",
      color: "#607D8B",
      coords: [
        [48.2147, 16.3625], [48.2160, 16.3622], [48.2175, 16.3618],
        [48.2190, 16.3612], [48.2202, 16.3608], [48.2215, 16.3615],
        [48.2230, 16.3625], [48.2248, 16.3630], [48.2262, 16.3610],
        [48.2268, 16.3585], [48.2272, 16.3560], [48.2275, 16.3535],
        [48.2278, 16.3505], [48.2280, 16.3475], [48.2282, 16.3445],
        [48.2282, 16.3415], [48.2280, 16.3385], [48.2280, 16.3360]
      ]
    },
    {
      label: "46 (Ring → Joachimsthalerplatz)",
      color: "#AD1457",
      coords: [
        [48.2052, 16.3582], [48.2045, 16.3555], [48.2040, 16.3535],
        [48.2035, 16.3510], [48.2035, 16.3485], [48.2038, 16.3460],
        [48.2045, 16.3435], [48.2055, 16.3410], [48.2068, 16.3385],
        [48.2082, 16.3360], [48.2095, 16.3338], [48.2110, 16.3315],
        [48.2122, 16.3292], [48.2135, 16.3270], [48.2148, 16.3252],
        [48.2160, 16.3240], [48.2175, 16.3230]
      ]
    },
    {
      label: "49 (Ring → Hütteldorf)",
      color: "#3F51B5",
      coords: [
        [48.2105, 16.3547], [48.2095, 16.3525], [48.2085, 16.3500],
        [48.2080, 16.3475], [48.2075, 16.3450], [48.2070, 16.3425],
        [48.2065, 16.3400], [48.2058, 16.3370], [48.2050, 16.3340],
        [48.2040, 16.3310], [48.2030, 16.3280], [48.2020, 16.3245],
        [48.2015, 16.3210], [48.2012, 16.3175], [48.2010, 16.3140],
        [48.2005, 16.3105], [48.2002, 16.3070], [48.1998, 16.3035],
        [48.1995, 16.3000], [48.1992, 16.2965], [48.1990, 16.2930],
        [48.1985, 16.2885], [48.1982, 16.2840], [48.1978, 16.2790],
        [48.1975, 16.2740], [48.1973, 16.2690], [48.1972, 16.2612]
      ]
    },
    {
      label: "52 (Westbf → Baumgarten)",
      color: "#CDDC39",
      coords: [
        [48.1967, 16.3392], [48.1965, 16.3360], [48.1965, 16.3330],
        [48.1965, 16.3300], [48.1968, 16.3270], [48.1972, 16.3240],
        [48.1975, 16.3210], [48.1978, 16.3180], [48.1982, 16.3145],
        [48.1985, 16.3110], [48.1988, 16.3075], [48.1992, 16.3040],
        [48.1995, 16.3005], [48.1998, 16.2975], [48.2002, 16.2950]
      ]
    },
    {
      label: "60 (Hietzing → Rodaun)",
      color: "#8BC34A",
      coords: [
        [48.1883, 16.3039], [48.1865, 16.3040], [48.1845, 16.3040],
        [48.1822, 16.3035], [48.1800, 16.3030], [48.1775, 16.3025],
        [48.1750, 16.3018], [48.1725, 16.3012], [48.1700, 16.3005],
        [48.1675, 16.2998], [48.1650, 16.2992], [48.1625, 16.2985],
        [48.1600, 16.2975], [48.1575, 16.2960], [48.1550, 16.2945],
        [48.1528, 16.2928], [48.1505, 16.2910], [48.1480, 16.2895],
        [48.1455, 16.2880], [48.1430, 16.2865], [48.1405, 16.2850],
        [48.1380, 16.2840], [48.1358, 16.2832], [48.1348, 16.2828]
      ]
    },
    {
      label: "62 (Oper → Lainz)",
      color: "#FFC107",
      coords: [
        [48.2003, 16.3698], [48.1990, 16.3680], [48.1975, 16.3655],
        [48.1968, 16.3630], [48.1962, 16.3605], [48.1958, 16.3580],
        [48.1955, 16.3555], [48.1952, 16.3528], [48.1950, 16.3500],
        [48.1945, 16.3470], [48.1940, 16.3440], [48.1935, 16.3412],
        [48.1930, 16.3385], [48.1925, 16.3355], [48.1920, 16.3325],
        [48.1912, 16.3295], [48.1902, 16.3270], [48.1890, 16.3245],
        [48.1875, 16.3220], [48.1860, 16.3195], [48.1845, 16.3170],
        [48.1830, 16.3145], [48.1815, 16.3120], [48.1800, 16.3095],
        [48.1785, 16.3068], [48.1772, 16.3038], [48.1762, 16.3005],
        [48.1755, 16.2970], [48.1750, 16.2935], [48.1750, 16.2900]
      ]
    },
    {
      label: "67 (Reumannplatz → Otto-Probst-Pl)",
      color: "#E040FB",
      coords: [
        [48.1745, 16.3783], [48.1725, 16.3780], [48.1705, 16.3775],
        [48.1685, 16.3768], [48.1665, 16.3758], [48.1642, 16.3748],
        [48.1620, 16.3738], [48.1600, 16.3722], [48.1580, 16.3705],
        [48.1562, 16.3685], [48.1548, 16.3662], [48.1532, 16.3640],
        [48.1520, 16.3618], [48.1508, 16.3595], [48.1495, 16.3575],
        [48.1482, 16.3560], [48.1470, 16.3550], [48.1460, 16.3550],
        [48.1450, 16.3550]
      ]
    }
  ];
