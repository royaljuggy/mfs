'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import Movie from '../../shared/objects'
import styles from './styles.module.css';

const MoviePage = (props: any) => {
  const movie: Movie = props.movie
  return (
    <div className={styles.moviePage}>
      <h1 className={styles.title}>{movie.title}</h1>
      <p className={styles.genre}><strong>Genre:</strong> {movie.genre}</p>
      <p className={styles.id}><strong>ID:</strong> {movie.id}</p>
      <p className={styles.rating}><strong>Rating:</strong> {movie.rating}</p>
      <p className={styles.runtime}><strong>Runtime:</strong> {movie.runtime} minutes</p>
      <p className={styles.score}><strong>Score:</strong> {movie.score}</p>
      <p className={styles.star}><strong>Star:</strong> {movie.star}</p>
      <p className={styles.year}><strong>Year:</strong> {movie.year}</p>
    </div>
  );
};

export default function Page(props: any) {

  const [movie, setMovie] = useState(null)
  
  useEffect(() => {

    // TODO? move into pages directory, to allow router.isFallback (loading icon) https://stackoverflow.com/questions/76267351/how-to-fetch-data-server-side-in-the-latest-next-js-tried-getstaticprops-but-it
      // TODO: take parameters from form, and create key-value pairs for query, like ?tile=Blue&dateFrom=1996-01-01, etc.
    fetch(`http://127.0.0.1:8000/movies/${props.params.movie_id}`)
    .then(res => res.json())
    .then(data => {
      console.log(data.value[0])
      setMovie(data.value[0])
      return data.value[0]
    })
  })

  if (!movie) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MoviePage movie={movie} />
    </div>
  );
}