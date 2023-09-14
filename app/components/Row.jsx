import React from 'react'

export default function Row({ movie, selectMovie, selectedMovieId }) {
  
  const onClickMovie = () => {
    selectMovie(movie)
  }

  const selected = movie.id === selectedMovieId ? 'selectedline' : ''

  return (
    // On ajoute l'id du film sur la ligne pour pouvoir le récupérer au clic et l'utiliser pour éditer le film
    <tr key={movie.id} onClick={onClickMovie} id={movie.id} className={selected} >
      <td>{movie.name}</td>
      <td>{movie.category}</td>
      <td>{movie.year}</td>
    </tr>)
}
