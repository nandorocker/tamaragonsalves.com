// Book data for the publications section
export interface Book {
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  titleUrl?: string;
  downloadLinks?: Array<{
    text: string;
    url: string;
    icon?: string;
  }>;
  interviewLinks?: Array<{
    text: string;
    url: string;
    icon?: string;
  }>;
  purchaseLinks?: Array<{
    text: string;
    url: string;
  }>;
  purchaseText?: string;
}

export const books: Book[] = [
  {
    title: "Alienação Parental: Uma nova forma de violência de gênero contra mulheres e crianças na América Latina e Caribe",
    author: "Tamara Amoroso Gonçalves",
    description: "This book examines how the false concept of \"parental alienation\" is used to undermine women's reports of abuse and remove custody from protective mothers in Latin America and the Caribbean. Though presented as psychological, it functions as institutional violence that hides domestic abuse and reinforces gender stereotypes. Based on a regional seminar led by CLADEM, Equality Now, and the Global Campaign for Equality in Family Law, this interdisciplinary volume analyzes legal trends and case studies from five countries, exposing coordinated efforts by anti-rights groups to roll back feminist advances in family law. Discussions held in Portuguese, automated translation available.",
    imageUrl: "livro_alienacao_parental.png",
    imageAlt: "Cover of the book.",
    titleUrl: "https://www.amazon.com/Direitos-Humanos-Mulheres-Tamara-Amoroso/dp/8502187805/ref=sr_1_1?crid=36W7YBK85BINN&dib=eyJ2IjoiMSJ9.KwVNe-F1ZUfmrHYW8LSCw-w_CZPuVGIqMQkmkEH6Nbc51LhbYGokNNxgGei35xefXgO_d0dgL-H7LwuOxd0SsA.zTgcc4F9TJUAS7BOAemKVvgbn-2blSP2TE97WhxRrr0&dib_tag=se&keywords=Tamara+Amoroso+Gon%C3%A7alves&qid=1734551323&sprefix=tamara+amoroso+gon%C3%A7alves%2Caps%2C68&sr=8-1",
    downloadLinks: [
      {
        text: "Read at Biblioteca CLADEM",
        url: "https://cladem.org/biblioteca/alienacao-parental--uma-nova-forma-de-violencia-de--genero-contra-mulheres-e-criancas--na-america-latina-e-caribe",
        icon: "icon-file-pdf"
      },
      {
        text: "Direct Download (USP Direito)",
        url: "https://www.direitorp.usp.br/wp-content/uploads/2025/03/Cladem-Digital-20022025.pdf?gathStatIcon=true",
        icon: "icon-file-pdf"
      }
    ],
    interviewLinks: [
      {
        text: "Listen To My Interview (Rádio USP)",
        url: "https://jornal.usp.br/campus-ribeirao-preto/obra-discute-como-a-alienacao-parental-se-tornou-arma-contra-maes-e-criancas-na-america-latina/",
        icon: "icon-video"
      },
      {
        text: "Listen to Podcast \"Papo Jus\" #26, from AJUFESP, on Protecting Brazilian mothers living abroad.",
        url: "https://www.youtube.com/watch?v=ypz-RGhrXX8",
        icon: "icon-video"
      },
      {
        text: "I spoke to TRF3justica, the official channel for the Federal Court in Brazil on Parental Alienation and the Hague Convention.",
        url: "https://www.youtube.com/watch?v=zCPBM4gra9g",
        icon: "icon-video"
      }
    ]
  },
  {
    title: "Direitos humanos das mulheres e a comissão Interamericana de direitos humanos",
    author: "Tamara Amoroso Gonçalves",
    description: "My book Direitos Humanos das Mulheres e a Comissão Interamericana de Direitos Humanos, (Saraiva, 2013) analyzes quantitative and qualitative data related to cases of women's human rights violations presented to the Inter-American Commission of Human Rights, identifying the regional agenda that feminist organizations have pushed through gender-sensitive strategic litigation. This work combined statistical analysis and case analysis, in pioneering jurimetrics work done in Brazil.",
    imageUrl: "livro_direitos_humanos_mulheres.jpg",
    imageAlt: "Cover of the book titled 'Direitos Humanos das Mulheres e a Comissão Interamericana de Direitos Humanos'",
    titleUrl: "https://www.amazon.com/Direitos-Humanos-Mulheres-Tamara-Amoroso/dp/8502187805/ref=sr_1_1?crid=36W7YBK85BINN&dib=eyJ2IjoiMSJ9.KwVNe-F1ZUfmrHYW8LSCw-w_CZPuVGIqMQkmkEH6Nbc51LhbYGokNNxgGei35xefXgO_d0dgL-H7LwuOxd0SsA.zTgcc4F9TJUAS7BOAemKVvgbn-2blSP2TE97WhxRrr0&dib_tag=se&keywords=Tamara+Amoroso+Gon%C3%A7alves&qid=1734551323&sprefix=tamara+amoroso+gon%C3%A7alves%2Caps%2C68&sr=8-1",
    purchaseText: "Buy This Book",
    purchaseLinks: [
      {
        text: "Amazon (USA)",
        url: "https://www.amazon.com/Direitos-Humanos-Mulheres-Tamara-Amoroso/dp/8502187805/ref=sr_1_1?crid=36W7YBK85BINN&dib=eyJ2IjoiMSJ9.KwVNe-F1ZUfmrHYW8LSCw-w_CZPuVGIqMQkmkEH6Nbc51LhbYGokNNxgGei35xefXgO_d0dgL-H7LwuOxd0SsA.zTgcc4F9TJUAS7BOAemKVvgbn-2blSP2TE97WhxRrr0&dib_tag=se&keywords=Tamara+Amoroso+Gon%C3%A7alves&qid=1734551323&sprefix=tamara+amoroso+gon%C3%A7alves%2Caps%2C68&sr=8-1"
      },
      {
        text: "Travessa (Brazil)",
        url: "https://www.travessa.com.br/direitos-humanos-das-mulheres-e-a-comissao-interamericana-de-direitos-humanos/artigo/30dee484-bdf8-42b2-a94d-32474fa288c3?srsltid=AfmBOordklfKb68qtIrO5jAXgujXynywUFEDtQ8M38iLFgvj-L7h95YM"
      }
    ]
  },
  {
    title: "Aborto e Religião nos Tribunais Brasileiros",
    author: "Tamara Amoroso Gonçalves (coord.), Thais de Souza Lapa",
    description: "In this MacArthur-Foundation-funded book, Aborto e Religião nos Tribunais Brasileiros (2008), I discuss the influence of religious arguments in abortion cases decided by Brazilian courts—in a country where abortion is illegal and is the 5th cause of maternal death. This research was grounded on feminist scholarship, sociological analysis of Catholic religion, and statistical data on court decisions. This was a pioneering work combining socio-legal feminist research and jurimetrics, when the latter was rarely used in Brazil. Available in Portuguese only.",
    imageUrl: "livro_aborto_e_religiao.png",
    imageAlt: "Cover of the book titled 'Aborto e Religião nos Tribunais Brasileiros'",
    titleUrl: "/files/Aborto_religiao_nos_tribunais_brasileiros.pdf"
  }
];