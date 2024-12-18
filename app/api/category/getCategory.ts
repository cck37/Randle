import { cache } from "react";
import { CategoryResponse } from "@/app/types";
import prisma from "../db";
import { themes } from "@/app/data/themes";
import { getRandom } from "../utils";

// TODO: Fix stupid cache by day. The only reason why I'm doing this is so Next stops caching this response
// I could give a shit about recompiling; just return me a new result each day instead of deciding what's "fastest"
export const dynamic = "force-dynamic";

export const getCategory = cache(
  async (
    currTimestamp: number,
    categoryName?: string
  ): Promise<CategoryResponse> => {
    const catLength = await prisma.category.count();
    const include = {
      attributes: true,
      items: true,
    };
    if (categoryName) {
      const category = await prisma.category.findFirstOrThrow({
        where: {
          title: categoryName,
        },
        include,
      });
      return { ...category, theme: themes[category.themeName] };
    }
    const category = await prisma.category.findFirstOrThrow({
      skip: getRandom(catLength, currTimestamp),
      take: 1,
      include,
    });
    return { ...category, theme: themes[category.themeName] };
  }
);
