import clock_icon from '../../img/clock-icon.png'
import charger_icon from '../../img/charger-icon.png'
import person_icon from '../../img/person-icon.png'
import car_icon from '../../img/car-icon.png'

import { useState } from 'react'
import useGetDate from '../../Hooks/useGetDate'

const FormUpdate = ({setModal, charger, data, setEvents}) => {
  const [dataUpdated, setDataUpdated] = useState(data)

  const handleChange = (e) => {
    setDataUpdated((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    fetch(`https://my-json-server.typicode.com/bastidiaaz/frontend-test-json-api/events/${dataUpdated.idClient}`, {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify(dataUpdated),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(content => {
        setEvents(prevState => {
          const newState = prevState.map(event => {
            return event.id === dataUpdated.idClient
            ? { ...dataUpdated, start: dataUpdated.inicio, end: dataUpdated.fin, id: dataUpdated.idClient }
            : { ...event, start: event.inicio, end: event.fin }
          })
          return newState
        })
        setDataUpdated({})
        setModal(false)
      })
      .catch(err => console.log(err))
  }

  const handleDelete = (e) => {
    e.preventDefault()
    fetch(`https://my-json-server.typicode.com/bastidiaaz/frontend-test-json-api/events/${dataUpdated.idClient}`, {
      method: "DELETE",
      mode: "cors",
      body: JSON.stringify(dataUpdated),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(content => {
        console.log(content)
        setEvents(prevState => {
          const newState = prevState.map(event => {
            if(event.id !== dataUpdated.idClient){
              return event
            }else{
              return {}
            }
          })
          return newState
        })
        setDataUpdated({})
        setModal(false)
      })
      .catch(err => console.log(err))

  }

  return(
    <form className="form" method="PATCH">
      <button type="submit" onClick={handleDelete} className="delete-button">Eliminar</button>
      <div className="time">
        <img src={clock_icon} alt="clock icon" />
        <p>{`${useGetDate(dataUpdated.inicio)} - ${useGetDate(dataUpdated.fin)}`}</p>
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
        <input type="text" placeholder="Nombre" name="nombre" id="nombre" onChange={handleChange} value={dataUpdated.nombre || ''}/>
        <input type="text" placeholder="Apellido" name="apellido" id="apellido" onChange={handleChange} value={dataUpdated.apellido || ''}/>
        <input type="email" placeholder="Email" name="email" id="email" onChange={handleChange} value={dataUpdated.email || ''}/>
      </section>
      <section className="data-car">
        <div className="title-container">
          <img src={car_icon} alt="car icon" />
          <h5 className="sub-title">Datos del vehículo</h5>
        </div>
        <input type="text" placeholder="Patente" name="patente" onChange={handleChange} value={dataUpdated.patente || ''}/>
        <input type="text" placeholder="Marca" name="marca" onChange={handleChange} value={dataUpdated.marca || ''}/>
        <input type="text" placeholder="Modelo" name="modelo" onChange={handleChange} value={dataUpdated.modelo || ''}/>
      </section>
      <div className="button-container">
        <button type="submit" className="save-button" onClick={handleUpdate}>Actualizar</button>
      </div>
    </form>
  )
}

export default FormUpdate