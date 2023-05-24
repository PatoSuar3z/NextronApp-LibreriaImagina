import React, { useState } from 'react';
import { Card, CardBody } from '@material-tailwind/react';

const MaintenanceCard = () => {
  // Información de las solicitudes de mantenimiento
  const [maintenanceRequests, setMaintenanceRequests] = useState([
    {
      id: 1,
      title: 'Solicitud 1',
      status: 'Pendiente',
      description: 'Descripción de la solicitud 1',
    },
    {
      id: 2,
      title: 'Solicitud 2',
      status: 'En curso',
      description: 'Descripción de la solicitud 2',
    },
    {
      id: 3,
      title: 'Solicitud 3',
      status: 'Finalizada',
      description: 'Descripción de la solicitud 3',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Función para cambiar el estado de una solicitud
  const changeStatus = (requestId, newStatus) => {
    const updatedRequests = maintenanceRequests.map((request) => {
      if (request.id === requestId) {
        return { ...request, status: newStatus };
      }
      return request;
    });
    setMaintenanceRequests(updatedRequests);
  };

  // Filtrar las solicitudes de mantenimiento por estado
  const pendingRequests = maintenanceRequests.filter(
    (request) => request.status === 'Pendiente'
  );
  const ongoingRequests = maintenanceRequests.filter(
    (request) => request.status === 'En curso'
  );
  const completedRequests = maintenanceRequests.filter(
    (request) => request.status === 'Finalizada'
  );

  // Filtrar las solicitudes finalizadas por ID
  const filteredCompletedRequests = completedRequests.filter((request) =>
    request.id.toString().includes(searchTerm)
  );

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardBody>
          <h2 className="text-lg font-bold mb-4">Pendientes</h2>
          {pendingRequests.map((request) => (
            <div key={request.id} className="p-4 mb-4 rounded-lg">
              <h3 className="font-semibold">{request.title}</h3>
              <p className="text-sm">{request.description}</p>
              <button
                className="bg-blue-500 text-white px-2 py-1 mt-2 rounded"
                onClick={() => changeStatus(request.id, 'En curso')}
              >
                Marcar como en curso
              </button>
            </div>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h2 className="text-lg font-bold mb-4">En curso</h2>
          {ongoingRequests.map((request) => (
            <div key={request.id} className="p-4 mb-4 rounded-lg">
              <h3 className="font-semibold">{request.title}</h3>
              <p className="text-sm">{request.description}</p>
              <button
                className="bg-green-500 text-white px-2 py-1 mt-2 rounded"
                onClick={() => changeStatus(request.id, 'Finalizada')}
              >
                Marcar como finalizada
              </button>
            </div>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h2 className="text-lg font-bold mb-4">Finalizadas</h2>
          <div className="flex items-center mb-4">
            <label htmlFor="search" className="mr-2">
              Buscar por ID:
            </label>
            <input
              type="text"
              id="search"
              className="border border-gray-300 rounded px-2 py-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Solicitud</th>
                <th className="px-4 py-2">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompletedRequests.map((request) => (
                <tr key={request.id}>
                  <td className="border px-4 py-2">{request.id}</td>
                  <td className="border px-4 py-2">{request.title}</td>
                  <td className="border px-4 py-2">{request.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default MaintenanceCard;