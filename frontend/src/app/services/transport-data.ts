// Transport line data ported from the reference app.js / data.js

export const LINE_STYLES: Record<string, { color: string; label: string; mode: string }> = {
  U1: { color: '#E6332A', label: 'U1', mode: 'ubahn' },
  U2: { color: '#A05EB5', label: 'U2', mode: 'ubahn' },
  U3: { color: '#F6821F', label: 'U3', mode: 'ubahn' },
  U4: { color: '#008E5A', label: 'U4', mode: 'ubahn' },
  U6: { color: '#825A2D', label: 'U6', mode: 'ubahn' },
  S1: { color: '#1E88E5', label: 'S1', mode: 'sbahn' },
  S2: { color: '#00ACC1', label: 'S2', mode: 'sbahn' },
  S3: { color: '#00897B', label: 'S3', mode: 'sbahn' },
  S4: { color: '#558B2F', label: 'S4', mode: 'sbahn' },
  S7: { color: '#F9A825', label: 'S7', mode: 'sbahn' },
  S40: { color: '#546E7A', label: 'S40', mode: 'sbahn' },
  S45: { color: '#8E24AA', label: 'S45', mode: 'sbahn' },
  S50: { color: '#00529B', label: 'S50', mode: 'sbahn' },
  S80: { color: '#00529B', label: 'S80', mode: 'sbahn' }
};

export const LINE_ROUTES: Record<string, [number, number][]> = {
  U1: [[48.2710,16.4120],[48.2685,16.4118],[48.2658,16.4130],[48.2640,16.4150],[48.2615,16.4162],[48.2590,16.4180],[48.2570,16.4208],[48.2553,16.4235],[48.2530,16.4255],[48.2505,16.4278],[48.2480,16.4290],[48.2458,16.4285],[48.2430,16.4270],[48.2400,16.4248],[48.2375,16.4225],[48.2348,16.4195],[48.2321,16.4159],[48.2295,16.4125],[48.2270,16.4088],[48.2255,16.4048],[48.2238,16.4005],[48.2220,16.3978],[48.2205,16.3948],[48.2197,16.3923],[48.2190,16.3892],[48.2184,16.3865],[48.2179,16.3836],[48.2173,16.3810],[48.2162,16.3792],[48.2152,16.3776],[48.2135,16.3760],[48.2116,16.3779],[48.2098,16.3756],[48.2082,16.3731],[48.2058,16.3720],[48.2030,16.3710],[48.2003,16.3698],[48.1975,16.3698],[48.1948,16.3702],[48.1915,16.3710],[48.1885,16.3722],[48.1851,16.3732],[48.1825,16.3748],[48.1792,16.3768],[48.1768,16.3775],[48.1745,16.3783],[48.1718,16.3790],[48.1690,16.3796],[48.1663,16.3800],[48.1635,16.3802],[48.1605,16.3805],[48.1570,16.3810],[48.1540,16.3820],[48.1520,16.3830],[48.1495,16.3855],[48.1475,16.3885],[48.1456,16.3910],[48.1438,16.3955],[48.1425,16.3995],[48.1418,16.4031]],
  U2: [[48.2003,16.3698],[48.2012,16.3668],[48.2020,16.3640],[48.2028,16.3615],[48.2038,16.3598],[48.2052,16.3582],[48.2070,16.3565],[48.2088,16.3555],[48.2105,16.3547],[48.2120,16.3568],[48.2132,16.3592],[48.2142,16.3610],[48.2147,16.3625],[48.2152,16.3648],[48.2158,16.3675],[48.2164,16.3700],[48.2170,16.3730],[48.2175,16.3758],[48.2180,16.3785],[48.2185,16.3805],[48.2189,16.3816],[48.2192,16.3845],[48.2195,16.3875],[48.2197,16.3923],[48.2193,16.3950],[48.2188,16.3985],[48.2183,16.4015],[48.2179,16.4059],[48.2170,16.4085],[48.2160,16.4115],[48.2150,16.4148],[48.2145,16.4180],[48.2140,16.4236],[48.2130,16.4258],[48.2120,16.4278],[48.2110,16.4300],[48.2105,16.4328],[48.2102,16.4360],[48.2105,16.4395],[48.2110,16.4430],[48.2120,16.4460],[48.2125,16.4480],[48.2130,16.4500],[48.2125,16.4530],[48.2120,16.4560],[48.2120,16.4590],[48.2130,16.4615],[48.2142,16.4635],[48.2155,16.4655],[48.2175,16.4665],[48.2190,16.4675],[48.2210,16.4685],[48.2230,16.4710],[48.2250,16.4738],[48.2270,16.4750],[48.2295,16.4750],[48.2315,16.4752],[48.2335,16.4755],[48.2350,16.4780],[48.2365,16.4805],[48.2370,16.4825]],
  U3: [[48.2109,16.3117],[48.2102,16.3140],[48.2095,16.3170],[48.2090,16.3195],[48.2085,16.3220],[48.2082,16.3245],[48.2075,16.3270],[48.2068,16.3292],[48.2063,16.3310],[48.2050,16.3325],[48.2035,16.3338],[48.2020,16.3348],[48.1995,16.3370],[48.1978,16.3385],[48.1967,16.3392],[48.1980,16.3415],[48.1990,16.3440],[48.2000,16.3465],[48.2008,16.3485],[48.2015,16.3510],[48.2025,16.3535],[48.2038,16.3558],[48.2052,16.3582],[48.2060,16.3610],[48.2068,16.3640],[48.2075,16.3670],[48.2078,16.3695],[48.2082,16.3731],[48.2078,16.3755],[48.2075,16.3775],[48.2073,16.3785],[48.2068,16.3810],[48.2062,16.3841],[48.2048,16.3865],[48.2035,16.3888],[48.2025,16.3905],[48.2005,16.3930],[48.1988,16.3955],[48.1976,16.3968],[48.1960,16.3995],[48.1948,16.4025],[48.1940,16.4050],[48.1920,16.4075],[48.1900,16.4095],[48.1885,16.4110],[48.1865,16.4135],[48.1850,16.4150],[48.1845,16.4160],[48.1825,16.4170],[48.1808,16.4178],[48.1795,16.4185],[48.1772,16.4192],[48.1755,16.4198],[48.1745,16.4200],[48.1730,16.4202],[48.1715,16.4205],[48.1705,16.4208],[48.1690,16.4210],[48.1675,16.4215],[48.1655,16.4220],[48.1635,16.4225]],
  U4: [[48.2486,16.3659],[48.2445,16.3645],[48.2405,16.3630],[48.2368,16.3618],[48.2335,16.3610],[48.2310,16.3610],[48.2280,16.3610],[48.2255,16.3615],[48.2235,16.3622],[48.2215,16.3630],[48.2195,16.3655],[48.2180,16.3685],[48.2170,16.3710],[48.2160,16.3740],[48.2150,16.3760],[48.2138,16.3772],[48.2125,16.3780],[48.2116,16.3779],[48.2095,16.3805],[48.2078,16.3825],[48.2062,16.3841],[48.2050,16.3820],[48.2038,16.3798],[48.2027,16.3775],[48.2015,16.3740],[48.2003,16.3698],[48.1988,16.3668],[48.1975,16.3640],[48.1961,16.3615],[48.1945,16.3580],[48.1932,16.3555],[48.1920,16.3530],[48.1910,16.3490],[48.1902,16.3460],[48.1897,16.3440],[48.1890,16.3400],[48.1885,16.3370],[48.1881,16.3352],[48.1878,16.3320],[48.1875,16.3285],[48.1875,16.3265],[48.1876,16.3235],[48.1878,16.3205],[48.1880,16.3180],[48.1881,16.3145],[48.1882,16.3105],[48.1883,16.3060],[48.1885,16.3030],[48.1888,16.2995],[48.1892,16.2970],[48.1895,16.2955],[48.1902,16.2915],[48.1910,16.2885],[48.1917,16.2855],[48.1922,16.2810],[48.1925,16.2760],[48.1932,16.2720],[48.1942,16.2680],[48.1952,16.2645],[48.1962,16.2625],[48.1972,16.2612]],
  U6: [[48.2562,16.4005],[48.2540,16.3990],[48.2515,16.3970],[48.2500,16.3950],[48.2465,16.3915],[48.2440,16.3885],[48.2415,16.3854],[48.2390,16.3822],[48.2370,16.3795],[48.2350,16.3770],[48.2330,16.3748],[48.2310,16.3728],[48.2305,16.3705],[48.2295,16.3668],[48.2285,16.3622],[48.2282,16.3580],[48.2285,16.3535],[48.2265,16.3515],[48.2242,16.3495],[48.2220,16.3475],[48.2195,16.3458],[48.2178,16.3445],[48.2165,16.3440],[48.2142,16.3432],[48.2115,16.3420],[48.2090,16.3412],[48.2065,16.3405],[48.2035,16.3400],[48.2010,16.3398],[48.1967,16.3392],[48.1945,16.3388],[48.1928,16.3382],[48.1915,16.3378],[48.1895,16.3362],[48.1881,16.3352],[48.1860,16.3350],[48.1838,16.3345],[48.1820,16.3340],[48.1795,16.3340],[48.1768,16.3339],[48.1743,16.3339],[48.1715,16.3320],[48.1692,16.3300],[48.1670,16.3280],[48.1645,16.3258],[48.1620,16.3235],[48.1600,16.3220],[48.1568,16.3195],[48.1545,16.3175],[48.1523,16.3157],[48.1495,16.3135],[48.1470,16.3115],[48.1450,16.3100],[48.1422,16.3088],[48.1398,16.3078],[48.1380,16.3070],[48.1350,16.3058],[48.1325,16.3042],[48.1300,16.3030],[48.1275,16.3015],[48.1250,16.3000]],
  S1: [[48.2562,16.4005],[48.2535,16.3979],[48.2500,16.3938],[48.2465,16.3905],[48.2440,16.3878],[48.2415,16.3854],[48.2388,16.3835],[48.2350,16.3810],[48.2320,16.3825],[48.2275,16.3855],[48.2238,16.3890],[48.2215,16.3910],[48.2197,16.3923],[48.2162,16.3905],[48.2120,16.3875],[48.2088,16.3850],[48.2062,16.3841],[48.2025,16.3828],[48.1990,16.3812],[48.1960,16.3800],[48.1925,16.3780],[48.1888,16.3755],[48.1851,16.3732],[48.1830,16.3715],[48.1810,16.3690],[48.1785,16.3610],[48.1765,16.3500],[48.1743,16.3339],[48.1730,16.3275],[48.1710,16.3215],[48.1680,16.3160],[48.1645,16.3120],[48.1605,16.3090],[48.1560,16.3048],[48.1510,16.2995],[48.1460,16.2958],[48.1405,16.2900],[48.1348,16.2828]],
  S7: [[48.2562,16.4005],[48.2535,16.3979],[48.2500,16.3938],[48.2465,16.3905],[48.2440,16.3878],[48.2415,16.3854],[48.2388,16.3835],[48.2350,16.3810],[48.2320,16.3825],[48.2275,16.3855],[48.2238,16.3890],[48.2215,16.3910],[48.2197,16.3923],[48.2162,16.3905],[48.2120,16.3875],[48.2088,16.3850],[48.2062,16.3841],[48.2035,16.3830],[48.1995,16.3815],[48.1960,16.3800],[48.1935,16.3840],[48.1915,16.3885],[48.1890,16.3950],[48.1860,16.4005],[48.1830,16.4055],[48.1800,16.4100],[48.1765,16.4142],[48.1735,16.4175],[48.1705,16.4208],[48.1660,16.4260],[48.1623,16.4320],[48.1570,16.4500],[48.1540,16.4585],[48.1510,16.4675],[48.1480,16.4780],[48.1440,16.4880],[48.1395,16.4990],[48.1350,16.5100],[48.1285,16.5260],[48.1240,16.5355],[48.1200,16.5450],[48.1160,16.5530],[48.1130,16.5615],[48.1103,16.5697]],
  S40: [[48.2261,16.3603],[48.2280,16.3610],[48.2300,16.3615],[48.2320,16.3625],[48.2345,16.3630],[48.2370,16.3635],[48.2395,16.3640],[48.2420,16.3645],[48.2445,16.3650],[48.2470,16.3655],[48.2486,16.3659],[48.2505,16.3680],[48.2525,16.3720],[48.2538,16.3770],[48.2545,16.3825],[48.2552,16.3890],[48.2558,16.3950],[48.2562,16.4005]],
  S45: [[48.1972,16.2612],[48.1990,16.2680],[48.2010,16.2755],[48.2025,16.2805],[48.2040,16.2850],[48.2058,16.2910],[48.2080,16.2980],[48.2092,16.3040],[48.2102,16.3085],[48.2109,16.3117],[48.2130,16.3122],[48.2152,16.3128],[48.2170,16.3135],[48.2190,16.3140],[48.2208,16.3145],[48.2220,16.3150],[48.2231,16.3155],[48.2245,16.3170],[48.2258,16.3185],[48.2270,16.3200],[48.2282,16.3215],[48.2295,16.3230],[48.2307,16.3245],[48.2325,16.3295],[48.2345,16.3355],[48.2358,16.3400],[48.2370,16.3450],[48.2392,16.3485],[48.2415,16.3515],[48.2430,16.3535],[48.2440,16.3550],[48.2455,16.3578],[48.2470,16.3615],[48.2482,16.3640],[48.2486,16.3659],[48.2470,16.3700],[48.2448,16.3755],[48.2428,16.3800],[48.2415,16.3854]],
  S50: [[48.1967,16.3392],[48.1955,16.3340],[48.1940,16.3275],[48.1928,16.3220],[48.1915,16.3160],[48.1905,16.3115],[48.1898,16.3070],[48.1892,16.3020],[48.1888,16.2960],[48.1895,16.2890],[48.1908,16.2840],[48.1918,16.2790],[48.1925,16.2760],[48.1945,16.2710],[48.1970,16.2640],[48.1972,16.2612]],
  S80: [[48.1743,16.3339],[48.1760,16.3300],[48.1780,16.3265],[48.1795,16.3220],[48.1810,16.3185],[48.1825,16.3155],[48.1838,16.3120],[48.1850,16.3085],[48.1862,16.3055],[48.1870,16.3020],[48.1875,16.2985],[48.1880,16.2945],[48.1882,16.2900],[48.1890,16.2850],[48.1905,16.2820],[48.1915,16.2790],[48.1920,16.2765],[48.1928,16.2720],[48.1940,16.2675],[48.1955,16.2635],[48.1972,16.2612]]
};

export interface TramCorridor {
  label: string;
  color: string;
  coords: [number, number][];
}

export interface MainRoute {
  label: string;
  color: string;
  weight?: number;
  opacity?: number;
  coords: [number, number][];
}

export const TRAM_CORRIDORS: TramCorridor[] = [
  { label: 'Ring (1,2,D,71)', color: '#E91E63', coords: [[48.2003,16.3698],[48.2015,16.3660],[48.2020,16.3635],[48.2032,16.3610],[48.2042,16.3595],[48.2052,16.3582],[48.2065,16.3565],[48.2080,16.3550],[48.2090,16.3548],[48.2105,16.3547],[48.2115,16.3560],[48.2125,16.3580],[48.2135,16.3600],[48.2142,16.3618],[48.2147,16.3625],[48.2145,16.3650],[48.2142,16.3675],[48.2140,16.3698],[48.2132,16.3720],[48.2125,16.3740],[48.2120,16.3760],[48.2112,16.3770],[48.2107,16.3778],[48.2095,16.3795],[48.2088,16.3805],[48.2080,16.3815],[48.2070,16.3828],[48.2062,16.3841],[48.2050,16.3820],[48.2045,16.3800],[48.2038,16.3780],[48.2028,16.3760],[48.2017,16.3740],[48.2010,16.3720],[48.2003,16.3698]] },
  { label: 'D (Hbf → Nußdorf)', color: '#43A047', coords: [[48.1851,16.3732],[48.1865,16.3730],[48.1880,16.3728],[48.1887,16.3725],[48.1910,16.3718],[48.1917,16.3715],[48.1935,16.3712],[48.1955,16.3710],[48.1970,16.3708],[48.1985,16.3705],[48.2003,16.3698],[48.2015,16.3675],[48.2025,16.3650],[48.2035,16.3638],[48.2045,16.3622],[48.2052,16.3582],[48.2070,16.3565],[48.2080,16.3550],[48.2088,16.3550],[48.2105,16.3547],[48.2120,16.3568],[48.2132,16.3592],[48.2142,16.3610],[48.2147,16.3625],[48.2158,16.3612],[48.2170,16.3600],[48.2185,16.3588],[48.2198,16.3578],[48.2210,16.3568],[48.2220,16.3575],[48.2235,16.3588],[48.2248,16.3598],[48.2261,16.3603],[48.2285,16.3610],[48.2310,16.3620],[48.2330,16.3625],[48.2350,16.3628],[48.2370,16.3630],[48.2395,16.3635],[48.2420,16.3640],[48.2445,16.3650],[48.2470,16.3655],[48.2486,16.3659],[48.2500,16.3670],[48.2510,16.3685]] },
  { label: 'O (Raxstr → Praterstern)', color: '#1E88E5', coords: [[48.1745,16.3783],[48.1765,16.3775],[48.1785,16.3765],[48.1800,16.3760],[48.1820,16.3750],[48.1835,16.3740],[48.1851,16.3732],[48.1872,16.3725],[48.1895,16.3720],[48.1917,16.3715],[48.1940,16.3710],[48.1965,16.3705],[48.1988,16.3700],[48.2003,16.3698],[48.2020,16.3668],[48.2030,16.3640],[48.2040,16.3610],[48.2052,16.3582],[48.2065,16.3610],[48.2078,16.3645],[48.2088,16.3670],[48.2100,16.3700],[48.2110,16.3728],[48.2120,16.3760],[48.2130,16.3780],[48.2140,16.3795],[48.2150,16.3805],[48.2160,16.3825],[48.2170,16.3845],[48.2180,16.3860],[48.2188,16.3885],[48.2192,16.3905],[48.2197,16.3923]] },
  { label: '2 (Friedrich-Engels-Pl → Dornbach)', color: '#FB8C00', coords: [[48.2197,16.3923],[48.2185,16.3910],[48.2172,16.3900],[48.2160,16.3880],[48.2148,16.3845],[48.2135,16.3800],[48.2120,16.3760],[48.2115,16.3730],[48.2108,16.3690],[48.2105,16.3645],[48.2105,16.3598],[48.2105,16.3547],[48.2110,16.3525],[48.2118,16.3505],[48.2125,16.3480],[48.2135,16.3460],[48.2148,16.3440],[48.2160,16.3420],[48.2175,16.3400],[48.2188,16.3380],[48.2195,16.3365],[48.2210,16.3335],[48.2220,16.3290],[48.2228,16.3245],[48.2230,16.3200],[48.2231,16.3155],[48.2235,16.3110]] },
  { label: '5 (Praterstern → Westbf)', color: '#8E24AA', coords: [[48.2197,16.3923],[48.2180,16.3910],[48.2168,16.3895],[48.2150,16.3880],[48.2135,16.3850],[48.2122,16.3810],[48.2112,16.3792],[48.2107,16.3778],[48.2090,16.3795],[48.2078,16.3812],[48.2068,16.3828],[48.2062,16.3841],[48.2050,16.3810],[48.2040,16.3780],[48.2035,16.3740],[48.2030,16.3700],[48.2022,16.3660],[48.2015,16.3610],[48.2010,16.3575],[48.2005,16.3540],[48.2000,16.3500],[48.1990,16.3465],[48.1985,16.3440],[48.1975,16.3410],[48.1967,16.3392]] },
  { label: '6/18', color: '#FBC02D', coords: [[48.2062,16.3841],[48.2050,16.3810],[48.2040,16.3780],[48.2035,16.3740],[48.2030,16.3700],[48.2015,16.3702],[48.2003,16.3698],[48.1995,16.3675],[48.1982,16.3620],[48.1975,16.3580],[48.1970,16.3550],[48.1967,16.3392],[48.1980,16.3372],[48.1993,16.3355],[48.2000,16.3340],[48.2012,16.3320],[48.2025,16.3300],[48.2035,16.3290],[48.2042,16.3275],[48.2055,16.3250],[48.2060,16.3225],[48.2065,16.3200],[48.2075,16.3180],[48.2085,16.3160],[48.2095,16.3140],[48.2109,16.3117]] },
  { label: '9 (Westbf → Gersthof)', color: '#00ACC1', coords: [[48.1967,16.3392],[48.1980,16.3372],[48.1993,16.3355],[48.2000,16.3340],[48.2012,16.3320],[48.2025,16.3300],[48.2035,16.3290],[48.2042,16.3275],[48.2055,16.3250],[48.2060,16.3225],[48.2065,16.3200],[48.2075,16.3180],[48.2085,16.3160],[48.2095,16.3140],[48.2109,16.3117],[48.2125,16.3120],[48.2135,16.3122],[48.2148,16.3125],[48.2160,16.3128],[48.2172,16.3130],[48.2182,16.3132],[48.2190,16.3135],[48.2202,16.3140],[48.2212,16.3145],[48.2222,16.3150],[48.2231,16.3155],[48.2242,16.3162],[48.2252,16.3168],[48.2260,16.3170],[48.2272,16.3182],[48.2282,16.3198],[48.2290,16.3210],[48.2298,16.3225],[48.2303,16.3238],[48.2307,16.3245]] },
  { label: '71 (Zentralfriedhof → Schottenring)', color: '#D32F2F', coords: [[48.1520,16.4300],[48.1545,16.4280],[48.1570,16.4260],[48.1595,16.4240],[48.1625,16.4220],[48.1655,16.4220],[48.1680,16.4210],[48.1705,16.4208],[48.1735,16.4190],[48.1758,16.4180],[48.1775,16.4175],[48.1792,16.4168],[48.1815,16.4160],[48.1835,16.4150],[48.1855,16.4140],[48.1875,16.4125],[48.1892,16.4110],[48.1915,16.4085],[48.1935,16.4060],[48.1955,16.4025],[48.1975,16.3990],[48.1995,16.3955],[48.2015,16.3925],[48.2035,16.3890],[48.2050,16.3865],[48.2062,16.3841],[48.2078,16.3820],[48.2092,16.3795],[48.2105,16.3775],[48.2120,16.3760],[48.2130,16.3730],[48.2140,16.3698],[48.2147,16.3625],[48.2152,16.3648],[48.2158,16.3675],[48.2164,16.3700],[48.2170,16.3730],[48.2175,16.3758],[48.2180,16.3785],[48.2183,16.3805],[48.2188,16.3830],[48.2193,16.3860]] },
  { label: '38 (Schottentor → Grinzing)', color: '#FF7043', coords: [[48.2147,16.3625],[48.2158,16.3612],[48.2170,16.3600],[48.2185,16.3588],[48.2198,16.3578],[48.2210,16.3568],[48.2220,16.3575],[48.2235,16.3588],[48.2248,16.3598],[48.2261,16.3603],[48.2275,16.3598],[48.2290,16.3590],[48.2305,16.3585],[48.2320,16.3570],[48.2340,16.3555],[48.2355,16.3540],[48.2375,16.3525],[48.2390,16.3510],[48.2405,16.3500],[48.2420,16.3485],[48.2430,16.3470],[48.2440,16.3450],[48.2450,16.3440],[48.2460,16.3430]] },
  { label: '62 (Oper → Lainz)', color: '#FFC107', coords: [[48.2003,16.3698],[48.1990,16.3680],[48.1975,16.3655],[48.1968,16.3630],[48.1962,16.3605],[48.1958,16.3580],[48.1955,16.3555],[48.1952,16.3528],[48.1950,16.3500],[48.1945,16.3470],[48.1940,16.3440],[48.1935,16.3412],[48.1930,16.3385],[48.1925,16.3355],[48.1920,16.3325],[48.1912,16.3295],[48.1902,16.3270],[48.1890,16.3245],[48.1875,16.3220],[48.1860,16.3195],[48.1845,16.3170],[48.1830,16.3145],[48.1815,16.3120],[48.1800,16.3095],[48.1785,16.3068],[48.1772,16.3038],[48.1762,16.3005],[48.1755,16.2970],[48.1750,16.2935],[48.1750,16.2900]] },
  { label: '49 (Ring → Hütteldorf)', color: '#3F51B5', coords: [[48.2105,16.3547],[48.2095,16.3525],[48.2085,16.3500],[48.2080,16.3475],[48.2075,16.3450],[48.2070,16.3425],[48.2065,16.3400],[48.2058,16.3370],[48.2050,16.3340],[48.2040,16.3310],[48.2030,16.3280],[48.2020,16.3245],[48.2015,16.3210],[48.2012,16.3175],[48.2010,16.3140],[48.2005,16.3105],[48.2002,16.3070],[48.1998,16.3035],[48.1995,16.3000],[48.1992,16.2965],[48.1990,16.2930],[48.1985,16.2885],[48.1982,16.2840],[48.1978,16.2790],[48.1975,16.2740],[48.1973,16.2690],[48.1972,16.2612]] },
  { label: 'WLB (Baden line)', color: '#5D4037', coords: [[48.1972,16.2612],[48.1965,16.2645],[48.1958,16.2680],[48.1950,16.2720],[48.1942,16.2760],[48.1932,16.2800],[48.1925,16.2835],[48.1920,16.2850],[48.1910,16.2895],[48.1902,16.2935],[48.1895,16.2975],[48.1888,16.3010],[48.1883,16.3039],[48.1878,16.3075],[48.1870,16.3110],[48.1858,16.3140],[48.1850,16.3160],[48.1835,16.3188],[48.1820,16.3215],[48.1805,16.3240],[48.1790,16.3265],[48.1770,16.3295],[48.1755,16.3320],[48.1743,16.3339],[48.1720,16.3320],[48.1700,16.3310],[48.1685,16.3295],[48.1670,16.3280],[48.1648,16.3260],[48.1625,16.3240],[48.1600,16.3220],[48.1578,16.3200],[48.1550,16.3180],[48.1523,16.3157]] }
];

export const MAIN_ROUTES: MainRoute[] = [
  { label: 'Gürtel (B221)', color: '#FF6B35', weight: 5, opacity: 0.92, coords: [[48.1868,16.4005],[48.1872,16.3975],[48.1876,16.3948],[48.1878,16.3925],[48.1879,16.3900],[48.1879,16.3875],[48.1878,16.3850],[48.1876,16.3825],[48.1872,16.3800],[48.1867,16.3775],[48.1864,16.3750],[48.1862,16.3725],[48.1860,16.3700],[48.1858,16.3675],[48.1853,16.3650],[48.1845,16.3630],[48.1835,16.3615],[48.1825,16.3602],[48.1818,16.3588],[48.1830,16.3578],[48.1845,16.3565],[48.1860,16.3550],[48.1875,16.3535],[48.1890,16.3510],[48.1900,16.3480],[48.1905,16.3450],[48.1902,16.3420],[48.1910,16.3395],[48.1925,16.3380],[48.1945,16.3385],[48.1967,16.3392],[48.1990,16.3390],[48.2010,16.3388],[48.2030,16.3386],[48.2050,16.3384],[48.2068,16.3382],[48.2086,16.3381],[48.2105,16.3390],[48.2125,16.3400],[48.2145,16.3412],[48.2165,16.3428],[48.2185,16.3445],[48.2205,16.3462],[48.2225,16.3480],[48.2245,16.3500],[48.2265,16.3515],[48.2280,16.3525],[48.2295,16.3530],[48.2310,16.3535],[48.2322,16.3537]] },
  { label: 'Ringstraße', color: '#E04040', weight: 4.5, opacity: 0.95, coords: [[48.2003,16.3698],[48.2015,16.3660],[48.2020,16.3635],[48.2032,16.3610],[48.2042,16.3595],[48.2052,16.3582],[48.2065,16.3565],[48.2080,16.3550],[48.2090,16.3548],[48.2105,16.3547],[48.2115,16.3560],[48.2125,16.3580],[48.2135,16.3600],[48.2142,16.3618],[48.2147,16.3625],[48.2145,16.3650],[48.2142,16.3675],[48.2140,16.3698],[48.2132,16.3720],[48.2125,16.3740],[48.2120,16.3760],[48.2112,16.3770],[48.2107,16.3778],[48.2095,16.3795],[48.2088,16.3805],[48.2080,16.3815],[48.2070,16.3828],[48.2062,16.3841],[48.2050,16.3820],[48.2045,16.3800],[48.2038,16.3780],[48.2028,16.3760],[48.2017,16.3740],[48.2010,16.3720],[48.2003,16.3698]] },
  { label: 'Mariahilfer Straße', color: '#20B2AA', weight: 3.5, opacity: 0.85, coords: [[48.1967,16.3392],[48.1975,16.3410],[48.1985,16.3440],[48.1990,16.3465],[48.2000,16.3500],[48.2005,16.3540],[48.2010,16.3575],[48.2015,16.3610]] },
  { label: 'Praterstraße', color: '#FF69B4', weight: 3.5, opacity: 0.85, coords: [[48.2197,16.3923],[48.2180,16.3910],[48.2168,16.3895],[48.2150,16.3880],[48.2135,16.3850],[48.2122,16.3810],[48.2112,16.3792],[48.2107,16.3778]] },
  { label: 'Wiedner Hauptstraße', color: '#7B68EE', weight: 3.5, opacity: 0.85, coords: [[48.2003,16.3698],[48.1985,16.3692],[48.1965,16.3688],[48.1945,16.3685],[48.1925,16.3682],[48.1905,16.3678],[48.1885,16.3675],[48.1870,16.3672],[48.1860,16.3670]] },
  { label: 'Landstraßer Hauptstraße', color: '#9370DB', weight: 3.5, opacity: 0.85, coords: [[48.2062,16.3841],[48.2050,16.3865],[48.2035,16.3890],[48.2015,16.3925],[48.1995,16.3955],[48.1975,16.3990],[48.1955,16.4025],[48.1935,16.4060],[48.1915,16.4085],[48.1892,16.4110]] }
];

export const FOOD_DENSITY: Record<string, { label: string; color: string }> = {
  high: { label: 'Café-rich', color: '#d9a679' },
  medium: { label: 'Some cafés', color: '#e8d3a3' },
  low: { label: 'Few cafés', color: '#efe3c6' }
};

export const FOOD_SCENE: Record<number, { cafeDensity: string; cuisines: string[]; text: string }> = {
  1: { cafeDensity: 'high', cuisines: ['grand coffee houses','fine dining','tourist classics'], text: "Vienna's café capital: grand coffee houses and upscale restaurants, pricey and tourist-oriented." },
  2: { cafeDensity: 'medium', cuisines: ['Prater beer gardens','family bistros','Japanese & Asian'], text: 'Casual bistros, Prater classics and a strong Japanese dining scene around Mochi.' },
  3: { cafeDensity: 'medium', cuisines: ['fine dining','market kitchens','wine bars'], text: 'From Steirereck fine dining to Rochusmarkt kitchens and evening wine bars.' },
  4: { cafeDensity: 'high', cuisines: ['student cafés','brunch spots','international'], text: 'Café-dense student district with a big brunch culture around the Freihausviertel.' },
  5: { cafeDensity: 'medium', cuisines: ['multicultural eateries','street food','gentrifying bistros'], text: 'Multicultural cheap eats and street food mix with new-wave bistros.' },
  6: { cafeDensity: 'high', cuisines: ['shopping-street cafés','Naschmarkt stalls','bookshop cafés'], text: 'Dense café scene along Mariahilfer Straße and around the Naschmarkt.' },
  7: { cafeDensity: 'high', cuisines: ['specialty coffee','international bistros','nightlife bars'], text: "Vienna's creative hub: specialty coffee and small international kitchens." },
  8: { cafeDensity: 'medium', cuisines: ['classic cafés','theater bistros'], text: 'Traditional cafés and cozy bistros; quieter and proudly local.' },
  9: { cafeDensity: 'medium', cuisines: ['student cafés','beer gardens','ethnic eats'], text: 'Student-friendly cafés, the Stiegl beer garden and international kitchens.' },
  10: { cafeDensity: 'medium', cuisines: ['ethnic diversity','street food','southern Heurigen'], text: 'Wide ethnic choice from Balkan to Asian, plus Heurigen in Oberlaa; café scene thinner.' },
  11: { cafeDensity: 'low', cuisines: ['traditional Gasthäuser','local pubs'], text: 'Few cafés; traditional Gasthäuser and a grand coffee house near the cemetery.' },
  12: { cafeDensity: 'medium', cuisines: ['market kitchens','Neapolitan pizza','French cafés'], text: 'Meidlinger Markt is the food center; good pizza and cafés around it.' },
  13: { cafeDensity: 'low', cuisines: ['classic coffee houses','Schönbrunn cafés','wine bars'], text: 'Quiet café culture near Schönbrunn; few late-night spots.' },
  14: { cafeDensity: 'low', cuisines: ['local bistros','Hütteldorf eateries'], text: 'Sparse but friendly local scene around Hütteldorf; not a dining destination.' },
  15: { cafeDensity: 'medium', cuisines: ['international diversity','street food','market stands'], text: 'Dense international eateries around Westbahnhof and Kriemhildplatz cafés.' },
  16: { cafeDensity: 'medium', cuisines: ['Balkan grills','market street food','wine bars'], text: 'Brunnenmarkt and Yppenplatz anchor a lively Balkan and wine scene.' },
  17: { cafeDensity: 'low', cuisines: ['Wiener Beisl','Wienerwald dining','wine taverns'], text: 'Scattered traditional Beisl and hillside dining; café scene thin.' },
  18: { cafeDensity: 'low', cuisines: ['neighborhood cafés','styrian bistros'], text: 'Calm neighborhood cafés; limited but quality dining.' },
  19: { cafeDensity: 'medium', cuisines: ['Heurigen','fine dining','village cafés'], text: 'Heurigen country in Grinzing and Sievering, plus Amador fine dining.' },
  20: { cafeDensity: 'medium', cuisines: ['international street food','canal bars','neighborhood bistros'], text: 'Multicultural eateries along Wallensteinstraße; fewer classic cafés.' },
  21: { cafeDensity: 'medium', cuisines: ['Stammersdorf Heurigen','market stands','local pubs'], text: 'Suburban mix: Heurigen culture to the north, market stands and pubs near the Spitz.' },
  22: { cafeDensity: 'low', cuisines: ['mall food courts','lakeside restaurants','Kaisermühlen classics'], text: 'Sparse scene: Donauzentrum food courts and Alte Donau terraces.' },
  23: { cafeDensity: 'low', cuisines: ['Heurigen','village cafés','market eats'], text: 'Scattered Heurigen and village cafés; very quiet food scene.' }
};

export const COST_STYLE: Record<string, { label: string; color: string }> = {
  very_expensive: { label: 'Very expensive', color: '#eca9bb' },
  expensive: { label: 'Expensive', color: '#f3b59f' },
  moderate: { label: 'Moderate', color: '#f6df8a' },
  affordable: { label: 'Affordable', color: '#a8d9c3' }
};

export const SAFETY_LEVELS: Record<string, { label: string; color: string }> = {
  safe: { label: 'Low crime', color: '#8ccf9b' },
  moderate: { label: 'Average crime', color: '#f6df8a' },
  elevated: { label: 'Higher crime', color: '#e0857c' }
};

export const SAFETY_DATA: Record<number, { level: string; text: string }> = {
  1: { level: 'elevated', text: 'Pickpocketing and tourist-targeted petty crime around Stephansplatz and the old town, but violent crime is rare.' },
  2: { level: 'moderate', text: 'Mostly relaxed; keep an eye on belongings around Praterstern station and crowded Prater areas.' },
  3: { level: 'moderate', text: 'Occasional petty crime near Wien Mitte and busy shopping streets; residential parts are quiet.' },
  4: { level: 'moderate', text: 'Fairly calm; pickpockets mostly work around Karlsplatz and the busy U1 corridor.' },
  5: { level: 'elevated', text: 'Above-average property crime, especially along busy streets and nightlife spots; improving as the area gentrifies.' },
  6: { level: 'moderate', text: 'Shopping crowds on Mariahilfer Straße attract pickpockets; nightlife corners stay lively late.' },
  7: { level: 'moderate', text: 'Average crime; late-night bar streets see occasional petty incidents.' },
  8: { level: 'safe', text: "One of Vienna's calmest districts; crime is rare and mostly limited to bicycle theft." },
  9: { level: 'safe', text: 'Low crime in this student and university area; occasional bike theft only.' },
  10: { level: 'elevated', text: 'Higher property crime, focused around Reumannplatz and train stations; daytime is generally fine.' },
  11: { level: 'elevated', text: 'Property crime clusters near U3 stations; quiet residential streets are much calmer.' },
  12: { level: 'moderate', text: 'Average crime with some incidents around Meidling station; side streets stay peaceful.' },
  13: { level: 'safe', text: 'Very low crime; the villa neighborhoods are among the safest in the city.' },
  14: { level: 'moderate', text: 'Low-to-average crime in mostly calm residential areas.' },
  15: { level: 'elevated', text: "Among Vienna's higher-crime districts; busy squares, Westbahnhof and nightlife areas see most incidents." },
  16: { level: 'elevated', text: 'Above-average petty and property crime around Brunnenmarkt and Yppenplatz; fine during the day.' },
  17: { level: 'moderate', text: 'Average crime; suburban calm with occasional petty incidents near stations.' },
  18: { level: 'safe', text: 'Very low crime in quiet, green residential streets.' },
  19: { level: 'safe', text: "Among Vienna's safest; wealthy residential hills with minimal incidents." },
  20: { level: 'elevated', text: 'Elevated property crime near Millennium City and Handelskai; daytime is generally safe.' },
  21: { level: 'moderate', text: 'Average crime, concentrated around Floridsdorf station; otherwise suburban.' },
  22: { level: 'moderate', text: 'Large and mostly suburban; incidents cluster near malls and transport hubs.' },
  23: { level: 'safe', text: 'Very low crime in the calm southern suburbs.' }
};

export const SAFETY_SPOTS: Array<{ name: string; districtId: number; lat: number; lng: number; radius: number; level: string; text: string }> = [
  { name: 'Stephansplatz & Graben', districtId: 1, lat: 48.2085, lng: 16.3725, radius: 750, level: 'elevated', text: 'Tourist crowds and shopping lanes draw pickpockets; violent crime stays rare.' },
  { name: 'Praterstern', districtId: 2, lat: 48.2197, lng: 16.3923, radius: 800, level: 'elevated', text: 'The station surroundings see most of the district\'s property crime.' },
  { name: 'Wien Mitte', districtId: 3, lat: 48.2062, lng: 16.3841, radius: 700, level: 'elevated', text: 'Station and mall crowds see pickpocketing and bicycle theft.' },
  { name: 'Karlsplatz', districtId: 4, lat: 48.2003, lng: 16.3698, radius: 700, level: 'elevated', text: 'Busy transit and student hub; keep valuables close after dark.' },
  { name: 'Reinprechtsdorfer Straße', districtId: 5, lat: 48.1850, lng: 16.3540, radius: 700, level: 'elevated', text: 'Lively thoroughfare with above-average property crime at night.' },
  { name: 'Mariahilfer Straße', districtId: 6, lat: 48.1985, lng: 16.3510, radius: 800, level: 'elevated', text: "Vienna's shopping mile attracts pickpockets year-round." },
  { name: 'MuseumsQuartier', districtId: 7, lat: 48.2033, lng: 16.3581, radius: 700, level: 'moderate', text: 'Late-night bar crowds bring occasional scuffles and thefts.' },
  { name: 'Reumannplatz', districtId: 10, lat: 48.1745, lng: 16.3783, radius: 800, level: 'elevated', text: "The south's busiest square; property crime concentrates here." },
  { name: 'Hauptbahnhof', districtId: 10, lat: 48.1851, lng: 16.3732, radius: 800, level: 'elevated', text: 'Large station crowds; pickpocketing around entrances.' },
  { name: 'Simmering station', districtId: 11, lat: 48.1705, lng: 16.4208, radius: 800, level: 'elevated', text: "The U3 corridor has the district's highest incident rate." },
  { name: 'Bahnhof Meidling', districtId: 12, lat: 48.1743, lng: 16.3339, radius: 700, level: 'elevated', text: 'Busy interchange; watch luggage and pockets.' },
  { name: 'Westbahnhof & Gürtel', districtId: 15, lat: 48.1967, lng: 16.3392, radius: 800, level: 'elevated', text: 'Nightlife and station crowds; most incidents happen here.' },
  { name: 'Brunnenmarkt & Yppenplatz', districtId: 16, lat: 48.2140, lng: 16.3360, radius: 800, level: 'elevated', text: "Market and nightlife streets see the district's most crime." },
  { name: 'Millennium City', districtId: 20, lat: 48.2410, lng: 16.3860, radius: 800, level: 'elevated', text: 'Mall and riverside station; property crime above average.' },
  { name: 'Floridsdorf station', districtId: 21, lat: 48.2570, lng: 16.4010, radius: 800, level: 'elevated', text: 'Busy northern hub; watch valuables.' }
];

export const DISTRICT_PALETTE = ['#f3b59f', '#a8d9c3', '#c5b8e7', '#a8d2e8', '#f6df8a', '#eca9bb'];

export const TOGGLE_DEFS = [
  { key: 'showDistrictColors', label: 'District colors', default: true, group: 'Map essentials' },
  { key: 'showDistrictFill', label: 'District fill', default: true, group: 'Map essentials' },
  { key: 'showDistrictLabels', label: 'District names', default: true, group: 'Map essentials' },
  { key: 'showDistrictNumbers', label: 'District numbers', default: true, group: 'Map essentials' },
  { key: 'showCostIndicators', label: 'Cost at a glance', default: false, group: 'District story' },
  { key: 'showKeywords', label: 'Vibe keywords', default: false, group: 'District story' },
  { key: 'showLandmarks', label: 'Landmarks', default: false, group: 'District story' },
  { key: 'showFood', label: 'Cafés & restaurants', default: false, group: 'District story' },
  { key: 'showCost', label: 'Cost notes', default: false, group: 'District story' },
  { key: 'showStations', label: 'Major stations', default: true, group: 'Transport' },
  { key: 'showDirectConnections', label: 'Direct connections', default: true, group: 'Transport' },
  { key: 'showUbahn', label: 'U-Bahn lines', default: false, group: 'Transit lines' },
  { key: 'showSbahn', label: 'S-Bahn lines', default: false, group: 'Transit lines' },
  { key: 'showTram', label: 'Tram lines', default: false, group: 'Transit lines' },
  { key: 'showMainRoads', label: 'Main roads', default: false, group: 'Roads' },
  { key: 'showSafety', label: 'Safety areas', default: false, group: 'Safety' },
  { key: 'showComments', label: 'Comments', default: true, group: 'Comments' }
];
