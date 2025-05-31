import { images } from './global';

export interface AboutGalleryImage {
  src: string;
  altKey: string; // Translation key for alt text
  fslightboxGroup: string;
  gridClass?: string; // Optional class for grid layout
}

export const aboutGalleryImages: AboutGalleryImage[] = [
  {
    src: `${images}/foto_01.jpg`,
    altKey: "aboutGallery.image1.alt",
    fslightboxGroup: "about-pics",
    gridClass: "col-span-2"
  },
  {
    src: `${images}/foto_02.jpg`,
    altKey: "aboutGallery.image2.alt",
    fslightboxGroup: "about-pics",
    gridClass: "col-span-2"
  },
  {
    src: `${images}/foto_03.jpg`,
    altKey: "aboutGallery.image3.alt",
    fslightboxGroup: "about-pics",
    gridClass: "row-span-2"
  },
  {
    src: `${images}/foto_04.jpg`,
    altKey: "aboutGallery.image4.alt",
    fslightboxGroup: "about-pics"
  },
  {
    src: `${images}/foto_05.jpg`,
    altKey: "aboutGallery.image5.alt",
    fslightboxGroup: "about-pics"
  }
];