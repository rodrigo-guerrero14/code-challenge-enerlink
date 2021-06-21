import React from 'react'
import '../../styles/hourTaken.css'

import carIcon from '../../img/car-icon-white.png'
import personIcon from '../../img/icon-person-white.png'
import chargerIcon from '../../img/charger-icon-white.png'
import clockIcon from '../../img/clock-icon-white.png'

import useGetDate from '../../Hooks/useGetDate'

const HourTaken = (info) =>{
  const { apellido, nombre, chargerId, patente, marca, modelo, inicio, fin } = info.event._def.extendedProps

  return(
    <section className="event">
      <div className="event-info">
        <img src={carIcon} alt="Car icon" />
        <p><span>{`${patente} - ${marca} ${modelo}`}</span></p>
      </div>

      <div className="event-info">
        <img src={personIcon} alt="Person icon" />
        <p>{`${nombre} ${apellido}`}</p>
      </div>

      <div className="event-info">
        <img src={chargerIcon} alt="Charger icon" />
        <p>{`Cargador ${chargerId}`}</p>
      </div>

      <div className="event-info">
        <img src={clockIcon} alt="Clock icon" />
        <p>{`${useGetDate(inicio)} - ${useGetDate(fin)}`}</p>
      </div>
    </section>
  )
}

export default HourTaken