import MovieCard from "../components/MovieCard"
import React, { useEffect, useState } from 'react';

import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home () {
    const [searchQuery, setSearchQuery] = useState(""); // Fixed state initialization
    const [movies, setMovies] = useState([]); // Correctly initializing movies state
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetching popular movies on component mount
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };

        loadPopularMovies();
    }, []);

    // Handling search form submission
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return
        if (loading) return
        setLoading (true)
        try{
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)

        }catch(err){
            console.log(err)
            setError("Failed to load movies...")

        }finally{
            setLoading(false)
        }

        setSearchQuery(""); // Clear the input after search
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Fixed typo
                />
                <button type="submit" className="search-button">SEARCH</button>
            </form>
            {error && <div className="error_mesage">{error}</div>}

            {loading? (
                <div className="loading">Loading...</div>

            ) :(

            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>)}
        </div>
    );
}

export default Home;
