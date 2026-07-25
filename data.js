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
