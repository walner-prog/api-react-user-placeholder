// src/components/FilterModal.tsx
import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  applyFilter: (filters: { country?: string; email?: string; name?: string }) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ open, onClose, applyFilter }) => {
  const [country, setCountry] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');

  const handleApplyFilter = () => {
    applyFilter({ country, email, name });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>Filtrar Usuarios</h2>
        <TextField
          label="País"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleApplyFilter} sx={{ mt: 2 }}>
          Aplicar Filtro
        </Button>
      </Box>
    </Modal>
  );
};

export default FilterModal;
