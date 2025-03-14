import { ThemeOptions } from "@mui/material/styles";
import { AttributeType } from "@prisma/client";

export interface GroupAttributes {
  name: string;
}

export interface Attribute {
  id: number;
  name: string;
  attributeType: AttributeType;
}

// AHHHHHHHHHHHHH
export type ExactMatch = {
  isCorrect: boolean;
};

export type NumericMatch = {
  isCorrect: boolean;
  isAbove: boolean;
};

export type MultiPartmatch = {
  isCorrect: boolean;
  isPartial: boolean;
};

export type CorrectResponse = ExactMatch | NumericMatch | MultiPartmatch;

export type Guess = {
  id: number;
  name: string;
  data: GuessAttributeResponse[];
};

export type GuessResponse = Guess | undefined;

export interface GuessAttributeResponse {
  id: number;
  attributeId: number;
  name: string;
  value: string;
  attributeType: AttributeType;
  res: CorrectResponse;
}

export interface PossibleGuess {
  id: number;
  name: string;
}

export type CategoryResponse = {
  items: {
    id: number;
    name: string;
    category_id: number;
  }[];
  attributes: Attribute[];
} & {
  id: number;
  title: string;
  theme: ThemeOptions;
};

export type CategorySummaryResponse = {
  id: number;
  title: string;
  theme: ThemeOptions;
  isCurrentCategory: boolean;
};

export type GuessState = {
  possibleGuesses: PossibleGuess[];
  query: string;
  results: Guess[];
  isGuessCorrect: boolean;
  isGuessQueryLoading: boolean;
};

export type StorageState = {
  timeStamp: number;
  category: CategoryResponse;
  guess: GuessState;
  streak: number;
};
