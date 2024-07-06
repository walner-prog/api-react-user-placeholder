import React, { useState, useEffect } from 'react';
import { useUsers } from '../hooks/useUsers';
import UserRow from './UserRow';
import ColumnSelectorModal from './ColumnSelectorModal';
import FilterModal from './FilterModal';
import InfoModal from './InfoModal';
import UserDetailsModal from './UserDetailsModal';
import { Button, Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { User } from '../types'; // Asegúrate de la ruta correcta según la ubicación real
//import { CSVLink } from 'react-csv'; // Importa CSVLink para exportación a CSV

const UserTable: React.FC = () => {
  const { users, loading, deleteUser, updateUser } = useUsers();
  const [compactView, setCompactView] = useState(true);
  const [columnSelectorOpen, setColumnSelectorOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>(['country', 'phone', 'dob', 'gender']);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const allColumns = ['country', 'phone', 'dob', 'gender'];

  useEffect(() => {
    setFilteredUsers(users.slice(0, usersPerPage)); // Inicialmente muestra los primeros usuarios según usersPerPage
  }, [users, usersPerPage]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    setFilteredUsers(users.slice(startIndex, endIndex)); // Actualiza los usuarios mostrados según la página actual
  }, [users, currentPage, usersPerPage]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users.slice(0, usersPerPage));
    } else {
      const filtered = users.filter(user =>
        `${user.name.first} ${user.name.last}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered.slice(0, usersPerPage));
    }
  }, [users, searchTerm, usersPerPage]);

  const toggleColumn = (column: string) => {
    setSelectedColumns(prev =>
      prev.includes(column) ? prev.filter(col => col !== column) : [...prev, column]
    );
  };

  const applyFilter = (filters: { country?: string; email?: string; name?: string }) => {
    let filtered = users;

    if (filters.country) {
      filtered = filtered.filter((user: User) =>
        user.location.country.toLowerCase().includes(filters.country!.toLowerCase())
      );
    }
    if (filters.email) {
      filtered = filtered.filter((user: User) =>
        user.email.toLowerCase().includes(filters.email!.toLowerCase())
      );
    }
    if (filters.name) {
      filtered = filtered.filter((user: User) =>
        `${user.name.first} ${user.name.last}`
          .toLowerCase()
          .includes(filters.name!.toLowerCase())
      );
    }

    setFilteredUsers(filtered.slice(0, usersPerPage));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber); // Maneja el cambio de página
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user); // Almacena el usuario seleccionado para mostrar los detalles
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className='container'>
      <h1 className='text-center mt-2'>Usuarios</h1>
      <div className="row mb-3">
        <div className="col-4">
          <Button variant="success" onClick={() => setCompactView(!compactView)} className="w-100">
            {compactView ? 'Expandir' : 'Compactar'}
          </Button>
        </div>
        <div className="col-4">
          <Button variant="warning" onClick={() => setColumnSelectorOpen(true)} className="w-100 ms-2">
            Seleccionar Columnas
          </Button>
        </div>
        <div className="col-4">
          <Button variant="info" onClick={() => setFilterModalOpen(true)} className="w-100 ms-2">
            Filtrar Usuarios
          </Button>
        </div>
      </div>
      <div className="mb-3 w-">
        <Form.Control
          type="text"
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="table-responsive">
        <Table striped bordered hover responsive>
          <thead className='sticky-top bg-info'>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Foto</th>
              {!compactView && selectedColumns.includes('country') && <th>País</th>}
              {!compactView && selectedColumns.includes('phone') && <th>Teléfono</th>}
              {!compactView && selectedColumns.includes('dob') && <th>Fecha de Nacimiento</th>}
              {!compactView && selectedColumns.includes('gender') && <th>Género</th>}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <UserRow
                key={index}
                user={user}
                index={index}
                deleteUser={deleteUser}
                updateUser={updateUser}
                compactView={compactView}
                selectedColumns={selectedColumns}
                onClick={() => handleUserClick(user)} // Maneja el clic en la fila del usuario
              />
            ))}
          </tbody>
        </Table>
      </div>
      <ColumnSelectorModal
        open={columnSelectorOpen}
        onClose={() => setColumnSelectorOpen(false)}
        columns={allColumns}
        selectedColumns={selectedColumns}
        toggleColumn={toggleColumn}
      />
      <FilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        applyFilter={applyFilter}
      />
      {/* Botón para abrir el modal de información */}
      <div className="text-center mt-3">
        <Button variant="primary" onClick={() => setShowInfoModal(true)}>
          Información de la Página
        </Button>
      </div>
      {/* Renderizar el modal de información */}
      <InfoModal
        show={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />
      {/* Modal para mostrar detalles del usuario */}
      <UserDetailsModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)} // Cierra el modal al hacer clic fuera
      />
      {/* Botón para exportar a CSV */}
  
      {/* Paginación */}
      <div className="d-flex justify-content-center mt-3">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default UserTable;
