import { AttributeType, PrismaClient } from "@prisma/client";

import static_data from "./data";

const attributeTypeStringToEnum = (str: string): AttributeType => {
  switch (str) {
    case "multipart":
      return AttributeType.multipart;
    case "number":
      return AttributeType.number;
    default:
      return AttributeType.string;
  }
};

const prisma = new PrismaClient();
async function main() {
  // TODO: Seed script attempts to insert all records which is slow.
  // Ideally only new seed scripts would be inserted
  // Currently a tracked improvement https://github.com/prisma/prisma/issues/14194
  await Promise.all(
    static_data.map(async (d) => {
      const category = await prisma.category.upsert({
        where: {
          title: d.title, // Assuming 'title' is a unique identifier for categories
        },
        create: {
          title: d.title,
          attributes: {},
          items: {},
          themeName: d.themeName,
        },
        update: {
          attributes: {},
          items: {},
          themeName: d.themeName,
        },
      });
      const attributes = await prisma.$transaction(
        d.attributes.map((attribute) =>
          prisma.attribute.upsert({
            where: {
              name_category_id: {
                name: attribute.name,
                category_id: category.id,
              },
            },
            update: {},
            create: {
              name: attribute.name,
              attributeType: attributeTypeStringToEnum(attribute.type),
              category: {
                connect: {
                  id: category.id,
                },
              },
            },
          })
        )
      );
      const itemsAndItemAttributes = await prisma.$transaction(
        d.items.map((item) =>
          prisma.items.upsert({
            where: {
              name_category_id: {
                name: item.name,
                category_id: category.id,
              },
            },
            update: {},
            create: {
              name: item.name,
              category_id: category.id,
              itemAttributes: {
                create: item.attributes.map((attribute) => ({
                  value: attribute.value,
                  attribute: {
                    connect: {
                      name_category_id: {
                        name: attribute.name,
                        category_id: category.id,
                      },
                    },
                  },
                  category: {
                    connect: {
                      id: category.id,
                    },
                  },
                })),
              },
            },
          })
        )
      );
      console.log({ category, attributes, itemsAndItemAttributes });
    })
  );
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
