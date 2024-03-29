import { cache } from "react";
import { CategoryResponse } from "@/app/types";
import prisma from "../db";
import { themes } from "@/app/data/themes";
import { getRandom } from "../utils";

// TODO: Fix stupid cache by day. The only reason why I'm doing this is so Next stops caching this response
// I could give a shit about recompiling; just return me a new result each day instead of deciding what's "fastest"
export const dynamic = "force-dynamic";

export const getCategory = cache(
  async (currTimestamp: number): Promise<CategoryResponse> => {
    const catLength = await prisma.category.count();
    const category = await prisma.category.findFirstOrThrow({
      where: {
        id: getRandom(catLength, currTimestamp),
      },
      include: {
        attributes: true,
        items: true,
      },
    });

    return { ...category, theme: themes[category.themeName] };
  }
);
