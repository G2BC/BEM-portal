import React from "react";
import { Github, Link, Mail } from "lucide-react";
import { LiaOrcid } from "react-icons/lia";

import ALenz from "@/assets/contributors/A_Lenz.jpeg";
import EJunior from "@/assets/contributors/E_Junior.jpg";

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
    avatar: EJunior,
    name: "Ernesto S. M. Neto Júnior",
    bio: {
      pt: "Desenvolvedor de software full stack e graduando em Sistemas de Informação na Universidade do Estado da Bahia (UNEB). Atua profissionalmente no desenvolvimento de aplicações web e APIs, com experiência em JavaScript/TypeScript, React/Node e Python/Django, além de integrações e arquitetura de microsserviços. No âmbito acadêmico, contribui para o LUMM, um banco de dados web voltado à divulgação científica sobre fungos luminescentes, e desenvolve interesse em engenharia de software aplicada à bioinformática, com ênfase em segurança de aplicações web conteinerizadas.",
      en: "Full-stack software developer and undergraduate student in Information Systems at the State University of Bahia (UNEB). Works professionally on the development of web applications and APIs, with experience in JavaScript/TypeScript, React/Node, and Python/Django, as well as integrations and microservices architecture. In the academic context, contributes to LUMM, a web database focused on the scientific dissemination of bioluminescent fungi, and develops interest in software engineering applied to bioinformatics, with an emphasis on the security of containerized web applications.",
    },
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
