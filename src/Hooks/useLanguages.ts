import { useEffect, useState } from "react";
import reduce from 'lodash/reduce'

export interface LanguagesMeta {
  iso_639_1: string;
  english_name: string;
  name: string;
}

export type Languages = {
  allLanguages: Record<string, string>;
  topLanguages: Record<string, string>
  languagesMeta: LanguagesMeta[];
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

function useLanguages(endpoint: string) {
  const [languages, setLanguages] = useState<Languages>();

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}${endpoint}?api_key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const allLanguages = reduce(data, function (obj: Record<string, string>, param: Record<string, string>) {
          obj[param["iso_639_1"]] = param["english_name"]
          return obj;
        }, {})

        setLanguages({
          allLanguages: allLanguages,
          topLanguages: topLanguages,
          languagesMeta: data
        });
      })
      .catch(err => console.log(err));
  }, [endpoint]);

  return languages;
}


export default useLanguages;
