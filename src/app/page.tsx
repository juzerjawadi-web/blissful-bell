import { HeroSection } from "@/components/home/HeroSection";
import { OurStoryTimeline } from "@/components/home/OurStoryTimeline";
import { LittleThingsCards } from "@/components/home/LittleThingsCards";
import { PickABubble } from "@/components/home/PickABubble";
import { BackgroundAudio } from "@/components/global/BackgroundAudio";
import { ImageTrail } from "@/components/ui/image-trail";

export default function Home() {
  return (
    <>
      <BackgroundAudio />
      <div className="pb-32 relative z-10">
        <HeroSection />
        <OurStoryTimeline />
        <LittleThingsCards />
        <PickABubble />

        {/* Image Trail Section */}
        <section className="mt-32 w-full border-t border-white/10 pt-24 px-4 md:px-12 flex flex-col items-center">
          <div className="text-center mb-16">
            <h2 className="text-sm tracking-[0.2em] text-white/50 uppercase mb-4">05 — The Trail</h2>
            <h3 className="text-3xl md:text-5xl font-serif text-white font-light mb-4">Leave a Trace</h3>
            <p className="text-white/60 tracking-wider text-sm max-w-md mx-auto">
              Move your cursor around to reveal fragments of our universe.
            </p>
          </div>
          <ImageTrail
            images={[
              "/1760869483602.jpg",
              "/20260208_073639.jpg",
              "/20260503_202503.jpg",
              "/IMG_20260602_130344.jpg",
              "/IMG_20260616_000622_684.webp",
              "/IMG_20260629_225155.jpg",
              "/IMG_20260630_120523.jpg",
              "/juzer-and-durriya.png",
              "/boy.png",
              "/girl.png"
            ]}
            maxItems={7}
            className="w-full h-[60vh] rounded-3xl border border-white/10 bg-black/20"
          >
            <div className="w-full h-full flex items-center justify-center pointer-events-none">
              <span className="text-white/20 tracking-widest uppercase font-serif text-2xl md:text-4xl pointer-events-none">
                Hover Me
              </span>
            </div>
          </ImageTrail>
        </section>
      </div>
    </>
  );
}
