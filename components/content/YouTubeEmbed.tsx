"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

export default function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-ink/5">
      {!isPlaying ? (
        // Facade: Miniatura con botón de play
        <>
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Overlay sutil para mejorar contraste del botón */}
          <div className="absolute inset-0 bg-ink/10 transition-opacity hover:bg-ink/20" />
          
          {/* Botón Play centrado */}
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center group"
            aria-label={`Reproducir: ${title}`}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/90 text-white shadow-lg shadow-ink/20 backdrop-blur-sm transition-transform group-hover:scale-110 group-active:scale-95">
              <Play className="w-6 h-6 fill-current ml-1" />
            </div>
          </button>
        </>
      ) : (
        // Video real con autoplay
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  );
}
