import { CategoryResponse } from "./types";

export const movies: CategoryResponse = {
  title: "Movies",
  themeName: "movies",
  attributes: [
    {
      name: "Director",
      type: "string",
    },
    {
      name: "Leading Actor/Actress",
      type: "string",
    },
    {
      name: "Release Year",
      type: "number",
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
};
