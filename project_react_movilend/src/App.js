import {useEffect, useState} from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
//370c5713
const API_URL='http://www.omdbapi.com/?apikey=370c5713';
const movie1 = {
    "Title": "Batman v Superman: Dawn of Justice",
    "Year": "2016",
    "imdbID": "tt2975590",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
}
const App=()=>{
    const [movies,setMovies]=useState([]);
    const[serchTerm,setSearchTerm]=useState('');
    const searchMovies = async(title)=>{

        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }
    useEffect(()=>{
        searchMovies('Superman');
    },[]);

    return(
        <div className='app'>
            <h1>MovieLand</h1>
            <div className='search'>
                <input 
                placeholder='Search for movies'
                value={serchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                />
                <img 
                src={SearchIcon} 
                alt="search" 
                onClick={()=>searchMovies(serchTerm)}
                />
            </div>
            {
                movies.length>0
                ?
                (
                    <div className='container'>
                        {movies.map((movie)=><MovieCard movie={movie}/>)}    
                    </div>
                )
                :
                (
                    <div className='emty'>
                        <h2>No movies</h2>
                    </div>

                )
            }
            
        </div>
        
    );
}
export default App;