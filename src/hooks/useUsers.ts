import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '../types';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=20');
      setUsers(response.data.results);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = (index: number) => {
    setUsers((prevUsers) => prevUsers.filter((_, i) => i !== index));
  };

  const updateUser = (index: number, updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user, i) => (i === index ? updatedUser : user))
    );
  };

  return { users, loading, deleteUser, updateUser };
};
