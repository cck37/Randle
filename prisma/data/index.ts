import { movies } from "./movies";
import { harryPotter } from "./harry";
import { animatedTvShows } from "./animatedTvShows";
import { animatedDisneyMovies } from "./animatedDisneyMovies";
import { fastFood } from "./fastFood";
import { CategoryResponse } from "./types";

const static_data: CategoryResponse[] = [
  harryPotter,
  movies,
  animatedTvShows,
  animatedDisneyMovies,
  fastFood,
];

export default static_data;
