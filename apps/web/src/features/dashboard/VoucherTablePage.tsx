import { useState } from 'react';
import useGetVouchers from '@/hooks/api/voucher/useGetVouchers'; // Gunakan hook yang disesuaikan
import Link from 'next/link';

const VoucherTable = () => {
  const [page] = useState(1);
  const { data, isPending } = useGetVouchers({ page, take: 10 }); // Gunakan useGetVouchers

  const formatToRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Voucher List</h2>
        <Link href="/dashboard/transaction/create-voucher" className="bg-purple-600 text-white py-2 px-4 rounded">
          + Create Voucher
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Event Name</th>
              <th className="border px-4 py-2">Voucher Name</th>
              <th className="border px-4 py-2">Quota</th>
              <th className="border px-4 py-2">Claimed</th>
              <th className="border px-4 py-2">Nominal</th>
              <th className="border px-4 py-2">Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            {isPending && (
              <tr>
                <td colSpan={7} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            )}
            {!isPending && data?.data?.map(voucher => (
              <tr key={voucher.id}>
                <td className="border px-4 py-2">{voucher.id}</td>
                <td className="border px-4 py-2">{voucher.event.name}</td>
                <td className="border px-4 py-2">{voucher.name}</td>
                <td className="border px-4 py-2">{voucher.quota}</td>
                <td className="border px-4 py-2">{voucher.claimed}</td>
                <td className="border px-4 py-2">{formatToRupiah(voucher.nominal)}</td>
                <td className="border px-4 py-2">{new Date(voucher.expDate).toLocaleDateString()}</td>
              </tr>
            ))}
            {!isPending && data?.data?.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center p-4">
                  No vouchers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoucherTable;
