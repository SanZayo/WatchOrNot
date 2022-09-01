export interface IGetAllContentsArgs {
  endpoint: string;
  filter?: string;
  activeLanguages?: string;
}

export interface IContents {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  title: string;
  original_language: string;
  original_name: string;
  release_date: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}


const getAllContents = ({ endpoint = "", filter = "", activeLanguages = "" }: IGetAllContentsArgs) => {
  const withLanguages = activeLanguages ? `&with_original_language=${Object.keys(activeLanguages).join("|")}` : '';
  return fetch(
    `${process.env.REACT_APP_API_URL}${endpoint}?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&language=en-US${filter}${withLanguages}`
  )
    .then((res) => res.json())
    .then((data) => {
      const items = data.results.filter((item: IContents) => item.backdrop_path && item.poster_path);
      return items;
    })
    .catch(err => console.log(err));
}

export default getAllContents;