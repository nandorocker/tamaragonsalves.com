// Video data for the speaking section
export interface Video {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  date: string;
  linkText?: string;
}

// Videos sorted by date (newest first) for better organization
export const videos: Video[] = [
  {
    title: "Broadening women's rights through international advocacy",
    description: "Talk presented at CFGS as part of a series on gender and global governance, analyzing the use of parental alienation in custody disputes as a tool of gender-based violence. The discussion connects feminist legal research and transnational activism aimed at challenging its legitimacy before international human rights bodies.",
    videoUrl: "https://www.youtube.com/watch?v=QP1zux-ZM5o&t=7s",
    thumbnailUrl: "videos/2025_broadening_womens.png",
    date: "2025-05-08"
  },
  {
    title: "Alienação Parental: uma nova forma de violência de gênero contra mulheres e crianças na AL e Caribe",
    description: "Seminar held at the Brazilian Federal Court (Tribunal Regional Federal da 3ª Região), in partnership with AJUFESP (Associação dos Juízes Federais de SP e MS), to launch the book \"Alienação Parental: Uma nova forma de violência de gênero contra mulheres e crianças na América Latina e Caribe\" (Parental Alienation as a New Form of Gender-Based Violence Against Women and Children in Latin America and the Caribbean). I discussed how the concept of parental alienation has been misused in the region to dismiss abuse allegations and perpetuate institutional violence against women and children; as well as the need for a gender-insensitive application of the Hague Convention by the Brazilian state.",
    videoUrl: "https://www.youtube.com/watch?v=s6JCUo6_viI&t=2478s",
    thumbnailUrl: "videos/2025_alienacao_1.png",
    date: "2025-04-14"
  },
  {
    title: "How to Use CEDAW's Recommendations in National Strategic Litigation",
    description: "Panel discussing the strategic use of CEDAW's recommendations for domestic litigation in Brazil, emphasizing practical applications to advance women's rights.",
    videoUrl: "https://ibdh.org.br/implementacao-das-recomendacoes-da-cedaw-ao-brasil-discutida-em-genebra/",
    thumbnailUrl: "videos/2024_geneva_cedaw.jpg",
    date: "2024-05-21"
  },
  {
    title: "CLADEM/Brazil representation at Brazil's review before the CEDAW Committee",
    description: "Speech delivered at the Opening Session with Brazilian Non-profit associations, addressing various forms of institutional violence such as obstetric violence, parental alienation in family court, inaccessible abortion services for sexual violence victims, child marriage, and forced pregnancies among adolescents.",
    videoUrl: "https://webtv.un.org/en/asset/k1a/k1adxsy879",
    thumbnailUrl: "videos/2024_cedaw_1.jpg",
    date: "2024-05-20"
  },
  {
    title: "Debates on the Beginning of Life and Legal Regulations to Personhood",
    description: "Exploration of feminist perspectives on the legal and ethical debates concerning the beginning of life and personhood, focusing on its implications for law and social policies.",
    videoUrl: "https://hdl.handle.net/1828/16534",
    thumbnailUrl: "videos/2024_beginning_of_life.jpg",
    date: "2024-03-20"
  },
  {
    title: "Interdisciplinary Community Engaged Academic Research",
    description: "Presentation on applying interdisciplinary feminist research methodologies to engage communities and address systemic issues, highlighting academic and practical applications.",
    videoUrl: "https://hdl.handle.net/1828/16532",
    thumbnailUrl: "videos/2024_interdisciplinary.jpg",
    date: "2024-02-26"
  },
  {
    title: "Research Launch on Violence Against Girls and Adolescents",
    description: "Research launch examining the link between sexual violence and the death of girls and adolescents in Latin America and the Caribbean between 2010-2019, alongside best practices for addressing violence in this demographic.",
    videoUrl: "#", // No video URL available
    thumbnailUrl: "videos/2021_violence_research.jpg", // Placeholder - needs actual thumbnail
    date: "2021-12-06"
  },
  {
    title: "Parental Alienation: A Form of Violence Against Women",
    description: "Webinar addressing how the concept of parental alienation is used as a form of institutional violence against women, involving multi-stakeholder support and discussions in Portuguese and Spanish.",
    videoUrl: "https://www.youtube.com/watch?v=YVh0jiG1iyQ",
    thumbnailUrl: "videos/2021_alienacao_parental.jpg",
    date: "2021-11-29"
  },
  {
    title: "Public Hearing on Advertising to Children",
    description: "Public hearing at the Brazilian National Congress addressing the impact of child-targeted advertising, highlighting its manipulative and abusive practices, and advocating for regulatory measures.",
    videoUrl: "https://www12.senado.leg.br/tv/plenario-e-comissoes/comissao-de-direitos-humanos-e-legislacao-participativa/2013/08/a-publicidade-que-dialoga-com-a-crianca-e-abusiva-diz-tamara-amoroso-goncalves-min.-justica",
    thumbnailUrl: "videos/2014_publicidade_crianca.jpg",
    date: "2013-08-29"
  },
  {
    title: "Gender and Human Rights",
    description: "Seminar on gender equality and its intersection with human rights, discussing how gender analysis can inform policies and societal development frameworks.",
    videoUrl: "https://iptv.usp.br/portal/video.action?idItem=12539",
    thumbnailUrl: "videos/2014_gender_human.jpg",
    date: "2012-10-02"
  },
  {
    title: "Gender Discussions Impact in Human Rights Concept",
    description: "Presentation analyzing how gender discussions have influenced the conceptualization of human rights, with a focus on historical and contemporary developments in the field.",
    videoUrl: "http://www.iea.usp.br/midiateca/video/videos-2012/genero-e-direitos-humanos",
    thumbnailUrl: "videos/2014_gender_human.jpg",
    date: "2012-02-10"
  }
];