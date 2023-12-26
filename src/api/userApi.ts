export const fetchUser = async (userId: string): Promise<unknown> => {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    const data = await response.json();
    return data;
  };
  