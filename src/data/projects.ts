// Project data for the "Other Projects" section
export interface Project {
  titleKey: string;
  subtitleKey?: string;
  descriptionKey: string;
  imageUrl: string;
  imageAltKey: string;
  linkUrl?: string;
  linkTextKey?: string;
  linkIcon?: string;
}

export const projects: Project[] = [
  {
    titleKey: "gender305Podcast.title",
    subtitleKey: "gender305Podcast.subtitle",
    descriptionKey: "gender305Podcast.description",
    imageUrl: "podcast_gender_305.jpg",
    imageAltKey: "gender305Podcast.imageAlt",
    linkUrl: "https://open.spotify.com/show/0wXLKKJbgFwjnHdevQYnYW?si=400a91e1597a4f40",
    linkTextKey: "gender305Podcast.linkText",
    linkIcon: "icon-external-link"
  }
];