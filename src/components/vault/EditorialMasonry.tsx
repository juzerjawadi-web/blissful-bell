"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const MASONRY_ITEMS = [
  { id: 1, type: "feature", src: "/1760869483602.jpg", title: "THE ESCAPE", location: "MALDIVES", colSpan: "col-span-1 md:col-span-2", aspect: "aspect-[16/9]" },
  { id: 2, type: "portrait", src: "/IMG_20260630_120523.jpg", title: "MORNING LIGHT", location: "SANTORINI", colSpan: "col-span-1", aspect: "aspect-[3/4]" },
  { id: 3, type: "portrait", src: "/IMG_20260602_130344.jpg", title: "CITY ECHOES", location: "PARIS", colSpan: "col-span-1", aspect: "aspect-[3/4]" },
  { id: 4, type: "feature", src: "/20260503_202503.jpg", title: "HIDDEN GEMS", location: "KYOTO", colSpan: "col-span-1 md:col-span-2", aspect: "aspect-[16/9]" },
  { id: 5, type: "medium", src: "/IMG_20260629_225155.jpg", title: "WILDERNESS", location: "PATAGONIA", colSpan: "col-span-1 md:col-span-2 lg:col-span-1", aspect: "aspect-square" },
  { id: 6, type: "medium", src: "/girl.png", title: "PORTRAITS", location: "TUSCANY", colSpan: "col-span-1 md:col-span-2 lg:col-span-1", aspect: "aspect-square" }
];

export function EditorialMasonry() {
  return (
    <section className="w-full py-24 md:py-32 px-4 relative z-10 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-sm tracking-[0.3em] text-white/50 uppercase mb-4">Curated Archives</h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-light tracking-wide">Visual Journal</h3>
          </div>
          <p className="text-white/40 text-sm tracking-widest uppercase max-w-xs leading-relaxed">
            Moments frozen in time across the globe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {MASONRY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (idx % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative group overflow-hidden rounded-2xl md:rounded-3xl cursor-none ${item.colSpan} ${item.aspect} bg-white/5`}
            >
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110 group-hover:brightness-75"
                />
              </div>
              
              {/* Overlay Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <span className="text-[10px] tracking-[0.3em] text-white/70 uppercase mb-2">
                  {item.location}
                </span>
                <h4 className="text-xl md:text-2xl font-serif text-white font-light">
                  {item.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
