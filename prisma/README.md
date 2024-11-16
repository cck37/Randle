# Dealing with Data

Information written below assumes no prior experience with prisma and is based on my limited understanding of it.

## Code Tour

### `/data/`

All data is added under `/data` with the shape of `CategoryResponse`. Once data is added, you can run `npm run seed` to invoke prisma to seed the data on your local.

### `/migrations/`

### `schema.prisma`

### `seed.ts`

`seed.js` will `upsert` all data to hopefully improve performance over wiping and reseeding. This is usually done under the clause that the name matches. `ItemAttributes` will match and update based on the `item_id` and `attribute_id` based on the item and attribute names respectively.

## Steps To Add New Categories

1. Generate a JSON file in the shape of `CategoryResponse`
   1. TBD for a script to convert CSV to JSON
   2. Been maintaing and collaborating on data using a Google sheet
2. Create a new `ts` under `/data` with the appropriate export name and imports. IE:

```ts
import { CategoryResponse } from "./types";

export const modestMouse: CategoryResponse = {
  /*
  Data goes here
  */
};
```

3. Add the new import to `/data/index.ts`
4. Add the MUI theme object to `app/data/themes.ts`.
   1. ⚠ Ensure the theme name matches what is in your data file you added in step (2)
5. If you need add a font, add the font file to `/public/fonts` then add the font face to `/globals.css` like so:

```css
@font-face {
  font-family: "Harry Potter";
  src: url("/fonts/harry.ttf");
  format: ("ttf");
  font-display: swap;
}
```

6. Run `npm run seed`
7. Run the app `npm run dev`
