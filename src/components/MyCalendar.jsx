import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch the JSON file
    fetch('/schedules/availability.json')
        .then(response => response.json())
        .then(data => {
          // Convert the availability data into FullCalendar events
          const events = data.map(availability => {
            return {
              title: 'Available',
              daysOfWeek: availability.daysOfWeek,
              startTime: availability.startTime,
              endTime: availability.endTime,

            };
          });
          setEvents(events);
        });
  }, []);


  return (
      <div>
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
        />
      </div>
  );
};

export default MyCalendar;