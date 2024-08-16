import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaRegCopyright,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-color1 text-sm text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-8 border-b-black py-8 md:grid-cols-5">
          <Link href="/" className="col-span-2 md:col-span-1">
            <div className="relative h-10 w-28 overflow-hidden">
              <Image
                src="/logo-white.png"
                alt="concert"
                layout="fill"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Link>
          <div className="flex flex-col gap-2">
            <div className="font-bold">About Tixify</div>
            <div>Events</div>
            <div>FAQ</div>
            <div>Terms and conditions</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-bold">Location</div>
            <div>Jakarta</div>
            <div>Bandung</div>
            <div>Surabaya</div>
            <div>Yogyakarta</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-bold">Category</div>
            <div>Concert</div>
            <div>Festival</div>
            <div>Sport</div>
            <div>Attraction</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-bold">Penyelenggara</div>
            <div>Creator</div>
            <div>Login</div>
            <div>Sign Up</div>
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
