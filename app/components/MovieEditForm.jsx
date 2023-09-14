'use client'

import React from 'react'
import {v4 as uuidv4} from 'uuid'   // (sans le p(npm) marche pas !!) pnpm install uuid => uuidv4(); // ⇨ ex : '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' pour générer id unique

const reducer = (state, action) => {
    switch (action.type) {
        case "updating" : return {  // clic sur une ligne du tableau
            ...state, 
            status : "updating",
            editingMovie : action.payload,
            btnDisable : {add : false, update : true, delete : true},
            actifInput : true,
            error : null
        } 
        case "new" : return {       // clic sur bouton Nouveau Tracker
            ...state, 
            status : "new",
            editingMovie : action.payload,
            btnDisable : {add : true, update : false, delete : false},
            actifInput : true,
            error : null
        } 
        case "updated" : return {    // clic sur bouton Mettre à jour
            ...state, 
            status : "updated",         // pas de payload car on reste sur le même film
            btnDisable : {add : false, update : true, delete : false},
            actifInput : true,
            error : null
        } 
        case "saved" : return {    // clic sur bouton Ajouter
            ...state, 
            status : "saved",
            editingMovie : action.payload,
            btnDisable : {add : false, update : false, delete : false},
            actifInput : false,
            error : null
        }
        case "deleted" : return {   // clic sur bouton Supprimer
            ...state, 
            status : "deleted",
            editingMovie : action.payload,
            btnDisable : {add : false, update : false, delete : false},
            actifInput : false,
            error : null
        } 
        case "inputsChanging" : return {   // modification des inputs
            ...state, 
            status : "inputsChanging",
            editingMovie : action.payload,
            //btnDisable : {add : false, update : false, delete : false},
            //actifInput : true,
            error : null
        } 
        case "fail" : return {   // modification des inputs
            ...state, 
            status : "fail",
            editingMovie : action.payload,
            btnDisable : {add : false, update : false, delete : false},
            actifInput : false,
            error : action.error
        } 
        default:
          throw new Error('Action non supportée')       
    }
}

export default function MovieEditForm({selectedMovie, onAddMovie, onSuppMovie, onUpdateMovie }) {

    // ?????????????????????????? le mettre en dehors du comp comme ds 9-tracker ?????? comme ça on l'initialise qu'une fois ?????
    // ?????????????????????????????????????????? A VOIR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // Mike a mis une fonction : "const newTracker = () => ({" => Pourquoi ???
    const newMovie = {
        id: uuidv4(),
        name: '',
        category: 'Default',
        year: 2000
        // mais le placeholder ne s'affiche pas !! Comment l'afficher ??? Undefiened ou Null => Erreur !!!
    }

    // On crée une copie du film sélectionné pour pouvoir le modifier sans modifier le film sélectionné
    //const [editingMovie, setEditingMovie] = React.useState( {...newMovie, id: ''})    // On doit mettre quelque chose sinon erreur (uncotrolled input...) - On met l'id vide comme ça on peut gérer les disabled des input
    // Plus besoin car on utilise le useReducer !

    //console.log(editingMovie)

     // On désactive les champs lorsqu'aucun film est sélectionné ni nouveau tracker est cliqué
     //const disabled = editingMovie.id === '' ? true : false
     // Mieux !!! On crée un REDUCER qui va être appelé à chaque évenement (nouveau tracker, ajout, suppression, mise à jour)
     const [state, dispatch] = React.useReducer(reducer, {
        editingMovie : {...newMovie, id: ''},
        status : "idle",        // = inactif
        btnDisable : {add : false, update : false, delete : false},
        error : null
    })

     console.log("state", state)


    // Questions A VOIR : demander ou comprendre !!!
    //if (selectedMovie !== {}) setEditingMovie(selectedMovie)    // Pourquoi fait tourner en boucle ??????????? (même sans le useEffect ci-dessous)

    // A chaque changement de selectedMovie, on met à jour editingMovie
    React.useEffect(() => {
        if (selectedMovie.id) {
            dispatch({type : 'updating', payload : selectedMovie})
            //setEditingMovie(selectedMovie)  // si pas de condition, à la fin du MONTAGE => erreur, car selectedMovie est vide au début (pourtant il n'est pas UNDEFINED comme c'est dit dans l'erreur mais = {}  !!!???)
        }
    },[selectedMovie])
    

    // console.log("moviesList : ", moviesList)
    // console.log("selectedMovieId : ", selectedMovieId)
    // console.log("selectedMovie : ", selectedMovie)
    

    // Au changement des input
    const onChangeMovieName = event => {
        dispatch({type : 'inputsChanging', payload : {...state.editingMovie, name: event.target.value}})
        //setEditingMovie({...editingMovie, name: event.target.value})
    }
    const onChangeMovieCat = event => {
        dispatch({type : 'inputsChanging', payload : {...state.editingMovie, category: event.target.value}})
        //setEditingMovie({ ...editingMovie, category: event.target.value })
    }    
    const onChangeMovieYear = event => {
        dispatch({type : 'inputsChanging', payload : {...state.editingMovie, year: event.target.value}})
        //setEditingMovie({...editingMovie, year: event.target.value})
    }

     // Au clic sur le bouton "Nouveau Tracker"
    const handleNewTracker = () => {
        state.status !== 'new' && dispatch({type : 'new', payload : newMovie})
        //setEditingMovie(newMovie)
    }

     // Au clic sur le bouton "Ajouter"
    const onAddMovieClick = () => { 
        dispatch({type : 'saved', payload : {...newMovie, id: ''}})   
        onAddMovie(state.editingMovie)
        // On remet les champs à zéro
        //setEditingMovie({...newMovie, id: ''})
    }
    // Au clic sur le bouton "Supprimer"
    const onSuppMovieClick = () => {
        dispatch({type : 'deleted', payload : {...newMovie, id: ''}})   
        onSuppMovie(state.editingMovie.id)
        // On remet les champs à zéro
        //setEditingMovie({...newMovie, id: ''})
    }  
    // Au clic sur le bouton "Mettre à jour"
    const onUpdateMovieClick = () => {
        dispatch({type : 'updated'})   
        onUpdateMovie(state.editingMovie)
        // On remet les champs à zéro
        //setEditingMovie({...newMovie, id: ''})
    }

    return (
        <div>          
            <form className="Form" 
            //onSubmit={onAddMovie}         // Pas obligé d'avoir un submit je pense ???
            >
                <fieldset>
                    <legend>Gestion des films</legend>
                    <div style={{ display: 'flex' }}>
                        <label htmlFor="movieName">Nom du film :</label>
                        <input disabled={!state.actifInput} type="text" id="movieName" placeholder="movie name..." value={state.editingMovie?.name} onChange={onChangeMovieName} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <label htmlFor="movieCategory">Catégorie :</label>
                        <select disabled={!state.actifInput} name="" id="movieCategory" value={state.editingMovie?.category} onChange={onChangeMovieCat}>
                            <option value="Action">Action</option>
                            <option value="Comédie">Comédie</option>
                            <option value="Drame">Drame</option>
                            <option value="Fantastique">Fantastique</option>
                            <option value="Horreur">Horreur</option>
                            <option value="Science-fiction">Science-fiction</option>
                            <option value="Thriller">Thriller</option>
                        </select>
                        {/* <input type="text" id="movieCategory" placeholder="movie category..." value={state.editingMovie?.category} onChange={onChangeMovieCat} /> */}
                    </div>
                    <div style={{ display: 'flex' }}>
                        <label htmlFor="movieYear">Année de vision :</label>
                        <input disabled={!state.actifInput} type="number" id="movieYear" placeholder="movie year..."  value={state.editingMovie?.year} onChange={onChangeMovieYear} 
                            step={5} // chaque clic augmente/dimunuer de ce nombre                        
                        />
                    </div>              

                    {/* BOUTONS */}
                    <div className="Action" style={{ display: 'flex' }}>
                        <input
                            type="button" // si type="submit" => ça recharge la page donc remets les données par défaut (sinon ajouter event.preventDefault() dans la fonction handleOnSubmit)
                            value="Nouveau Tracker"
                            onClick={handleNewTracker}
                        ></input>
                        <input
                            disabled={!state.btnDisable.add}
                            type="button"
                            value="Ajouter"
                            onClick={onAddMovieClick}
                        ></input>
                        <input
                            disabled={!state.btnDisable.update}
                            type="button"
                            value="Mettre à jour"
                            onClick={onUpdateMovieClick}
                        ></input>                    
                        <input
                            disabled={!state.btnDisable.delete}
                            type="button"
                            value="Supprimer"
                            onClick={onSuppMovieClick}
                        ></input>
                    
                    </div>
                </fieldset>
            </form>
        </div>
    
    )
}
