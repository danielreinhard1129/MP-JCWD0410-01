import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Button } from "../ui/button";

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
    category: "Music",
    name: "Concert A",
    thumbnail: "https://via.placeholder.com/50",
    description: "A wonderful music concert.",
    location: "New York",
    start_date: "2024-09-01",
    end_date: "2024-09-02",
    price: "$100",
    discount: "10%",
    quota: 100,
  },
  {
    id: 2,
    category: "Art",
    name: "Art Exhibition",
    thumbnail: "https://via.placeholder.com/50",
    description: "An amazing art exhibition.",
    location: "Paris",
    start_date: "2024-10-05",
    end_date: "2024-10-10",
    price: "$50",
    discount: "5%",
    quota: 200,
  },
  // Add more events as needed
];

const EventTable: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"view" | "create">("view");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null); // Track dropdown state for each event

  const handleIconClick = (eventId: number) => {
    setDropdownOpen(eventId === dropdownOpen ? null : eventId); // Toggle dropdown visibility
  };

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setModalType("view");
    setModalOpen(true);
    setDropdownOpen(null); // Close dropdown after selecting an option
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setModalType("create");
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
    <div className="rounded-lg bg-white p-4 shadow-md">
      <Link
        href="/dashboard/event/create-event"
        className="flex items-center justify-between pb-4"
      >
        <h2 className="mb-4 text-xl font-bold">Event List</h2>
        <Button className="bg-color2 hover:bg-color1">
          <FaPlus className="mr-2 text-xl" />
          Create Event
        </Button>
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white">
          <thead>
            <tr>
              <th className="border-b px-4 py-2 text-left">ID</th>
              <th className="border-b px-4 py-2 text-left">Category</th>
              <th className="border-b px-4 py-2 text-left">Name</th>
              <th className="border-b px-4 py-2 text-left">Thumbnail</th>
              <th className="border-b px-4 py-2 text-left">Start Date</th>
              <th className="border-b px-4 py-2 text-left">End Date</th>
              <th className="border-b px-4 py-2 text-left">Price</th>
              <th className="border-b px-4 py-2 text-left">Discount</th>
              <th className="border-b px-4 py-2 text-left">Quota</th>
              <th className="border-b px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td className="border-b px-4 py-2">{event.id}</td>
                <td className="border-b px-4 py-2">{event.category}</td>
                <td className="border-b px-4 py-2">{event.name}</td>
                <td className="border-b px-4 py-2">
                  <img
                    src={event.thumbnail}
                    alt={event.name}
                    className="h-12 w-12"
                  />
                </td>
                <td className="border-b px-4 py-2">{event.start_date}</td>
                <td className="border-b px-4 py-2">{event.end_date}</td>
                <td className="border-b px-4 py-2">{event.price}</td>
                <td className="border-b px-4 py-2">{event.discount}</td>
                <td className="border-b px-4 py-2">{event.quota}</td>
                <td className="relative border-b px-4 py-2 text-center">
                  <button onClick={() => handleIconClick(event.id)}>
                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  {dropdownOpen === event.id && (
                    <div className="absolute right-0 z-10 mt-2 w-48 rounded border bg-white py-2 shadow-xl">
                      <button
                        onClick={() => handleViewDetails(event)}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        View Details
                      </button>
                      <button
                        onClick={handleCreateEvent}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div
            className={`mx-4 w-full rounded-lg bg-white p-6 shadow-lg md:max-w-sm lg:max-w-lg xl:max-w-2xl ${
              modalType === "create" ? "lg:max-w-4xl" : ""
            } relative`}
          >
            <button
              className="absolute right-3 top-3 text-gray-700"
              onClick={closeModal}
            >
              &times; {/* Close button */}
            </button>
            {modalType === "view" && selectedEvent ? (
              <>
                <h3 className="mb-4 text-lg font-semibold">Event Details</h3>
                <p>
                  <strong>Name:</strong> {selectedEvent.name}
                </p>
                <p>
                  <strong>Description:</strong> {selectedEvent.description}
                </p>
                <p>
                  <strong>Location:</strong> {selectedEvent.location}
                </p>
                <p>
                  <strong>Start Date:</strong> {selectedEvent.start_date}
                </p>
                <p>
                  <strong>End Date:</strong> {selectedEvent.end_date}
                </p>
                <p>
                  <strong>Price:</strong> {selectedEvent.price}
                </p>
                <p>
                  <strong>Discount:</strong> {selectedEvent.discount}
                </p>
                <p>
                  <strong>Quota:</strong> {selectedEvent.quota}
                </p>
              </>
            ) : (
              <>
                <h3 className="mb-4 text-lg font-semibold">Edit Event</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        ID
                      </label>
                      <input
                        type="number"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Thumbnail
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <input
                        type="date"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Discount
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Quota
                    </label>
                    <input
                      type="number"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={handleConfirm}
                      className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
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
