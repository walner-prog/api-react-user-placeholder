import React, { useState } from 'react';
import EditUserModal from './EditUserModal';
import { User } from '../types';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface UserRowProps {
  user: User; // Asegúrate de que `user` sea del tipo correcto
  index: number;
  deleteUser: (index: number) => void;
  updateUser: (index: number, updatedUser: User) => void;
  compactView: boolean;
  selectedColumns: string[];
  onClick: () => void;
}

const UserRow: React.FC<UserRowProps> = ({
  user,
  index,
  deleteUser,
  updateUser,
  compactView,
  selectedColumns,
  onClick,
}) => {
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleDelete = () => {
    if (window.confirm('¿Está seguro de que desea eliminar este usuario?')) {
      deleteUser(index);
    }
  };

  return (
    <tr>
      {user ? (
        <>
          <td onClick={onClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
            {user.name.first} {user.name.last}
          </td>
          <td>{user.email}</td>
          <td>
            <img src={user.picture.thumbnail} alt="User thumbnail" style={{ borderRadius: '50%' }} />
          </td>
          {!compactView && selectedColumns.includes('country') && <td>{user.location.country}</td>}
          {!compactView && selectedColumns.includes('phone') && <td>{user.phone}</td>}
          {!compactView && selectedColumns.includes('dob') && <td>{new Date(user.dob.date).toLocaleDateString()}</td>}
          {!compactView && selectedColumns.includes('gender') && <td>{user.gender}</td>}
          <td>
            <Button variant="warning" className="mb-2 me-2" onClick={(e) => { e.stopPropagation(); setEditModalOpen(true); }}>Editar</Button>
            <Button variant="danger" className="mb-2" onClick={(e) => { e.stopPropagation(); handleDelete(); }}>Eliminar</Button>
            {editModalOpen && (
              <EditUserModal
                user={user}
                index={index}
                updateUser={updateUser}
                onClose={() => setEditModalOpen(false)}
              />
            )}
          </td>
        </>
      ) : (
        <td colSpan={6}>Usuario no válido</td>
      )}
    </tr>
  );
};

export default UserRow;
