"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetTransactionsDashboard from "@/hooks/api/transaction/useGetTransactionsDashboard";
import { Transaction } from "@/types/transaction";

const GetTransactionPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<string>("All");

  // Fetch all transactions with pagination response
  const { data, isPending } = useGetTransactionsDashboard({});

  // Debugging: Periksa struktur data
  console.log(data);

  // Mengakses data transaksi dari properti `data` di dalam `IPageableResponse`
  const transactions: Transaction[] = data?.data || [];

  const handleEventChange = (value: string) => {
    setSelectedEvent(value);
  };

  // Filter transactions based on selected event
  const filteredTransactions = transactions.filter((transaction: Transaction) =>
    selectedEvent === "All" ? true : transaction.event.name === selectedEvent
  );

  const uniqueEvents = Array.from(
    new Set(transactions.map((transaction: Transaction) => transaction.event.name))
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Transaction List</h2>
        <div className="relative">
          <Select onValueChange={handleEventChange} value={selectedEvent}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select an event" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Event</SelectLabel>
                <SelectItem value="All">All</SelectItem>
                {uniqueEvents.map((event: string, index: number) => (
                  <SelectItem value={event} key={index}>
                    {event}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">User Name</th>
              <th className="border px-4 py-2">Event</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {isPending && (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            )}
            {!isPending && filteredTransactions.map((transaction: Transaction) => (
              <tr key={transaction.id}>
                <td className="border px-4 py-2">{transaction.id}</td>
                <td className="border px-4 py-2">{transaction.user.name}</td>
                <td className="border px-4 py-2">{transaction.event.name}</td>
                <td className="border px-4 py-2">{transaction.status}</td>
                <td className="border px-4 py-2">{transaction.paymentMethod}</td>
              </tr>
            ))}
            {!isPending && filteredTransactions.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetTransactionPage;
