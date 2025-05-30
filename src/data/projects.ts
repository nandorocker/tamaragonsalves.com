// Project data for the "Other Projects" section
export interface Project {
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  linkUrl?: string;
  linkText?: string;
  linkIcon?: string;
}

export const projects: Project[] = [
  {
    title: "Gender 305 Podcast",
    subtitle: "Podcast series on Gender and Human Rights.",
    description: "At UVIC's Gender Studies Department, I taught Gender and International Human Rights in fall 2022 and 2023, where students created podcast episodes as their final assignments with CFUV's technical support. These episodes, now being published and aired through CFUV, explore diverse topics including abortion rights, LGBTQ2+ and non-binary rights, gender-based discrimination in AI, and violence against Indigenous women in Canada. We invite you to listen and engage in these important conversations.",
    imageUrl: "podcast_gender_305.jpg",
    imageAlt: "Logo of the Gender 305 Podcast",
    linkUrl: "https://open.spotify.com/show/0wXLKKJbgFwjnHdevQYnYW?si=400a91e1597a4f40",
    linkText: "Listen and Subscribe (Spotify)",
    linkIcon: "icon-external-link"
  }
];