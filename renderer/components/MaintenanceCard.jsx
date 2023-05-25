import React, { useState } from 'react';
import { Card, CardBody, Typography } from '@material-tailwind/react';


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
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardBody>
          <h2 className="text-lg font-bold mb-4">Pendientes</h2>
          <Card>
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
          </Card>.
        </CardBody>
      </Card>

      <Card>
        <CardBody>
        <h2 className="text-lg font-bold mb-4">En curso</h2>
        <Card>
          {ongoingRequests.map((request) => (
            <div key={request.id} className="p-4 mb-4 rounded-lg">
              <h3 className="font-semibold">{request.title}</h3>
              <p className="text-sm">{request.description}</p>
              <button
                className="bg-blue-500  text-white px-2 py-1 mt-2 rounded"
                onClick={() => changeStatus(request.id, 'Finalizada')}
              >
                Marcar como finalizada
              </button>
            </div>
          ))}
          </Card>
        </CardBody>
      </Card>

      <div className="col-span-2">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4 text-gray-950">Finalizadas</h2>
          <div className="flex items-center mb-4">
            <label htmlFor="search" className="mr-2 text-gray-950">
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
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Solicitud
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCompletedRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{request.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{request.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{request.description}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Utilizar esta Card */}


    </div>
  );
};

export default MaintenanceCard;
