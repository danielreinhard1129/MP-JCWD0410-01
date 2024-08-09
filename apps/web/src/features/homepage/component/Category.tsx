import Image from "next/image";

const Category = () => {
  return (
    <div className="bg-[#fbfbfb] py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-md px-4 text-center">
        <div className="text-left text-lg font-semibold sm:text-xl md:text-2xl">
          Kategori Event
        </div>

        <div className="grid grid-flow-col gap-4">
          <div className="h-36 rounded-md bg-black text-white">
            <div className="relative h-full w-full">
              <Image
                src="/concert.png"
                alt="concert"
                layout="fill"
                className="absolute inset-0 h-full w-full rounded-md object-cover opacity-70"
              />

              <div className="absolute top-[40%] w-full text-2xl font-semibold text-white">
                Concert
              </div>
            </div>
          </div>
          <div className="h-36 rounded-md bg-black text-white">
            <div className="relative h-full w-full">
              <Image
                src="/sport.png"
                alt="sport event"
                layout="fill"
                className="absolute inset-0 h-full w-full rounded-md object-cover opacity-70"
              />

              <div className="absolute top-[40%] w-full text-2xl font-semibold text-white">
                Sport
              </div>
            </div>
          </div>
          <div className="h-36 rounded-md bg-black text-white">
            <div className="relative h-full w-full">
              <Image
                src="/festival.png"
                alt="festival"
                layout="fill"
                className="absolute inset-0 h-full w-full rounded-md object-cover opacity-70"
              />

              <div className="absolute top-[40%] w-full text-2xl font-semibold text-white">
                Festival
              </div>
            </div>
          </div>
          <div className="h-36 rounded-md bg-black text-white">
            <div className="relative h-full w-full">
              <Image
                src="/attraction.png"
                alt="attraction"
                layout="fill"
                className="absolute inset-0 h-full w-full rounded-md object-cover opacity-70"
              />

              <div className="absolute top-[40%] w-full text-2xl font-semibold text-white">
                Attraction
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
