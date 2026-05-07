export interface Room {
  id: string;
  type: 'standard' | 'deluxe' | 'sweet' | 'executive' | 'family';
  number: number;
  price: number;
  capacity: string;
  image: string;
  amenities: string[];
}

export const roomTypes = {
  standard: {
    name: 'Standard Room',
    price: 56.74,
    capacity: '3-4 guests',
    amenities: [
      'Free WiFi',
      'Air Conditioning',
      'Hot & Cold Shower',
      'TV',
      'Complimentary Water'
    ]
  },
  deluxe: {
    name: 'Deluxe Room',
    price: 64.85,
    capacity: '4-5 guests',
    amenities: [
      'Free WiFi',
      'Air Conditioning',
      'Hot & Cold Shower',
      'TV',
      'Complimentary Water',
      'Mini Refrigerator',
      'Work Desk',
      'Soft Lighting',
      'Larger Bed'
    ]
  },
  sweet: {
    name: 'Sweet Room',
    price: 89.17,
    capacity: '5-6 guests',
    amenities: [
      'Free WiFi',
      'Air Conditioning',
      'Hot & Cold Shower',
      'TV',
      'Complimentary Water',
      'Mini Refrigerator',
      'Work Desk',
      'Soft Lighting',
      'Larger Bed',
      'Small Living Area',
      'Coffee Maker',
      'Balcony View',
      'Hair Dryer'
    ]
  },
  executive: {
    name: 'Executive Room',
    price: 145.91,
    capacity: '5 guests',
    amenities: [
      'Free WiFi',
      'Air Conditioning',
      'Hot & Cold Shower',
      'TV',
      'Complimentary Water',
      'Mini Refrigerator',
      'Work Desk',
      'Soft Lighting',
      'Larger Bed',
      'Small Living Area',
      'Coffee Maker',
      'Balcony View',
      'Hair Dryer',
      'King-size Bed',
      'Smart TV',
      'In-room Safe',
      'Premium Toiletries'
    ]
  },
  family: {
    name: 'Family Room',
    price: 162.13,
    capacity: '10 guests',
    amenities: [
      'Free WiFi',
      'Air Conditioning',
      'Hot & Cold Shower',
      'TV',
      'Complimentary Water',
      'Mini Refrigerator',
      'Work Desk',
      'Soft Lighting',
      'Larger Bed',
      'Small Living Area',
      'Coffee Maker',
      'Balcony View',
      'Hair Dryer',
      'King-size Bed',
      'Smart TV',
      'In-room Safe',
      'Premium Toiletries',
      '2 Beds (Queen + Double)',
      'Dining Table',
      'Microwave',
      'Extra Storage Space'
    ]
  }
};

const images = [
  'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1776763255122-3d35e32aee64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1776763255197-495b343d5a33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1777170191230-3f357b815483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1776761363365-ad83248b93df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
];

export const allRooms: Room[] = [];

Object.entries(roomTypes).forEach(([type, data]) => {
  for (let i = 1; i <= 5; i++) {
    allRooms.push({
      id: `${type}-${i}`,
      type: type as Room['type'],
      number: i,
      price: data.price,
      capacity: data.capacity,
      image: images[(i - 1) % images.length],
      amenities: data.amenities
    });
  }
});
