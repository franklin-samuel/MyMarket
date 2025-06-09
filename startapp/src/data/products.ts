export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Nutella",
    description: "Creme de avelã com cacau, irresistível",
    price: 16.5,
    image: '/images/nutella.jpg'
  },
  {
    id: "2",
    name: "Heineken 6-pack",
    description: "Cerveja premium para momentos especiais",
    price: 28.9,
    image: "/images/heineken.jpg"
  },
  {
    id: "3",
    name: "Doritos Nacho",
    description: "Salgadinho crocante com sabor intenso",
    price: 7.8,
    image: "/images/doritos.jpg"
  },
  {
    id: "4",
    name: "Coca-Cola 2L",
    description: "Clássica e geladinha, do jeito que a gente gosta",
    price: 8.5,
    image: "/images/coca.jpg"
  },
  {
    id: "5",
    name: "Salmão Fresco",
    description: "Filé de salmão premium para refeições especiais",
    price: 49.9,
    image: "/images/salmao.jpg"
  },
  {
    id: "6",
    name: "Chocolate Lindt 70%",
    description: "Chocolate amargo suíço de alta qualidade",
    price: 13.5,
    image: "/images/choco.jpg"
  },
  {
    id: "7",
    name: "Pipoca de Microondas",
    description: "Explosão de sabor em poucos minutos",
    price: 3.2,
    image: "/images/pipoca.jpg"
  },
  {
    id: "8",
    name: "Azeite de Oliva Extra Virgem",
    description: "Ideal para saladas e pratos finos",
    price: 22.0,
    image: "/images/azeite.jpg"
  },
  {
    id: "9",
    name: "Sorvete Ben & Jerry’s",
    description: "Delícia cremosa em sabores únicos",
    price: 29.9,
    image: "/images/sorvete.jpg"
  },
  {
    id: "10",
    name: "Café em Cápsulas Nespresso",
    description: "Café gourmet para um dia mais produtivo",
    price: 21.9,
    image: "/images/cafe.jpg"
  }
];
