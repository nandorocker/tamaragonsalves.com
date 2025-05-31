// Book data for the publications section
export interface Book {
  titleKey: string; // Translation key for title
  author: string;
  descriptionKey: string; // Translation key for description
  imageUrl: string;
  imageAltKey: string; // Translation key for imageAlt
  titleUrl?: string;
  downloadLinks?: Array<{
    textKey: string; // Translation key for text
    url: string;
    icon?: string;
  }>;
  interviewLinks?: Array<{
    textKey: string; // Translation key for text
    url: string;
    icon?: string;
  }>;
  purchaseLinks?: Array<{
    textKey: string; // Translation key for text
    url: string;
  }>;
  purchaseTextKey?: string; // Translation key for purchaseText
}

export const books: Book[] = [
  {
    titleKey: "books.alienacaoParental.title",
    author: "Tamara Amoroso Gonçalves",
    descriptionKey: "books.alienacaoParental.description",
    imageUrl: "livro_alienacao_parental.png",
    imageAltKey: "books.alienacaoParental.imageAlt",
    titleUrl: "https://www.amazon.com/Direitos-Humanos-Mulheres-Tamara-Amoroso/dp/8502187805/ref=sr_1_1?crid=36W7YBK85BINN&dib=eyJ2IjoiMSJ9.KwVNe-F1ZUfmrHYW8LSCw-w_CZPuVGIqMQkmkEH6Nbc51LhbYGokNNxgGei35xefXgO_d0dgL-H7LwuOxd0SsA.zTgcc4F9TJUAS7BOAemKVvgbn-2blSP2TE97WhxRrr0&dib_tag=se&keywords=Tamara+Amoroso+Gon%C3%A7alves&qid=1734551323&sprefix=tamara+amoroso+gon%C3%A7alves%2Caps%2C68&sr=8-1",
    downloadLinks: [
      {
        textKey: "books.alienacaoParental.downloadLinks.cladem",
        url: "https://cladem.org/biblioteca/alienacao-parental--uma-nova-forma-de-violencia-de--genero-contra-mulheres-e-criancas--na-america-latina-e-caribe",
        icon: "icon-file-pdf"
      },
      {
        textKey: "books.alienacaoParental.downloadLinks.usp",
        url: "https://www.direitorp.usp.br/wp-content/uploads/2025/03/Cladem-Digital-20022025.pdf?gathStatIcon=true",
        icon: "icon-file-pdf"
      }
    ],
    interviewLinks: [
      {
        textKey: "books.alienacaoParental.interviewLinks.radioUsp",
        url: "https://jornal.usp.br/campus-ribeirao-preto/obra-discute-como-a-alienacao-parental-se-tornou-arma-contra-maes-e-criancas-na-america-latina/",
        icon: "icon-video"
      },
      {
        textKey: "books.alienacaoParental.interviewLinks.papoJus",
        url: "https://www.youtube.com/watch?v=ypz-RGhrXX8",
        icon: "icon-video"
      },
      {
        textKey: "books.alienacaoParental.interviewLinks.trf3",
        url: "https://www.youtube.com/watch?v=zCPBM4gra9g",
        icon: "icon-video"
      }
    ]
  },
  {
    titleKey: "books.direitosHumanos.title",
    author: "Tamara Amoroso Gonçalves",
    descriptionKey: "books.direitosHumanos.description",
    imageUrl: "livro_direitos_humanos_mulheres.jpg",
    imageAltKey: "books.direitosHumanos.imageAlt",
    titleUrl: "https://www.amazon.com/Direitos-Humanos-Mulheres-Tamara-Amoroso/dp/8502187805/ref=sr_1_1?crid=36W7YBK85BINN&dib=eyJ2IjoiMSJ9.KwVNe-F1ZUfmrHYW8LSCw-w_CZPuVGIqMQkmkEH6Nbc51LhbYGokNNxgGei35xefXgO_d0dgL-H7LwuOxd0SsA.zTgcc4F9TJUAS7BOAemKVvgbn-2blSP2TE97WhxRrr0&dib_tag=se&keywords=Tamara+Amoroso+Gon%C3%A7alves&qid=1734551323&sprefix=tamara+amoroso+gon%C3%A7alves%2Caps%2C68&sr=8-1",
    purchaseTextKey: "books.direitosHumanos.purchaseText",
    purchaseLinks: [
      {
        textKey: "books.direitosHumanos.purchaseLinks.amazon",
        url: "https://www.amazon.com/Direitos-Humanos-Mulheres-Tamara-Amoroso/dp/8502187805/ref=sr_1_1?crid=36W7YBK85BINN&dib=eyJ2IjoiMSJ9.KwVNe-F1ZUfmrHYW8LSCw-w_CZPuVGIqMQkmkEH6Nbc51LhbYGokNNxgGei35xefXgO_d0dgL-H7LwuOxd0SsA.zTgcc4F9TJUAS7BOAemKVvgbn-2blSP2TE97WhxRrr0&dib_tag=se&keywords=Tamara+Amoroso+Gon%C3%A7alves&qid=1734551323&sprefix=tamara+amoroso+gon%C3%A7alves%2Caps%2C68&sr=8-1"
      },
      {
        textKey: "books.direitosHumanos.purchaseLinks.travessa",
        url: "https://www.travessa.com.br/direitos-humanos-das-mulheres-e-a-comissao-interamericana-de-direitos-humanos/artigo/30dee484-bdf8-42b2-a94d-32474fa288c3?srsltid=AfmBOordklfKb68qtIrO5jAXgujXynywUFEDtQ8M38iLFgvj-L7h95YM"
      }
    ]
  },
  {
    titleKey: "books.abortoReligiao.title",
    author: "Tamara Amoroso Gonçalves (coord.), Thais de Souza Lapa",
    descriptionKey: "books.abortoReligiao.description",
    imageUrl: "livro_aborto_e_religiao.png",
    imageAltKey: "books.abortoReligiao.imageAlt",
    titleUrl: "/files/Aborto_religiao_nos_tribunais_brasileiros.pdf"
  }
];