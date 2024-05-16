import React, { useState, useEffect } from 'react';

class Response {
  genre: string = ''
  id: number = 0
  rating: string = ''
  runtime: number = 0
  score: number = 0
  star: string = ''
  title: string = ''
  year: number = 0
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
export default async function Search() {
  var movies = await callAPI()
  movies = movies.slice(0, 10)
  return (
    <div>
      Hi there!
      <ul>
        {movies.map(function(data: Response) {
          return (
            <li key={data.id}>
              Title: {data.title}
            </li>
          )
        })}
      </ul>
    </div>
  );
}
