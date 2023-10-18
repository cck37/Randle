import api from "./apiWrapper";
import wrapPromise from "./wrapPromise";

function fetchData(url: string) {
  const promise = api(url).then((res) => res);

  return wrapPromise(promise);
}

export default fetchData;
