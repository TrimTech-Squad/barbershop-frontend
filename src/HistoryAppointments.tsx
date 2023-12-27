import React from 'react';

interface Appointment {
  id: string;
  date: string;
  title: string;
}

interface Props {
  historyAppointments: Appointment[];
}

const HistoryAppointments: React.FC<Props> = ({ historyAppointments }) => {
  return (
    <div>
      <h2>History Appointments</h2>
      <ul>
        {historyAppointments.map(appointment => (
          <li key={appointment.id}>
            {appointment.date} - {appointment.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoryAppointments;
