const router = require('express').Router();

const rooms = [
  {
    _id: '1',
    name: 'Moonlit Standard Room',
    type: 'Standard',
    description: 'A comfortable and well-appointed room featuring modern amenities, plush bedding, and a serene atmosphere perfect for the discerning traveler.',
    price: 1800,
    capacity: 2,
    size: '220 sq ft',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'LED TV', 'Work Desk', 'En-suite Bathroom', 'Daily Housekeeping'],
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800'],
    available: true,
    featured: false,
  },
  {
    _id: '2',
    name: 'Celestial Deluxe Room',
    type: 'Deluxe',
    description: 'Indulge in elevated comfort with our Deluxe Room, offering panoramic city views, premium furnishings, and an exquisite blend of style and functionality.',
    price: 2800,
    capacity: 2,
    size: '320 sq ft',
    amenities: ['Free Wi-Fi', 'Air Conditioning', '55" Smart TV', 'City View', 'Mini Bar', 'Premium Toiletries', 'Work Desk', 'Room Service'],
    images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'],
    available: true,
    featured: true,
  },
  {
    _id: '3',
    name: 'Lunar Suite',
    type: 'Suite',
    description: 'Experience the pinnacle of luxury in our Lunar Suite — a spacious sanctuary with a separate living area, opulent décor, and breathtaking views of Firozabad.',
    price: 5500,
    capacity: 3,
    size: '580 sq ft',
    amenities: ['Free Wi-Fi', 'Air Conditioning', '65" OLED TV', 'Panoramic Views', 'Jacuzzi', 'Mini Bar', 'Living Room', 'Butler Service', 'Premium Toiletries', 'Room Service 24/7'],
    images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'],
    available: true,
    featured: true,
  },
  {
    _id: '4',
    name: 'Presidential Suite',
    type: 'Presidential',
    description: 'The crown jewel of Hotel Moon — our Presidential Suite offers an unmatched experience with a grand living room, private dining, a rooftop terrace, and exclusive personalized service.',
    price: 12000,
    capacity: 4,
    size: '1200 sq ft',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Multiple Smart TVs', 'Private Terrace', 'Jacuzzi & Rain Shower', 'Full Kitchen', 'Private Dining', 'Dedicated Butler', 'Limousine Service', 'Complimentary Minibar'],
    images: ['https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800', 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800'],
    available: true,
    featured: true,
  },
  {
    _id: '5',
    name: 'Starlight Deluxe Room',
    type: 'Deluxe',
    description: 'A beautifully designed Deluxe Room with premium king-size bedding, a marble bathroom, and thoughtful touches that make every stay memorable.',
    price: 3200,
    capacity: 2,
    size: '350 sq ft',
    amenities: ['Free Wi-Fi', 'Air Conditioning', '55" Smart TV', 'Marble Bathroom', 'Mini Bar', 'Coffee Maker', 'Room Service', 'Pool View'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800'],
    available: true,
    featured: false,
  },
  {
    _id: '6',
    name: 'Eclipse Suite',
    type: 'Suite',
    description: 'Our Eclipse Suite combines contemporary elegance with timeless comfort — featuring a king bedroom, spacious lounge, and a private balcony overlooking the city.',
    price: 6500,
    capacity: 3,
    size: '650 sq ft',
    amenities: ['Free Wi-Fi', 'Air Conditioning', '65" Smart TV', 'Private Balcony', 'Bathtub & Shower', 'Living Lounge', 'Mini Bar', 'Butler Service', 'Room Service 24/7'],
    images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'],
    available: true,
    featured: false,
  },
];

router.get('/', (req, res) => {
  let result = [...rooms];
  if (req.query.type) result = result.filter(r => r.type === req.query.type);
  if (req.query.available) result = result.filter(r => r.available === (req.query.available === 'true'));
  res.json(result);
});

router.get('/featured', (req, res) => {
  res.json(rooms.filter(r => r.featured && r.available));
});

router.get('/:id', (req, res) => {
  const room = rooms.find(r => r._id === req.params.id);
  if (!room) return res.status(404).json({ message: 'Room not found' });
  res.json(room);
});

module.exports = router;
