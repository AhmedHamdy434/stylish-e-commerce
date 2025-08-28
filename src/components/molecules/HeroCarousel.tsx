"use client";

import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

type HeroCarouselProps = {
  images: {
    src: StaticImageData;
    alt: string;
  }[];
  interval?: number; // default 5000ms
};

export default function HeroCarousel({
  images,
  interval = 5000,
}: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const locale = useLocale()

  // auto-scroll every interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      {/* slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform:locale==="en" ?`translateX(-${current * 100}%)`: `translateX(${current * 100}%)`}}
      >
        {images.map((img, i) => (
            <Image
            key={i}
              src={img.src}
              alt={img.alt}
              width={1200}
              height={500}
              className="object-cover object-top w-full flex-shrink-0"
              priority={i === 0}
            />
        ))}
      </div>
      {/* dots */}
      <div className="flex justify-center gap-3 px-3 py-1.5 mt-4 rounded-full">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "w-3 h-3 rounded-full transition",
              current === i ? "bg-primary" : "bg-foreground/50 hover:bg-primary/40"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
