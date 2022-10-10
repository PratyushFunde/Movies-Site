import React from 'react'
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { API_URL } from './context';
import { NavLink } from 'react-router-dom';

const SingleMovie = () => {
  const{id}=useParams();
  const [isLoading,setIsLoading]=useState(true);
  const[movie,setMovie]=useState("titanic"); 
  const getMovies=async(url)=>{
      try{
          const res = await fetch(url);
          const data =await res.json();
          console.log(data);
          if(data.Response==="True")
          {
              setIsLoading(false);
              setMovie(data);
          }
      }catch(error){
              console.log(error);
      }
  }
  useEffect(()=>{
      let timeout=setTimeout(() => {
          getMovies(`${API_URL}&i=${id}`);
      }, 900);
      return()=>clearTimeout(timeout)
  },[id])


if(isLoading){
  return(
    <div className="movie-section">
      <div className="loading">Loading...</div>
    </div>
  )
}

  return (
    <>
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={movie.Poster} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className=""></p>
          <p className="card-text"><span className='ImdbRating'>Released Date :   </span>{movie.Released}</p>
          <p className="card-text"><span className='ImdbRating'>Movie Genre :   </span>{movie.Genre}</p>
          {/* <h2>Imdb Rating</h2> */}
          <p className="card-text"><span className='ImdbRating'>Imdb Rating :   </span>{movie.imdbRating} / 10</p>
          <p className="card-text"><span className='ImdbRating'>Country of Origin :  </span>{movie.Country}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
    </>
  )
}

export default SingleMovie
