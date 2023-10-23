import { CategoryResponse } from "../types";

export const sneakers: CategoryResponse = {
  title: "Sneakers",
  attributes: [
    {
      name: "Brand",
    },
    {
      name: "Model",
    },
    {
      name: "Color",
    },
    {
      name: "Price",
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
  theme: {
    palette: {
      mode: "dark",
      primary: {
        main: "#915430",
      },
      secondary: {
        main: "#0b1b09",
      },
      error: {
        main: "#c34646",
      },
      background: {
        default: "#18091b",
      },
      text: {
        primary: "#fdfbfe",
      },
    },
    typography: {
      fontFamily: "Droid Sans, system-ui, Avenir, Helvetica, Arial, sans-serif",
    },
  },
};
