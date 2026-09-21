"use client";

import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export const LabCarousel = () => {
  const images = [
    {
      src: "/1760869483602.jpg",
      alt: "Memory",
      title: "Our Memories",
    },
    {
      src: "/IMG_20260630_120523.jpg",
      alt: "Morning Light",
      title: "Morning Light",
    },
    {
      src: "/IMG_20260602_130344.jpg",
      alt: "City Echoes",
      title: "Your Eyes",
    },
    {
      src: "/20260503_202503.jpg",
      alt: "Hidden Gems",
      title: "Every Moment",
    },
    {
      src: "/IMG_20260629_225155.jpg",
      alt: "Wilderness",
      title: "Your Madness",
    },
    {
      src: "/girl.png",
      alt: "Portraits",
      title: "Portraits",
    },
    {
      src: "/boy.png",
      alt: "Boy",
      title: "You",
    },
    {
      src: "/juzer-and-durriya.png",
      alt: "Us",
      title: "Us",
    },
    {
      src: "/IMG_20260616_000622_684.webp",
      alt: "The Way You Look",
      title: "The Way You Look",
    },
    {
      src: "/20260208_073639.jpg",
      alt: "Your Kindness",
      title: "Your Kindness",
    },
  ];
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-transparent">
      <Carousel_006
        images={images}
        className=""
        loop={true}
        showNavigation={true}
        showPagination={true}
      />
    </div>
  );
};

interface Carousel_006Props {
  images: { src: string; alt: string; title: string }[];
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
}

const Carousel_006 = ({
  images,
  className,
  autoplay = true,
  loop = true,
  showNavigation = true,
  showPagination = true,
}: Carousel_006Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className={cn("w-full", className)}
      opts={{
        loop,
        slidesToScroll: 1,
      }}
      plugins={
        autoplay
          ? [
              Autoplay({
                delay: 2000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]
          : []
      }
    >
      <CarouselContent className="flex h-[500px] w-full">
        {images.map((img, index) => (
          <CarouselItem
            key={index}
            className="relative flex h-[81.5%] w-full basis-[73%] items-center justify-center sm:basis-[50%] md:basis-[30%] lg:basis-[25%] xl:basis-[21%]"
          >
            <motion.div
              initial={false}
              animate={{
                clipPath:
                  current !== index
                    ? "inset(15% 0 15% 0 round 2rem)"
                    : "inset(0 0 0 0 round 2rem)",
              }}
              className="h-full w-full overflow-hidden rounded-3xl"
            >
              <div className="relative h-full w-full border border-white/10 bg-white/5">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="scale-105 object-cover"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </div>
            </motion.div>
            <AnimatePresence mode="wait">
              {current === index && (
                <motion.div
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-0 left-2 flex h-[14%] w-full translate-y-full items-center justify-center p-2 text-center font-medium tracking-widest uppercase text-white/60"
                >
                  {img.title}
                </motion.div>
              )}
            </AnimatePresence>
          </CarouselItem>
        ))}
      </CarouselContent>

      {showNavigation && (
        <div className="absolute -bottom-4 right-0 flex w-full items-center justify-between gap-2 px-4">
          <button
            aria-label="Previous slide"
            onClick={() => api?.scrollPrev()}
            className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="text-white w-4 h-4" />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => api?.scrollNext()}
            className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="text-white w-4 h-4" />
          </button>
        </div>
      )}

      {showPagination && (
        <div className="flex w-full items-center justify-center mt-8">
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: images.length }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-2 cursor-pointer rounded-full transition-all",
                  current === index ? "bg-white w-6" : "bg-white/20 w-2 hover:bg-white/50",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </Carousel>
  );
};
