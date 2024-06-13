'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { Actor } from '../../shared/objects'
import styles from './styles.module.css';

// TODO:
const ActorPage = (props: any) => {
  const actor: Actor = props.actor
  const professions_array = actor.professions.split(',')
  return (
    <div className={styles.actorPage}>
      <h1 className={styles.name}>{actor.name}</h1>
      <p className={styles.birth_year}><strong>Birth Year:</strong> {actor.birth_year}</p>
      <p className={styles.death_year}><strong>Death Year:</strong> {actor.death_year}</p>
      <p className={styles.known_title}><strong>Known Title:</strong> {actor.known_title}</p>
      <ul>
        Professions
        {professions_array.map((p: string, id: number) => (
          <li key={id}>{p}</li>
        ))}
      </ul>
    </div>
  );
};

export default function Page(props: any) {

  const [actor, setActor] = useState(null)
  
  useEffect(() => {

    // TODO? move into pages directory, to allow router.isFallback (loading icon) https://stackoverflow.com/questions/76267351/how-to-fetch-data-server-side-in-the-latest-next-js-tried-getstaticprops-but-it
      // TODO: take parameters from form, and create key-value pairs for query, like ?tile=Blue&dateFrom=1996-01-01, etc.
    fetch(`http://127.0.0.1:8000/actors/${props.params.actor_id}`)
    .then(res => res.json())
    .then(data => {
      console.log(data.value[0])
      setActor(data.value[0])
      return data.value[0]
    })
  })

  if (!actor) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ActorPage actor={actor} />
    </div>
  );
}