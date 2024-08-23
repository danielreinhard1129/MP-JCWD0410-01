import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter dari next/navigation
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

interface Voucher {
  id: number;
  eventId: number;
  name: string;
  code: string;
  quota: number;
  nominal: string;
  claimed: number;
  expDate: string;
}

const vouchers: Voucher[] = [
  {
    id: 1,
    eventId: 101,
    name: "Concert A",
    code: "CONA123",
    quota: 100,
    nominal: "$100",
    claimed: 50,
    expDate: "2024-09-02",
  },
  {
    id: 2,
    eventId: 102,
    name: "Art Exhibition",
    code: "ARTE456",
    quota: 200,
    nominal: "$50",
    claimed: 120,
    expDate: "2024-10-10",
  },
  // Tambahkan lebih banyak voucher jika diperlukan
];

const VoucherTable: React.FC = () => {
  const router = useRouter(); // Gunakan useRouter untuk navigasi
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"view" | "create">("view");
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null); // Track dropdown state for each voucher

  const handleIconClick = (voucherId: number) => {
    setDropdownOpen(voucherId === dropdownOpen ? null : voucherId); // Toggle dropdown visibility
  };

  const handleViewDetails = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setModalType("view");
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
    <div className="rounded-lg bg-white p-4 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Voucher</h2>
        <button
          onClick={handleCreateVoucher}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Create+
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white">
          <thead>
            <tr>
              <th className="border-b px-4 py-2 text-left">ID</th>
              <th className="border-b px-4 py-2 text-left">Event ID</th>
              <th className="border-b px-4 py-2 text-left">Name</th>
              <th className="border-b px-4 py-2 text-left">Code</th>
              <th className="border-b px-4 py-2 text-left">Quota</th>
              <th className="border-b px-4 py-2 text-left">Nominal</th>
              <th className="border-b px-4 py-2 text-left">Claimed</th>
              <th className="border-b px-4 py-2 text-left">Exp. Date</th>
              <th className="border-b px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((voucher) => (
              <tr key={voucher.id}>
                <td className="border-b px-4 py-2">{voucher.id}</td>
                <td className="border-b px-4 py-2">{voucher.eventId}</td>
                <td className="border-b px-4 py-2">{voucher.name}</td>
                <td className="border-b px-4 py-2">{voucher.code}</td>
                <td className="border-b px-4 py-2">{voucher.quota}</td>
                <td className="border-b px-4 py-2">{voucher.nominal}</td>
                <td className="border-b px-4 py-2">{voucher.claimed}</td>
                <td className="border-b px-4 py-2">{voucher.expDate}</td>
                <td className="relative border-b px-4 py-2 text-center">
                  <button onClick={() => handleIconClick(voucher.id)}>
                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  {dropdownOpen === voucher.id && (
                    <div className="absolute right-0 z-10 mt-2 w-48 rounded border bg-white py-2 shadow-xl">
                      <button
                        onClick={() => handleViewDetails(voucher)}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        View Details
                      </button>
                      <button
                        onClick={handleCreateVoucher}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
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
            {modalType === "view" && selectedVoucher ? (
              <>
                <h3 className="mb-4 text-lg font-semibold">Voucher Details</h3>
                <p>
                  <strong>Name:</strong> {selectedVoucher.name}
                </p>
                <p>
                  <strong>Code:</strong> {selectedVoucher.code}
                </p>
                <p>
                  <strong>Quota:</strong> {selectedVoucher.quota}
                </p>
                <p>
                  <strong>Nominal:</strong> {selectedVoucher.nominal}
                </p>
                <p>
                  <strong>Claimed:</strong> {selectedVoucher.claimed}
                </p>
                <p>
                  <strong>Exp. Date:</strong> {selectedVoucher.expDate}
                </p>
              </>
            ) : (
              <>
                <h3 className="mb-4 text-lg font-semibold">Edit Voucher</h3>
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
                        Event ID
                      </label>
                      <input
                        type="number"
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
                        Code
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
                        Quota
                      </label>
                      <input
                        type="number"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nominal
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
                        Claimed
                      </label>
                      <input
                        type="number"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Exp. Date
                      </label>
                      <input
                        type="date"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
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

export default VoucherTable;
