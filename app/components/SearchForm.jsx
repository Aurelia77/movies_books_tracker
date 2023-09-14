import React from 'react'

export default function SearchForm({onSearchChange}) {

    // Traite le changement de searchText => on appelle la fonction qui est dans le parent, car le traitement se fait là haut et pas ici !!!
    const handleChangeSearchText = (event) => {
        console.log(event.target.value)
        onSearchChange(event.target.value)
    }

  return (
    <div className='component-search-input'>
        <div>Recherche de film :</div>
        <input type="text" placeholder='Recherche' onChange={handleChangeSearchText} />
    </div>
  )
}
