import { movies } from "./movies";
import { harryPotter } from "./harry";
import { animatedTvShows } from "./animatedTvShows";
import { animatedDisneyMovies } from "./animatedDisneyMovies";
import { fastFood } from "./fastFood";
import { cereal } from "./cereal";
import { CategoryResponse } from "./types";
import { modestMouse } from "./modestMouse";

const static_data: CategoryResponse[] = [
  harryPotter,
  movies,
  animatedTvShows,
  animatedDisneyMovies,
  fastFood,
  cereal,
  modestMouse,
];

export default static_data;
