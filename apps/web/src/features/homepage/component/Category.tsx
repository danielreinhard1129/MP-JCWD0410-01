import Image from "next/image";
import Link from "next/link";

const Category = () => {
  const menuItems = [
    {
      name: "Concert",
      href: "/events?category=concert",
      src: "/concert.png",
      alt: "concert",
    },
    {
      name: "Sport",
      href: "/events?category=sport",
      src: "/sport.png",
      alt: "sport",
    },
    {
      name: "Festival",
      href: "/events?category=festival",
      src: "/festival.png",
      alt: "festival",
    },
    {
      name: "Attraction",
      href: "/events?category=attraction",
      src: "/attraction.png",
      alt: "attraction",
    },
  ];

  return (
    <div className="bg-[#fbfbfb] pb-20 pt-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-md px-4 text-center">
        <div className="text-left text-lg font-semibold sm:text-xl md:text-2xl">
          Event Category
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <div className="h-36 rounded-md bg-black text-white">
                <div className="relative h-full w-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="absolute inset-0 h-full w-full rounded-md object-cover opacity-70"
                  />

                  <div className="absolute top-[40%] w-full text-2xl font-semibold text-white">
                    {item.name}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
