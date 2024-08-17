import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex h-[90vh] items-center justify-center">
      <div>
        <Image src="/notfound.png" alt="Not Found" width={450} height={450} />
      </div>
    </div>
  );
};

export default NotFound;
