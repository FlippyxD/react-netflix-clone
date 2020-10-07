import React, { useState, useEffect } from "react";

import Tmdb from "./Tmdb";

import Header from "./components/Header";
import FeaturedMovie from "./components/FeaturedMovie";
import MovieCarousel from "./components/MovieCarousel";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  console.log(movieList, "MOVIE LIST");

  //Renders on the first load of the page
  useEffect(() => {
    //Load all of the necessary data from tmdb API
    const loadAll = async () => {
      //Load the dada for carousels
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Get the random movie from "originals" array
      let originals = list.filter((i) => i.query === "originals");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");
      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  //Navbar style based on position
  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {/*If there are data for the FeaturedMovie, render it */}
      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {/* Render all of the carousels */}
        {movieList.map((item, idx) => {
          return (
            <MovieCarousel
              key={idx}
              title={item.title}
              items={item.items}
              setFeaturedData={setFeaturedData}
            />
          );
        })}
      </section>

      {/* Footer */}

      <Footer />

      {/* Loader */}
      {movieList.length <= 0 && (
        <div className="loading">
          <img
            src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif"
            alt="loading"
          />
        </div>
      )}
    </div>
  );
}

export default App;
