'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { MovieList } from '../shared/components';

// OLD PAGE.




// TODO use react query or something
export default function AllMovies() {
  const [movies, setMovies] = useState([])

  useEffect(() => {

    // TODO? move into pages directory, to allow router.isFallback (loading icon) https://stackoverflow.com/questions/76267351/how-to-fetch-data-server-side-in-the-latest-next-js-tried-getstaticprops-but-it

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
