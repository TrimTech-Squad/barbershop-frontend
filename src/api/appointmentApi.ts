export const fetchAppointments = async (userId: string): Promise<any[]> => {
    const response = await fetch(`https://api.example.com/users/${userId}/appointments`);
    const data = await response.json();
    return data;
  };
  