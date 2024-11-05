"use client";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  Button,
  Divider,
  Grid,
  Skeleton,
  darken,
  lighten,
  useTheme,
} from "@mui/material";
import { useFetchCategories } from "../hooks/useFetchCategories";
import { useState } from "react";
import App from "../App";

const generateMailToLink = () =>
  "mailto:dfdknynip@mozmail.com?subject=Randle: New Category Request&body=Hey, I hate all of your categories. Please add {Your Suggested Category Here}. Relevant data on it can be found on: {Site that has info on suggestion category}. Thanks!";

export default function ChooseCategory() {
  const theme = useTheme();
  const { categoriesResponse, isLoading: isFetchCategoriesLoading } =
    useFetchCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  return (
    <>
      {selectedCategory.length > 0 ? (
        <App categoryTitle={selectedCategory} />
      ) : (
        <Stack
          direction="column"
          alignContent="center"
          textAlign="center"
          gap={5}
        >
          <Typography variant="h2" sx={{ color: theme.palette.primary.main }}>
            Choose Category
          </Typography>
          {isFetchCategoriesLoading ? (
            <Skeleton variant="rectangular" animation="wave" height={100} />
          ) : (
            <Typography
              variant="h5"
              sx={{ color: theme.palette.secondary.main }}
            >
              Hate today's category? <br />
              <br /> Yeah I agree. <br />
              <div className="code">
                {categoriesResponse.find((cat) => cat.isCurrentCategory)?.title}{" "}
              </div>
              does suck. <br />
              <br />
              Pick your favorite instead.
            </Typography>
          )}
          <Divider />
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            {isFetchCategoriesLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Skeleton
                      key={i}
                      variant="rectangular"
                      animation="wave"
                      height={100}
                    />
                  </Grid>
                ))
              : categoriesResponse
                  .filter((cat) => !cat.isCurrentCategory)
                  .map((category, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                      <Button
                        key={category.id}
                        sx={{
                          padding: theme.spacing(2),
                          height: "15rem",
                          width: "100%",
                          backgroundColor:
                            category.theme.palette?.background?.default,
                          "&:hover": {
                            backgroundColor:
                              category.theme.palette?.mode === "dark"
                                ? lighten(
                                    category.theme.palette?.background
                                      ?.default ?? "inherit",
                                    0.2
                                  )
                                : darken(
                                    category.theme.palette?.background
                                      ?.default ?? "inherit",
                                    0.2
                                  ),
                          },
                        }}
                        onClick={() => setSelectedCategory(category.title)}
                        variant="outlined"
                        disabled={category.isCurrentCategory}
                      >
                        <Typography
                          variant="h3"
                          sx={{
                            fontFamily:
                              /* @ts-ignore themeOptions type sucks*/
                              category.theme.typography?.h1?.fontFamily ??
                              "inherit",
                            color:
                              // TODO add color options extension type https://stackoverflow.com/a/68854872
                              /* @ts-ignore */
                              category.theme.typography?.h1?.color ??
                              // TODO add color options extension type https://stackoverflow.com/a/68854872
                              /* @ts-ignore */
                              category.theme.palette?.secondary?.main,
                          }}
                        >
                          {category.title}
                        </Typography>
                      </Button>
                    </Grid>
                  ))}
            {!isFetchCategoriesLoading && (
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  sx={{
                    padding: theme.spacing(2),
                    height: "15rem",
                    width: "100%",
                  }}
                  href={generateMailToLink()}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "inherit",
                      color: "inherit",
                    }}
                  >
                    Want More ?
                  </Typography>
                </Button>
              </Grid>
            )}
          </Grid>
        </Stack>
      )}
    </>
  );
}
