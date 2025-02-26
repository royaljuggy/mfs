'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import styles from './styles.module.css';
import { MovieList } from '../shared/components';
import '../shared/styles.module.css'

const defaultNumber = -1
const defaultString = '456'

// Class that holds all possible filters that the server can handle
class Filters {
  genre: string = defaultString
  id: number = defaultNumber

  // TODO: rating should be 'G', 'PG', 'R", etc. and should be multi-selectable (checkboxes.)
  rating_from: number = defaultNumber
  rating_to: number = defaultNumber
  runtime_from: number = defaultNumber
  runtime_to: number = defaultNumber
  score_from: number = defaultNumber
  score_to: number = defaultNumber
  star: string = defaultString
  title: string = defaultString
  year_from: string = defaultString
  year_to: string = defaultString
  order_by: string = defaultString
  order_direction: string = 'ASC'
};

export default function Search() {
  const [query, setQuery] = useState<Filters>()
  const [movies, setMovies] = useState([])

  function buildFilterString(filters: Filters) {
    var ret = '?'
    var isFirst: boolean = true
    Object.entries(filters).forEach(([property, value]) => {
      if (value != '' && value != 0) {
        // No default parameters ('' or 0), build filter string (key=value pairs)

        // http://127.0.0.1:8000/movies/filtered?genre=&id=0&rating_from=0&rating_to=0&runtime_from=0&runtime_to=0&score_from=0&score_to=0&star=&title=&year_from=&year_to=
        if (isFirst) {
          ret += `${property}=${value}`
          isFirst = false
        } else {
          ret += `&${property}=${value}`
        }
        
      }
    })
    console.log(ret)
    return ret
  }

  // EFFECT
  // Anytime the query state gets updated, create the filter string and send a GET request to the server
  // This occurs everytime the UI form's button is submitted
  useEffect(() => {
    if (query) {
      const options = {
        method: "GET",
        /*
          WARNING: understand the vulnerabilities of CORS and access control allow origin *. DO NOT use this in production.
        */
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
      }
      const apiRoot = 'http://127.0.0.1:8000'
      const subsites = '/movies/filtered'
      const filterString = buildFilterString(query)

      const apiURL = apiRoot + subsites + filterString
      console.log(apiURL)
      fetch(apiURL)
      .then(res => res.json())
      .then(data => {
        // Movies array that holds json objects pertaining to our results
        const movies = data.value

        // For now, take first 100 results to prevent to browser from over loading
        const display = movies.slice(0, 100)

        setMovies(display)
        return display
      })
    }
  }, [query])

  const [genre, set_genre] = useState('');
  const [id, set_id] = useState(0);
  const [rating_from, set_rating_from] = useState(0);
  const [rating_to, set_rating_to] = useState(0);
  const [runtime_from, set_runtime_from] = useState(0);
  const [runtime_to, set_runtime_to] = useState(0);
  const [score_from, set_score_from] = useState(0);
  const [score_to, set_score_to] = useState(0);
  const [star, set_star] = useState('');
  const [title, set_title] = useState('');
  const [year_from, set_year_from] = useState('');
  const [year_to, set_year_to] = useState('');
  const [order_by, set_order_by] = useState('');
  const [order_direction, set_order_direction] = useState('ASC');

  // === Form submit handler
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData: Filters = {
      genre,
      id,
      rating_from: rating_from,
      rating_to: rating_to,
      runtime_from: runtime_from,
      runtime_to: runtime_to,
      score_from: score_from,
      score_to: score_to,
      star,
      title,
      year_from: year_from,
      year_to: year_to,
      order_by: order_by,
      order_direction: order_direction,
    };
    console.log('Form Data:', formData);
    // Perform search or any other logic with formData
    setQuery(formData)
  };

  // TODO: don't use any type
  // === Functions that handle input events (buttons, radio buttons, etc.)
  const handleChange = (setter: any, defaultValue: string) => (e: any) => {
    const value = e.target.value;
    setter(value);
  };

  const handleRadioChange = (setter: any) => (e: any) => {
    setter(e.target.value)
  };

  const handleNumberChange = (setter: any, defaultValue: number) => (e: any) => {
    const value = Number(e.target.value);
    setter(value)
  };

  return (
    <div>
      <h2>For now, only the top 50? movies.</h2>
      
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
              onChange={handleChange(set_genre, '')}
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
              onChange={handleNumberChange(set_id, 0)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Rating:</label>
            <input
              type="number"
              step="0.1"
              id="rating_from"
              name="rating_from"
              placeholder="From"
              value={rating_from}
              className={styles.input}
              onChange={handleNumberChange(set_rating_from, 0)}
            />
            <input
              type="number"
              step="0.1"
              id="rating_to"
              name="rating_to"
              placeholder="To"
              value={rating_to}
              className={styles.input}
              onChange={handleNumberChange(set_rating_to, 0)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Runtime (minutes):</label>
            <input
              type="number"
              id="runtime_from"
              name="runtime_from"
              placeholder="From"
              value={runtime_from}
              className={styles.input}
              onChange={handleNumberChange(set_runtime_from, 0)}
            />
            <input
              type="number"
              id="runtime_to"
              name="runtime_to"
              placeholder="To"
              value={runtime_to}
              className={styles.input}
              onChange={handleNumberChange(set_runtime_to, 0)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Score:</label>
            <input
              type="number"
              step="0.1"
              id="score_from"
              name="score_from"
              placeholder="From"
              value={score_from}
              className={styles.input}
              onChange={handleNumberChange(set_score_from, 0)}
            />
            <input
              type="number"
              step="0.1"
              id="score_to"
              name="score_to"
              placeholder="To"
              value={score_to}
              className={styles.input}
              onChange={handleNumberChange(set_score_to, 0)}
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
              onChange={handleChange(set_star, '')}
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
              onChange={handleChange(set_title, '')}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Year:</label>
            <input
              type="date"
              id="year_from"
              name="year_from"
              placeholder="From"
              value={year_from}
              className={styles.input}
              onChange={handleChange(set_year_from, '')}
            />
            <input
              type="date"
              id="year_to"
              name="year_to"
              placeholder="To"
              value={year_to}
              className={styles.input}
              onChange={handleChange(set_year_to, '')}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="order_by">Order By:</label>
            <select
              id="order_by"
              name="order_by"
              value={order_by}
              className={styles.select}
              onChange={handleChange(set_order_by, '')}
            >
              <option value="">Select Field</option>
              <option value="title">Title</option>
              <option value="rating">Rating</option>
              <option value="genre">Genre</option>
              <option value="year">Year</option>
              <option value="score">Score</option>
              <option value="star">Star</option>
              <option value="runtime">Runtime</option>
            </select>
          </div>
          <div className={styles.formGroup}>
        <label className={styles.label}>Order Direction:</label>
        <div>
          <input
            type="radio"
            id="asc"
            name="order_direction"
            value="ASC"
            checked={order_direction === 'ASC'}
            onChange={handleRadioChange(set_order_direction)}
          />
          <label className={styles.radioLabel} htmlFor="asc">ASC</label>
          <input
            type="radio"
            id="desc"
            name="order_direction"
            value="DESC"
            checked={order_direction === 'DESC'}
            onChange={handleRadioChange(set_order_direction)}
          />
          <label className={styles.radioLabel} htmlFor="desc">DESC</label>
        </div>
      </div>
          <button type="submit" className={styles.button}>Search</button>
        </form>
      <MovieList movies={movies} />
    </div>
  );
}