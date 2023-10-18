import { PossibleGuesses, Attribute } from "../types";

export const testInput: {
  title: string;
  attributes: Attribute[];
  items: PossibleGuesses[];
} = {
  title: "Test",
  attributes: [
    {
      name: "att1",
    },
    {
      name: "att2",
    },
    {
      name: "att3",
    },
    {
      name: "att4",
    },
  ],
  items: [
    {
      name: "thing1",
      attributes: [
        {
          name: "attr1",
          value: "attr1_1",
        },
        {
          name: "attr2",
          value: "attr2_1",
        },
        {
          name: "attr3",
          value: "attr3_1",
        },
        {
          name: "att4",
          value: "attr4_1",
        },
      ],
    },
    {
      name: "thing2",
      attributes: [
        {
          name: "attr1",
          value: "attr1_1",
        },
        {
          name: "attr2",
          value: "attr2_2",
        },
        {
          name: "attr3",
          value: "attr3_2",
        },
        {
          name: "att4",
          value: "attr4_2",
        },
      ],
    },
    {
      name: "thing3",
      attributes: [
        {
          name: "attr1",
          value: "attr1_1",
        },
        {
          name: "attr2",
          value: "attr2_3",
        },
        {
          name: "attr3",
          value: "attr3_2",
        },
        {
          name: "att4",
          value: "attr4_2",
        },
      ],
    },
  ],
};
