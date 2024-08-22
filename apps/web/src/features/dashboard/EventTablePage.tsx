import { useState } from 'react';
import Link from 'next/link';
import useGetEventsDashboard from '@/hooks/api/event/useGetEventsDashboard';

const EventTable = () => {
  const [page, setPage] = useState(1);
  const { data, isPending } = useGetEventsDashboard({ page, take: 10 });

  const formatToRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Event List</h2>
        <Link href="/dashboard/event/create-event" className="bg-purple-600 text-white py-2 px-4 rounded">
          + Create Event
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Thumbnail</th>
              <th className="border px-4 py-2">Start Date</th>
              <th className="border px-4 py-2">End Date</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Discount</th>
              <th className="border px-4 py-2">Quota</th>
            </tr>
          </thead>
          <tbody>
            {isPending && (
              <tr>
                <td colSpan={9} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            )}
            {!isPending && data?.data?.map(event => (
              <tr key={event.id}>
                <td className="border px-4 py-2">{event.id}</td>
                <td className="border px-4 py-2">{event.category?.title || "No Category"}</td>
                <td className="border px-4 py-2">{event.name}</td>
                <td className="border px-4 py-2">
                  <img src={event.thumbnail} alt={event.name} className="w-12 h-12 object-cover" />
                </td>
                <td className="border px-4 py-2">{new Date(event.startDate).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{new Date(event.endDate).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{formatToRupiah(event.price)}</td>
                <td className="border px-4 py-2">{event.discount}%</td>
                <td className="border px-4 py-2">{event.quota}</td>
              </tr>
            ))}
            {!isPending && data?.data?.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center p-4">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventTable;
