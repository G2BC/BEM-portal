import React from "react";
import { Github, Link, Mail } from "lucide-react";
import { LiaOrcid } from "react-icons/lia";

import ALenz from "@/assets/contributors/A_Lenz.jpeg";
import EJunior from "@/assets/contributors/E_Junior.jpg";
import JArthur from "@/assets/contributors/J_Arthur.jpeg";
import APedro from "@/assets/contributors/Antonio.jpeg";
import Mariana from "@/assets/contributors/Mariana.png";
import Nelson from "@/assets/contributors/Nelson.png";
import Marina from "@/assets/contributors/Marina.png";
import Denis from "@/assets/contributors/Denis.jpeg";

import PBenevides from "@/assets/contributors/developers/P_Benevides.png";
import DGomes from "@/assets/contributors/developers/D_Gomes.png";
import RCoutinho from "@/assets/contributors/developers/R_Coutinho.png";
import ICruz from "@/assets/contributors/developers/I_Cruz.png";
import ACruz from "@/assets/contributors/developers/A_Cruz.png";
import VBitencourt from "@/assets/contributors/developers/V_Bitencourt.png";
import DBarbosa from "@/assets/contributors/developers/D_Barbosa.png";

import G2BC from "@/assets/contributors/institutions/G2BC.png";
import IFSP from "@/assets/contributors/institutions/IFSP.png";
import UNEB from "@/assets/contributors/institutions/UNEB.jpg";
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
    links: [
      {
        icon: <Link className="w-5 h-5" />,
        href: "http://lattes.cnpq.br/6225976621362409",
        title: "Lattes",
      },
      {
        icon: <LiaOrcid className="w-6 h-6" />,
        href: "https://orcid.org/0000-0002-7299-8477",
        title: "ORCID",
      },
    ],
  },
  {
    avatar: Nelson,
    name: "Nelson Menolli Jr",
    bio: {
      en: "Is biologist, Doctor in Plant Biodiversity and Environment (Environmental Research Institute, São Paulo, SP, Brazil), full professor at Federal Institute of Education, Science and Technology of São Paulo (IFSP), Brazil, coordinator of the iFungiLab and curator of the fungarium FungiA at the same institution. Nelson has experience in taxonomy, conservation and molecular phylogeny of mushroom-forming fungi and cultivation of wild edible mushrooms. As an initiative of scientific outreach and science communication, Nelson coordinates the profile @iFungiLab on Instagram.",
      pt: "Biólogo, doutor em Biodiversidade Vegetal e Meio Ambiente (Instituto de Pesquisas Ambientais, São Paulo, SP, Brasil), professor titular do Instituto Federal de Educação, Ciência e Tecnologia de São Paulo (IFSP), Brasil, coordenador do iFungiLab e curador do fungário FungiA na mesma instituição. Nelson tem experiência em taxonomia, conservação e filogenia molecular de fungos formadores de cogumelos e no cultivo de cogumelos comestíveis silvestres. Como iniciativa de divulgação científica e comunicação pública da ciência, Nelson coordena o perfil @iFungiLab no Instagram.",
    },
    links: [
      {
        icon: <Link className="w-5 h-5" />,
        href: "http://lattes.cnpq.br/9159195563442447",
        title: "Lattes",
      },
      {
        icon: <LiaOrcid className="w-6 h-6" />,
        href: "https://orcid.org/0000-0002-1841-8179",
        title: "ORCID",
      },
    ],
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
    links: [
      {
        icon: <Link className="w-5 h-5" />,
        href: "http://lattes.cnpq.br/0465504375634042",
        title: "Lattes",
      },
      {
        icon: <LiaOrcid className="w-6 h-6" />,
        href: "https://orcid.org/0000-0002-4329-9861",
        title: "ORCID",
      },
    ],
  },
  {
    avatar: Denis,
    name: "Denis Augusto Zabin",
    bio: {
      en: "Holds a Bachelor's degree in Biological Sciences from São Paulo State University (UNESP - Botucatu). Currently a Master's and PhD student in the Plant Biodiversity and Environment graduate program at the Institute for Environmental Research (IPA – formerly the Institute of Botany). Participates as a science communicator in the Dispersar project (IFSP-SPO). Works in the field of Biological Sciences, with an emphasis on Mycology, focusing on the following topics: taxonomy, systematics, and molecular phylogeny of macrofungi; and science communication in mycology.",
      pt: "Bacharelado em Ciências Biológicas pela Universidade Estadual Paulista - Júlio Mesquita Filho (UNESP - Botucatu). Mestre e doutorando pelo programa de pós-graduação em Biodiversidade Vegetal e Meio Ambiente do Instituto de Pesquisas Ambientais (IPA - ex Instituto de Botânica). Participa como comunicador científico do projeto Dispersar (IFSP-SPO). Atuação na área de Ciências Biológicas, com ênfase em Micologia, nos seguintes temas: Taxonomia, Sistemática e Filogenia Molecular de macrofungos; comunicação científica em micologia.",
    },
    links: [
      {
        icon: <Link className="w-5 h-5" />,
        href: "http://lattes.cnpq.br/9640963198963951",
        title: "Lattes",
      },
      {
        icon: <LiaOrcid className="w-6 h-6" />,
        href: "https://orcid.org/0000-0003-1383-9502",
        title: "ORCID",
      },
    ],
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
    avatar: JArthur,
    name: "J. Arthur Valente Lima",
    bio: { en: "Full Stack", pt: "Full Stack" },
    links: [
      {
        icon: <Mail className="w-5 h-5" />,
        href: "mailto:joaoarthurvalentelima2@gmail.com",
        title: "Email",
      },
      {
        icon: <Link className="w-5 h-5" />,
        href: "https://lattes.cnpq.br/0556706706006912",
        title: "Lattes",
      },
      // {
      //   icon: <LiaOrcid className="w-6 h-6" />,
      //   href: "https://orcid.org/0009-0002-6069-932X",
      //   title: "ORCID",
      // },
      {
        icon: <Github className="w-5 h-5" />,
        href: "https://github.com/ArthXD",
        title: "GitHub",
      },
    ],
  },
  {
    avatar: APedro,
    name: "Antônio Pedro",
    bio: { en: "Full Stack", pt: "Full Stack" },
    links: [
      {
        icon: <Mail className="w-5 h-5" />,
        href: "mailto:costagraveantoniopedro@gmail.com",
        title: "Email",
      },
      {
        icon: <Link className="w-5 h-5" />,
        href: " https://lattes.cnpq.br/1073797444969729",
        title: "Lattes",
      },
      {
        icon: <Github className="w-5 h-5" />,
        href: "https://github.com/apcg-code",
        title: "GitHub",
      },
    ],
  },
  {
    avatar: PBenevides,
    name: "Pedro Benevides",
    links: [
      {
        icon: <Link className="w-5 h-5" />,
        href: "https://www.linkedin.com/in/pedro-vsbenevides",
        title: "Linkedin",
      },
    ],
    bio: { en: "Backend", pt: "Backend" },
  },
  {
    avatar: DGomes,
    name: "Deivisson Gomes",
    links: [
      {
        icon: <Mail className="w-5 h-5" />,
        href: "mailto:dsgomes15@gmail.com",
        title: "Email",
      },
      {
        icon: <Github className="w-5 h-5" />,
        href: "https://github.com/dsgomess",
        title: "GitHub",
      },
    ],
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
    links: [
      {
        icon: <Mail className="w-5 h-5" />,
        href: "mailto:italo.soares.cruz@gmail.com",
        title: "Email",
      },
    ],
    bio: { en: "UI/UX Designer", pt: "UI/UX Designer" },
  },
  {
    avatar: ACruz,
    name: "Adeonita Sousa",
    links: [
      {
        icon: <Mail className="w-5 h-5" />,
        href: "mailto:dsgomes15@gmail.com",
        title: "Email",
      },
      {
        icon: <Github className="w-5 h-5" />,
        href: "https://github.com/dsgomess",
        title: "GitHub",
      },
    ],
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
    avatar: UNEB,
    radius: false,
    name: "UNEB",
    imageFit: "contain",
    bio: { pt: "", en: "" },
    links: [],
  },
];
