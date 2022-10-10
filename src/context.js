import React, { useContext, useEffect, useState } from "react";

const AppContext=React.createContext();
export const API_URL=`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

// We need a provider function
const AppProvider=({children})=>{
    const [isLoading,setIsLoading]=useState(true);
    const[movie,setMovie]=useState([]); 
    const[isError,setIsError]=useState({show:"false",msg:""});
    const[query,setQuery]=useState("titanic");
    const getMovies=async(url)=>{
        setIsLoading(true);
        try{
            const res = await fetch(url);
            const data =await res.json();
            console.log(data);
            if(data.Response==="True")
            {
                setIsLoading(false);
                setMovie(data.Search);
                setIsError({
                    show:false
                })
            }
            else{
                setIsError({
                    show:true,
                    msg:data.Error,
                })
            }
        }catch(error){
                console.log(error);
        }
    }
    useEffect(()=>{
        let timeout=setTimeout(() => {
            getMovies(`${API_URL}&s=${query}`);
        }, 900);
        return()=>clearTimeout(timeout)
    },[query])



    return<AppContext.Provider value={{isLoading,isError,movie,query,setQuery}}>
        {children}
    </AppContext.Provider>
};
// Global custom context hook
const useGlobalContext=()=>{
    return useContext(AppContext);
};


export {AppContext,AppProvider,useGlobalContext};