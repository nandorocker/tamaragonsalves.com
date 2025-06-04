// Video data for the speaking section
export interface Video {
  titleKey: string;
  descriptionKey: string;
  videoUrl: string;
  thumbnailUrl: string;
  date: string;
  linkTextKey?: string;
}

// Videos sorted by date (newest first) for better organization
export const videos: Video[] = [
  {
    titleKey: "broadeningWomensRights.title",
    descriptionKey: "broadeningWomensRights.description",
    videoUrl: "https://www.youtube.com/watch?v=QP1zux-ZM5o&t=7s",
    thumbnailUrl: "videos/2025_broadening_womens.png",
    date: "2025-05-08"
  },
  {
    titleKey: "alienacaoParental2025.title",
    descriptionKey: "alienacaoParental2025.description",
    videoUrl: "https://www.youtube.com/watch?v=s6JCUo6_viI&t=2478s",
    thumbnailUrl: "videos/2025_alienacao_1.png",
    date: "2025-04-14"
  },
  {
    titleKey: "cedawRecommendations.title",
    descriptionKey: "cedawRecommendations.description",
    videoUrl: "https://ibdh.org.br/implementacao-das-recomendacoes-da-cedaw-ao-brasil-discutida-em-genebra/",
    thumbnailUrl: "videos/2024_geneva_cedaw.jpg",
    date: "2024-05-21"
  },
  {
    titleKey: "cedawCommittee.title",
    descriptionKey: "cedawCommittee.description",
    videoUrl: "https://webtv.un.org/en/asset/k1a/k1adxsy879",
    thumbnailUrl: "videos/2024_cedaw_1.jpg",
    date: "2024-05-20"
  },
  {
    titleKey: "beginningOfLife.title",
    descriptionKey: "beginningOfLife.description",
    videoUrl: "https://hdl.handle.net/1828/16534",
    thumbnailUrl: "videos/2024_beginning_of_life.jpg",
    date: "2024-03-20"
  },
  {
    titleKey: "interdisciplinaryResearch.title",
    descriptionKey: "interdisciplinaryResearch.description",
    videoUrl: "https://hdl.handle.net/1828/16532",
    thumbnailUrl: "videos/2024_interdisciplinary.jpg",
    date: "2024-02-26"
  },
  {
    titleKey: "violenceResearch.title",
    descriptionKey: "violenceResearch.description",
    videoUrl: "#", // No video URL available
    thumbnailUrl: "videos/2021_violence_research.jpg", // Placeholder - needs actual thumbnail
    date: "2021-12-06"
  },
  {
    titleKey: "parentalAlienation2021.title",
    descriptionKey: "parentalAlienation2021.description",
    videoUrl: "https://www.youtube.com/watch?v=YVh0jiG1iyQ",
    thumbnailUrl: "videos/2021_alienacao_parental.jpg",
    date: "2021-11-29"
  },
  {
    titleKey: "advertisingChildren.title",
    descriptionKey: "advertisingChildren.description",
    videoUrl: "https://www12.senado.leg.br/tv/plenario-e-comissoes/comissao-de-direitos-humanos-e-legislacao-participativa/2013/08/a-publicidade-que-dialoga-com-a-crianca-e-abusiva-diz-tamara-amoroso-goncalves-min.-justica",
    thumbnailUrl: "videos/2014_publicidade_crianca.jpg",
    date: "2013-08-29"
  },
  {
    titleKey: "genderHumanRights2012.title",
    descriptionKey: "genderHumanRights2012.description",
    videoUrl: "https://iptv.usp.br/portal/video.action?idItem=12539",
    thumbnailUrl: "videos/2014_gender_human.jpg",
    date: "2012-10-02"
  },
  {
    titleKey: "genderDiscussions.title",
    descriptionKey: "genderDiscussions.description",
    videoUrl: "http://www.iea.usp.br/midiateca/video/videos-2012/genero-e-direitos-humanos",
    thumbnailUrl: "videos/2014_gender_human.jpg",
    date: "2012-02-10"
  }
];