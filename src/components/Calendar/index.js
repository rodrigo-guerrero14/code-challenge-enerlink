import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interacctionPlugin from '@fullcalendar/interaction'

import '../../styles/calendar.css'
import '@fullcalendar/core/main'

import Modal from '../Modal'
import Form from '../Form'
import HourTaken from '../HourTaken'

const Calendar = () => {

  const [modalIsOpen, setModal] = useState(false)
  const [dates, setDates] = useState({})
  const [events, setEvents] = useState([])
  const [chargers, setChargers] = useState({})

  const handleSelected = (info) => {
    const {startStr, endStr} = info
    setDates({ start: startStr, end: endStr})
    setModal(true)
  }

  const handleClick = (info) => {

    console.log('click on event')
    console.log(info.event._context)

  }

  const headerSettings = {
    left: 'title',
    right: 'prev,next'
  }

  useEffect(()=> {
    fetch('https://my-json-server.typicode.com/bastidiaaz/frontend-test-json-api/db')
      .then(res => res.json())
      .then(data => {
        const {events} = data
        setEvents((prevState) => {
          const newEvents = events.map(event => {
            return {
              ...event,
              start: setFirstDate(event.inicio),
              end: setFirstDate(event.fin),
              inicio: setFirstDate(event.inicio),
              fin:setFirstDate(event.fin)
            }
          })
          return newEvents
        })
        setChargers(data.chargers)
      })
  }, [])

  const setFirstDate = (oldDate) => {
    /*
      Los datos recolectados de la Base de datos no tienen una fecha del dia (solo una hora en especifico),
      por lo que para generar el evento se asume que será el dia de hoy, la función devuelve la fecha al día
      que se ejecuta concatenado con la hora capturada en la BD
    */
    const today = new Date()
    const newDate = `${today.toLocaleDateString('en-CA')}T${oldDate}`
    return newDate
  }

  return (
    <>
      <section className="calendar-container">
        <FullCalendar
          plugins={[timeGridPlugin, interacctionPlugin]}
          headerToolbar={headerSettings}
          initialView="timeGridDay"
          slotLabelInterval={{ hours: 1 }}
          selectable={true}
          select={handleSelected}
          eventClick={handleClick}
          slotDuration={'00:15:00'}
          slotMinTime={'06:00'}
          slotMaxTime={'22:00'}
          events={events}
          eventContent={HourTaken}
          eventBackgroundColor={'#403D5D'}
          eventClassNames={'event-content'}
        />

      </section>
      <Modal modalActive={modalIsOpen} setModal={setModal}>
        <Form dates={dates} setEvents={setEvents} charger={chargers} setModal={setModal}/>
      </Modal>
    </>
  )
}

export default Calendar