// src/components/ColumnSelectorModal.tsx
import React from 'react';
import { Modal, Box, FormControlLabel, Checkbox, Button } from '@mui/material';

interface ColumnSelectorModalProps {
  open: boolean;
  onClose: () => void;
  columns: string[];
  selectedColumns: string[];
  toggleColumn: (column: string) => void;
}

const ColumnSelectorModal: React.FC<ColumnSelectorModalProps> = ({
  open,
  onClose,
  columns,
  selectedColumns,
  toggleColumn,
}) => {
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
        <h2>Seleccionar Columnas</h2>
        {columns.map((column) => (
          <FormControlLabel
            key={column}
            control={
              <Checkbox
                checked={selectedColumns.includes(column)}
                onChange={() => toggleColumn(column)}
              />
            }
            label={column}
          />
        ))}
        <Button variant="contained" onClick={onClose} sx={{ mt: 2 }}>
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default ColumnSelectorModal;
