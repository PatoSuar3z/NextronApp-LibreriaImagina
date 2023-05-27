import { useEffect, useState } from 'react';
import { Card, CardBody, Typography, Button, Input } from '@material-tailwind/react';
import { PencilIcon, TruckIcon, SearchIcon } from '@heroicons/react/outline';
import axios from 'axios';

export default function DeliveryTable() {
  const [shipping, setShipping] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState('');
  const [idToUpdate, setIdToUpdate] = useState('');
  const [completedShipments, setCompletedShipments] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredShipments, setFilteredShipments] = useState([]);

  const handleUpdate = () => {
    console.log(idToUpdate);
    const updatedData = {
      estado: selectedEstado
    };

    axios.put(`http://localhost:9001/envios/${idToUpdate}`, updatedData)
      .then(response => {
        console.log('Cambio de estado guardado exitosamente');
      })
      .catch(error => {
        console.error('Error en la solicitud PUT:', error);
        console.log(updatedData);
        console.log(idToUpdate);
      });
  };

  useEffect(() => {
    const fetchShippingData = () => {
      fetch('http://localhost:9001/envios')
        .then(res => res.json())
        .then(res => setShipping(res))
        .catch(error => {
          console.error('Error al obtener los datos de envío:', error);
        });
    };

    // Fetch shipping data initially
    fetchShippingData();

    // Fetch shipping data every 10 seconds (adjust the interval as needed)
    const interval = setInterval(fetchShippingData, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const completedShipments = shipping.filter(shipment => shipment.estado === 'Entregado');
    setCompletedShipments(completedShipments);
  }, [shipping]);

  useEffect(() => {
    const filteredShipments = completedShipments.filter(shipment =>
      shipment.id_envio.includes(searchText) || shipment.id_usuario.includes(searchText)
    );
    setFilteredShipments(filteredShipments);
  }, [completedShipments, searchText]);

  const TABLE_HEAD = [
    'Codigo Rastreo',
    'Fecha',
    'Estado',
    'Destino',
    'Valor',
    'ID Cliente',
    'Editar Estado'
  ];

    return (
        <div className="grid grid-cols-2 gap-4">
            <Card>
                <CardBody>
                    <h2 className="text-lg font-bold mb-4">
                        Envíos Pendientes
                    </h2>
                    {shipping.map((shipment) =>
                        shipment.estado === 'En Bodega' ? (
                            <div
                                key={shipment.id_envio}
                                className="p-4 mb-4 rounded-lg"
                            >
                                <Typography
                                    variant="medium"
                                    color="blue-gray"
                                    className="font-semibold"
                                >
                                    {shipment.destino}
                                </Typography>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mt-1"
                                >
                                    Estado: {shipment.estado}
                                </Typography>
                                <Button
                                    color="blue"
                                    size="regular"
                                    onClick={() => {
                                        setIdToUpdate(shipment.id_envio)
                                        setSelectedEstado('En Despacho')
                                        handleUpdate()
                                    }}
                                    className="mt-2"
                                >
                                    Pasar a En Despacho
                                </Button>
                            </div>
                        ) : null
                    )}
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <h2 className="text-lg font-bold mb-4">
                        Envíos en Progreso
                    </h2>
                    {shipping.map((shipment) =>
                        shipment.estado === 'En Despacho' ? (
                            <div
                                key={shipment.id_envio}
                                className="p-4 mb-4 rounded-lg"
                            >
                                <Typography
                                    variant="medium"
                                    color="blue-gray"
                                    className="font-semibold"
                                >
                                    {shipment.destino}
                                </Typography>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mt-1"
                                >
                                    Estado: {shipment.estado}
                                </Typography>
                                <Button
                                    color="blue"
                                    size="regular"
                                    onClick={() => {
                                        setIdToUpdate(shipment.id_envio)
                                        setSelectedEstado('Entregado')
                                        handleUpdate()
                                    }}
                                    className="mt-2"
                                >
                                    Marcar como Entregado
                                </Button>
                            </div>
                        ) : null
                    )}
                </CardBody>
            </Card>

            <Card>
        <CardBody>
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-bold mr-4">Envíos Finalizados</h2>
            <div className="flex items-center">
              
              <Input
                type="text"
                placeholder="Buscar por ID de Envío o ID de Usuario"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2">ID Envío</th>
                  <th className="px-4 py-2">Destino</th>
                  <th className="px-4 py-2">Valor</th>
                  <th className="px-4 py-2">ID Usuario</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.map(shipment => (
                  <tr key={shipment.id_envio}>
                    <td className="border px-4 py-2">{shipment.id_envio}</td>
                    <td className="border px-4 py-2">{shipment.destino}</td>
                    <td className="border px-4 py-2">{shipment.valor}</td>
                    <td className="border px-4 py-2">{shipment.id_usuario}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
        </div>
    )
}
