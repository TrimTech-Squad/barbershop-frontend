import React, { useState, useEffect } from 'react';
import { fetchUser } from '../src/api/userApi';
import { fetchAppointments } from '../src/api/appointmentApi';
import HistoryAppointments from './HistoryAppointments';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Appointment {
  id: string;
  date: string;
  title: string;
}

interface Props {
  userId: string;
}

const UserProfile: React.FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const getUserData = async () => {
      const userData = await fetchUser(userId);
      setUser(userData);
    };

    const getAppointmentsData = async () => {
      const appointmentsData = await fetchAppointments(userId);
      setAppointments(appointmentsData);
    };

    getUserData();
    getAppointmentsData();
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  // Filter appointments for history (past appointments)
  const historyAppointments = appointments.filter(
    appointment => new Date(appointment.date) < new Date()
  );

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>

      <h2>Appointments</h2>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id}>
            {appointment.date} - {appointment.title}
          </li>
        ))}
      </ul>

      <HistoryAppointments historyAppointments={historyAppointments} />
    </div>
  );
}

export default UserProfile;
