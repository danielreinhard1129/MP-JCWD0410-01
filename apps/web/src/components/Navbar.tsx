"use client";

import { useState } from "react";
import Link from "next/link";
import { IoSearch, IoMenu, IoClose, IoPerson } from "react-icons/io5";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Autocomplete from "./Autocomplete";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdLogout } from "react-icons/md";

export const Navbar = () => {
  const { data: session } = useSession();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
    setIsOpenSearch(false);
  };

  const toggleSearch = () => {
    setIsOpenSearch(!isOpenSearch);
    setIsOpenMenu(false);
  };

  const menuItems = [
    { name: "Events", href: "/events" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/contact" },
  ];

  const pathname = usePathname();

  const isPathname =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.includes("/da");

  if (isPathname) {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 w-full border-b-[1px] border-neutral-300 bg-[#fbfbfb] text-color1">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link href="/">
          <div className="relative h-10 w-28 overflow-hidden">
            <Image
              src="/images/logo-purple.png"
              alt="concert"
              fill
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </Link>

        <div
          className={`hidden w-48 items-center gap-4 text-sm sm:w-80 md:inline-block md:w-5/12 ${pathname === "/events" ? "md:hidden" : ""}`}
        >
          <Autocomplete />
        </div>

        <div className="hidden items-center gap-4 text-sm md:flex">
          <div className="flex items-center gap-8">
            <div className="flex gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-md hover:text-[#896eb3]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {session?.user ? (
                <>
                  <div className="col-span-2">
                    {/* <Link href="/profile" className="text-color2">
                      {session.user.name}
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="w-full rounded-md border-[1px] border-color2 bg-color2 px-4 py-2 text-white"
                    >
                      Logout
                    </button> */}
                    <DropdownMenu>
                      <DropdownMenuTrigger className="rounded-full border-[1px] p-2.5 hover:border-color2">
                        <IoPerson />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link
                            href={`/profile/${session.user.id}`}
                            className="w-full hover:text-color2"
                          >
                            Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link
                            href="/orders"
                            className="w-full hover:text-color2"
                          >
                            My Orders
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <button
                            onClick={() => signOut()}
                            className="flex w-full items-center justify-between hover:text-color2"
                          >
                            <div>Log Out</div>

                            <MdLogout size={18} />
                          </button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </>
              ) : (
                <>
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
                      href="/login"
                      className="w-full rounded-md border-[1px] border-color2 bg-color2 px-6 py-2 text-white"
                    >
                      Login
                    </Link>
                  </div>
                </>
              )}
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
        <div
          className={`w-full p-4 md:hidden ${pathname === "/events" ? "md:hidden" : ""}`}
        >
          <Autocomplete />
        </div>
      )}

      {isOpenMenu && (
        <div className="h-screen border-t border-slate-200 bg-white text-black md:hidden">
          <div className="flex flex-col gap-4 p-4">
            {session?.user ? (
              <>
                <div className="text-lg font-semibold">My Account</div>
                <Link
                  href={`/profile/${session.user.id}`}
                  className="w-full hover:text-color2"
                >
                  Profile
                </Link>
                <Link href="/orders" className="hover:text-button">
                  My Orders
                </Link>
                <button
                  onClick={() => signOut()}
                  className="mt-2 w-full rounded-md bg-color2 px-4 py-2 text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="text-lg font-semibold">Masuk ke Akunmu</div>
                <div>Untuk menggunakan semua fitur di Loket</div>
                <div className="grid w-full grid-cols-2 gap-2 border-b-[1px] pb-8 text-center">
                  <Link
                    href="/register"
                    className="w-ful rounded-md border border-color2 px-4 py-2 text-color2"
                  >
                    Daftar
                  </Link>
                  <Link
                    href="/login"
                    className="w-ful rounded-md bg-color2 px-4 py-2 text-white"
                  >
                    Masuk
                  </Link>
                </div>
              </>
            )}
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
