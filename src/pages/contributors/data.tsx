import React from "react";
import { Github, Link, Mail } from "lucide-react";
import { LiaOrcid } from "react-icons/lia";

import ALenz from "@/assets/contributors/A_Lenz.jpeg";
import EJunior from "@/assets/contributors/E_Junior.jpg";
import Mariana from "@/assets/contributors/Mariana.png";
import Nelson from "@/assets/contributors/Nelson.png";
import Marina from "@/assets/contributors/Marina.png";
import VitorX from "@/assets/contributors/VitorX.png";
import Felipe from "@/assets/contributors/Felipe.png";
import Melissa from "@/assets/contributors/Melissa.png";
import MariaEduarda from "@/assets/contributors/MariaEduarda.png";
import Larissa from "@/assets/contributors/Larissa.png";
import Altielys from "@/assets/contributors/Altielys.png";
import Ariadne from "@/assets/contributors/Ariadne.png";
import AlexandreFilho from "@/assets/contributors/AlexandreFilho.png";
import Cristiano from "@/assets/contributors/Cristiano.png";
import Renato from "@/assets/contributors/Renato.png";
import Tatiana from "@/assets/contributors/Tatiana.png";
import Jadson from "@/assets/contributors/Jadson.png";
import Juliano from "@/assets/contributors/Juliano.png";
import Maria from "@/assets/contributors/Maria.png";
import Ruby from "@/assets/contributors/Ruby.png";
import Noemia from "@/assets/contributors/Noemia.png";

import PBenevides from "@/assets/contributors/developers/P_Benevides.png";
import DGomes from "@/assets/contributors/developers/D_Gomes.png";
import RCoutinho from "@/assets/contributors/developers/R_Coutinho.png";
import ICruz from "@/assets/contributors/developers/I_Cruz.png";
import ACruz from "@/assets/contributors/developers/A_Cruz.png";
import VBitencourt from "@/assets/contributors/developers/V_Bitencourt.png";
import DBarbosa from "@/assets/contributors/developers/D_Barbosa.png";

import G2BC from "@/assets/contributors/institutions/G2BC.png";
import IFSP from "@/assets/contributors/institutions/IFSP.png";
import UFSC from "@/assets/contributors/institutions/UFSC.png";
import UNEB from "@/assets/contributors/institutions/UNEB.jpg";
import UFPB from "@/assets/contributors/institutions/UFPB.png";
import UFSCar from "@/assets/contributors/institutions/UFSCar.png";
import UFES from "@/assets/contributors/institutions/UFES.png";
import UFRGS from "@/assets/contributors/institutions/UFRGS.png";
import INPA from "@/assets/contributors/institutions/INPA.png";
import UFPE from "@/assets/contributors/institutions/UFPE.jpg";
import IFungiLab from "@/assets/contributors/institutions/IFungiLab.jpeg";

export type Contributor = {
  avatar: string;
  imageFit?: "cover" | "contain";
  radius?: boolean;
  name: string;
  bio: {
    pt: string;
    en: string;
  };
  links: {
    icon: React.JSX.Element;
    href: string;
    title: string;
  }[];
};

export const contributors: Contributor[] = [
  {
    avatar: Mariana,
    name: "Mariana P. Drewinski",
    bio: {
      en: "PhD in Plant Biodiversity and Environment (Environmental Research Institute, São Paulo, SP, Brazil), is a mycologist and has experience in systematics of macrofungi and mushroom production. Her research topics include the diversity of wild edible mushrooms in Brazil, mainly from the Atlantic Rainforest, and the cultivation potential of wild strains. Mariana is also interested in fungal conservation and science outreach.",
      pt: "Doutora em Biodiversidade Vegetal e Meio Ambiente (Instituto de Pesquisas Ambientais, São Paulo, SP, Brasil), é micóloga e tem experiência em sistemática de macrofungos e produção de cogumelos. Seus temas de pesquisa incluem a diversidade de cogumelos comestíveis silvestres no Brasil, principalmente da Mata Atlântica, e o potencial de cultivo de linhagens silvestres. Mariana também tem interesse em conservação de fungos e divulgação científica.",
    },
    links: [],
  },
  {
    avatar: Nelson,
    name: "Nelson Menolli Jr",
    bio: {
      en: "Is biologist, Doctor in Plant Biodiversity and Environment (Environmental Research Institute, São Paulo, SP, Brazil), full professor at Federal Institute of Education, Science and Technology of São Paulo (IFSP), Brazil, coordinator of the iFungiLab and curator of the fungarium FungiA at the same institution. Nelson has experience in taxonomy, conservation and molecular phylogeny of mushroom-forming fungi and cultivation of wild edible mushrooms. As an initiative of scientific outreach and science communication, Nelson coordinates the profile @iFungiLab on Instagram.",
      pt: "Biólogo, doutor em Biodiversidade Vegetal e Meio Ambiente (Instituto de Pesquisas Ambientais, São Paulo, SP, Brasil), professor titular do Instituto Federal de Educação, Ciência e Tecnologia de São Paulo (IFSP), Brasil, coordenador do iFungiLab e curador do fungário FungiA na mesma instituição. Nelson tem experiência em taxonomia, conservação e filogenia molecular de fungos formadores de cogumelos e no cultivo de cogumelos comestíveis silvestres. Como iniciativa de divulgação científica e comunicação pública da ciência, Nelson coordena o perfil @iFungiLab no Instagram.",
    },
    links: [],
  },
  {
    avatar: ALenz,
    name: "Alexandre Rafael Lenz",
    bio: {
      pt: "Possui graduação em Ciência da Computação pela Universidade Luterana do Brasil (2007), Mestrado em Informática pela Universidade Federal do Paraná (2009), Doutorado em Biotecnologia pela Universidade de Caxias do Sul realizando Intercâmbio Sanduíche na Universidad Nacional Autónoma de México, Unidad Académica IIMAS, Mérida, Yucatán, México (2020). Atualmente é Professor Adjunto do Colegiado de Bacharelado em Sistemas de Informação do Campus I da Universidade do Estado da Bahia. Professor Permanente no Programa de Pós-Graduação em Ciências Farmacêuticas (PPGFARMA), no Departamento de Ciências da Vida do Campus I da Universidade do Estado da Bahia. Fundador do Grupo de Pesquisa em Bioinformática e Biologia Computacional da UNEB (G2BC), atua na linha de pesquisa em bioinformática fúngica. Tem experiência na área de Bioinformática, com ênfase em Genômica e Regulação Gênica de Fungos, atuando principalmente nos seguintes temas: (i) montagem e anotação de genomas; (ii) Análises filogenéticas e evolutivas; (iii) construção de redes de regulação de genes e iv) prospecção de compostos naturais em cogumelos. Descreveu uma espécie nova de fungo filamentoso para o gênero Penicillium, com base em materiais do Brasil e da Coreia do Sul. Está envolvido em projetos de taxonomia, filogenia, análises evolutivas e prospecção de compostos bioativos de fungos ascomicetos e basidiomicetos.",
      en: "He holds a Bachelor's degree in Computer Science from the Lutheran University of Brazil (2007), a Master's degree in Informatics from the Federal University of Paraná (2009), and a Ph.D. in Biotechnology from the University of Caxias do Sul, with a Sandwich Exchange at the National Autonomous University of Mexico, Academic Unit IIMAS, Mérida, Yucatán, Mexico (2020). He is currently an Adjunct Professor at the Bachelor’s Degree Program in Information Systems, Campus I, State University of Bahia. He is a Permanent Professor in the Graduate Program in Pharmaceutical Sciences (PPGFARMA) at the Department of Life Sciences, Campus I, State University of Bahia. Founder of the Bioinformatics and Computational Biology Research Group at UNEB (G2BC), he works in the research line of fungal bioinformatics. He has experience in Bioinformatics, with an emphasis on Fungal Genomics and Gene Regulation, mainly working on the following topics: (i) genome assembly and annotation; (ii) phylogenetic and evolutionary analyses; (iii) construction of gene regulatory networks; and (iv) bioprospecting of natural compounds in mushrooms. He described a new species of filamentous fungus for the genus Penicillium, based on materials from Brazil and South Korea. He is involved in projects on taxonomy, phylogeny, evolutionary analyses, and bioprospecting of bioactive compounds from ascomycete and basidiomycete fungi.",
    },
    links: [
      {
        icon: <Mail className="w-5 h-5" />,
        href: "mailto:alenz@uneb.br",
        title: "Email",
      },
      {
        icon: <Link className="w-5 h-5" />,
        href: "http://lattes.cnpq.br/9063268848566672",
        title: "Lattes",
      },
      {
        icon: <LiaOrcid className="w-6 h-6" />,
        href: "https://orcid.org/0000-0001-6699-2899",
        title: "ORCID",
      },
      {
        icon: <Github className="w-5 h-5" />,
        href: "https://github.com/G2BC",
        title: "GitHub",
      },
    ],
  },
  {
    avatar: Marina,
    name: "Marina Pires Corrêa-Santos",
    bio: {
      en: "Msc in Plant Biodiversity and Environment (Environmental Research Institute, São Paulo, SP, Brazil), is a mycologist and has experience in mushroom domestication. She researches the cultivation factors of wild edible mushrooms in Brazil, mainly from the Atlantic Forest. Her masters study focused on the diversity and cultivation factors of wild strains of the genus Lentinus.",
      pt: "Mestra em Biodiversidade Vegetal e Meio Ambiente (Instituto de Pesquisas Ambientais, São Paulo, SP, Brasil), é micóloga e tem experiência em domesticação de cogumelos. Pesquisa fatores de cultivo de cogumelos comestíveis silvestres no Brasil, principalmente da Mata Atlântica. Seu estudo de mestrado teve foco na diversidade e nos fatores de cultivo de linhagens silvestres do gênero Lentinus.",
    },
    links: [],
  },
  {
    avatar: VitorX,
    name: "Vitor X. Lima",
    bio: {
      en: "PhD in Fungal Biology (Federal University of Pernambuco, Recife, PE, Brazil), has experience in taxonomy and systematics of myxomycetes, dictyostelids and wood-inhabiting basidiomycetes from the Atlantic Forest, statistical ecology, biogeography and molecular phylogeny of these organisms. Has also experience in prospecting wild edible fungi for ex situ cultivation, and ecology of soil and endophytic fungi.",
      pt: "Doutor em Biologia de Fungos (Universidade Federal de Pernambuco, Recife, PE, Brasil), tem experiência em taxonomia e sistemática de mixomicetos, dictiostelídeos e basidiomicetos lignícolas da Mata Atlântica, ecologia estatística, biogeografia e filogenia molecular desses organismos. Também tem experiência em prospecção de fungos comestíveis silvestres para cultivo ex situ e em ecologia de fungos do solo e endofíticos.",
    },
    links: [],
  },
  {
    avatar: Felipe,
    name: "Felipe T. Lima",
    bio: {
      en: "MSc in Agricultural Microbiology (Federal University of Viçosa, Viçosa, MG, Brazil), is a Forest Engineer (Rural Federal University of Pernambuco) which focuses its efforts on research and extension in the areas of forest microbiology, microorganism-plant interactions and forestry. Felipe is currently a collaborating researcher at Instituto de Pesquisas e Estudos Florestais (IPEF).",
      pt: "Mestre em Microbiologia Agrícola (Universidade Federal de Viçosa, Viçosa, MG, Brasil), é engenheiro florestal (Universidade Federal Rural de Pernambuco) e concentra seus esforços em pesquisa e extensão nas áreas de microbiologia florestal, interações microrganismo-planta e silvicultura. Felipe é atualmente pesquisador colaborador no Instituto de Pesquisas e Estudos Florestais (IPEF).",
    },
    links: [],
  },
  {
    avatar: Melissa,
    name: "Melissa Palacio",
    bio: {
      en: "PhD in Botany (Federal University of Rio Grande do Sul, Porto Alegre, RS, Brazil). She has experience in systematics and ecology of Neotropical macrofungi, especially polypores from the Atlantic Forest. Her latest studies focused on the diversity of the genus Polyporus. Melissa is other interests include evolution, biotechnology, fungal education and conservation.",
      pt: "Doutora em Botânica (Universidade Federal do Rio Grande do Sul, Porto Alegre, RS, Brasil). Tem experiência em sistemática e ecologia de macrofungos neotropicais, especialmente políporos da Mata Atlântica. Seus estudos mais recentes focaram na diversidade do gênero Polyporus. Melissa também tem interesse em evolução, biotecnologia, educação micológica e conservação.",
    },
    links: [],
  },
  {
    avatar: MariaEduarda,
    name: "Maria Eduarda A. Borges",
    bio: {
      en: "Has a masters and is a PhD student in the Graduate Program in Biology of Fungi, Algae and Plants (Federal University of Santa Catarina, Florianópolis, SC, Brazil). She is interested in taxonomy, molecular phylogeny, and interactions of Agaricomycetes with emphasis in bioluminescent mushrooms, especially species of Mycena. Maria Eduarda is a member of the MICOLAB-UFSC and part of the TropicoEctomicorrizas project. She is an enthusiast of outreach and the person behind @coguquebrilha. She has experience in the field and her interests also include conservation of fungi and teaching mycology.",
      pt: "Mestra e doutoranda no Programa de Pós-Graduação em Biologia de Fungos, Algas e Plantas (Universidade Federal de Santa Catarina, Florianópolis, SC, Brasil). Tem interesse em taxonomia, filogenia molecular e interações de Agaricomycetes, com ênfase em cogumelos bioluminescentes, especialmente espécies de Mycena. Maria Eduarda é integrante do MICOLAB-UFSC e faz parte do projeto TropicoEctomicorrizas. É entusiasta da divulgação científica e responsável pelo perfil @coguquebrilha. Tem experiência de campo e seus interesses também incluem conservação de fungos e ensino de micologia.",
    },
    links: [],
  },
  {
    avatar: Larissa,
    name: "Larissa Trierveiler-Pereira",
    bio: {
      en: "PhD in Botany (Federal University of Rio Grande do Sul, Porto Alegre, RS, Brazil) and currently a collaborator researcher at State University of Campinas. She has experience in systematics and ecology of Neotropical macrofungi, particularly basidiomycetes from the Atlantic Forest. Larissa also has experience in scientific outreach and science communication. She hosts an Instagram profile on edible mushrooms (@fancnacabeca), has published a book about the subject, and coordinates elective courses of science communication on mycology and edible mushrooms. Larissa is also interested in topics as: mycology education, ethnomycology, and mycophagy.",
      pt: "Doutora em Botânica (Universidade Federal do Rio Grande do Sul, Porto Alegre, RS, Brasil) e atualmente pesquisadora colaboradora na Universidade Estadual de Campinas. Tem experiência em sistemática e ecologia de macrofungos neotropicais, particularmente basidiomicetos da Mata Atlântica. Larissa também tem experiência em divulgação científica e comunicação pública da ciência. Mantém um perfil no Instagram sobre cogumelos comestíveis (@fancnacabeca), publicou um livro sobre o tema e coordena disciplinas eletivas de comunicação científica em micologia e cogumelos comestíveis. Também se interessa por educação em micologia, etnomicologia e micofagia.",
    },
    links: [],
  },
  {
    avatar: Altielys,
    name: "Altielys C. Magnago",
    bio: {
      en: " 'PhD in Botany (Federal University of Rio Grande do Sul, Porto Alegre, RS, Brazil). He has experience in systematics and ecology of Neotropical macrofungi, specially boletoid fungi from the Brazilian Atlantic Forest. He is also involved in societal activities concerning fungal diversity and scientific divulgation through social media, hosting an Instagram profile on fungal diversity (@fungacapixaba). His other interests include mycophagy and fungal education and conservation.",
      pt: "Doutor em Botânica (Universidade Federal do Rio Grande do Sul, Porto Alegre, RS, Brasil). Tem experiência em sistemática e ecologia de macrofungos neotropicais, especialmente fungos boletoides da Mata Atlântica brasileira. Também atua em atividades sociais relacionadas à diversidade fúngica e à divulgação científica em redes sociais, mantendo o perfil @fungacapixaba no Instagram. Seus outros interesses incluem micofagia, educação em fungos e conservação.",
    },
    links: [],
  },
  {
    avatar: Ariadne,
    name: "Ariadne N. M. Furtado",
    bio: {
      en: "PhD in Biology of Fungi, Algae and Plants (Federal University of Santa Catarina, Florianópolis, SC, Brazil) and a member of the Brazilian Mycological Society and the South American Mycorrhizal Research Network, and a researcher at the TropicoEctomicorrizas project (UFSC-Brazil). She has experience in systematics of macrofungi, mainly Clavariaceae sensu lato, and diversity of Neotropical ectomycorrhizae.  Ariadne also has experience with protein structure modeling and molecular docking, and is currently a postdoctoral researcher (Federal University of Paraíba, Brazil). Ariadne is interested in how trait-based approaches predict mycorrhizal dispersal structure, and how MiSSPs influence structural modifications of ectomycorrhizal symbiosis by promoting, for example, root determinacy, which pathways are affected by fungal signaling, and how fungi contribute to hormonal imbalance in plants.",
      pt: "Doutora em Biologia de Fungos, Algas e Plantas (Universidade Federal de Santa Catarina, Florianópolis, SC, Brasil), membro da Sociedade Brasileira de Micologia e da Rede Sul-Americana de Pesquisa em Micorrizas, e pesquisadora no projeto TropicoEctomicorrizas (UFSC-Brasil). Tem experiência em sistemática de macrofungos, principalmente Clavariaceae sensu lato, e diversidade de ectomicorrizas neotropicais. Ariadne também tem experiência com modelagem de estrutura de proteínas e docking molecular, e atualmente é pesquisadora de pós-doutorado (Universidade Federal da Paraíba, Brasil). Seus interesses envolvem como abordagens baseadas em traços predizem a estrutura de dispersão micorrízica e como MiSSPs influenciam modificações estruturais da simbiose ectomicorrízica, promovendo, por exemplo, determinância radicular, quais vias são afetadas pela sinalização fúngica e como os fungos contribuem para o desequilíbrio hormonal em plantas.",
    },
    links: [],
  },
  {
    avatar: AlexandreFilho,
    name: "Alexandre G. S. Silva-Filho",
    bio: {
      en: "Msc in Botany and a PhD in Systematics and Evolution (Federal University of Rio Grande do Norte, Natal, RN, Brazil). His expertise is in Taxonomy, Systematics and Phylogeny of Agaricomycetes (Basidiomycota). Currently, he is a Postdoctoral researcher at IFungiLab, at the Federated Institute of Science, Education and Technology of São Paulo, where has been developing research with Taxonomy and Systematics of Mycenaceae from the Brazilian Atlantic Rainforest.",
      pt: "Mestre em Botânica e doutor em Sistemática e Evolução (Universidade Federal do Rio Grande do Norte, Natal, RN, Brasil). Sua especialidade é taxonomia, sistemática e filogenia de Agaricomycetes (Basidiomycota). Atualmente é pesquisador de pós-doutorado no IFungiLab, no Instituto Federal de Educação, Ciência e Tecnologia de São Paulo, onde desenvolve pesquisas com taxonomia e sistemática de Mycenaceae da Mata Atlântica brasileira.",
    },
    links: [],
  },
  {
    avatar: Cristiano,
    name: "Cristiano Coelho do Nascimento",
    links: [],
    bio: {
      en: "Is a nurse and biologist, Msc in Fungal Biology (Federal University of Pernambuco, Recife, PE, Brazil), PhD student in Plant Biodiversity and Environment (Institute of Botany, São Paulo, Brazil), professor at Federal Institute of Education, Science and Technology of Piauí (IFPI), Brazil. He is interested in taxonomy, molecular phylogeny, ethnomycology, and conservation of Agaricomycetes, as well as the cultivation of wild edible mushrooms. He is also involved in scientific outreach concerning fungal biology through the profile @IFungiLab on Instagram.",
      pt: "Enfermeiro e biólogo, mestre em Biologia de Fungos (Universidade Federal de Pernambuco, Recife, PE, Brasil), doutorando em Biodiversidade Vegetal e Meio Ambiente (Instituto de Botânica, São Paulo, Brasil), professor do Instituto Federal de Educação, Ciência e Tecnologia do Piauí (IFPI), Brasil. Tem interesse em taxonomia, filogenia molecular, etnomicologia e conservação de Agaricomycetes, bem como no cultivo de cogumelos comestíveis silvestres. Também atua em divulgação científica sobre biologia de fungos por meio do perfil @IFungiLab no Instagram.",
    },
  },
  {
    avatar: Renato,
    name: "Renato L. M. Alvarenga",
    bio: {
      en: "PhD in Fungal Biology (Federal University of Pernambuco, Recife, PE, Brazil), has experience in taxonomy and systematics of jelly fungi (Auriculariales, Tremellales and Dacrymycetes) from the Amazon Forest, Atlantic Forest and Cerrado, statistical ecology, biogeography and molecular phylogeny of wood-inhabiting basidiomycetes. He also has experience in prospecting edible wild fungi for ex situ cultivation, biotechnology with an emphasis on bioactives with antimicrobial activity and enzyme production.",
      pt: "Doutor em Biologia de Fungos (Universidade Federal de Pernambuco, Recife, PE, Brasil), tem experiência em taxonomia e sistemática de fungos gelatinosos (Auriculariales, Tremellales e Dacrymycetes) da Floresta Amazônica, Mata Atlântica e Cerrado, ecologia estatística, biogeografia e filogenia molecular de basidiomicetos lignícolas. Também tem experiência em prospecção de fungos comestíveis silvestres para cultivo ex situ e biotecnologia com ênfase em bioativos com atividade antimicrobiana e produção de enzimas.",
    },
    links: [],
  },
  {
    avatar: Tatiana,
    name: "Tatiana B. Gibertoni",
    links: [],
    bio: {
      en: "PhD in Fungal Biology (Federal University of Pernambuco Recife, PE, Brazil) and in Experimental Ecology and Geobotany (Università degli Studi di Pavia, Italy) and currently full professor at Federal University of Pernambuco, vice-coordinator of the Fungal Biology Post-Graduate Program (Federal University of Pernambuco) and vice-curator of Herbarium URM. She is interested in taxonomy, systematics, conservation of Agaricomycetes, as well as the sustainable use of these fungi as food, in bioremediation and in pharmaceutics. She is also involved in societal activities concerning fungal diversity and scientific divulgation through social media.",
      pt: "Doutora em Biologia de Fungos (Universidade Federal de Pernambuco, Recife, PE, Brasil) e em Ecologia Experimental e Geobotânica (Università degli Studi di Pavia, Itália), atualmente professora titular da Universidade Federal de Pernambuco, vice-coordenadora do Programa de Pós-Graduação em Biologia de Fungos (Universidade Federal de Pernambuco) e vice-curadora do Herbário URM. Tem interesse em taxonomia, sistemática e conservação de Agaricomycetes, bem como no uso sustentável desses fungos como alimento, em biorremediação e em aplicações farmacêuticas. Também atua em atividades sociais relacionadas à diversidade fúngica e à divulgação científica em redes sociais.",
    },
  },
  {
    avatar: Jadson,
    name: "Jadson J. S. Oliveira",
    links: [],
    bio: {
      en: "PhD in Plant Biodiversity and the Environment (Environmental Research Institute, São Paulo, SP, Brazil). He has experience in Botany and Mycology, especially in taxonomy and phylogeny of Fungi (basidiomycetes), mycelium cultivation, genetics and evolution of Agaricales. He has a postdoctoral degree from the Royal Ontario Museum, Toronto, Canada, in Phylogenomics using Exome Target Sequencing in Agaricales, and from the National Institute for Amazon Research (INPA), Manaus, AM, with a taxonomy and systematics research project on the suborder Marasmiineae in areas of the central Amazon.",
      pt: "Doutor em Biodiversidade Vegetal e Meio Ambiente (Instituto de Pesquisas Ambientais, São Paulo, SP, Brasil). Tem experiência em botânica e micologia, especialmente em taxonomia e filogenia de fungos (basidiomicetos), cultivo de micélio, genética e evolução de Agaricales. Possui pós-doutorado pelo Royal Ontario Museum, Toronto, Canadá, em filogenômica utilizando Exome Target Sequencing em Agaricales, e pelo Instituto Nacional de Pesquisas da Amazônia (INPA), Manaus, AM, com projeto de pesquisa em taxonomia e sistemática da subordem Marasmiineae em áreas da Amazônia central.",
    },
  },
  {
    avatar: Juliano,
    name: "Juliano M. Baltazar",
    links: [],
    bio: {
      en: "PhD in Botany (Federal University of Rio Grande do Sul, Porto Alegre, RS, Brazil) and professor at the Federal University of São Carlos. He has experience in systematics and ecology of Neotropical macrofungi, especially corticioid fungi and polypores from the Atlantic Forest. Juliano is also interested in ethnomycology, mycophagy, edible fungi, mycology education and education as general.",
      pt: "Doutor em Botânica (Universidade Federal do Rio Grande do Sul, Porto Alegre, RS, Brasil) e professor da Universidade Federal de São Carlos. Tem experiência em sistemática e ecologia de macrofungos neotropicais, especialmente fungos corticioides e políporos da Mata Atlântica. Juliano também tem interesse em etnomicologia, micofagia, fungos comestíveis, educação em micologia e educação de modo geral.",
    },
  },
  {
    avatar: Maria,
    name: "Maria Alice Neves",
    links: [],
    bio: {
      en: "Has a PhD in Plant Sciences through The New York Botanical Garden and CUNY. She is a professor at the Federal University of Santa Catarina and the graduate program in Biology of Fungi, Algae and Plants, coordinator of the MICOLAB-UFSC, and curator of the Fungarium FLOR. Maria-Alice has experience in mushroom taxonomy and ectomycorrhizal interactions and is the founder of the TropicoEctomicorrizas project. She started the Rick Foray in 2010, an outreach activity to get people interested in mycology and natural history. Her other interests include fungal education and conservation and scientific embroidery.",
      pt: "Doutora em Ciências Vegetais pelo The New York Botanical Garden e pela CUNY. É professora da Universidade Federal de Santa Catarina e do Programa de Pós-Graduação em Biologia de Fungos, Algas e Plantas, coordenadora do MICOLAB-UFSC e curadora do Fungário FLOR. Maria Alice tem experiência em taxonomia de cogumelos e interações ectomicorrízicas, e é fundadora do projeto TropicoEctomicorrizas. Iniciou o Rick Foray em 2010, uma atividade de divulgação para aproximar pessoas da micologia e da história natural. Seus outros interesses incluem educação em fungos, conservação e bordado científico.",
    },
  },
  {
    avatar: Ruby,
    name: "Ruby Vargas-Isla",
    links: [],
    bio: {
      en: "PhD in Botany (National Amazon Research Institute, INPA, Manaus, AM, Brazil). She currently participates in the Amazon Mushrooms Research Group projects of the INPA and has a start-up carrying out environmental consulting and spawn production of native mushroom species in the Amazonas Organic Production Center. She chose to study fungi with emphasis on edible native mushrooms to the Amazon, ethnomycology, fungiculture and mycotourism. In addition to articles, she writes booklets and technical-scientific guides and books about mushrooms and is published in indigenous and non-indigenous languages.",
      pt: "Doutora em Botânica (Instituto Nacional de Pesquisas da Amazônia, INPA, Manaus, AM, Brasil). Atualmente participa de projetos do Grupo de Pesquisa Cogumelos da Amazônia do INPA e possui uma startup que realiza consultoria ambiental e produção de spawn de espécies nativas de cogumelos no Centro de Produção Orgânica do Amazonas. Escolheu estudar fungos com ênfase em cogumelos nativos comestíveis da Amazônia, etnomicologia, fungicultura e micoturismo. Além de artigos, escreve cartilhas, guias técnico-científicos e livros sobre cogumelos, publicados em línguas indígenas e não indígenas.",
    },
  },
  {
    avatar: Noemia,
    name: "Noemia K. Ishikawa",
    links: [],
    bio: {
      en: "PhD in Environmental Resources from Hokkaido University, Japan. She is a researcher at the National Amazon Research Institute, Manaus, AM, Brazil. She leads the Amazon Mushrooms Research Group since 2007. Coordinates projects about fungiculture, mycotourism, ethnomycology and popularization of mycology in the Amazon. In addition to articles and scientific books about mushrooms, she writes childrens books, published in indigenous and non-indigenous languages.",
      pt: "Doutora em Recursos Ambientais pela Universidade de Hokkaido, Japão. É pesquisadora do Instituto Nacional de Pesquisas da Amazônia, Manaus, AM, Brasil. Lidera o Grupo de Pesquisa Cogumelos da Amazônia desde 2007. Coordena projetos sobre fungicultura, micoturismo, etnomicologia e popularização da micologia na Amazônia. Além de artigos e livros científicos sobre cogumelos, escreve livros infantis publicados em línguas indígenas e não indígenas.",
    },
  },
];

export const developers: Contributor[] = [
  {
    avatar: EJunior,
    name: "Ernesto S. M. Neto Júnior",
    bio: { en: "Full Stack", pt: "Full Stack" },
    links: [
      {
        icon: <Mail className="w-5 h-5" />,
        href: "mailto:ernesto.sjunior@hotmail.com",
        title: "Email",
      },
      {
        icon: <Link className="w-5 h-5" />,
        href: "https://lattes.cnpq.br/0556706706006912",
        title: "Lattes",
      },
      {
        icon: <LiaOrcid className="w-6 h-6" />,
        href: "https://orcid.org/0009-0002-6069-932X",
        title: "ORCID",
      },
      {
        icon: <Github className="w-5 h-5" />,
        href: "https://github.com/ernestosjunior",
        title: "GitHub",
      },
    ],
  },
  {
    avatar: PBenevides,
    name: "Pedro Benevides",
    links: [],
    bio: { en: "Backend", pt: "Backend" },
  },
  {
    avatar: DGomes,
    name: "Deivisson Gomes",
    links: [],
    bio: { en: "Frontend", pt: "Frontend" },
  },
  {
    avatar: RCoutinho,
    name: "Rafael Coutinho",
    links: [],
    bio: { en: "Frontend", pt: "Frontend" },
  },
  {
    avatar: ICruz,
    name: "Ítalo Cruz",
    links: [],
    bio: { en: "UI/UX Designer", pt: "UI/UX Designer" },
  },
  {
    avatar: ACruz,
    name: "Adeonita Sousa",
    links: [],
    bio: { en: "Backend", pt: "Backend" },
  },
  {
    avatar: VBitencourt,
    name: "Vitor Bitencourt",
    links: [],
    bio: { en: "Full Stack", pt: "Full Stack" },
  },
  {
    avatar: DBarbosa,
    name: "Davi Barbosa",
    links: [],
    bio: { en: "Full Stack", pt: "Full Stack" },
  },
];

export const research_groups: Contributor[] = [
  {
    avatar: IFungiLab,
    imageFit: "contain",
    name: "IFungiLab",
    bio: { pt: "", en: "" },
    links: [],
  },
  {
    avatar: G2BC,
    imageFit: "contain",
    name: "G2BC",
    bio: { pt: "", en: "" },
    links: [],
  },
  {
    avatar: IFSP,
    imageFit: "contain",
    name: "IFSP",
    bio: { pt: "", en: "" },
    links: [],
  },
  {
    avatar: UFSC,
    imageFit: "contain",
    radius: false,
    name: "UFSC",
    bio: { pt: "", en: "" },
    links: [],
  },
  {
    avatar: UNEB,
    radius: false,
    name: "UNEB",
    imageFit: "contain",
    bio: { pt: "", en: "" },
    links: [],
  },
  {
    avatar: UFPB,
    name: "UFPB",
    radius: false,
    imageFit: "contain",
    bio: { pt: "", en: "" },
    links: [],
  },
  {
    avatar: UFSCar,
    imageFit: "contain",
    name: "UFSCar",
    bio: { pt: "", en: "" },
    links: [],
  },
  {
    avatar: UFES,
    imageFit: "contain",
    radius: false,
    name: "UFES",
    bio: { pt: "", en: "" },
    links: [],
  },
  {
    avatar: UFRGS,
    radius: false,
    imageFit: "contain",
    name: "UFRGS",
    bio: { pt: "", en: "" },
    links: [],
  },
  {
    avatar: INPA,
    radius: false,
    imageFit: "contain",
    name: "INPA",
    bio: { pt: "", en: "" },
    links: [],
  },
  {
    avatar: UFPE,
    imageFit: "contain",
    name: "UFPE",
    bio: { pt: "", en: "" },
    links: [],
  },
];
