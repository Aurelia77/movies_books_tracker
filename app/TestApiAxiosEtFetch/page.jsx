"use client"

import React from 'react'
import axios from 'axios'

export default function TestApi() {

    //const [data, setData] = React.useState<Array<string>>([])
    const [data, setData] = React.useState(null);

    const [loading, setLoading] = React.useState(true)

    // 1- Avec AXIOS (avec PROMISE donc THEN et CATCH) => on set Data avec response.data
    React.useEffect(() => {
        axios.get('https://dumbstockapi.com/stock?exchanges=NYSE')
            .then(response => {
                console.log("response : ", response)        // {data: Array(3127), status: 200, statusText: 'OK', headers: AxiosHeaders, config: {…}, …}
                setData(response.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, []) // seulement qd la page a fini de charger

    // 2- Avec AXIOS (sans PROMISE mais avec ASYNC et TRY CATCH) => on set Data avec response.data
    // React.useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('https://dumbstockapi.com/stock?exchanges=NYSE')
    //             console.log("response : ", response)        // {data: Array(3127), status: 200, statusText: 'OK', headers: AxiosHeaders, config: {…}, …}
    //             setData(response.data)
    //             setLoading(false)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     fetchData()
    // }, []) // seulement qd la page a fini de charger


    // 3- Avec FETCH (renvoie une PROMISE donc THEN et CATCH) => on set Data avec response.json()
    // React.useEffect(() => {
    //     fetch('https://dumbstockapi.com/stock?exchanges=NYSE')
    //         .then(response => {
    //             console.log("response : ", response)        // Response {type: 'cors', url: 'https://dumbstockapi.com/stock?exchanges=NYSE', redirected: false, status: 200, ok: true, …}
    //             return response.json()
    //         }) // ça retourne aussi une PROMISE dc on pt faire ensuite un THEN
    //         .then(json => {
    //             console.log("response.json() : ", json)        // response.json() :  (3127) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…},  ...]
    //             setLoading(false)
    //             return setData(json)
    //         })
    //         .catch(error => console.log(error))
    // }, []) // seulement qd la page a fini de charger


    if (data) {
        console.log("data : ", data)        // idem response.json() :  (3127) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…},  ...]
        console.log(typeof data)        // object
        console.log(Array.isArray(data))    // true

        console.log(data[0])        // {ticker: 'A', name: 'Agilent Technologies, Inc.', is_etf: null, exchange: 'NYSE'}
        console.log(data[0].name)         // Agilent Technologies, Inc.
    }

    return (
        <div>
            {loading ?
                <p>Chargement...</p>
                :
                <ul>
                    {data &&
                        data.map((item, index) => (
                            <li key={index} >{item.name}</li>
                        ))}
                </ul>
            }

        </div>
    )
}
