"use client";

import { useState } from "react";
import Link from "next/link";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const toggleSearch = () => {
    setIsOpenSearch(!isOpenSearch);
  };

  const pathname = usePathname();

  const menuItems = [
    { name: "Events", href: "/events" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/contact" },
  ];

  return (
    <div className="sticky top-0 z-50 w-full border-b-[1px] border-neutral-300 bg-[#fbfbfb] text-color1">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link href="/">
          <div className="relative h-10 w-28 overflow-hidden">
            <Image
              src="/logo-purple.png"
              alt="concert"
              layout="fill"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </Link>

        <div
          className={`hidden w-48 items-center gap-4 text-sm sm:w-80 md:inline-block md:w-5/12 ${pathname === "/events" ? "md:hidden" : ""}`}
        >
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 right-0 flex items-center rounded-r-md bg-color2 px-3">
              <IoSearch className="text-white" />
            </span>
            <input
              className="block w-full rounded-md border-[1px] border-neutral-300 bg-neutral-100 py-1 pl-3 pr-3 shadow-sm placeholder:text-sm placeholder:text-neutral-400 focus:border-color1 focus:bg-white focus:outline-none sm:py-2 sm:text-sm"
              placeholder="Cari event"
              type="text"
              name="search"
            />
          </label>
        </div>

        <div className="hidden items-center gap-4 text-sm md:flex">
          <div className="flex items-center gap-3">
            <div className="flex gap-3">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-md px-4 py-2 hover:text-[#896eb3]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-1">
                <Link
                  href="/register"
                  className="w-full rounded-md border-[1px] border-color2 px-4 py-2 text-color2"
                >
                  Sign Up
                </Link>
              </div>
              <div className="col-span-1">
                <Link
                  href="/register"
                  className="w-full rounded-md border-[1px] border-color2 bg-color2 px-6 py-2 text-white"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-2 md:hidden">
          <div className="flex items-center md:hidden">
            <button onClick={toggleSearch}>
              {isOpenSearch ? (
                <IoClose className="text-2xl" />
              ) : (
                <IoSearch className="text-2xl" />
              )}
            </button>
          </div>
          <div className="flex items-center md:hidden">
            <button onClick={toggleMenu}>
              {isOpenMenu ? (
                <IoClose className="text-2xl" />
              ) : (
                <IoMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpenSearch && (
        <div className="md:hiden w-full items-center gap-4 p-4 text-sm">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 right-0 flex items-center rounded-r-md bg-color2 px-3">
              <IoSearch className="text-white" />
            </span>
            <input
              className="block w-full rounded-md border-[1px] border-neutral-300 bg-neutral-100 py-2 pl-3 pr-3 text-sm shadow-sm placeholder:text-sm placeholder:text-neutral-400 focus:border-color1 focus:bg-white focus:outline-none"
              placeholder="Cari event"
              type="text"
              name="search"
            />
          </label>
        </div>
      )}

      {isOpenMenu && (
        <div className="h-screen border-t border-slate-200 bg-white text-black md:hidden">
          <div className="flex flex-col gap-2 p-4">
            <div className="text-lg font-semibold">Masuk ke Akunmu</div>
            <div>Untuk menggunakan semua fitur di Loket</div>
            <div className="grid w-full grid-cols-2 gap-2 border-b-[1px] pb-8 text-center">
              <Link
                href="/login"
                className="w-ful rounded-md border border-color2 px-4 py-2 text-color2"
              >
                Daftar
              </Link>
              <Link
                href="/register"
                className="w-ful rounded-md bg-color2 px-4 py-2 text-white"
              >
                Masuk
              </Link>
            </div>
            <div className="flex w-full flex-col gap-4 pt-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="hover:text-button"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
