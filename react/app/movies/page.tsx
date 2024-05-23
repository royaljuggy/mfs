'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { MovieList } from '../shared/components';

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
