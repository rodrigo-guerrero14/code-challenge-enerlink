import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interacctionPlugin from '@fullcalendar/interaction'
import '../../styles/calendar.css'

const Calendar = () => {

  const handleSelected = (info) => {
    const {startStr, endStr} = info
    console.log(startStr)
    console.log(endStr)
  }

  const headerSettings = {
    left: 'prev,next today',
    center: 'title',
    right: 'timeGridWeek,timeGridDay'
  }

  return (
    <section className="calendar-container">
      <FullCalendar
        plugins={[timeGridPlugin, interacctionPlugin]}
        headerToolbar={headerSettings}
        initialView="timeGridDay"
        slotLabelInterval={{ hours: 1 }}
        selectable={true}
        select={handleSelected}
      />
    </section>
  )
}

export default Calendar