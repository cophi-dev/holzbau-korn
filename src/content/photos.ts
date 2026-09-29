import data from "./photos.json";

export type PhotoCategory = "holzbau" | "moebelbau" | "hero" | "about";

export type Photo = {
  src: string;
  alt: string;
  category: PhotoCategory;
  width: number;
  height: number;
  color: string;
};

const photos = data as Photo[];

export const holzbauPhotos = photos.filter((p) => p.category === "holzbau");
export const moebelbauPhotos = photos.filter((p) => p.category === "moebelbau");

function single(category: PhotoCategory): Photo {
  const photo = photos.find((p) => p.category === category);
  if (!photo) throw new Error(`photos.json has no "${category}" photo`);
  return photo;
}

export const heroPhoto = single("hero");
export const aboutPhoto = single("about");
export const ogPhoto = { src: "/og.jpg", width: 1200, height: 630, alt: holzbauPhotos[0].alt };
