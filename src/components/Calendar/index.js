import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interacctionPlugin from '@fullcalendar/interaction'
import '../../styles/calendar.css'

import Modal from '../Modal'
import Form from '../Form'

const Calendar = () => {

  const [modalIsOpen, setModal] = useState(false)
  const [dates, setDates] = useState({})
  const [dataBase, setDataBase] = useState({})

  const handleSelected = (info) => {
    const {start, end} = info
    setDates({start,end})
    setModal(true)
  }

  const handleClick = () => {

  }

  const headerSettings = {
    left: 'prev,next',
    center: 'title',
    right: 'timeGridWeek,timeGridDay'
  }

  useEffect(()=> {
    fetch('https://my-json-server.typicode.com/bastidiaaz/frontend-test-json-api/db')
      .then(res => res.json())
      .then(data => setDataBase(data))
  }, [])

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
          events={dataBase.events}
          eventClick={handleClick}
        />

      </section>
      <Modal modalActive={modalIsOpen} setModal={setModal}>
        <Form dates={dates} setDataBase={setDataBase} charger={dataBase.chargers} setModal={setModal}/>
      </Modal>
    </>
  )
}

export default Calendar