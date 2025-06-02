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
    name: "Tomato",
    description: "Fresh organic tomatoes",
    price: 1.5,
    image: "https://example.com/images/tomato.png"
  },
  {
    id: "2",
    name: "Onion",
    description: "Sweet red onions",
    price: 0.99,
    image: "https://example.com/images/onion.png"
  },
  {
    id: "3",
    name: "Eggplant",
    description: "Purple eggplants full of flavor",
    price: 1.2,
    image: "https://example.com/images/eggplant.png"
  },
    {
    id: "4",
    name: "Carrot",
    description: "Crunchy orange carrots",
    price: 0.75,
    image: "https://example.com/images/onion.png"
  },
  {
    id: "5",
    name: "Potato",
    description: "Versatile potatoes for all dishes",
    price: 0.5,
    image: "https://example.com/images/potato.png"
  },
  {
    id: "6",
    name: "Cucumber",
    description: "Cool cucumbers for salads",
    price: 0.8,
    image: "https://example.com/images/cucumber.png"
  },
  {
    id: "7",
    name: "Lettuce",
    description: "Crisp lettuce for fresh salads",
    price: 1.0,
    image: "https://example.com/images/lettuce.png"
  },
  {
    id: "8",
    name: "Bell Pepper",
    description: "Colorful bell peppers for cooking",
    price: 1.3,
    image: "https://example.com/images/bellpepper.png"
  },
  {
    id: "9",
    name: "Spinach",
    description: "Nutritious spinach leaves",
    price: 1.1,
    image: "https://example.com/images/spinach.png"
  },
  {
    id: "10",
    name: "Broccoli",
    description: "Healthy broccoli florets",
    price: 1.4,
    image: "https://example.com/images/broccoli.png"
  }
  
];