// Translation dictionary for book-related content
export const books = {
  en: {
    // General book UI text
    bookCardDownloadText: "Download the book:",
    bookCardInterviewText: "Listen to my interviews:",
    bookCardFallbackDownloadText: "Download Full Text (PDF)",
    
    // Individual books
    alienacaoParental: {
      title: "Alienação Parental: Uma nova forma de violência de gênero contra mulheres e crianças na América Latina e Caribe",
      description: "This book examines how the false concept of \"parental alienation\" is used to undermine women's reports of abuse and remove custody from protective mothers in Latin America and the Caribbean. Though presented as psychological, it functions as institutional violence that hides domestic abuse and reinforces gender stereotypes. Based on a regional seminar led by CLADEM, Equality Now, and the Global Campaign for Equality in Family Law, this interdisciplinary volume analyzes legal trends and case studies from five countries, exposing coordinated efforts by anti-rights groups to roll back feminist advances in family law. Discussions held in Portuguese, automated translation available.",
      imageAlt: "Cover of the book.",
      downloadLinks: {
        cladem: "Read at Biblioteca CLADEM",
        usp: "Direct Download (USP Direito)"
      },
      interviewLinks: {
        radioUsp: "Listen To My Interview (Rádio USP)",
        papoJus: "Listen to Podcast \"Papo Jus\" #26, from AJUFESP, on Protecting Brazilian mothers living abroad.",
        trf3: "I spoke to TRF3justica, the official channel for the Federal Court in Brazil on Parental Alienation and the Hague Convention."
      }
    },
    direitosHumanos: {
      title: "Direitos humanos das mulheres e a comissão Interamericana de direitos humanos",
      description: "My book Direitos Humanos das Mulheres e a Comissão Interamericana de Direitos Humanos, (Saraiva, 2013) analyzes quantitative and qualitative data related to cases of women's human rights violations presented to the Inter-American Commission of Human Rights, identifying the regional agenda that feminist organizations have pushed through gender-sensitive strategic litigation. This work combined statistical analysis and case analysis, in pioneering jurimetrics work done in Brazil.",
      imageAlt: "Cover of the book titled 'Direitos Humanos das Mulheres e a Comissão Interamericana de Direitos Humanos'",
      purchaseText: "Buy This Book",
      purchaseLinks: {
        amazon: "Amazon (USA)",
        travessa: "Travessa (Brazil)"
      }
    },
    abortoReligiao: {
      title: "Aborto e Religião nos Tribunais Brasileiros",
      description: "In this MacArthur-Foundation-funded book, Aborto e Religião nos Tribunais Brasileiros (2008), I discuss the influence of religious arguments in abortion cases decided by Brazilian courts—in a country where abortion is illegal and is the 5th cause of maternal death. This research was grounded on feminist scholarship, sociological analysis of Catholic religion, and statistical data on court decisions. This was a pioneering work combining socio-legal feminist research and jurimetrics, when the latter was rarely used in Brazil. Available in Portuguese only.",
      imageAlt: "Cover of the book titled 'Aborto e Religião nos Tribunais Brasileiros'"
    }
  },
  pt: {
    // General book UI text
    bookCardDownloadText: "Baixar o livro:",
    bookCardInterviewText: "Ouça minhas entrevistas (Discussões realizadas em português, tradução automática disponível):",
    bookCardFallbackDownloadText: "Baixar Texto Completo (PDF)",
    
    // Individual books
    alienacaoParental: {
      title: "Alienação Parental: Uma nova forma de violência de gênero contra mulheres e crianças na América Latina e Caribe",
      description: "Este livro examina como o conceito de \"alienação parental\" é usado para minar relatos de abuso de mulheres e remover a custódia de mães  protetoras na América Latina e Caribe. Embora apresentado como  psicológico, funciona como violência institucional que esconde abuso  doméstico e reforça estereótipos de gênero. Baseado em um seminário  regional liderado por CLADEM, Equality Now e a Campanha Global para  Igualdade no Direito de Família, este volume interdisciplinar analisa  tendências legais e estudos de caso de cinco países, expondo esforços  coordenados de grupos anti-direitos para reverter avanços feministas no  campo do direito de família.",
      imageAlt: "Capa do livro.",
      downloadLinks: {
        cladem: "Leia na Biblioteca CLADEM",
        usp: "Download Direto (USP Direito)"
      },
      interviewLinks: {
        radioUsp: "Ouça Minha Entrevista (Rádio USP)",
        papoJus: "Ouça o Podcast \"Papo Jus\" #26, da AJUFESP, sobre Proteção de mães brasileiras vivendo no exterior.",
        trf3: "Falei para TRF3justica, o canal oficial do Tribunal Federal no Brasil sobre Alienação Parental e Convenção de Haia."
      }
    },
    direitosHumanos: {
      title: "Direitos humanos das mulheres e a comissão Interamericana de direitos humanos",
      description: "A obra Direitos Humanos das Mulheres e a Comissão Interamericana de  Direitos Humanos (Saraiva, 2013) analisa dados quantitativos e  qualitativos relacionados a casos de violações de direitos humanos das  mulheres apresentados à Comissão Interamericana de Direitos Humanos,  identificando a agenda regional que organizações feministas promoveram  através de litígio estratégico sensível ao gênero. Este trabalho  combinou análise estatística e análise de casos, em trabalho pioneiro de jurimetria feito no Brasil, tendo sido resultado de minha dissertação  de mestrado.",
      imageAlt: "Capa do livro intitulado 'Direitos Humanos das Mulheres e a Comissão Interamericana de Direitos Humanos'",
      purchaseText: "Comprar Este Livro",
      purchaseLinks: {
        amazon: "Amazon (EUA)",
        travessa: "Travessa (Brasil)"
      }
    },
    abortoReligiao: {
      title: "Aborto e Religião nos Tribunais Brasileiros",
      description: "Neste livro financiado pela Fundação MacArthur, Aborto e Religião nos  Tribunais Brasileiros (2008), discuto a influência de argumentos  religiosos em casos de aborto decididos por tribunais brasileiros—em um  país onde o aborto ilegal é a 5ª causa de mortalidade materna. Esta  pesquisa foi baseada em estudos feministas, análise sociológica da  religião católica e dados estatísticos sobre decisões judiciais. Este  foi um trabalho pioneiro combinando pesquisa feminista socio-jurídica e  jurimetria, quando esta última era raramente usada no Brasil. Disponível apenas em português.",
      imageAlt: "Capa do livro intitulado 'Aborto e Religião nos Tribunais Brasileiros'"
    }
  }
} as const;

// Type definitions for TypeScript
export type BookTranslations = typeof books;
export type Language = keyof BookTranslations;
export type BookKeys = keyof BookTranslations['en'];
export type IndividualBookKeys = keyof BookTranslations['en']['alienacaoParental'] | keyof BookTranslations['en']['direitosHumanos'] | keyof BookTranslations['en']['abortoReligiao'];
