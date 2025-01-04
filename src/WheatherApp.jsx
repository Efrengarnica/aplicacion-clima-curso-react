import React, { useState } from 'react'

export const WheatherApp = () => {

    const urlBaseCoor = 'http://api.openweathermap.org/geo/1.0/direct'
    const API_KEY = '0b33f8912b3650fc8cb8d6eab68a398b'

   
    //Guarda lo que hay en el Input
    const [ciudad, setCiudad] = useState('')

    // Aqui se va a guardar los datos de la API
    const [dataClima, setDataClima] = useState(null)

    //Modifica el valor del Input
    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value)
    }

    //Este trae las cosas de la API
    const handleSubmit = (e) => {
        e.preventDefault();
        if(ciudad.length>0) fetchClima()
    }
    //Aqui se realiza el fetch a la API
    //Al parecer no importa que la declare despues de ocuparla
    const fetchClima = async() => {
        try {
            const geoResponse = await fetch(`${urlBaseCoor}?q=${ciudad}&limit=1&appid=${API_KEY}`)
            const geoData = await geoResponse.json()
            setDataClima(geoData)
        } catch (error) {
            console.error('Ocurrio el siguiente problema:', error);
        }
    }


  return (
    <div className='container'>

        <h1>Aplicación del Clima</h1>

        <form onSubmit={handleSubmit}> 
            <input 
            type="text" 
            value={ciudad} 
            onChange={handleCambioCiudad}
            />
            <button type='submit'>Buscar</button>
        </form>
        {
            dataClima && (
                <div>
                    <h2> País {dataClima[0].country}</h2>
                    <p>Latitud: {dataClima[0].lat}</p>
                    <p>Longitud: {dataClima[0].lon}</p>
                </div>
            )

        }


    </div>
  )
}
