import { Location, Route, Routes, useLocation } from "react-router-dom";
import { VideoResults } from "../Hooks/useMediaDetails";
import Configure from "./Configure";
import Trailer from "../Components/Trailer";
import Details from "./Details";
import Home from "./Home";
import NotFound from "./NotFound";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Shell from "./Shell/Shell";

type LocationState = {
  background: Location;
  trailerVideo?: VideoResults;
};

function AppRoutes() {
  const location = useLocation();
  const { background, trailerVideo }: LocationState = (location.state as any) || {};

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Shell />}>
          <Route index element={<Home />}></Route>
          <Route path="movie/:typeId" element={<Details type="movie" />}></Route>
          <Route path="tv/:typeId" element={<Details type="tv" />}></Route>
          <Route path="contact" element={<ContactUs />}></Route>
          <Route path="about" element={<AboutUs />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route path="/video/:videoId" element={<Trailer video={trailerVideo as VideoResults} />}></Route>
          <Route path="/configure" element={<Configure />}></Route>
          <Route path="/search" element={<Configure />}></Route>
        </Routes>
      )}
    </>
  );
}

export default AppRoutes;
