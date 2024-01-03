import { ThemeOptions } from "@mui/material/styles";

export type GroupAttributes = {
  name: string;
};

export type Attribute = {
  id: number;
  name: string;
};

export type Guess = {
  id: number;
  name: string;
  data: {
    name: string;
    value: string;
    isCorrect: boolean;
  }[];
};

export type GuessResponse = Guess | undefined;

export type GuessAttributeResponse = {
  name: string;
  value: string;
  isCorrect: boolean;
};

export type PossibleGuess = {
  id: number;
  name: string;
};

export type CategoryResponse = {
  items: {
    id: number;
    name: string;
    category_id: number;
  }[];
  attributes: {
    id: number;
    name: string;
    category_id: number;
  }[];
} & {
  id: number;
  title: string;
  theme: ThemeOptions;
};
