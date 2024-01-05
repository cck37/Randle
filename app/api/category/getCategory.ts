import { cache } from "react";
import { CategoryResponse } from "@/app/types";
import prisma from "../db";
import { themes } from "@/app/data/themes";

export const dynamic = "force-dynamic";

export const getCategory = cache(
  async (currDay: number): Promise<CategoryResponse> => {
    const catLength = await prisma.category.count();
    const category = await prisma.category.findFirstOrThrow({
      where: {
        id: (currDay % catLength) + 1,
      },
      include: {
        attributes: true,
        items: true,
      },
    });

    return { ...category, theme: themes[category.themeName] };
  }
);
