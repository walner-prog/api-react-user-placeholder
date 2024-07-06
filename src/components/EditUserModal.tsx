// src/components/EditUserModal.tsx
import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { User } from '../types';

interface EditUserModalProps {
  user: User;
  index: number;
  updateUser: (index: number, updatedUser: User) => void;
  onClose: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, index, updateUser, onClose }) => {
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Editar Usuario</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            firstName: user.name.first,
            lastName: user.name.last,
            email: user.email,
            country: user.location.country,
            phone: user.phone,
            dob: user.dob.date,
            gender: user.gender,
          }}
          onSubmit={(values) => {
            const updatedUser: User = {
              ...user,
              name: {
                first: values.firstName,
                last: values.lastName,
              },
              email: values.email,
              location: {
                ...user.location,
                country: values.country,
              },
              phone: values.phone,
              dob: {
                date: values.dob,
                age: user.dob.age, // age is kept unchanged
              },
              gender: values.gender,
              picture: user.picture,
            };
            updateUser(index, updatedUser);
            onClose();
          }}
        >
          {({ handleChange, values }) => (
            <Form>
              <TextField
                label="Nombre"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Apellido"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="País"
                name="country"
                value={values.country}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Teléfono"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Fecha de Nacimiento"
                name="dob"
                type="date"
                value={values.dob}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Género"
                name="gender"
                value={values.gender}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary">
                Guardar
              </Button>
              <Button onClick={onClose} variant="contained" style={{ marginLeft: '8px' }}>
                Cerrar
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
