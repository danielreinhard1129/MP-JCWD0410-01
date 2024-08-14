"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFacebook,
  FaInstagram,
  FaRegCopyright,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa6";

const Footer = () => {
  const pathname = usePathname();

  const isPathname = pathname === "/login" || pathname === "/register";

  if (isPathname) {
    return null;
  }

  return (
    <div className="bg-color1 text-sm text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 border-b-black py-8 sm:grid-cols-2 md:grid-cols-5">
          <Link href="/">
            <div className="relative h-12 w-32 overflow-hidden">
              <Image
                src="/logo-white.png"
                alt="concert"
                layout="fill"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Link>
          <div className="flex flex-col gap-2">
            <div className="font-bold">Tentang</div>
            <div>Tentang Kami</div>
            <div>Blogs</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-bold">Syarat dan Ketentuan</div>
            <div>FAQ</div>
            <div>Tiket Gelang</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-bold">Kategori</div>
            <div>Rock</div>
            <div>Jazz</div>
            <div>Pop</div>
            <div>RnB</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-bold">Penyelenggara</div>
            <div>Creator</div>
            <div>Masuk</div>
            <div>Daftar</div>
          </div>
        </div>
        <div className="flex justify-between gap-2 border-t-[1px] py-6 sm:gap-4">
          <div className="flex items-center gap-2">
            <FaRegCopyright />
            <div>2024 Artatix. All Rights Reserved</div>
          </div>
          <div className="flex gap-4 text-lg">
            <Link href="https://www.facebook.com/">
              <FaFacebook />
            </Link>
            <Link href="https://www.instagram.com/">
              <FaInstagram />
            </Link>
            <Link href="https://www.tiktok.com/">
              <FaTiktok />
            </Link>
            <Link href="https://www.whatsapp.com/">
              <FaWhatsapp />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
