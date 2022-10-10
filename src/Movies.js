import React from 'react'
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from './context'

const Movies = () => {
  const {movie, isLoading}=useGlobalContext();

  console.log("Movies: ", movie);
  if(isLoading){
    return(
      <div className="">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  return (
    
  <>
  <section className='movies-page'>
    <div className="container grid grid-4-col">

 
 
  {movie.map((curMovie)=>{
    const{imdbID,Title,Poster}=curMovie; 
    const movieName=Title.substring(0,15);
    return(  
    <NavLink to={`movie/${imdbID}`} key={imdbID}>
      <div className="card" >
      <div className="card-info" >
        <h2>{ movieName.lenght>=10 ?`${movieName}....` : movieName }</h2>
        <img src={Poster} alt={imdbID} />
      </div>
      </div>
    </NavLink>
    )
    
  })}
  </div>
 </section>
  </>
  );
}

export default Movies
