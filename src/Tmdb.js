import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "e418db85d13d08a732fd9e6ff2a78b14";

const basicFetch = async (endpoint) => {
  const req = await axios.get(`${API_URL}${endpoint}`);
  const data = req.data;
  return data;
};

//List of API calls
export default {
  getHomeList: async () => {
    return [
      {
        query: "originals",
        title: "Discover Popular TV Shows",

        items: await basicFetch(`/discover/tv?&api_key=${API_KEY}`),
      },
      {
        query: "trending",
        title: "Currently Trending",
        items: await basicFetch(`/trending/all/week?&api_key=${API_KEY}`),
      },
      {
        query: "toprated",
        title: "Top rated",
        items: await basicFetch(`/movie/top_rated?&api_key=${API_KEY}`),
      },
      {
        query: "comedy",
        title: "Comedy",
        items: await basicFetch(
          `/discover/movie?with_genres=35&api_key=${API_KEY}`
        ),
      },
      {
        query: "animation",
        title: "Cartoons",
        items: await basicFetch(
          `/discover/tv?with_genres=16&api_key=${API_KEY}`
        ),
      },
      {
        query: "action",
        title: "Action",
        items: await basicFetch(
          `/discover/movie?with_genres=28&api_key=${API_KEY}`
        ),
      },
      {
        query: "horror",
        title: "Horror",
        items: await basicFetch(
          `/discover/movie?with_genres=27&api_key=${API_KEY}`
        ),
      },
      {
        query: "romance",
        title: "Romance",
        items: await basicFetch(
          `/discover/movie?with_genres=10749&api_key=${API_KEY}`
        ),
      },
      {
        query: "documentary",
        title: "Documentaries",
        items: await basicFetch(
          `/discover/movie?with_genres=99&api_key=${API_KEY}`
        ),
      },
    ];
  },

  //Get additional details for selected movie or TV series
  getMovieInfo: async (movieId, type) => {
    let info = {};

    if (movieId) {
      if (type === "movie") {
        info = basicFetch(`/movie/${movieId}?&api_key=${API_KEY}`);
        return info;
      }
      if (type === "tv") {
        info = basicFetch(`/tv/${movieId}?&api_key=${API_KEY}`);
        return info;
      }
    }
  },
};
