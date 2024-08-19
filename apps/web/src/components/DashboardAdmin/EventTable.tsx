import React, { useState } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

interface Event {
  id: number;
  category: string;
  name: string;
  thumbnail: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  price: string;
  discount: string;
  quota: number;
}

const events: Event[] = [
  {
    id: 1,
    category: 'Music',
    name: 'Concert A',
    thumbnail: 'https://via.placeholder.com/50',
    description: 'A wonderful music concert.',
    location: 'New York',
    start_date: '2024-09-01',
    end_date: '2024-09-02',
    price: '$100',
    discount: '10%',
    quota: 100,
  },
  {
    id: 2,
    category: 'Art',
    name: 'Art Exhibition',
    thumbnail: 'https://via.placeholder.com/50',
    description: 'An amazing art exhibition.',
    location: 'Paris',
    start_date: '2024-10-05',
    end_date: '2024-10-10',
    price: '$50',
    discount: '5%',
    quota: 200,
  },
  // Add more events as needed
];

const EventTable: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'create'>('view');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null); // Track dropdown state for each event

  const handleIconClick = (eventId: number) => {
    setDropdownOpen(eventId === dropdownOpen ? null : eventId); // Toggle dropdown visibility
  };

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setModalType('view');
    setModalOpen(true);
    setDropdownOpen(null); // Close dropdown after selecting an option
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setModalType('create');
    setModalOpen(true);
    setDropdownOpen(null); // Close dropdown after selecting an option
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  const handleConfirm = () => {
    // Implement the logic to save the changes
    console.log("Event updated successfully!");
    closeModal();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Event List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Category</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Thumbnail</th>
              <th className="py-2 px-4 border-b text-left">Start Date</th>
              <th className="py-2 px-4 border-b text-left">End Date</th>
              <th className="py-2 px-4 border-b text-left">Price</th>
              <th className="py-2 px-4 border-b text-left">Discount</th>
              <th className="py-2 px-4 border-b text-left">Quota</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td className="py-2 px-4 border-b">{event.id}</td>
                <td className="py-2 px-4 border-b">{event.category}</td>
                <td className="py-2 px-4 border-b">{event.name}</td>
                <td className="py-2 px-4 border-b">
                  <img src={event.thumbnail} alt={event.name} className="w-12 h-12" />
                </td>
                <td className="py-2 px-4 border-b">{event.start_date}</td>
                <td className="py-2 px-4 border-b">{event.end_date}</td>
                <td className="py-2 px-4 border-b">{event.price}</td>
                <td className="py-2 px-4 border-b">{event.discount}</td>
                <td className="py-2 px-4 border-b">{event.quota}</td>
                <td className="py-2 px-4 border-b text-center relative">
                  <button onClick={() => handleIconClick(event.id)}>
                    <EllipsisVerticalIcon className="w-5 h-5 text-gray-600" />
                  </button>
                  {dropdownOpen === event.id && (
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl z-10">
                      <button
                        onClick={() => handleViewDetails(event)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        View Details
                      </button>
                      <button
                        onClick={handleCreateEvent}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Edit Event
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div
            className={`bg-white rounded-lg shadow-lg p-6 w-full mx-4 md:max-w-sm lg:max-w-lg xl:max-w-2xl ${
              modalType === 'create' ? 'lg:max-w-4xl' : ''
            } relative`}
          >
            <button
              className="absolute top-3 right-3 text-gray-700"
              onClick={closeModal}
            >
              &times; {/* Close button */}
            </button>
            {modalType === 'view' && selectedEvent ? (
              <>
                <h3 className="text-lg font-semibold mb-4">Event Details</h3>
                <p><strong>Name:</strong> {selectedEvent.name}</p>
                <p><strong>Description:</strong> {selectedEvent.description}</p>
                <p><strong>Location:</strong> {selectedEvent.location}</p>
                <p><strong>Start Date:</strong> {selectedEvent.start_date}</p>
                <p><strong>End Date:</strong> {selectedEvent.end_date}</p>
                <p><strong>Price:</strong> {selectedEvent.price}</p>
                <p><strong>Discount:</strong> {selectedEvent.discount}</p>
                <p><strong>Quota:</strong> {selectedEvent.quota}</p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-4">Edit Event</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">ID</label>
                      <input type="number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
                      <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <input type="date" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <input type="date" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price</label>
                      <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Discount</label>
                      <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quota</label>
                    <input type="number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={handleConfirm}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventTable;
