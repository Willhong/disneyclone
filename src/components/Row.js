import React, { useEffect, useState, useCallback } from "react";
import axios from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModal";

const Row = ({ title, id, fetchUrl }) => {
  const [movies, setmovies] = useState([]);
  const [ModalOpen, setModalOpen] = useState(false);
  const [movieSelected, setmovieSelected] = useState({});

  const fetchMovieData = useCallback(async () => {
    const response = await axios.get(fetchUrl);
    console.log(response.data.results);
    setmovies(response.data.results);
  }, [fetchUrl]);
  
  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);
  const handleClick = (movie) => {
    console.log(movie);
    setmovieSelected(movie);
    setModalOpen(true);
  };
  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 100;
            }}
          >
            {"<"}
          </span>
        </div>
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className="row__poster"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.name}
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 100;
            }}
          >
            {">"}
          </span>
        </div>
      </div>
      {ModalOpen && (
        <MovieModal {...movieSelected} setmodalOpen={setModalOpen} />
      )}
    </div>
  );
};

export default Row;
