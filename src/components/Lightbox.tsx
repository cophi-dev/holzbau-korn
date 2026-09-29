"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/content/photos";
import { Arrow } from "./ui";

type Props = {
  photos: Photo[];
  index: number | null;
  label: string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

export function Lightbox({ photos, index, label, onIndexChange, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const swipeStart = useRef<number | null>(null);
  const open = index !== null;
  const photo = open ? photos[index] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => () => void (document.documentElement.style.overflow = ""), []);

  const go = (delta: number) => {
    if (index === null) return;
    onIndexChange((index + delta + photos.length) % photos.length);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (index === null) return;
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
    else if (e.key === "Home") onIndexChange(0);
    else if (e.key === "End") onIndexChange(photos.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={photo ? `${label}: ${photo.alt}` : label}
      className="m-0 h-dvh max-h-none w-screen max-w-none touch-pan-y bg-transparent p-0 text-paper"
      onKeyDown={onKeyDown}
      onClose={() => {
        document.documentElement.style.overflow = "";
        onClose();
      }}
      onPointerDown={(e) => {
        swipeStart.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (swipeStart.current === null) return;
        const dx = e.clientX - swipeStart.current;
        swipeStart.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      {photo && index !== null ? (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm sm:px-8">
            <p className="tabular-nums" aria-live="polite">
              {label} · {index + 1} / {photos.length}
            </p>
            <button
              type="button"
              className="link-draw py-2 text-base font-medium"
              onClick={() => dialogRef.current?.close()}
            >
              Schließen <span aria-hidden="true">(Esc)</span>
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-16 sm:px-20 sm:pb-0">
            <LightboxImage key={photo.src} photo={photo} />
            <NavButton side="left" onClick={() => go(-1)} />
            <NavButton side="right" onClick={() => go(1)} />
          </div>

          <p className="px-5 py-5 text-center text-base text-paper/85 sm:px-8">{photo.alt}</p>
        </div>
      ) : null}
    </dialog>
  );
}

function LightboxImage({ photo }: { photo: Photo }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      sizes="100vw"
      draggable={false}
      data-loaded={loaded}
      onLoad={() => setLoaded(true)}
      className="photo h-auto max-h-[calc(100dvh-13rem)] w-auto max-w-full object-contain select-none sm:max-h-[calc(100dvh-9rem)]"
    />
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const isLeft = side === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLeft ? "Vorheriges Foto" : "Nächstes Foto"}
      className={`group absolute bottom-3 flex h-12 w-12 items-center justify-center rounded-[2px] bg-paper text-ink transition-colors duration-300 hover:bg-accent sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 ${isLeft ? "left-4" : "right-4"}`}
    >
      <Arrow
        className={`transition-transform duration-300 ${isLeft ? "rotate-180 group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"}`}
      />
    </button>
  );
}
