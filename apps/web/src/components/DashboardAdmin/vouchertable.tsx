import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter dari next/navigation
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

interface Voucher {
  id: number;
  eventId: number;
  name: string;
  code: string;
  quota: number;
  nominal: string;
  claimed: number;
  exp_date: string;
}

const vouchers: Voucher[] = [
  {
    id: 1,
    eventId: 101,
    name: 'Concert A',
    code: 'CONA123',
    quota: 100,
    nominal: '$100',
    claimed: 50,
    exp_date: '2024-09-02',
  },
  {
    id: 2,
    eventId: 102,
    name: 'Art Exhibition',
    code: 'ARTE456',
    quota: 200,
    nominal: '$50',
    claimed: 120,
    exp_date: '2024-10-10',
  },
  // Tambahkan lebih banyak voucher jika diperlukan
];

const VoucherTable: React.FC = () => {
  const router = useRouter(); // Gunakan useRouter untuk navigasi
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'create'>('view');
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null); // Track dropdown state for each voucher

  const handleIconClick = (voucherId: number) => {
    setDropdownOpen(voucherId === dropdownOpen ? null : voucherId); // Toggle dropdown visibility
  };

  const handleViewDetails = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setModalType('view');
    setModalOpen(true);
    setDropdownOpen(null); // Close dropdown after selecting an option
  };

  const handleCreateVoucher = () => {
    // Navigasi ke halaman "/create-voucher" alih-alih membuka modal
    router.push("/dashboard/transaction/create-voucher");
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedVoucher(null);
  };

  const handleConfirm = () => {
    // Implement the logic to save the changes
    console.log("Voucher updated successfully!");
    closeModal();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Voucher</h2>
        <button
          onClick={handleCreateVoucher}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create+
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Event ID</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Code</th>
              <th className="py-2 px-4 border-b text-left">Quota</th>
              <th className="py-2 px-4 border-b text-left">Nominal</th>
              <th className="py-2 px-4 border-b text-left">Claimed</th>
              <th className="py-2 px-4 border-b text-left">Exp. Date</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((voucher) => (
              <tr key={voucher.id}>
                <td className="py-2 px-4 border-b">{voucher.id}</td>
                <td className="py-2 px-4 border-b">{voucher.eventId}</td>
                <td className="py-2 px-4 border-b">{voucher.name}</td>
                <td className="py-2 px-4 border-b">{voucher.code}</td>
                <td className="py-2 px-4 border-b">{voucher.quota}</td>
                <td className="py-2 px-4 border-b">{voucher.nominal}</td>
                <td className="py-2 px-4 border-b">{voucher.claimed}</td>
                <td className="py-2 px-4 border-b">{voucher.exp_date}</td>
                <td className="py-2 px-4 border-b text-center relative">
                  <button onClick={() => handleIconClick(voucher.id)}>
                    <EllipsisVerticalIcon className="w-5 h-5 text-gray-600" />
                  </button>
                  {dropdownOpen === voucher.id && (
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl z-10">
                      <button
                        onClick={() => handleViewDetails(voucher)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        View Details
                      </button>
                      <button
                        onClick={handleCreateVoucher}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Edit Voucher
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
            {modalType === 'view' && selectedVoucher ? (
              <>
                <h3 className="text-lg font-semibold mb-4">Voucher Details</h3>
                <p><strong>Name:</strong> {selectedVoucher.name}</p>
                <p><strong>Code:</strong> {selectedVoucher.code}</p>
                <p><strong>Quota:</strong> {selectedVoucher.quota}</p>
                <p><strong>Nominal:</strong> {selectedVoucher.nominal}</p>
                <p><strong>Claimed:</strong> {selectedVoucher.claimed}</p>
                <p><strong>Exp. Date:</strong> {selectedVoucher.exp_date}</p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-4">Edit Voucher</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">ID</label>
                      <input type="number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Event ID</label>
                      <input type="number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Code</label>
                      <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Quota</label>
                      <input type="number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nominal</label>
                      <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Claimed</label>
                      <input type="number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Exp. Date</label>
                      <input type="date" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
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

export default VoucherTable;
