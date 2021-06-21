import React, { useState, useEffect } from 'react'
import '../../styles/form.css'

import clock_icon from '../../img/clock-icon.png'
import charger_icon from '../../img/charger-icon.png'
import person_icon from '../../img/person-icon.png'
import car_icon from '../../img/car-icon.png'

import useGetDate from '../../Hooks/useGetDate'


const Form = ({ dates, setEvents, charger, setModal, setDate }) => {
  const [data, setData] = useState({})
  const {end, start} = dates

  useEffect(() => {
    setData(prevState => {
      return {
        ...prevState,
        chargerId: charger[0].id,
        inicio: start,
        fin: end
      }
    })
  }, [])

  const handleChange = (event) => {
    const { target } = event
    setData(prevState => {
      return {...prevState,[target.name]: target.value }
    })
  }

  const handleSave = (e) => {
    e.preventDefault()
    fetch('https://my-json-server.typicode.com/bastidiaaz/frontend-test-json-api/events', {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(content => {
        setEvents(prevState => {
          return [...prevState, { ...content, start: content.inicio, end: content.fin, idClient: prevState.length + 1, id: prevState.length + 1}]
        })
      })
    setData({})
    setModal(false)
  }

  return (
    <form className="form" method="POST">
        <div className="time">
          <img src={clock_icon} alt="clock icon" />
        <p>{`${useGetDate(start)} - ${useGetDate(end)}`}</p>
        </div>
        <div className="charger">
          <img src={charger_icon} alt="charger icon" />
          <p>{charger[0].nombre}</p>
        </div>
        <section className="responsable">
          <div className="title-container">
            <img src={person_icon} alt="person icon" />
            <h5 className="sub-title">¿Quién agenda la carga?</h5>
          </div>
          <input type="text" placeholder="Nombre" name="nombre" id="nombre" onChange={handleChange}/>
          <input type="text" placeholder="Apellido" name="apellido" id="apellido" onChange={handleChange}/>
          <input type="email" placeholder="Email" name="email" id="email" onChange={handleChange}/>
        </section>
        <section className="data-car">
          <div className="title-container">
            <img src={car_icon} alt="car icon" />
            <h5 className="sub-title">Datos del vehículo</h5>
          </div>
          <input type="text" placeholder="Patente" name="patente" onChange={handleChange}/>
          <input type="text" placeholder="Marca" name="marca" onChange={handleChange}/>
          <input type="text" placeholder="Modelo" name="modelo" onChange={handleChange}/>
        </section>
        <div className="button-container">
          <button type="submit" className="save-button" onClick={handleSave}>Guardar</button>
        </div>
    </form>
  )
}

export default Form