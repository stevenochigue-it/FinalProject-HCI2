import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Calendar, Users, CreditCard, Check } from 'lucide-react';
import { allRooms, roomTypes } from '../data/rooms';

export default function Reservation() {
  const [searchParams] = useSearchParams();
  const preselectedRoom = searchParams.get('room') || '';

  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomId: preselectedRoom
  });

  const [estimatedCost, setEstimatedCost] = useState(0);
  const [nights, setNights] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      setNights(diffDays);

      const selectedRoom = allRooms.find(r => r.id === formData.roomId);
      if (selectedRoom && diffDays > 0) {
        setEstimatedCost(selectedRoom.price * diffDays);
      } else {
        setEstimatedCost(0);
      }
    }
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const selectedRoom = allRooms.find(r => r.id === formData.roomId);
  const selectedRoomType = selectedRoom ? roomTypes[selectedRoom.type] : null;

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#E8F4FC' }}>
            <Check className="w-10 h-10" style={{ color: '#1E73BE' }} />
          </div>
          <h1 className="text-3xl font-bold mb-4" style={{ color: '#1E73BE' }}>
            Reservation Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your booking has been successfully submitted. We'll send you a confirmation email shortly.
          </p>
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold mb-4 text-lg">Reservation Summary</h3>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Room:</span>
                <span className="font-semibold">
                  {selectedRoomType?.name} {selectedRoom?.number}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in:</span>
                <span className="font-semibold">{formData.checkIn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-out:</span>
                <span className="font-semibold">{formData.checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nights:</span>
                <span className="font-semibold">{nights}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guests:</span>
                <span className="font-semibold">{formData.guests}</span>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <span className="text-gray-600">Total Cost:</span>
                <span className="text-2xl font-bold" style={{ color: '#1E73BE' }}>
                  ${estimatedCost.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setSubmitted(false)}
            className="px-8 py-3 text-white rounded-lg transition-all shadow-md hover:shadow-lg"
            style={{ backgroundColor: '#1E73BE' }}
          >
            Make Another Reservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1E73BE' }}>
          Make a Reservation
        </h1>
        <p className="text-xl text-gray-600">
          Book your perfect stay at Marian Hotel
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reservation Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#1E73BE' }}>
                Booking Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E73BE] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    required
                    min={formData.checkIn || new Date().toISOString().split('T')[0]}
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
                  Number of Guests
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="10"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Room
                </label>
                <select
                  required
                  value={formData.roomId}
                  onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all"
                >
                  <option value="">Choose a room...</option>
                  {Object.entries(roomTypes).map(([type, data]) => (
                    <optgroup key={type} label={`${data.name}s - $${data.price}/night`}>
                      {allRooms
                        .filter(r => r.type === type)
                        .map(room => (
                          <option key={room.id} value={room.id}>
                            {data.name} {room.number} - {data.capacity} - ${data.price}/night
                          </option>
                        ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={!formData.checkIn || !formData.checkOut || !formData.roomId}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 text-lg font-semibold text-white rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ backgroundColor: '#1E73BE' }}
            >
              <CreditCard className="w-5 h-5" />
              Confirm Reservation
            </button>
          </form>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24">
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#1E73BE' }}>
              Booking Summary
            </h3>

            {selectedRoom && selectedRoomType ? (
              <div className="space-y-4">
                <div className="mb-4">
                  <img
                    src={selectedRoom.image}
                    alt={selectedRoomType.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                <div className="pb-4 border-b">
                  <p className="text-sm text-gray-600 mb-1">Selected Room</p>
                  <p className="font-semibold text-lg">
                    {selectedRoomType.name} {selectedRoom.number}
                  </p>
                </div>

                {formData.checkIn && formData.checkOut && (
                  <>
                    <div className="pb-4 border-b">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Check-in:</span>
                        <span className="font-semibold">{formData.checkIn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-out:</span>
                        <span className="font-semibold">{formData.checkOut}</span>
                      </div>
                    </div>

                    <div className="pb-4 border-b">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Nights:</span>
                        <span className="font-semibold">{nights}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guests:</span>
                        <span className="font-semibold">{formData.guests}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">
                          ${selectedRoom.price.toFixed(2)} × {nights} {nights === 1 ? 'night' : 'nights'}
                        </span>
                        <span className="font-semibold">${estimatedCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-3xl font-bold" style={{ color: '#1E73BE' }}>
                          ${estimatedCost.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Select a room to see booking summary</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
