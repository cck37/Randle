import { PrismaClient } from '@prisma/client'

import static_data from './data'

const prisma = new PrismaClient()
async function main() {
    static_data.forEach(async d => {
        const category = await prisma.category.
            create({
                data: {
                    title: d.title,
                    attributes: {},
                    items: {},
                    themeName: d.themeName
                }
            });
        const attributes = await prisma.$transaction(
            d.attributes.map(attribute =>
                prisma.attribute.
                    create({
                        data:
                        {
                            name: attribute.name,
                            category: {
                                connect: {
                                    id: category.id
                                }
                            }
                        }
                    })
            ));
        const itemsAndItemAttributes = await prisma.$transaction(
            d.items.map(items => prisma.items.create({
                data:
                {
                    name: items.name,
                    category_id: category.id,
                    itemAttributes: {
                        create: items.attributes.map(attribute =>
                        ({
                            value: attribute.value,
                            attribute: {
                                connect: {
                                    name_category_id: {
                                        name: attribute.name,
                                        category_id: category.id
                                    }
                                }
                            },
                            category: {
                                connect: {
                                    id: category.id
                                }
                            }
                        })
                        )
                    }
                }
            })));
        console.log({ category, attributes, itemsAndItemAttributes });
    });
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
