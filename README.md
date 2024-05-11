# Randle

### _In case [Loldle](https://loldle.net/) or [Pokelde](https://pokedle.gg/) was getting boring_

## Description

Every day a new category is chosen as well as an answer for that category. Goal of the app is to have you guess the answer, gaining new bits of information about said category

## Running locally

This is a Next.js app using Prisma ORM pointing to a Postgres DB. To run this locally, you'll need a local postgres instance.

To start, install packages:

```
npm i
```

Next, the database. First, create a `.env.local` file based on the `.template.env.local` (swap `postgres_user` and `postgres_password` along with the port and db if needed). Then run:

```
npm run dev:migrate
```

to migrate the schema to your database. Finally, seed your database with the static data I have in source:

```
npm run seed
```

After that, you should be able to run the web app and you're all set:

```
npm run dev
```

## TODO

- [x] PoC
- [x] Connect to a database
- [x] Gather some real data
- [x] Fix mobile view
- [x] Save session by day
- [x] Clock/Counter
- [ ] Update static about page
- [x] Theme/Style
  - [x] Skeleton/Loader
  - [ ] Tiled backgrounds for each
  - [ ] Icons for each item
- [ ] Streak system (based on local storage)
- [ ] Choose Categories
- [ ] Auth??

## Category Ideas

- [x] Disney Movies
- [ ] Top Artists (2000-Present?)
- [ ] Pokemon Games
- [ ] Cars
- [x] Fast Food Resturants
- [ ] HxH Characters
