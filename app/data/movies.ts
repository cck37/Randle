import { CategoryResponse } from "../types";

export const movies: CategoryResponse = {
  title: "Movies",
  attributes: [
    {
      name: "Director",
    },
    {
      name: "Leading Actor/Actress",
    },
    {
      name: "Release Year",
    },
  ],
  items: [
    {
      name: "Inception",
      attributes: [
        {
          name: "Director",
          value: "Christopher Nolan",
        },
        {
          name: "Leading Actor/Actress",
          value: "Leonardo DiCaprio",
        },
        {
          name: "Release Year",
          value: "2010",
        },
      ],
    },
    {
      name: "The Dark Knight",
      attributes: [
        {
          name: "Director",
          value: "Christopher Nolan",
        },
        {
          name: "Leading Actor/Actress",
          value: "Heath Ledger",
        },
        {
          name: "Release Year",
          value: "2008",
        },
      ],
    },
    {
      name: "Titanic",
      attributes: [
        {
          name: "Director",
          value: "James Cameron",
        },
        {
          name: "Leading Actor/Actress",
          value: "Leonardo DiCaprio",
        },
        {
          name: "Release Year",
          value: "1997",
        },
      ],
    },
    {
      name: "Avatar",
      attributes: [
        {
          name: "Director",
          value: "James Cameron",
        },
        {
          name: "Leading Actor/Actress",
          value: "Sam Worthington",
        },
        {
          name: "Release Year",
          value: "2009",
        },
      ],
    },
    {
      name: "Forrest Gump",
      attributes: [
        {
          name: "Director",
          value: "Robert Zemeckis",
        },
        {
          name: "Leading Actor/Actress",
          value: "Tom Hanks",
        },
        {
          name: "Release Year",
          value: "1994",
        },
      ],
    },
  ],
  theme: {
    palette: {
      mode: "dark",
      primary: {
        main: "#FF5722",
      },
      secondary: {
        main: "#2196F3",
      },
      error: {
        main: "#F44336",
      },
      background: {
        default: "#121212",
      },
      text: {
        primary: "#FFFFFF",
      },
    },
    typography: {
      h1: {
        fontFamily: "Bebas Neue",
      },
      h2: {
        fontFamily: "Bebas Neue",
      },
      h3: {
        fontFamily: "Bebas Neue",
      },
      h4: {
        fontFamily: "Bebas Neue",
      },
      h5: {
        fontFamily: "Bebas Neue",
      },
    },
  },
};
