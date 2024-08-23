"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";

interface MenuItem {
  title: string;
  icon: JSX.Element;
  path?: string; // Add an optional path property
  submenu?: boolean;
  subMenuItems?: SubMenuItem[];
}

interface SubMenuItem {
  title: string;
  path: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuSelect: (title: string) => void; // Add this to notify the parent component about the selection
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard", // Add the path to the dashboard
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
  },
  {
    title: "Event",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
    submenu: true,
    subMenuItems: [
      { title: "Event List", path: "/dashboard/event/eventpage" },
      { title: "Event Category", path: "/dashboard/event/create-category" },
      { title: "Voucher", path: "/dashboard/event/voucher" },
      { title: "Statistik", path: "/statistik" },
      { title: "Transaction", path: "/dashboard/transaction/transaction" },
    ],
  },
  {
    title: "Profile",
    path: "/profile", // Add the path to the profile page
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
  },
  {
    title: "Settings",
    path: "/settings", // Add the path to the settings page
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
  },
  // {
  //   title: "Log Out",
  //   path: "/logout", // Assuming you have a logout page or function
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       viewBox="0 0 24 24"
  //       fill="currentColor"
  //       aria-hidden="true"
  //       className="h-5 w-5"
  //     >
  //       <path
  //         fillRule="evenodd"
  //         d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
  //         clipRule="evenodd"
  //       ></path>
  //     </svg>
  //   ),
  // },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onMenuSelect }) => {
  const { data: session } = useSession();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const handleSubMenuToggle = (title: string) => {
    setOpenSubMenu(openSubMenu === title ? null : title);
  };

  const handleMenuClick = (title: string) => {
    onMenuSelect(title);
    onClose();
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full w-64 transform bg-color2 text-white shadow-lg ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform lg:relative lg:flex lg:translate-x-0 lg:flex-col`}
    >
      <div className="mb-2 flex items-center justify-between p-4">
        <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-white">
          Sidebar
        </h5>
        <button className="lg:hidden" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-5 w-5 text-white"
          >
            <path
              fillRule="evenodd"
              d="M6.293 6.293a1 1 0 011.414 0L12 10.586l4.293-4.293a1 1 0 111.414 1.414L13.414 12l4.293 4.293a1 1 0 01-1.414 1.414L12 13.414l-4.293 4.293a1 1 0 01-1.414-1.414L10.586 12 6.293 7.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-2">
        {menuItems.map((item, idx) => (
          <div key={idx} className="relative">
            <Link href={item.path ?? "#"} passHref>
              <button
                type="button"
                className="flex w-full select-none items-center justify-between border-b-0 p-3 text-left font-sans text-xl font-semibold text-white transition-colors hover:text-purple-400"
                onClick={() => {
                  handleSubMenuToggle(item.title);
                  handleMenuClick(item.title);
                }}
              >
                <div className="mr-4 grid place-items-center">{item.icon}</div>
                <p className="mr-auto block font-sans text-base font-normal text-white">
                  {item.title}
                </p>
                {item.submenu && (
                  <span className="ml-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className={`h-4 w-4 transition-transform ${
                        openSubMenu === item.title ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      ></path>
                    </svg>
                  </span>
                )}
              </button>
            </Link>
            {item.submenu && openSubMenu === item.title && (
              <div className="overflow-hidden">
                <div className="block w-full py-1 text-sm text-gray-200">
                  {item.subMenuItems?.map((subItem, subIdx) => (
                    <Link
                      key={subIdx}
                      href={subItem.path}
                      className="flex w-full items-center rounded-lg p-3 text-start transition-all hover:bg-color3 hover:text-white"
                      onClick={() => handleMenuClick(subItem.title)}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        <button
          onClick={() => signOut()}
          className="flex items-center gap-4 p-3 hover:text-purple-400"
        >
          <div>
            <MdLogout size={19} />
          </div>
          <div className="text-[15px]">Log Out</div>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
