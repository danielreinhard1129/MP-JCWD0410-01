import Image from "next/image";
import { FlipWords } from "@/components/ui/flip-words";
import { Bebas_Neue } from "next/font/google";
const bebasNeue = Bebas_Neue({ weight: ["400"], subsets: ["latin"] });

const Jumbotron = () => {
  return (
    <div className="relative h-96 overflow-hidden bg-black">
      <Image
        src="/images/concert.avif"
        alt="concert"
        fill
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />

      <div className="absolute top-[25%] w-full text-center text-2xl font-semibold text-white sm:text-4xl md:text-5xl">
        Discover Amazing <br />
        <FlipWords
          words={["Events", "Concerts", "Festivals", "Workshops"]}
          className={`${bebasNeue.className} mt-5 text-center text-7xl text-white md:text-9xl`}
        />
      </div>
    </div>
  );
};

export default Jumbotron;
