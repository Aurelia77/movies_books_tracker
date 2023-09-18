"use client"

//https://www.themoviedb.org/search?query=wild
//https://www.themoviedb.org/settings/api
//https://developer.themoviedb.org/docs
//https://developer.themoviedb.org/docs/search-and-query-for-details

import React from 'react'

// Components
import MoviesTable from '../components/MoviesTable.jsx'
import MovieEditForm from '../components/MovieEditForm.jsx'
import SearchForm from '../components/SearchForm.jsx'

// Datas
import filmsData from './../data.js'

// Helper
import { sortArrayBy,  } from './../helpers.js'

// CSS
import './../globals.css'


export default function MovieTrackerApp() {   
  
    //console.log("0-filmData",filmsData)     // bizarre dans le LOG il est déjà trié !!! Pourquoi ???   

    const [orderedBy, setOrderedBy] = React.useState('name')  

    console.log("orderedBy", orderedBy)

    // Pour Composant MoviesTable + MovieEditForm
    const [moviesList, setmoviesList] = React.useState(sortArrayBy(filmsData, orderedBy))  // si on ajoute .slice() => ne modifie pas le tableau

    //console.log("1",moviesList)

    const [selectedMovie, setSelectedMovie] = React.useState({})   
    //const [searchText, setSearchText] = React.useState('')    => ne sert à rien ???
   

    

    // Pour Composant SearchForm
    const onSearchChange = (searchTextInput) => {        
        //setSearchText(searchTextInput)

        // console.log(moviesList)
        // console.log("searchTextInput : ", searchTextInput)

        let filteredMovies = filmsData.filter(movie => {        // ne pas faire sur moviesList mais sur la BDD !!! car moviesList va changer à chaque recherche !
            //console.log(movie.name)
            return movie.name.toLocaleLowerCase().includes(searchTextInput.toLocaleLowerCase())
            //return movie.name.toLowerCase().indexOf(searchTextInput.toLocaleLowerCase()) !== -1   // indexOf fonctionne aussi mais includes plus utilisé
        })

        //console.log(filteredMovies)

        setmoviesList(filteredMovies)
    }


    // Pour Composant MovieEditForm
    // ??????????????????????????????????????? Pourquoi mettre cette fonction ici et pas dans le comp MovieEditForm ???
    const handleAddMovie = movieEdited => {
        console.log("handleAddTracker")
        console.log("movieEdited", movieEdited)

        if (movieEdited.name === '') {
            alert("Ajouter un nom de film")
        }
        else if (movieEdited.category === '') {   
            alert("Ajouter une catégorie de film")
        }
        else if (movieEdited.year === 0) {
            alert("Ajouter une année de visionnage")
        }
        else {
            // console.log("OK !!!")
            // console.log("movieEdited", movieEdited)
            // console.log(moviesList)

            setOrderedBy('name')
            // On ajoute le film au tableau en le triant par ordre alphabétique des noms (sinon si on est dans un autre ordre, le film ajouté ne sera pas dans le bon ordre)
            setmoviesList(sortArrayBy([...moviesList, movieEdited], "name")) // Ne prend pas en compte le setOrderedBy('name') avant de sortir de la fonction (mais le mettre quand même pour le montage de TableMovies)
        }
        //console.log(moviesList) // n'affiche pas de suite le nouveau tableau !!! Mais après la fonction ok.(car le setState est asynchrone (???))
    }
    //console.log(moviesList)

    // Gère la suppression d'un film (au clic sur le bouton "Supprimer")
    const handleDeleteMovie = () => {
        // On filtre le tableau pour ne garder que les films qui n'ont pas l'id du film sélectionné
        let filteredMovies = 
        setmoviesList(moviesList.filter(movie => movie.id !== selectedMovie.id)) 
    } 

    // Gère la mise à jour d'un film (au clic sur le bouton "Mettre à jour")
    const handleUpdateMovie = movieEdited => {
        if (movieEdited.name === '') {
            alert("Ajouter un nom de film")
        }
        else if (movieEdited.category === '') {   
            alert("Ajouter une catégorie de film")
        }
        else if (movieEdited.year === 0) {
            alert("Ajouter une année de visionnage")
        }
        else {
        // On met à jour le tableau en remplaçant le film qui a le même id que celui qu'on a sélectionné par le film sélectionné
            let updatedMovies = moviesList.map(movie => movie.id === movieEdited.id ? movieEdited  : movie)
            setmoviesList(sortArrayBy(updatedMovies, orderedBy))  
        }  
    }
  
    const sortByCategory = () => {
        //console.log("sortByCategory")     
        //console.log(moviesList)

        setOrderedBy('category')         
        setmoviesList(sortArrayBy(moviesList, 'category'))// Ne prend pas en compte le setOrderedBy('category') avant de sortir de la fonction (mais le mettre quand même pour le montage de TableMovies)
    }

    const sortByName = () => {
        // console.log("sortByName")
        // console.log(moviesList)

        setOrderedBy('name')      
        setmoviesList(sortArrayBy(moviesList, 'name'))  // Ne prend pas en compte le setOrderedBy('name') avant de sortir de la fonction (mais le mettre quand même pour le montage de TableMovies)
    }   

     
    return (
        <div className='App-content app'> 
            <div>Name : {selectedMovie.name}</div>
            <input type="button" onClick={sortByCategory} value="Trier par catégorie" />
            <input type="button" onClick={sortByName} value="Trier par nom" />
            <SearchForm onSearchChange={onSearchChange} />
            <MovieEditForm selectedMovie={selectedMovie} onAddMovie={handleAddMovie} onSuppMovie={handleDeleteMovie} onUpdateMovie={handleUpdateMovie} /> 
            <MoviesTable moviesList={moviesList} selectedMovieId={selectedMovie.id} setSelectedMovie={setSelectedMovie} orderedBy={orderedBy} />
        </div>
    )
}
