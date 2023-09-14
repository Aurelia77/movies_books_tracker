"use client"

//https://developers.google.com/books
//https://developers.google.com/books/docs/v1/using#PerformingSearch
//https://console.cloud.google.com/apis/api/books.googleapis.com/metrics?project=tuto-nextjs-promptopia

import React from 'react'

// Composants
import BookTable from '../components/book/BookTable.jsx'

export default function testApiBook() {   
    
    const BOOK_API_KEY = 'AIzaSyA5sIcr1LVEITM_1xDqd0caehfMN9M_80U'
    // const bookNameReq = 'wild'
    // const authorNameReq = 'strayed'
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true) 
    const [bookName, setBookName] = React.useState('')
    const [authorName, setAuthorName] = React.useState('')

    // Avec FETCH (renvoie une PROMISE)
    React.useEffect(() => {
        // fetch(`https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=${BOOK_API_KEY}`)

        //fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookNameReq}+inauthor:${authorNameReq}&key=${BOOK_API_KEY}`)
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}+inauthor:${authorName}&key=${BOOK_API_KEY}`)

        //fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookNameReq}+inauthor:&key=${BOOK_API_KEY}`)
        //fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookNameReq}&key=${BOOK_API_KEY}`)
            .then(response => {
                console.log("response : ", response)        // Response {type: 'cors', url: 'https://www.googleapis.com/books/v1/volumes?q=wild…rayed&key=AIzaSyA5sIcr1LVEITM_1xDqd0caehfMN9M_80U', redirected: false, status: 200, ok: true, …}
                return response.json()
            }) // ça retourne aussi une PROMISE dc on pt faire ensuite un THEN
            .then(json => {
                console.log("response.json() : ", json)        // response.json() :  {kind: 'books#volumes', totalItems: 77, items: Array(10)}
                setLoading(false)
                return setData(json.items)
            })
            .catch(error => console.log(error))
    }, [bookName, authorName]) // seulement qd la page a fini de charger




    return (
        <div>
            <div style={{marginBottom: "20px", marginTop: "20px", color:'blue'}}>Affichage des livres selon la recherche :</div>
            <label htmlFor="bookName">Nom du livre : </label>
            <input type="text" id="bookName" value={bookName} onChange={e => setBookName(e.target.value)} />
            <label htmlFor="authorName">Nom de l'auteur : </label>
            <input type="text" id="authorName" value={authorName} onChange={e => setAuthorName(e.target.value)} />

            {loading ?
                <p>Chargement...</p>
                :                
                <ul>
                    {data &&
                        data.map((item, index) => (
                            <li key={index} >{item.volumeInfo.title} - {item.volumeInfo.authors}</li>
                        ))}
                </ul>
            }
            {/* <div style={{marginBottom: "20px", marginTop: "20px", color:'blue'}}>Composant BookTable (données enregistrées dans DATA)</div>
            <BookTable /> */}
        </div>
    )
}
