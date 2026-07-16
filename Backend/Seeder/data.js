const products = [
  {
    name: "Parcel Weighing Scale",
    price: 2699,
    stock: 14,
    category: "Parcel Scale",
    image:
      "https://res.cloudinary.com/dbwzoa5gi/image/upload/v1784113631/22cebc5d-206d-4b74-bf02-a69ea27cb898.png",
    description: {
      overview: "Digital parcel scale for courier and logistics businesses.",
      specifications: {
        brand: "ShipEasy",
        capacity: "50 kg",
        weight: "2.8 kg",
        dimensions: "35 x 35 x 6 cm",
        warranty: "1 Year",
      },
    },
  },
  {
    name: "Medical Body Scale",
    price: 6999,
    stock: 7,
    category: "Medical Scale",
    image:
      "https://res.cloudinary.com/dbwzoa5gi/image/upload/v1784113704/26bd2e0c-4dbf-4727-84b0-297d3e9f215e.png",
    description: {
      overview: "Professional body weighing scale for clinics and hospitals.",
      specifications: {
        brand: "MediTech",
        capacity: "250 kg",
        weight: "12 kg",
        dimensions: "50 x 50 x 10 cm",
        warranty: "3 Years",
      },
    },
  },
  {
    name: "Bench Scale 60kg",
    price: 4599,
    stock: 11,
    category: "Bench Scale",
    image:
      "https://res.cloudinary.com/dbwzoa5gi/image/upload/v1784113778/4449de54-0b8c-4689-b652-b0bced95fd63.png",
    description: {
      overview: "Bench weighing scale ideal for grocery stores.",
      specifications: {
        brand: "BenchMaster",
        capacity: "60 kg",
        weight: "5.5 kg",
        dimensions: "35 x 30 x 12 cm",
        warranty: "2 Years",
      },
    },
  },
  {
    name: "Platform Scale 150kg",
    price: 4999,
    stock: 10,
    category: "Platform Scale",
    image:
      "https://res.cloudinary.com/dbwzoa5gi/image/upload/v1784113847/f9ff571f-08b6-415e-9cef-58ca0dd20f97.png",
    description: {
      overview: "Industrial platform scale for shops and warehouses.",
      specifications: {
        brand: "ScaleMax",
        capacity: "150 kg",
        weight: "9 kg",
        dimensions: "40 x 50 x 10 cm",
        warranty: "2 Years",
      },
    },
  },
  {
    name: "Digital Kitchen Scale 5kg",
    price: 899,
    stock: 30,
    category: "Kitchen Scale",
    image:
      "https://res.cloudinary.com/dbwzoa5gi/image/upload/v1784100212/0c49a580-00d5-44c0-a49c-5624ffee8580.png",
    description: {
      overview:
        "Compact digital kitchen scale with accurate weight measurement for daily cooking and baking.",
      specifications: {
        brand: "WeightPro",
        capacity: "5 kg",
        weight: "420 g",
        dimensions: "18 x 14 x 3 cm",
        warranty: "1 Year",
      },
    },
  },
  {
    name: "Digital Kitchen Scale 10kg",
    price: 1199,
    stock: 20,
    category: "Kitchen Scale",
    image:
      "https://res.cloudinary.com/dbwzoa5gi/image/upload/v1784100260/adebb6c4-53bc-4b66-8013-a7a47eb92dc8.png",
    description: {
      overview:
        "High precision kitchen scale with LCD display and tare function.",
      specifications: {
        brand: "SmartScale",
        capacity: "10 kg",
        weight: "650 g",
        dimensions: "22 x 17 x 3 cm",
        warranty: "1 Year",
      },
    },
  },
  {
    name: "Bathroom Weight Scale",
    price: 1499,
    stock: 18,
    category: "Personal Scale",
    image:
      "https://res.cloudinary.com/dbwzoa5gi/image/upload/v1784100308/3a4eebef-d7cd-4f45-b115-29fb7994bdc9.png",
    description: {
      overview: "Tempered glass body weight scale with auto on/off.",
      specifications: {
        brand: "HealthTrack",
        capacity: "180 kg",
        weight: "1.8 kg",
        dimensions: "30 x 30 x 2.5 cm",
        warranty: "2 Years",
      },
    },
  },
  {
    name: "Smart BMI Scale",
    price: 2499,
    stock: 15,
    category: "Personal Scale",
    image:
      "https://res.cloudinary.com/dbwzoa5gi/image/upload/v1784100368/327e1781-90e0-4131-8b90-842678a19fc5.png",
    description: {
      overview: "Bluetooth-enabled smart scale with BMI and body fat analysis.",
      specifications: {
        brand: "FitSense",
        capacity: "180 kg",
        weight: "2 kg",
        dimensions: "30 x 30 x 2.8 cm",
        warranty: "2 Years",
      },
    },
  },
  {
    name: "Jewellery Precision Scale",
    price: 999,
    stock: 40,
    category: "Jewellery Scale",
    image:
      "https://res.cloudinary.com/dbwzoa5gi/image/upload/v1784100435/5fbee48e-9a74-4077-a5c0-d005077cef50.png",
    description: {
      overview: "High precision pocket scale suitable for jewellery and gold.",
      specifications: {
        brand: "GoldTech",
        capacity: "500 g",
        weight: "180 g",
        dimensions: "12 x 7 x 2 cm",
        warranty: "1 Year",
      },
    },
  },
  {
    name: "Pocket Digital Scale",
    price: 799,
    stock: 35,
    category: "Pocket Scale",
    image:
      "https://res.cloudinary.com/dbwzoa5gi/image/upload/v1784113956/5551148a-af62-4770-aa8e-2fa79a6331f1.png",
    description: {
      overview: "Portable digital scale with backlit LCD display.",
      specifications: {
        brand: "MiniWeigh",
        capacity: "200 g",
        weight: "160 g",
        dimensions: "11 x 6 x 2 cm",
        warranty: "1 Year",
      },
    },
  },
  {
    name: "Luggage Weighing Scale",
    price: 699,
    stock: 45,
    category: "Luggage Scale",
    image:
      "https://res.cloudinary.com/dbwzoa5gi/image/upload/v1784114032/28f80753-074c-49db-a46b-50d3eb7d40c0.png",
    description: {
      overview: "Handheld luggage scale for travel with digital display.",
      specifications: {
        brand: "TravelMate",
        capacity: "50 kg",
        weight: "120 g",
        dimensions: "15 x 4 x 3 cm",
        warranty: "6 Months",
      },
    },
  },
  {
    name: "Hanging Scale 100kg",
    price: 1899,
    stock: 22,
    category: "Hanging Scale",
    image:
      "https://res.cloudinary.com/dbwzoa5gi/image/upload/v1784114179/9b4ebf99-7c13-48ed-952e-956df56fe90b.png",
    description: {
      overview: "Heavy-duty hanging scale for industrial and warehouse use.",
      specifications: {
        brand: "HeavyLift",
        capacity: "100 kg",
        weight: "900 g",
        dimensions: "26 x 12 x 5 cm",
        warranty: "1 Year",
      },
    },
  },
  {
    name: "Commercial Price Computing Scale",
    price: 3299,
    stock: 12,
    category: "Retail Scale",
    image:
      "https://res.cloudinary.com/dbwzoa5gi/image/upload/v1784100699/c5e7a043-f1a8-4b4e-b0f7-3e8c2eb097bc.png",
    description: {
      overview: "Electronic retail scale with price calculation feature.",
      specifications: {
        brand: "RetailPro",
        capacity: "30 kg",
        weight: "3.5 kg",
        dimensions: "34 x 33 x 12 cm",
        warranty: "2 Years",
      },
    },
  },
  {
    name: "Baby Weight Scale",
    price: 3499,
    stock: 9,
    category: "Medical Scale",
    image:
      "https://res.cloudinary.com/dbwzoa5gi/image/upload/v1784100755/3b85c5b0-08e5-4bac-b26e-0038735a39a6.png",
    description: {
      overview: "Digital baby weighing scale with stable measurement.",
      specifications: {
        brand: "CarePlus",
        capacity: "20 kg",
        weight: "2.6 kg",
        dimensions: "55 x 30 x 8 cm",
        warranty: "2 Years",
      },
    },
  },

  {
    name: "Crane Scale 500kg",
    price: 9999,
    stock: 5,
    category: "Crane Scale",
    image:
      "https://res.cloudinary.com/dbwzoa5gi/image/upload/v1784104408/1ad28afe-f311-4f10-8ddd-f7ec6440934f.png",
    description: {
      overview: "Wireless crane scale for heavy industrial weighing.",
      specifications: {
        brand: "PowerLift",
        capacity: "500 kg",
        weight: "6 kg",
        dimensions: "42 x 20 x 10 cm",
        warranty: "2 Years",
      },
    },
  },
  {
    name: "Crane Scale 1 Ton",
    price: 15999,
    stock: 4,
    category: "Crane Scale",
    image:
      "https://res.cloudinary.com/dbwzoa5gi/image/upload/v1784104455/3271fca4-edc5-4562-9df5-c698e9ab020f.png",
    description: {
      overview: "Industrial crane scale designed for warehouses.",
      specifications: {
        brand: "PowerLift",
        capacity: "1000 kg",
        weight: "8 kg",
        dimensions: "45 x 22 x 12 cm",
        warranty: "3 Years",
      },
    },
  },
  {
    name: "Laboratory Precision Scale",
    price: 8499,
    stock: 8,
    category: "Laboratory Scale",
    image:
      "https://res.cloudinary.com/dbwzoa5gi/image/upload/v1784104492/0a0e37ef-f44d-40b9-ab4c-6aafa52d087d.png",
    description: {
      overview: "High accuracy laboratory balance for research purposes.",
      specifications: {
        brand: "LabTech",
        capacity: "5000 g",
        weight: "3.2 kg",
        dimensions: "28 x 22 x 10 cm",
        warranty: "2 Years",
      },
    },
  },

  {
    name: "Industrial Floor Scale",
    price: 24999,
    stock: 3,
    category: "Industrial Scale",
    image:
      "https://res.cloudinary.com/dbwzoa5gi/image/upload/v1784104586/ff1716c1-7131-44f5-8767-4c91044adf2b.png",
    description: {
      overview: "Heavy-duty floor weighing scale for factories and warehouses.",
      specifications: {
        brand: "IndustrialPro",
        capacity: "2000 kg",
        weight: "65 kg",
        dimensions: "120 x 120 x 12 cm",
        warranty: "5 Years",
      },
    },
  },
];

module.exports = { data: products };
