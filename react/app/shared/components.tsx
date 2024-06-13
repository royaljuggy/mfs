import { Movie } from './objects'
import styles from './styles.module.css'

export function MovieCard(props: any) {
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
  
export function ContinueCard() {
    return (
        <div className={styles.continueCard}>
        <span className={styles.continueText}>Show more...</span>
    </div>
    )
}
  
export function MovieList(props: any) {
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