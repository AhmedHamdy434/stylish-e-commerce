"use client";

import Image from "next/image";
import { useState } from "react";

const ImagesSide = ({ images }: { images: string[] }) => {
  const [number, setNumber] = useState(0);
  return (
    <div className="flex-1 flex flex-col gap-4 md:flex-row-reverse">
      <div className="max-h-75 md:max-h-200 overflow-hidden flex-7 rounded-2xl">
        <Image
          width={500}
          height={300}
          src={images[number]}
          className="w-full rounded-2xl"
          alt="main-Image"
        />
      </div>
      <div className="flex gap-4 md:flex-col h-full md:justify-center flex-2 cursor-pointer">
        {images.map((i, index) => (
          <div
            key={index}
            onClick={() => setNumber(index)}
            className={`rounded-2xl ${
              number === index && "border-2 border-primary"
            }`}
          >
            <Image
              width={300}
              height={300}
              src={i}
              alt="main-Image"
              className="rounded-xl h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesSide;
