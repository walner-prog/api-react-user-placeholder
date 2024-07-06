import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { User } from '../types';

interface UserDetailsModalProps {
  user: User | null;
  onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <Modal show={!!user} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Nombre:</strong> {user.name.first} {user.name.last}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>País:</strong> {user.location.country}</p>
        <p><strong>Teléfono:</strong> {user.phone}</p>
        <p><strong>Fecha de Nacimiento:</strong> {new Date(user.dob.date).toLocaleDateString()}</p>
        <p><strong>Género:</strong> {user.gender}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailsModal;
