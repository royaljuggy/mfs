'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import styles from './styles.module.css'
import Movie from '../objects'
import { Link } from 'react-router-dom'

function MovieCard(props: any) {
  const movie: Movie = props.movie
  return (
    <div className={styles.card}>
        <a href={`/movies/${movie.id}`}>
            <div className={styles.cardHeader}>
                <h2>{movie.title}</h2>
                <span className={styles.year}>({movie.year})</span>
            </div>
            <div className={styles.cardBody}>
                <p><strong>Genre:</strong> {movie.genre}</p>
                <p><strong>Runtime:</strong> {movie.runtime} mins</p>
                <p><strong>Rating:</strong> {movie.rating}</p>
                <p><strong>Score:</strong> {movie.score}</p>
                <p><strong>Starring:</strong> {movie.star}</p>
            </div>
        </a>
    </div>
  )
}

function ContinueCard() {
    return (
        <div className={styles.continueCard}>
        <span className={styles.continueText}>Show more...</span>
      </div>
    )
}

function MovieList(props: any) {
  return (
    <div className="movies-list">
        <h1 className="list-header">Movies, movies, movies!</h1>
        <div className={styles.wrapper}>
            {props.movies.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
            {props.movies.length >= 50 &&
                <ContinueCard />
            }
        </div>
    </div>
  )
}

// TODO use react query or something
export default function AllMovies() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    if (movies.length == 0) {
      // TODO: take parameters from form, and create key-value pairs for query, like ?tile=Blue&dateFrom=1996-01-01, etc.
      fetch(`http://127.0.0.1:8000/movies`)
      .then(res => res.json())
      .then(data => {
        // Movies array that holds json objects pertaining to our results
        const movies = data.value

        // For now, take first 50 results
        const display = movies.slice(0, 50)
        console.log(display)
        setMovies(display)
        return display
      })
    }
  }, [movies])

  return (
    <div>
      <MovieList movies={movies}/>
    </div>
  );
}
