import Image from "next/image";
import type { Service } from "@/lib/services";

interface LandingHeroProps {
  service: Service;
  image: string;
}

export default function LandingHero({ service, image }: LandingHeroProps) {
  return (
    <section className="relative w-full h-[46vh] min-h-[300px]">
      <Image
        src={image}
        alt={service.name}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/20" />
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-3xl mx-auto w-full px-4 md:px-8 pb-8 text-center md:text-left">
          <span className="text-white/80 text-xs tracking-widest uppercase block mb-2">
            {service.shortName}
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-3">
            {service.name}
          </h1>
          <p className="text-white/90 text-lg max-w-xl mx-auto md:mx-0">
            {service.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
