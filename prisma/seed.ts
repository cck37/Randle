import { AttributeType, PrismaClient } from "@prisma/client";

import static_data from "./data";

const attributeTypeStringToEnum = (str: string): AttributeType => {
  switch (str) {
    case "multipart":
      return AttributeType.multipart;
    case "number":
      return AttributeType.number;
    case "date":
      return AttributeType.date;
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
      console.log(`Starting seed for: ${d.title}`);
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
          themeName: d.themeName,
        },
      });
      console.log(`Added category for: ${d.title}`);
      const attributes = await prisma.$transaction(
        d.attributes.map((attribute) =>
          prisma.attribute.upsert({
            where: {
              name_category_id: {
                name: attribute.name,
                category_id: category.id,
              },
            },
            update: {
              attributeType: attributeTypeStringToEnum(attribute.type),
              category: {
                connect: {
                  id: category.id,
                },
              },
            },
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
      console.log(`Added attributes for: ${d.title}`);
      const items = await prisma.$transaction(
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
            },
          })
        )
      );
      console.log(`Added items for: ${d.title}`);
      const itemAttributes = await prisma.$transaction(
        d.items
          .map((i) =>
            i.attributes
              .map((attribute) =>
                prisma.itemAttributes.upsert({
                  create: {
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
                    items: {
                      connect: {
                        id: items.find((item) => item.name === i.name)?.id,
                      },
                    },
                  },
                  update: {
                    value: attribute.value,
                    attribute: {
                      connect: {
                        name_category_id: {
                          name: attribute.name,
                          category_id: category.id,
                        },
                      },
                    },
                  },
                  where: {
                    attribute_id_item_id: {
                      attribute_id:
                        attributes.find((attr) => attr.name === attribute.name)
                          ?.id || 0,
                      item_id:
                        items.find((item) => item.name === i.name)?.id || 0,
                    },
                  },
                })
              )
              .flat()
          )
          .flat()
      );
      console.log(`Added item attributes for: ${d.title}`);

      console.log(
        `Finished seed for: ${d.title}. Added ${attributes.length} attributes, ${items.length} items, and ${itemAttributes.length} item attributes.`
      );
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
