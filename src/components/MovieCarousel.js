import React, { useState } from "react";

import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import Tmdb from "../Tmdb";

import "./MovieCarousel.css";

const MovieRow = ({ title, items, setFeaturedData }) => {
  //Aditional destructuring
  const { results } = items;

  //State hooks
  const [scrollX, setScrollX] = useState(0);

  //Scroll on the carousels to the left
  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  //Scroll on the carousels to the right
  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 150;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }
    setScrollX(x);
  };

  //Change featured movie based on poster click
  const changeMovie = async (movie) => {
    //Movie variable
    let setFeaturedMovie;

    //Check if movie or tv series
    if (movie.release_date) {
      setFeaturedMovie = await Tmdb.getMovieInfo(movie.id, "movie");
    } else {
      setFeaturedMovie = await Tmdb.getMovieInfo(movie.id, "tv");
    }

    //Set new featured movie
    setFeaturedData(setFeaturedMovie);

    //Smooth scroll - https://stackoverflow.com/questions/15935318/smooth-scroll-to-top
    const scrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      const SCROLL_SPEED = 8; //Bigger the nuber, slower the scroll
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / SCROLL_SPEED);
      }
    };

    scrollToTop();
  };

  return (
    <div className="movieRow">
      <h2>{title}</h2>
      <div className="movieRow-left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow-right" onClick={handleRightArrow}>
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>

      <div className="movieRow--listarea">
        <div
          className="movieRow--list"
          style={{
            marginLeft: scrollX,
            width: results.length * 150,
          }}
        >
          {results.length > 0 &&
            results.map((item, idx) => (
              <div
                key={idx}
                className="movieRow--item"
                onClick={() => changeMovie(item)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
