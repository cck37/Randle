// TODO: Clean up?
export type GroupAttributes = {
  name: string;
};

export type AttributeTypes = "number" | "multipart" | "string";

export interface Attribute {
  name: string;
  type: AttributeTypes;
}

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
  themeName: string;
};
