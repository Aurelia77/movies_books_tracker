"use client"

//https://www.themoviedb.org/search?query=wild
//https://www.themoviedb.org/settings/api
//https://developer.themoviedb.org/docs
//https://developer.themoviedb.org/docs/search-and-query-for-details

import React from 'react'

// Components
import MoviesTable from '../components/MoviesTable.jsx'
import MovieEditForm from '../components/MovieEditForm.jsx'

// Datas
import filmsData from './../data.js'

export default function testApiMovie() {

    // Pour Composant MoviesTable + MovieEditForm
    const [allMovies, setAllMovies] = React.useState(filmsData)

    // Recherche de film
    // const MOVIE_API_KEY = '4fe32415e9e8ac1f45f97c952ea9a60c'
    // const [searchMovie, setSearchMovie] = React.useState('')
    // const searchMovie1 = 'wild'    
    // const authorNameReq = 'strayed'
    // const [data, setData] = React.useState(null);
    // const [loading, setLoading] = React.useState(true)

    // const handleChangeMovie = event => {  
    //     setSearchMovie(event.target.value)
    // }


    // const handleSubmit = event => { 
    //     event.preventDefault()

    //     fetch(`https://api.themoviedb.org/3/search/movie?query=${searchMovie}&api_key=${MOVIE_API_KEY}`)    // recherche input
    //     .then(response => {
    //         console.log("response : ", response)
    //         return response.json()
    //     }) // ça retourne aussi une PROMISE dc on pt faire ensuite un THEN
    //     .then(json => {
    //         console.log("response.json() : ", json)
    //         setLoading(false)
    //         return setData(json.results)
    //     })
    //     .catch(error => console.log(error))
    // }

    // Seulement au chargement de la page => plus besoin car on vt que ça cherche qd on clic sur RECHERCHER !
    // React.useEffect(() => {
    //     // fetch(`https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=${BOOK_API_KEY}`)
    //     //fetch(`https://api.themoviedb.org/3/movie/11?api_key=${MOVIE_API_KEY}`)
    //     //fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${MOVIE_API_KEY}`)    // tendances (day, week...)
    //     //fetch(`https://api.themoviedb.org/3/search/movie?query=${searchMovie1}&api_key=${MOVIE_API_KEY}`)    // recherche ex
    //     fetch(`https://api.themoviedb.org/3/search/movie?query=${searchMovie}&api_key=${MOVIE_API_KEY}`)    // recherche input
    //         .then(response => {
    //             console.log("response : ", response)
    //             return response.json()
    //         }) // ça retourne aussi une PROMISE dc on pt faire ensuite un THEN
    //         .then(json => {
    //             console.log("response.json() : ", json)
    //             setLoading(false)
    //             return setData(json.results)
    //         })
    //         .catch(error => console.log(error))
    // }, []) // seulement qd la page a fini de charger  


    // Composant MovieEditForm
    const handleAddMovie = movie => {     // On passe cette fonction au composant MovieEditForm pour qu'il puisse l'utiliser lors du submit (ajout film)
        if (movie.id === '') {
          alert('il manque le tracker id')
          return
        }
        if (movie.name === '') {
          alert('veuillez renseigner le nom du tracker')
          return
        }
        if (movie.starttime === '') {
          alert('veuillez renseigner la date de début')
          return
        }
        if (movie.category === '') {
          alert('veuillez renseigner la categorie')
          return
        }
        setAllMovies([...allTrackers, tracker])
    }

    return (
        <div>Coucou !!!
            {/* <form onSubmit={handleSubmit}>
                <label> Recherche de film :
                    <input onChange={handleChangeMovie} value={searchMovie} type="text" name="emailInput" />
                </label>
                <input type="submit" value="Rechercher les films" />
            </form>

            {loading ?
                <p>Chargement...</p>
                :
                <ul>
                    {data &&
                        data.map((item, index) => (
                            <li key={index} >{item.title}** {item.overview}</li>
                        ))}
                </ul>
            } */}

            {/* <MovieEditForm handleAddMovie={handleAddMovie} /> */}
            {/* <MoviesTable allMovies={allMovies} /> */}




        </div>
    )
}
