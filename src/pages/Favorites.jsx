import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContex";
import MovieCard from "../components/MovieCard";

function Favorites (){
    const {favorites} = useMovieContext();

    if (favorites){
        return(
            <div className="favorites">
                <h2>My Favorite Movies</h2>
        <div className="movies-grid">
                {favorites.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
            </div>
        )
    }

    return <div className="favorites-empty">
        <h2>you have zero favorite movies yet. please add.</h2>
        <p> please add favorite movies and they will appear here.</p>

    </div>
}
export default Favorites;