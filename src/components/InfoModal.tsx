import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface InfoModalProps {
  show: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton className="bg-success">
        <Modal.Title>Información de la Página</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Esta página muestra una lista de usuarios obtenidos de un servicio externo.
          Los datos son consumidos utilizando una API REST y se muestran en una tabla
          con opciones de filtrado y selección de columnas.
        </p>
        <p>
          Fuente de datos: La información de usuarios proviene de una API pública que
          proporciona datos aleatorios de personas.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoModal;
