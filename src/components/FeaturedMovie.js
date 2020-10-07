import React from "react";

import "./FeaturedMovie.css";

const FeaturedMovie = ({ item }) => {
  //Get the date of the movie
  let firstDate = new Date(item.first_air_date || item.release_date);

  //Get all the genres of featured movie
  let genres = [];
  for (let i in item.genres) {
    genres.push(item.genres[i].name);
  }

  //Limit the overview of the movie to 200 chars
  let descr = item.overview;
  if (descr.length > 200) {
    descr = descr.substring(0, 200) + "...";
  }

  return (
    <section
      className="featured"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
      }}
    >
      <div className="featured--vertial">
        <div className="featured--horizontal">
          <div className="featured--name">
            {item.original_name || item.original_title}
          </div>
          <div className="featured--info">
            <div className="featured--points">{item.vote_average} points</div>
            <div className="featured--year">{firstDate.getFullYear()}</div>
            <div className="featured--seasons">
              {item.number_of_seasons && `${item.number_of_seasons} season`}
              {item.number_of_seasons > 1 ? "s" : ""}
            </div>
          </div>

          <div className="featured--description">{descr}</div>

          <div className="featured--buttons">
            <a href={`/watch/${item}`} className="featured--watch-btn">
              Play
            </a>
            <a href={`/info/${item}`} className="featured--more-info-btn">
              More Info
            </a>
          </div>

          <div className="featured--genres">
            <strong>Genres:</strong> {genres.join(", ")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovie;
