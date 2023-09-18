import React from 'react'

// Composant
import Row from './Row.jsx'

export default function MoviesTable({ moviesList = [{
                                                id: 0, name: "", category: "", year: 0, }], 
                                    selectedMovieId, setSelectedMovie, orderedBy }) {

    console.log("orderedBy", orderedBy)

    // console.log("bb", moviesList)

    let lastCategory = ''  // pas besoin de faire un useState car on ne veut pas re-render le comp à chaque fois que lastCategory change (on a besoin de cette var seulement dans ce composant)

    const selectMovie = movie => {   // OU on aurait pu passer directement : "movie => setSelectedMovie(movie)" dans selectMovie du comp Row
        setSelectedMovie(movie)
    }  

    // Tableau qui contient les lignes JSX du tableau pour pouvoir ajouter des lignes de catégories (orderedBy)
    let tableMoviesList = []
    moviesList.map(movie => {       // ne pas faire de return car on ne peut rien ajouter après le return, mais un push !!!
        //console.log(movie)

        if (orderedBy === 'category') {
            // Si nouvelle catégorie, on ajoute une ligne de catégorie
            if (movie.category !== lastCategory) {
                lastCategory = movie.category
                console.log("key = ", movie.category)

                // On ajoute une ligne de catégorie
                tableMoviesList.push(
                    <tr key={movie.category} style={{ backgroundColor: "red" }} >
                        <td colSpan="3">{movie.category}</td>
                    </tr>
                )
            }
            tableMoviesList.push(<Row movie={movie} selectMovie={selectMovie} selectedMovieId={selectedMovieId} key={movie.id} />)
        } else {
            tableMoviesList.push(<Row movie={movie} selectMovie={selectMovie} selectedMovieId={selectedMovieId} key={movie.id} />)
        }
    })



    return (
        <>
            <div className="TableContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Catégorie</th>
                            <th>Année de vision</th>
                        </tr>
                    </thead>
                    <tbody>      
                        {moviesList && tableMoviesList}                                 
                    </tbody>
                </table>
            </div>
        </>
    )
}
