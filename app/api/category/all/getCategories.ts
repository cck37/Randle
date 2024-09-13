import { cache } from "react";
import { CategorySummaryResponse } from "@/app/types";
import prisma from "../../db";
import { themes } from "@/app/data/themes";
import { getRandom } from "../../utils";

export const getCategories = cache(
  async (currTimestamp: number): Promise<CategorySummaryResponse[]> => {
    const data = await prisma.category.findMany();
    const currentCategory = getRandom(data.length, currTimestamp);

    return data.map((category) => ({
      id: category.id,
      title: category.title,
      theme: themes[category.themeName],
      isCurrentCategory: category.id === currentCategory,
    }));
  }
);
