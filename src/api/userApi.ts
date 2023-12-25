export const fetchUser = async (userId: string): Promise<any> => {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    const data = await response.json();
    return data;
  };
  