import { ThemeOptions } from "@mui/material/styles";

export type GroupAttributes = {
  name: string;
};

export type Attribute = {
  name: string;
};

export type GuessAttributes = {
  name: string;
  value: string;
};

export type GuessResponse = {
  name: string;
  data: Array<GuessAttributeResponse>;
};

export type GuessAttributeResponse = {
  name: string;
  value: string;
  isCorrect: boolean;
};

export type PossibleGuesses = {
  name: string;
  attributes: Array<GuessAttributes>;
};

export type CategoryResponse = {
  title: string;
  attributes: Attribute[];
  items: PossibleGuesses[];
  theme: ThemeOptions;
};
