"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const API_KEY = '995422d7f6b3511a7c48191e68fffbf6'
const AppClima = () => {
    const [clima, setClima] = useState(null)
    const [city, setCity] = useState('')
    const ciudad = ['Barcelona']
    const obtener = async (ciudad) => {
        const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&lang=es&units=metric`)
        const datos = await respuesta.json()
        setClima(datos)
        return datos
    }

    const handleClickCity = (ciudad) => {
        obtener(ciudad)
    }

    const handleChangeCity = (evento) => {
        setCity(evento.target.value)

    }

    const handleSubmit = async(evento) => {
        evento.preventDefault()
        const datosCiudad = await obtener(city)
        console.log(datosCiudad);
        const temp = datosCiudad.main.temp
        const temp_max = datosCiudad.main.temp_max
        const temp_min = datosCiudad.main.temp_min
        const humidity = datosCiudad.main.humidity
        const name = city
        const response = await axios.post('/api/clima', {temp, temp_max, temp_min, humidity, name})
        obtener(city)
        console.log(response.data);
    }

    useEffect(() => {
        obtener(ciudad)
    }, [])

    return <>
        <nav>
            <ul>
                <li><h1>Clima</h1></li>
            </ul>
            <ul>
                <li><a href="#" onClick={() => handleClickCity('Tucumán')}>Tucumán</a></li>
                <li><a href="#" onClick={() => handleClickCity('Salta')}>Salta</a></li>
                <li><a href="#" onClick={() => handleClickCity('Buenos Aires')}>Buenos Aires</a></li>
            </ul>
        </nav>

        <form onSubmit={handleSubmit}>
            <input
                type="search"
                name="search"
                placeholder="Buscar"
                aria-label="Search"
                onChange={handleChangeCity}
                value={city}
            />
        </form>

        {clima ? (
            <article>
                <header>
                    <h2>{clima.name}</h2>
                </header>
                <img style={{ backgroundColor: clima.weather[0].icon.includes('d') ? 'lightblue' : '#21233d' }}
                    src={`./openweathermap/${clima.weather[0].icon}.svg`} alt=""/>
                <footer>
                    <h3>Temperatura: {clima.main.temp}°C</h3>
                    <p>Máxima: {clima.main.temp_max}°C/Mínima:{clima.main.temp_min}°C</p>
                    <p>Humedad: {clima.main.humidity}</p>
                </footer>
            </article>
        ) : (
            <p>Cargando...</p>
        )}
    </>
}

export default AppClima