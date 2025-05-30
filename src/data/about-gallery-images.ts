import { images } from './global';

export interface AboutGalleryImage {
  src: string;
  alt: string;
  fslightboxGroup: string;
}

export const aboutGalleryImages: AboutGalleryImage[] = [
  {
    src: `${images}/foto_01.jpg`,
    alt: "Three women speaking (Tamara in the middle) and taking notes at a conference panel, with a camera recording in the foreground.",
    fslightboxGroup: "about-pics"
  },
  {
    src: `${images}/foto_02.jpg`,
    alt: "Tamara Gonsalves standing and smiling in a large assembly hall (UN) with nameplates and a decorative ceiling.",
    fslightboxGroup: "about-pics"
  },
  {
    src: `${images}/foto_03.jpg`,
    alt: "Tamara speaking in a studio setup with cameras and a world map on the wall behind her.",
    fslightboxGroup: "about-pics"
  },
  {
    src: `${images}/foto_04.jpg`,
    alt: "A group of women posing together in a well-lit room with plants.",
    fslightboxGroup: "about-pics"
  },
  {
    src: `${images}/foto_05.jpg`,
    alt: "Tamara Gonsalves smiling while signing a book at a table with flowers and books.",
    fslightboxGroup: "about-pics"
  }
];