import { useState } from "react";
import Link from "next/link";
import useGetEventsDashboard from "@/hooks/api/event/useGetEventsDashboard";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";

const EventTable = () => {
  const [page, setPage] = useState(1);
  const { data, isPending } = useGetEventsDashboard({ page, take: 10 });

  const formatToRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Event List</h2>
        <Link href="/dashboard/event/create-event" className="text-white">
          <Button className="bg-purple-600 hover:bg-color3">
            <FaPlus className="mr-2 text-xl" />
            Create Event
          </Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white">
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
                <td colSpan={9} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            )}
            {!isPending &&
              data?.data?.map((event) => (
                <tr key={event.id}>
                  <td className="border px-4 py-2">{event.id}</td>
                  <td className="border px-4 py-2">
                    {event.category?.title || "No Category"}
                  </td>
                  <td className="border px-4 py-2">{event.name}</td>
                  <td className="border px-4 py-2">
                    <img
                      src={event.thumbnail}
                      alt={event.name}
                      className="h-12 w-12 object-cover"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(event.startDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(event.endDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    {formatToRupiah(event.price)}
                  </td>
                  <td className="border px-4 py-2">{event.discount}%</td>
                  <td className="border px-4 py-2">{event.quota}</td>
                </tr>
              ))}
            {!isPending && data?.data?.length === 0 && (
              <tr>
                <td colSpan={9} className="p-4 text-center">
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
