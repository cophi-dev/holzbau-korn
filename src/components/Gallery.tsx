"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { Photo } from "@/content/photos";
import { Arrow } from "./ui";
import { Lightbox } from "./Lightbox";

const HALF = "(min-width: 1200px) 480px, (min-width: 768px) 42vw, 50vw";
const WIDE = "(min-width: 1200px) 680px, (min-width: 768px) 58vw, 100vw";
const THIRD = "(min-width: 1200px) 380px, (min-width: 768px) 33vw";
const QUARTER = "(min-width: 1200px) 280px, (min-width: 768px) 25vw, 50vw";

// 12-slot asymmetric pattern. Mobile: 2 columns, desktop: 12 columns, dense flow.
const PATTERN = [
  { cls: "col-span-2 row-span-2 md:col-span-7", sizes: WIDE },
  { cls: "md:col-span-5", sizes: HALF },
  { cls: "md:col-span-5", sizes: HALF },
  { cls: "col-span-2 md:col-span-4", sizes: `${THIRD}, 100vw` },
  { cls: "md:col-span-4", sizes: `${THIRD}, 50vw` },
  { cls: "md:col-span-4", sizes: `${THIRD}, 50vw` },
  { cls: "md:col-span-5", sizes: HALF },
  { cls: "col-span-2 md:col-span-7 md:row-span-2", sizes: WIDE },
  { cls: "md:col-span-5", sizes: HALF },
  { cls: "md:col-span-3", sizes: QUARTER },
  { cls: "col-span-2 md:col-span-6", sizes: "(min-width: 1200px) 560px, (min-width: 768px) 50vw, 100vw" },
  { cls: "md:col-span-3", sizes: QUARTER },
] as const;

export const FEATURED_COUNT = PATTERN.length;

type Props = {
  title: string;
  photos: Photo[];
};

export function Gallery({ title, photos }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const restId = useId();
  const featured = photos.slice(0, FEATURED_COUNT);
  const rest = photos.slice(FEATURED_COUNT);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 border-t border-ink pt-4" data-reveal>
        <h3 className="text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{title}</h3>
        <p className="text-sm text-ink-soft tabular-nums">{photos.length} Fotos</p>
      </div>

      <ul className="mt-5 grid grid-flow-dense auto-rows-[44vw] grid-cols-2 gap-2 sm:auto-rows-[38vw] md:mt-6 md:auto-rows-[190px] md:grid-cols-12 md:gap-3 lg:auto-rows-[230px]">
        {featured.map((photo, i) => {
          const slot = PATTERN[i % PATTERN.length];
          return (
            <li key={photo.src} className={slot.cls} data-reveal style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}>
              <Tile photo={photo} sizes={slot.sizes} onOpen={() => setActive(i)} />
            </li>
          );
        })}
      </ul>

      {rest.length > 0 ? (
        <>
          <ul id={restId} hidden={!expanded} className="mt-2 grid grid-cols-3 gap-2 md:mt-3 md:grid-cols-6 md:gap-3">
            {expanded
              ? rest.map((photo, i) => (
                  <li
                    key={photo.src}
                    className="fade-in-late aspect-square"
                    style={{ "--reveal-delay": `${Math.min(i, 17) * 30}ms` } as React.CSSProperties}
                  >
                    <Tile
                      photo={photo}
                      sizes="(min-width: 1200px) 190px, (min-width: 768px) 16vw, 33vw"
                      onOpen={() => setActive(FEATURED_COUNT + i)}
                      compact
                    />
                  </li>
                ))
              : null}
          </ul>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={restId}
            onClick={() => setExpanded((v) => !v)}
            className="group mt-5 inline-flex items-center gap-3 border-b-2 border-ink pb-1 text-base font-semibold transition-colors duration-300 hover:border-accent"
          >
            {expanded ? `Weniger ${title}-Fotos zeigen` : `Alle ${photos.length} ${title}-Fotos zeigen`}
            <Arrow
              className={`transition-transform duration-300 ${expanded ? "-rotate-90 group-hover:-translate-y-0.5" : "rotate-90 group-hover:translate-y-0.5"}`}
            />
          </button>
        </>
      ) : null}

      <Lightbox photos={photos} index={active} label={title} onIndexChange={setActive} onClose={() => setActive(null)} />
    </div>
  );
}

function Tile({
  photo,
  sizes,
  onOpen,
  compact = false,
}: {
  photo: Photo;
  sizes: string;
  onOpen: () => void;
  compact?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Foto vergrößern: ${photo.alt}`}
      className="group relative block h-full w-full overflow-hidden"
      style={{ backgroundColor: photo.color }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        data-loaded={loaded}
        onLoad={() => setLoaded(true)}
        className="photo object-cover group-hover:scale-[1.025]"
      />
      {compact ? null : (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 hidden max-w-[90%] translate-y-1 bg-paper px-3 py-1.5 text-left text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:block"
        >
          {photo.alt}
        </span>
      )}
    </button>
  );
}
