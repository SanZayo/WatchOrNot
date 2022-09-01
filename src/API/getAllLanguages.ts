import reduce from 'lodash/reduce'

export interface ILanguagesMeta {
  iso_639_1: string;
  english_name: string;
  name: string;
}

export interface ILanguages {
  allLanguages: Record<string, string>;
  topLanguages: Record<string, string>
  languagesMeta: ILanguagesMeta[];
}

export interface IGetAllLanguagesArgs {
  endpoint: string;
}

const topLanguages: Record<string, string> = {
  en: "English",
  hi: "Hindi",
  ta: "Tamil",
  te: "Telugu",
  kn: "Kannada",
  ml: "Malayalam",
  mr: "Marathi",
};

const getAllLanguages = ({ endpoint }: IGetAllLanguagesArgs) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}${endpoint}?api_key=${process.env.REACT_APP_API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      const allLanguages = reduce(data, function (obj: Record<string, string>, param: Record<string, string>) {
        obj[param["iso_639_1"]] = param["english_name"]
        return obj;
      }, {})

      return {
        allLanguages: allLanguages,
        topLanguages: topLanguages,
        languagesMeta: data
      } as any;
    })
    .catch(err => console.log(err));
}

export default getAllLanguages;