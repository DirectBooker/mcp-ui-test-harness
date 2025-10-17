export interface Hotel {
  hotel_id?: number | undefined;
  property_token: string;
  name: string;
  price: string;
  price_link?: string | undefined;
  description: string;
  rating: number;
  amenities: string[];
  carousel_image?: string | undefined;
}

export const MIDDLE_EARTH_HOTELS: Hotel[] = [
  {
    hotel_id: 1,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137721",
    property_token: "token_1",
    name: "The Prancing Pony",
    price: "45 silver pieces",
    description:
      "A cozy inn in the heart of Bree, famous for its warm hearth and excellent ale. Popular with travelers and locals alike.",
    rating: 4.2,
    amenities: [
      "Fireplace",
      "Ale & Mead",
      "Stables",
      "Hot Meals",
      "Common Room",
    ],
    carousel_image:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTLvFOqd6OUI_Q7yapFr7VECBSJgH2nXXI6J1cOO_buHJKv97mkKQQe5qFgZs6X",
  },
  {
    hotel_id: 2,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137722",
    property_token: "token_2",
    name: "Rivendell Guest Quarters",
    price: "150 mithril coins",
    description:
      "Elegant elven accommodations in the Last Homely House. Enjoy healing springs and timeless tranquility.",
    rating: 4.9,
    amenities: [
      "Healing Springs",
      "Elven Cuisine",
      "Library Access",
      "Garden Views",
      "Musical Entertainment",
    ],
    carousel_image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJMG8URg06havsUdWmCIWiDAzyQmTETuOis_Thtvd7cY-1sUHN_udDy1axJMXW",
  },
  {
    hotel_id: 3,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137723",
    property_token: "token_3",
    name: "The Green Dragon Inn",
    price: "25 copper pennies",
    description:
      "A beloved hobbit inn in Bywater, known for its exceptional beer and hearty hobbit fare.",
    rating: 4.5,
    amenities: [
      "Hobbit Ale",
      "Seven Meals Daily",
      "Pipe Smoking Area",
      "Garden Seating",
      "Local Music",
    ],
    carousel_image:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcROnXJnyjgKtQ4bu_y6kA9Q9-jPDIGf7aIWlPnJeSyjE-1fLM0de9K2YWL3P5f7",
  },
  {
    hotel_id: 4,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137724",
    property_token: "token_4",
    name: "Minas Tirith Royal Suites",
    price: "200 gold pieces",
    description:
      "Luxurious accommodations in the White City with panoramic views of Gondor's capital.",
    rating: 4.8,
    amenities: [
      "City Views",
      "Royal Dining",
      "Guard Protection",
      "Marble Baths",
      "Concierge Service",
    ],
    carousel_image:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRo_YXs0-pGUfGNZADrhZ_naXrxwiIoj7AYbgIIX0TOoK3ZeklVR7Ym_xMh9LCj",
  },
  {
    hotel_id: 5,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137725",
    property_token: "token_5",
    name: "Edoras Meadhall Lodge",
    price: "80 silver pieces",
    description:
      "Traditional Rohirrim hospitality in the halls of the Horse Lords. Experience the culture of the Riddermark.",
    rating: 4.3,
    amenities: [
      "Mead Hall",
      "Horse Stables",
      "Traditional Feasts",
      "Storytelling",
      "Weapon Storage",
    ],
    carousel_image:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSjsdEzs8bcf0Mt6CVJ6s0GIPBhtFcEk5O5s0GMM4Pt1rpVCFAwF4ViOsaq1l88",
  },
  {
    hotel_id: 6,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137726",
    property_token: "token_6",
    name: "Lothlórien Treehouses",
    price: "120 silver pieces",
    description:
      "Mystical tree-top dwellings in the Golden Wood. Sleep among the mallorn trees under starlight.",
    rating: 4.7,
    amenities: [
      "Treetop Views",
      "Elven Bread",
      "Mirror of Galadriel Tours",
      "Woodland Walks",
      "Starlight Terraces",
    ],
    carousel_image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEN8cRb3fSKz3frQo7-FDp-RgVs-EPOj_MqO330fnO34P5W0XMwDoTVvgJk_rY",
  },
  {
    hotel_id: 7,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137727",
    property_token: "token_7",
    name: "The Forsaken Inn",
    price: "30 silver pieces",
    description:
      "A weathered but sturdy inn on the East Road, offering basic but clean accommodations for weary travelers.",
    rating: 3.8,
    amenities: [
      "Basic Lodging",
      "Hot Soup",
      "Stable Care",
      "Weather Protection",
      "Map Services",
    ],
    carousel_image:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSLx6D5WwXJ2m3Sn6cDi58mOJ93qC5cASLLGfDkHFgkQhFCY_lW3DOh9zTJajB8",
  },
  {
    hotel_id: 8,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137728",
    property_token: "token_8",
    name: "Lake-town Floating Hotel",
    price: "60 silver pieces",
    description:
      "Unique floating accommodations on Long Lake with fresh fish daily and stunning mountain views.",
    rating: 4.1,
    amenities: [
      "Lake Views",
      "Fresh Fish",
      "Boat Rentals",
      "Trading Post Access",
      "Mountain Vistas",
    ],
    carousel_image:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT-0zXhlRXtZukwXYNj9-uw_XRNbVybr1HSZ1_L4edD5MenMkiT48tiXhN2yAIG",
  },
  {
    hotel_id: 9,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137729",
    property_token: "token_9",
    name: "Bag End Bed & Breakfast",
    price: "40 silver pieces",
    description:
      "Stay in a authentic hobbit-hole with all the comforts of the Shire. Perfect circular doors and seven meals included.",
    rating: 4.6,
    amenities: [
      "Hobbit Architecture",
      "Garden Views",
      "Seven Meals",
      "Pipe-weed",
      "Cozy Interiors",
    ],
    carousel_image:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcReylWwkRwYpWbMXXurmCHGvhVy7MnqYq2SgX66iKkVDUW0DFoy0Bg3FiHTcc4l",
  },
  {
    hotel_id: 10,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137730",
    property_token: "token_10",
    name: "Helm's Deep Fortress Stay",
    price: "90 silver pieces",
    description:
      "Secure lodgings within the legendary fortress. Experience history while enjoying impenetrable protection.",
    rating: 4.4,
    amenities: [
      "Fortress Security",
      "Historical Tours",
      "Armory Access",
      "Battlements Views",
      "Warrior Training",
    ],
    carousel_image:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQSwf0pXqQ7M4mzj8M_OD56912l9RvPWJVSKd6HZeiYbD0ZiQ7yLbGGYPDz2k-k",
  },
  {
    hotel_id: 11,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137731",
    property_token: "token_11",
    name: "The Ivy Bush",
    price: "35 silver pieces",
    description:
      "A charming inn in Hobbiton known for its excellent service and traditional hobbit hospitality.",
    rating: 4.3,
    amenities: [
      "Traditional Hobbit Food",
      "Ivy-Covered Walls",
      "Local Beer",
      "Smoking Room",
      "Storytelling Corner",
    ],
    carousel_image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTliScaHbCSrB7O_ee6ZlQxEWB5tTVCyjRT1lsmEX1xMxew1byUKC1oaQG0lcbP",
  },
  {
    hotel_id: 12,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137732",
    property_token: "token_12",
    name: "Isengard Tower Suites",
    price: "110 silver pieces",
    description:
      "Modern accommodations in the restored Tower of Orthanc with industrial-age amenities.",
    rating: 3.9,
    amenities: [
      "Tower Views",
      "Industrial Heating",
      "Mechanical Lifts",
      "Observatory Access",
      "Library",
    ],
    carousel_image:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTfDrwqgbXxVbeC9qukeM08cO0RLC7kqp0Kf-dTtMivMkQIGVh07AmcGVHolTIA",
  },
  {
    hotel_id: 13,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137733",
    property_token: "token_13",
    name: "Fangorn Forest Retreat",
    price: "75 silver pieces",
    description:
      "Eco-friendly treehouse accommodations deep in the ancient forest. Listen to the trees whisper.",
    rating: 4.2,
    amenities: [
      "Ancient Trees",
      "Nature Sounds",
      "Ent Encounters",
      "Herbal Teas",
      "Forest Walks",
    ],
    carousel_image:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQEYwEnh89p3u4HNhMK0h4cnbticzTVRrdFkNcVDrgGWZHv-Ge0CByWNIEgwgIx",
  },
  {
    hotel_id: 14,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137734",
    property_token: "token_14",
    name: "Dale Merchant Inn",
    price: "65 silver pieces",
    description:
      "Bustling inn in the rebuilt city of Dale, perfect for traders and adventurers exploring Erebor.",
    rating: 4.0,
    amenities: [
      "Trading Hub",
      "Erebor Tours",
      "Merchant Services",
      "Currency Exchange",
      "Caravan Parking",
    ],
    carousel_image:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR4PKneTtACabYa1fhFE9q1QOhW3aEJnw4s_bcAB_F9-aQP4qyxQkHoBphq24Do",
  },
  {
    hotel_id: 15,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137735",
    property_token: "token_15",
    name: "Weathertop Watchtower Lodge",
    price: "50 silver pieces",
    description:
      "Solitary accommodations atop the ancient watchtower with commanding views of Eriador.",
    rating: 3.7,
    amenities: [
      "Panoramic Views",
      "Stargazing",
      "Ancient Ruins",
      "Weather Monitoring",
      "Solitude",
    ],
    carousel_image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxW6NgiTQ0e1-eKuNk1h1wF3WVtdOZnb9eU1r9Ilad7Su2ZQVvEDkyivOnQyEe",
  },
  {
    hotel_id: 16,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137736",
    property_token: "token_16",
    name: "Thranduil's Palace Guest Wing",
    price: "180 silver pieces",
    description:
      "Luxurious elven accommodations in the Woodland Realm with underground wine cellars and forest views.",
    rating: 4.8,
    amenities: [
      "Elven Wine",
      "Underground Halls",
      "Forest Views",
      "Royal Treatment",
      "Spider-Free Guarantee",
    ],
    carousel_image:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSqRwWTcHJOu1-vkxe-nmtOpZZKToBMWeDRtsayYQO9QbRbU3tly7Z340XhBu-j",
  },
  {
    hotel_id: 17,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137737",
    property_token: "token_17",
    name: "The Golden Perch",
    price: "55 silver pieces",
    description:
      "Riverside inn in Stock famous for its fish dishes and peaceful location along the Brandywine.",
    rating: 4.1,
    amenities: [
      "Riverside Location",
      "Fresh Fish",
      "River Views",
      "Boat Dock",
      "Quiet Atmosphere",
    ],
    carousel_image:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRMzZ4yTKvFqRuPm3w44ISV5EYM6JbPWkoGP9P1B8L__JJmPt0P-TH5RaLehDDa",
  },
  {
    hotel_id: 18,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137738",
    property_token: "token_18",
    name: "Dunharrow Mountain Lodge",
    price: "70 silver pieces",
    description:
      "High-altitude accommodations with breathtaking mountain views and access to ancient paths.",
    rating: 4.2,
    amenities: [
      "Mountain Views",
      "Ancient Paths",
      "High Altitude",
      "Stone Carvings",
      "Echo Effects",
    ],
    carousel_image:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT-S8fQ5ai1F-M-XYb4yK5gbEA1MYSgvH2skwrOsKbUPDcoqHMKlYlfI8lQe7zP",
  },
  {
    hotel_id: 19,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137739",
    property_token: "token_19",
    name: "Shire Countryside Inn",
    price: "42 silver pieces",
    description:
      "Peaceful countryside lodging surrounded by rolling green hills and hobbit farms.",
    rating: 4.4,
    amenities: [
      "Rolling Hills",
      "Farm Fresh Food",
      "Country Air",
      "Flower Gardens",
      "Peaceful Setting",
    ],
    carousel_image:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSQMtbxL7eKw2FUFo2vP3mKg0Om1h5MhW6e-FgnIZMkgjNyTEVm_Bvc9utni4yb",
  },
  {
    hotel_id: 20,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137740",
    property_token: "token_20",
    name: "Dol Amroth Seaside Resort",
    price: "130 silver pieces",
    description:
      "Elegant seaside accommodations in the Swan Knight's city with ocean views and nautical amenities.",
    rating: 4.6,
    amenities: [
      "Ocean Views",
      "Swan Boat Tours",
      "Seafood Cuisine",
      "Beach Access",
      "Maritime Museum",
    ],
    carousel_image:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQnUQw9QwPY2ohUNdTCZjQrGBuC1kbyizC2MXO17ZWKioGR-W64ZPSZDfctYG8q",
  },
  {
    hotel_id: 21,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137741",
    property_token: "token_21",
    name: "The Old Forest House",
    price: "45 silver pieces",
    description:
      "Mystical accommodations on the edge of the Old Forest, with protection from Old Man Willow.",
    rating: 3.9,
    amenities: [
      "Forest Edge",
      "Tree Protection",
      "Nature Walks",
      "Mysterious Atmosphere",
      "Tom Bombadil Nearby",
    ],
    carousel_image:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRi4kGI8QSmaFUcyh_17N1Dv33o-7892Z_n0iTC00b_AoihyhpkeY_c0P82L17m",
  },
  {
    hotel_id: 22,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137742",
    property_token: "token_22",
    name: "Cirith Ungol Watchtower",
    price: "25 silver pieces",
    description:
      "Budget accommodations in the watchtower with basic amenities. Not for the faint-hearted.",
    rating: 2.8,
    amenities: [
      "Basic Shelter",
      "High Security",
      "Mountain Pass Access",
      "Orc-Free Rooms",
      "Strategic Location",
    ],
    carousel_image:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSteiXrlvrNzdugxBt3ARMoFboctNAXJkVWEoy1BE-8qalO_7nvJAJ7crk5AB42",
  },
  {
    hotel_id: 23,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137743",
    property_token: "token_23",
    name: "Rohan Royal Stables Inn",
    price: "85 silver pieces",
    description:
      "Premier horse-friendly accommodations in Rohan with world-class stables and riding trails.",
    rating: 4.5,
    amenities: [
      "World-Class Stables",
      "Riding Trails",
      "Horse Training",
      "Rohirrim Culture",
      "Meadow Views",
    ],
    carousel_image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLhtS-fIFoT6y6wR4CRVt6F1eq4hX0HxMX4s2WihArZM7wNHZMo0i4xJI2xSqF",
  },
  {
    hotel_id: 24,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137744",
    property_token: "token_24",
    name: "Hobbiton Hill House",
    price: "48 silver pieces",
    description:
      "Traditional hobbit-hole built into a hillside with spectacular views of the Shire's countryside.",
    rating: 4.3,
    amenities: [
      "Hillside Location",
      "Traditional Architecture",
      "Shire Views",
      "Garden Plots",
      "Root Cellars",
    ],
    carousel_image:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTLvFOqd6OUI_Q7yapFr7VECBSJgH2nXXI6J1cOO_buHJKv97mkKQQe5qFgZs6X",
  },
  {
    hotel_id: 25,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137745",
    property_token: "token_25",
    name: "Osgiliath Bridge Inn",
    price: "60 silver pieces",
    description:
      "Historic inn on the great bridge over Anduin, recently rebuilt with modern comforts.",
    rating: 4.0,
    amenities: [
      "Historic Location",
      "Bridge Views",
      "River Access",
      "Rebuilt Comfort",
      "Strategic Position",
    ],
    carousel_image:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSdw_O9-hiW_wPf0NujGMK4s2gJBfzKAq72jXV0lXSLOw8rcsmHi-EYB5uIEjDN",
  },
  {
    hotel_id: 26,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137746",
    property_token: "token_26",
    name: "Grey Havens Departure Lounge",
    price: "95 silver pieces",
    description:
      "Tranquil accommodations at the Grey Havens with views of ships sailing to the Undying Lands.",
    rating: 4.7,
    amenities: [
      "Harbor Views",
      "Ship Watching",
      "Elven Departure Ceremonies",
      "Ocean Breeze",
      "Peaceful Departure",
    ],
    carousel_image:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSjzgzBMdpojWLb-TO_DE5UBq1VKVx2BmYyftioNcE2l_MEALvPNwybKoY3U11r",
  },
  {
    hotel_id: 27,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137747",
    property_token: "token_27",
    name: "Erebor Royal Chambers",
    price: "250 gold pieces",
    description:
      "Luxurious underground chambers in the Lonely Mountain with access to the great dwarven halls.",
    rating: 4.9,
    amenities: [
      "Underground Luxury",
      "Dwarven Craftsmanship",
      "Treasure Views",
      "Mountain Security",
      "Royal Treatment",
    ],
    carousel_image:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcReylWwkRwYpWbMXXurmCHGvhVy7MnqYq2SgX66iKkVDUW0DFoy0Bg3FiHTcc4l",
  },
  {
    hotel_id: 28,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137748",
    property_token: "token_28",
    name: "Bucklebury Ferry House",
    price: "38 silver pieces",
    description:
      "Cozy inn by the Brandywine ferry crossing, popular with hobbits traveling between the Shire.",
    rating: 4.2,
    amenities: [
      "Ferry Access",
      "River Views",
      "Hobbit Hospitality",
      "Brandywine Fish",
      "Crossing Services",
    ],
    carousel_image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBDi8RzLbVx2ixMpg5dDysguoIokPYH5xiyStTrH6Pdwq_UkiGlh18JE83Vzqb",
  },
  {
    hotel_id: 29,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137749",
    property_token: "token_29",
    name: "Crickhollow Country Manor",
    price: "75 silver pieces",
    description:
      "Elegant country estate in Buckland with spacious gardens and refined hobbit luxury.",
    rating: 4.4,
    amenities: [
      "Country Estate",
      "Spacious Gardens",
      "Refined Dining",
      "Privacy",
      "Luxury Hobbit Holes",
    ],
    carousel_image:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSoLuQKJI_VWnPEnCBMy4PpSrbLovWFKI5mR8KwS5vFpNVGGLRmx8p5V1W19jht",
  },
  {
    hotel_id: 30,
    price_link: "https://www.directbooker.com/en-us/hotel-detail/137750",
    property_token: "token_30",
    name: "Tom Bombadil's Forest Cottage",
    price: "20 silver pieces",
    description:
      "Unique stay with the enigmatic Tom Bombadil in his cottage, where time seems to stand still.",
    rating: 4.8,
    amenities: [
      "Time Suspension",
      "Nature Communion",
      "Ancient Wisdom",
      "Goldberry's Garden",
      "Ring Protection",
    ],
    carousel_image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJc8j5HJ-JQMYR_-8_PmnWWdJrcF-OSW9kvwMZBj50Vjlt7l8enllHn96Zz5bl",
  },
];
