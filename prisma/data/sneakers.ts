import { CategoryResponse } from "./types";

export const sneakers: CategoryResponse = {
  title: "Sneakers",
  themeName: "sneakers",
  attributes: [
    {
      name: "Brand",
      type: "string",
    },
    {
      name: "Model",
      type: "string",
    },
    {
      name: "Color",
      type: "string",
    },
    {
      name: "Price",
      type: "number",
    },
  ],
  items: [
    {
      name: "Nike Dunk Low",
      attributes: [
        {
          name: "Brand",
          value: "Nike",
        },
        {
          name: "Model",
          value: "Dunk Low",
        },
        {
          name: "Color",
          value: "Green Snake",
        },
        {
          name: "Price",
          value: "$100",
        },
      ],
    },
    {
      name: "Mag 'Back to the Future'",
      attributes: [
        {
          name: "Brand",
          value: "Nike",
        },
        {
          name: "Model",
          value: "Mag",
        },
        {
          name: "Color",
          value: "Something hideous",
        },
        {
          name: "Price",
          value: "$28507",
        },
      ],
    },
    {
      name: "YEEZY SLIDES",
      attributes: [
        {
          name: "Brand",
          value: "Adidas",
        },
        {
          name: "Model",
          value: "YEEZY SLIDES",
        },
        {
          name: "Color",
          value: "Onyx",
        },
        {
          name: "Price",
          value: "$113",
        },
      ],
    },
    {
      name: "2002R 'Protection Pack'",
      attributes: [
        {
          name: "Brand",
          value: "New Balance",
        },
        {
          name: "Model",
          value: "Athletic Shoes",
        },
        {
          name: "Color",
          value: "Rain",
        },
        {
          name: "Price",
          value: "$161",
        },
      ],
    },
  ],
};
