const categories = [
  {
    title: "Cars",
    attributes: [
      {
        name: "Starting Year",
      },
      {
        name: "Ending Year",
      },
      {
        name: "Make",
      },
      {
        name: "Model",
      },
      {
        name: "Engine Series",
      },
      {
        name: "Engine Displacement",
      },
    ],
    items: [
      {
        name: "Ford Ranger",
        attributes: [
          {
            name: "Starting Year",
            value: "2001",
          },
          {
            name: "Ending Year",
            value: "2011",
          },
          {
            name: "Make",
            value: "Ford",
          },
          {
            name: "Model",
            value: "Ranger",
          },
          {
            name: "Engine Series",
            value: "Duratec/L-Series",
          },
          {
            name: "Engine Displacement",
            value: "2.3L",
          },
        ],
      },
      {
        name: "Mazda B-Series",
        attributes: [
          {
            name: "Starting Year",
            value: "2001",
          },
          {
            name: "Ending Year",
            value: "2009",
          },
          {
            name: "Make",
            value: "Mazda",
          },
          {
            name: "Model",
            value: "B-Series",
          },
          {
            name: "Engine Series",
            value: "Duratec/L-Series",
          },
          {
            name: "Engine Displacement",
            value: "2.3L",
          },
        ],
      },
      {
        name: "Toyota 86",
        attributes: [
          {
            name: "Starting Year",
            value: "2012",
          },
          {
            name: "Ending Year",
            value: "2021",
          },
          {
            name: "Make",
            value: "Toyota",
          },
          {
            name: "Model",
            value: "86",
          },
          {
            name: "Engine Series",
            value: "Boxer",
          },
          {
            name: "Engine Displacement",
            value: "2.0L",
          },
        ],
      },
      {
        name: "Subaru BRZ",
        attributes: [
          {
            name: "Starting Year",
            value: "2012",
          },
          {
            name: "Ending Year",
            value: "2021",
          },
          {
            name: "Make",
            value: "Subaru",
          },
          {
            name: "Model",
            value: "BRZ",
          },
          {
            name: "Engine Series",
            value: "Boxer",
          },
          {
            name: "Engine Displacement",
            value: "2.0L",
          },
        ],
      },
      {
        name: "Chevrolet Colorado",
        attributes: [
          {
            name: "Starting Year",
            value: "2015",
          },
          {
            name: "Ending Year",
            value: "Present",
          },
          {
            name: "Make",
            value: "Chevrolet",
          },
          {
            name: "Model",
            value: "Colorado",
          },
          {
            name: "Engine Series",
            value: "Duramax 2.8L Turbo-Diesel",
          },
          {
            name: "Engine Displacement",
            value: "2.8L",
          },
        ],
      },
      {
        name: "GMC Canyon",
        attributes: [
          {
            name: "Starting Year",
            value: "2015",
          },
          {
            name: "Ending Year",
            value: "Present",
          },
          {
            name: "Make",
            value: "GMC",
          },
          {
            name: "Model",
            value: "Canyon",
          },
          {
            name: "Engine Series",
            value: "Duramax 2.8L Turbo-Diesel",
          },
          {
            name: "Engine Displacement",
            value: "2.8L",
          },
        ],
      },
    ],
    theme: {
      palette: {
        mode: "dark",
        primary: {
          main: "#646cff",
        },
        secondary: {
          main: "#f50057",
        },
        background: {
          default: "#242424",
        },
        text: {
          primary: "rgba(255,255,255,0.87)",
        },
      },
      typography: {
        fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
      },
    },
  },
  {
    title: "Movies",
    attributes: [
      {
        name: "Director",
      },
      {
        name: "Leading Actor/Actress",
      },
      {
        name: "Release Year",
      },
    ],
    items: [
      {
        name: "Inception",
        attributes: [
          {
            name: "Director",
            value: "Christopher Nolan",
          },
          {
            name: "Leading Actor/Actress",
            value: "Leonardo DiCaprio",
          },
          {
            name: "Release Year",
            value: "2010",
          },
        ],
      },
      {
        name: "The Dark Knight",
        attributes: [
          {
            name: "Director",
            value: "Christopher Nolan",
          },
          {
            name: "Leading Actor/Actress",
            value: "Heath Ledger",
          },
          {
            name: "Release Year",
            value: "2008",
          },
        ],
      },
      {
        name: "Titanic",
        attributes: [
          {
            name: "Director",
            value: "James Cameron",
          },
          {
            name: "Leading Actor/Actress",
            value: "Leonardo DiCaprio",
          },
          {
            name: "Release Year",
            value: "1997",
          },
        ],
      },
      {
        name: "Avatar",
        attributes: [
          {
            name: "Director",
            value: "James Cameron",
          },
          {
            name: "Leading Actor/Actress",
            value: "Sam Worthington",
          },
          {
            name: "Release Year",
            value: "2009",
          },
        ],
      },
      {
        name: "Forrest Gump",
        attributes: [
          {
            name: "Director",
            value: "Robert Zemeckis",
          },
          {
            name: "Leading Actor/Actress",
            value: "Tom Hanks",
          },
          {
            name: "Release Year",
            value: "1994",
          },
        ],
      },
    ],
    theme: {
      palette: {
        mode: "light",
        primary: {
          main: "#ff8400",
        },
        secondary: {
          main: "#cf4307",
        },
        error: {
          main: "#c34646",
        },
        background: {
          default: "#fffaeb",
          paper: "#fff5d6",
        },
        text: {
          primary: "#130e01",
        },
      },
    },
  },
  {
    title: "Sneakers",
    attributes: [
      {
        name: "Brand",
      },
      {
        name: "Model",
      },
      {
        name: "Color",
      },
      {
        name: "Price",
      },
    ],
    items: [
      {
        name: "Nike Dunk Low",
        attributes: [
          {
            name: "Brand",
            value: "Nike",
          },
          {
            name: "Model",
            value: "Dunk Low",
          },
          {
            name: "Color",
            value: "Green Snake",
          },
          {
            name: "Price",
            value: "$100",
          },
        ],
      },
      {
        name: "Mag 'Back to the Future'",
        attributes: [
          {
            name: "Brand",
            value: "Nike",
          },
          {
            name: "Model",
            value: "Mag",
          },
          {
            name: "Color",
            value: "Something hideous",
          },
          {
            name: "Price",
            value: "$28507",
          },
        ],
      },
      {
        name: "YEEZY SLIDES",
        attributes: [
          {
            name: "Brand",
            value: "Adidas",
          },
          {
            name: "Model",
            value: "YEEZY SLIDES",
          },
          {
            name: "Color",
            value: "Onyx",
          },
          {
            name: "Price",
            value: "$113",
          },
        ],
      },
      {
        name: "2002R 'Protection Pack'",
        attributes: [
          {
            name: "Brand",
            value: "New Balance",
          },
          {
            name: "Model",
            value: "Athletic Shoes",
          },
          {
            name: "Color",
            value: "Rain",
          },
          {
            name: "Price",
            value: "$161",
          },
        ],
      },
    ],
    theme: {
      palette: {
        mode: "dark",
        primary: {
          main: "#915430",
        },
        secondary: {
          main: "#0b1b09",
        },
        error: {
          main: "#c34646",
        },
        background: {
          default: "#18091b",
        },
        text: {
          primary: "#fdfbfe",
        },
      },
      typography: {
        fontFamily:
          "Droid Sans, system-ui, Avenir, Helvetica, Arial, sans-serif",
      },
    },
  },
];

module.exports = categories;