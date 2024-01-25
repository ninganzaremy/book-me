import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import BookingForm from './BookingForm';
import Modal from './Modal';

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);

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

  const handleDateClick = (info) => {
    setSelectedTime(info.event.start);
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = (bookingDetails) => {
    console.log('Booking Details:', bookingDetails);
    // todo Here you can integrate email service, Zoom API,
    setBookingModalOpen(false);
  };

  return (
      <div>
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleDateClick}
        />
        <Modal isOpen={isBookingModalOpen}
               onClose={() => setBookingModalOpen(false)}>
          <BookingForm selectedTime={selectedTime}
                       onSubmit={handleBookingSubmit}/>
        </Modal>
      </div>
  );
};

export default MyCalendar;