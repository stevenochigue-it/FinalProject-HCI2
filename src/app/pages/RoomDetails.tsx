import { useParams, Link } from 'react-router';
import { Users, Check, ArrowLeft, Calendar } from 'lucide-react';
import { roomTypes } from '../data/rooms';

export default function RoomDetails() {
  const { type, number } = useParams<{ type: string; number: string }>();

  const roomType = type as keyof typeof roomTypes;
  const typeData = roomTypes[roomType];

  if (!typeData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-xl text-gray-600">Room not found</p>
        <Link to="/rooms" className="text-blue-600 hover:underline">
          Back to Rooms
        </Link>
      </div>
    );
  }

  const images = [
    'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1776763255122-3d35e32aee64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1776763255197-495b343d5a33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1777170191230-3f357b815483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1776761363365-ad83248b93df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ];

  const mainImage = images[parseInt(number || '1') - 1] || images[0];

  return (
    <div>
      {/* Hero Image */}
      <div className="relative h-[500px] bg-gray-900">
        <img
          src={mainImage}
          alt={`${typeData.name} ${number}`}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 text-white mb-4 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Rooms
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {typeData.name} {number}
            </h1>
            <div className="flex items-center gap-4 text-white">
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                {typeData.capacity}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4" style={{ color: '#1E73BE' }}>
                Room Overview
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Welcome to our {typeData.name.toLowerCase()}, thoughtfully designed to provide you with
                exceptional comfort and convenience. This room accommodates {typeData.capacity.toLowerCase()},
                making it perfect for {
                  roomType === 'family' ? 'large families or groups' :
                  roomType === 'executive' ? 'business travelers or couples' :
                  roomType === 'sweet' ? 'small families or friends' :
                  roomType === 'deluxe' ? 'couples or small families' :
                  'solo travelers or couples'
                }.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#1E73BE' }}>
                Room Amenities
              </h2>
              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {typeData.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8F4FC' }}>
                          <Check className="w-4 h-4" style={{ color: '#1E73BE' }} />
                        </div>
                      </div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Room Features by Type */}
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#1E73BE' }}>
                What Makes This Room Special
              </h3>
              <div className="space-y-3 text-gray-700">
                {roomType === 'standard' && (
                  <>
                    <p>• Perfect for budget-conscious travelers who don't want to compromise on comfort</p>
                    <p>• Cozy atmosphere with all essential amenities for a pleasant stay</p>
                    <p>• Ideal for short stays or business trips</p>
                  </>
                )}
                {roomType === 'deluxe' && (
                  <>
                    <p>• Enhanced comfort with a larger bed and additional workspace</p>
                    <p>• Mini refrigerator for storing snacks and beverages</p>
                    <p>• Perfect balance of luxury and value</p>
                  </>
                )}
                {roomType === 'sweet' && (
                  <>
                    <p>• Spacious layout with a separate living area for relaxation</p>
                    <p>• Private balcony with scenic views</p>
                    <p>• Coffee maker for your morning brew</p>
                  </>
                )}
                {roomType === 'executive' && (
                  <>
                    <p>• Premium king-size bed for ultimate comfort</p>
                    <p>• Smart TV with streaming capabilities</p>
                    <p>• In-room safe for valuables and premium toiletries</p>
                  </>
                )}
                {roomType === 'family' && (
                  <>
                    <p>• Spacious accommodations with two beds (Queen + Double)</p>
                    <p>• Full dining area and microwave for family meals</p>
                    <p>• Ample storage space for extended stays</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24">
              <div className="mb-6">
                <p className="text-gray-600 mb-2">Price per night</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold" style={{ color: '#1E73BE' }}>
                    ${typeData.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mb-6 pb-6 border-b">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600">Guest Capacity</span>
                  <span className="font-semibold">{typeData.capacity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Room Number</span>
                  <span className="font-semibold">#{number}</span>
                </div>
              </div>

              <Link
                to={`/reservation?room=${roomType}-${number}`}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 text-lg font-semibold text-white rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: '#1E73BE' }}
              >
                <Calendar className="w-5 h-5" />
                Check Availability
              </Link>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600 mb-3">This room includes:</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4" style={{ color: '#1E73BE' }} />
                    Free cancellation (24h notice)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4" style={{ color: '#1E73BE' }} />
                    Complimentary breakfast
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4" style={{ color: '#1E73BE' }} />
                    24/7 room service
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
