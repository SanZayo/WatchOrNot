function useLanguages() {
  const languages: Record<string, string> = {
    en: "English",
    hi: "Hindi",
    ta: "Tamil",
    te: "Telugu",
    kn: "Kannada",
    ml: "Malayalam",
    mr: "Marathi",
  };
  return languages;
}

export default useLanguages;
