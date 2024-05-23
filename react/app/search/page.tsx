'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import styles from './styles.module.css';
import { MovieList } from '../shared/components';
import '../shared/styles.module.css'

// Calls the API, querying based on the form's data
async function queryMovie(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const formData = new FormData(event.currentTarget)
  console.log(formData)
  const response = await fetch('/api/submit', {
    method: 'POST',
    body: formData,
  })

  // Handle response if necessary
  const data = await response.json()
  // ...
}

async function callAPI(): Promise<Response[]> {
  try {
		const res = await fetch(`http://127.0.0.1:8000/movies`);
		const data = await res.json();
		// console.log(data.value);
    return Array.from(data.value)
	} catch (err) {
		console.log("error");
    return []
	}
}

// TODO use react query or something
export default function Search() {
  // var movies = await callAPI()
  // movies = movies.slice(0, 10)

  const [search, setSearch] = useState<FormData>()
  const [query, setQuery] = useState({})
  const [movies, setMovies] = useState([])

  const formSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Are we here")
    console.log(event.currentTarget)
    setSearch(new FormData(event.currentTarget))
  }

  useEffect(() => {
    if (query) {
      console.log('query: ' + query)
      // TODO: take parameters from form, and create key-value pairs for query, like ?tile=Blue&dateFrom=1996-01-01, etc.

      const apiRoot = 'http://127.0.0.1:8000'
      const subsites = '/movies/filtered'
      const filterString = '?title=Blue' //...

      fetch(apiRoot + subsites + filterString)
      .then(res => res.json())
      .then(data => {
        // Movies array that holds json objects pertaining to our results
        const movies = data.value

        // For now, take first 10 results
        const display = movies.slice(0, 10)

        setMovies(display)
        return display
      })
    }
  }, [query])

  const [genre, setGenre] = useState('');
  const [id, setId] = useState(0);
  const [ratingFrom, setRatingFrom] = useState('');
  const [ratingTo, setRatingTo] = useState('');
  const [runtimeFrom, setRuntimeFrom] = useState(0);
  const [runtimeTo, setRuntimeTo] = useState(0);
  const [scoreFrom, setScoreFrom] = useState(0);
  const [scoreTo, setScoreTo] = useState(0);
  const [star, setStar] = useState('');
  const [title, setTitle] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = {
      genre,
      id,
      ratingFrom,
      ratingTo,
      runtimeFrom,
      runtimeTo,
      scoreFrom,
      scoreTo,
      star,
      title,
      yearFrom,
      yearTo,
    };
    console.log('Form Data:', formData);
    // Perform search or any other logic with formData
    setQuery(formData)
  };

  return (
    <div>
      Hi there!
      {/* <div className="search-form">
        <h2>What would you like to search for?</h2>
        <form>
          <input type="text"></input>
          <button type='button'>submit</button>

          <label htmlFor="from-year">Start Year</label>
          <input type="date" id="from-year"></input>
        </form>
      </div> */}
      
      {/* <form className="max-w-md mx-auto" onSubmit={formSubmit}>   
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="What movie for tonight?" required />
              <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
      </form> */}

    <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="genre">Genre:</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={genre}
              className={styles.input}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="id">ID:</label>
            <input
              type="number"
              id="id"
              name="id"
              value={id}
              className={styles.input}
              onChange={(e) => setId(Number(e.target.value))}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Rating:</label>
            <input
              type="text"
              id="ratingFrom"
              name="ratingFrom"
              placeholder="From"
              value={ratingFrom}
              className={styles.input}
              onChange={(e) => setRatingFrom(e.target.value)}
            />
            <input
              type="text"
              id="ratingTo"
              name="ratingTo"
              placeholder="To"
              value={ratingTo}
              className={styles.input}
              onChange={(e) => setRatingTo(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Runtime (minutes):</label>
            <input
              type="number"
              id="runtimeFrom"
              name="runtimeFrom"
              placeholder="From"
              value={runtimeFrom}
              className={styles.input}
              onChange={(e) => setRuntimeFrom(Number(e.target.value))}
            />
            <input
              type="number"
              id="runtimeTo"
              name="runtimeTo"
              placeholder="To"
              value={runtimeTo}
              className={styles.input}
              onChange={(e) => setRuntimeTo(Number(e.target.value))}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Score:</label>
            <input
              type="number"
              step="0.1"
              id="scoreFrom"
              name="scoreFrom"
              placeholder="From"
              value={scoreFrom}
              className={styles.input}
              onChange={(e) => setScoreFrom(Number(e.target.value))}
            />
            <input
              type="number"
              step="0.1"
              id="scoreTo"
              name="scoreTo"
              placeholder="To"
              value={scoreTo}
              className={styles.input}
              onChange={(e) => setScoreTo(Number(e.target.value))}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="star">Star:</label>
            <input
              type="text"
              id="star"
              name="star"
              value={star}
              className={styles.input}
              onChange={(e) => setStar(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              className={styles.input}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Year:</label>
            <input
              type="date"
              id="yearFrom"
              name="yearFrom"
              placeholder="From"
              value={yearFrom}
              className={styles.input}
              onChange={(e) => setYearFrom(e.target.value)}
            />
            <input
              type="date"
              id="yearTo"
              name="yearTo"
              placeholder="To"
              value={yearTo}
              className={styles.input}
              onChange={(e) => setYearTo(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.button}>Search</button>
        </form>
      <MovieList movies={movies} />
    </div>
  );
}
