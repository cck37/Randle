import { movies } from "./movies";
import { harryPotter } from "./harry";
import { animatedTvShows } from "./animatedTvShows";
import { animatedDisneyMovies } from "./animatedDisneyMovies";
import { CategoryResponse } from "./types";

const static_data: CategoryResponse[] = [
  harryPotter,
  movies,
  animatedTvShows,
  animatedDisneyMovies,
];

export default static_data;
