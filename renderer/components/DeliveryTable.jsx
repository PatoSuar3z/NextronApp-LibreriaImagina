import { useEffect, useState } from 'react'
import {
    Card,
    CardBody,
    Typography,
    Button,
    Input,
} from '@material-tailwind/react'
import { PencilIcon, TruckIcon, SearchIcon } from '@heroicons/react/outline'
import axios from 'axios'

export default function DeliveryTable() {
    const [shipping, setShipping] = useState([])
    const [selectedEstado, setSelectedEstado] = useState('')
    const [idToUpdate, setIdToUpdate] = useState('')
    const [completedShipments, setCompletedShipments] = useState([])
    const [searchText, setSearchText] = useState('')
    const [filteredShipments, setFilteredShipments] = useState([])

    const handleUpdate = () => {
        console.log(idToUpdate)
        const updatedData = {
            estado: selectedEstado,
        }

        axios
            .put(`http://localhost:9001/envios/${idToUpdate}`, updatedData)
            .then((response) => {
                console.log('Cambio de estado guardado exitosamente')
            })
            .catch((error) => {
                console.error('Error en la solicitud PUT:', error)
                console.log(updatedData)
                console.log(idToUpdate)
            })
    }

    useEffect(() => {
        const fetchShippingData = () => {
            fetch('http://localhost:9001/envios')
                .then((res) => res.json())
                .then((res) => setShipping(res))
                .catch((error) => {
                    console.error('Error al obtener los datos de envío:', error)
                })
        }

        // Fetch shipping data initially
        fetchShippingData()

        // Fetch shipping data every 10 seconds (adjust the interval as needed)
        const interval = setInterval(fetchShippingData, 5000)

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const completedShipments = shipping.filter(
            (shipment) => shipment.estado === 'Entregado'
        )
        setCompletedShipments(completedShipments)
    }, [shipping])

    useEffect(() => {
        const filteredShipments = completedShipments.filter(
            (shipment) =>
                shipment.id_envio.includes(searchText) ||
                shipment.id_usuario.includes(searchText)
        )
        setFilteredShipments(filteredShipments)
    }, [completedShipments, searchText])

    const TABLE_HEAD = [
        'Codigo Rastreo',
        'Fecha',
        'Estado',
        'Destino',
        'Valor',
        'ID Cliente',
        'Editar Estado',
    ]

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
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mt-1"
                                >
                                    ID: {shipment.id_envio}
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

            <div className="col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-bold mb-4 text-gray-950">
                        Finalizadas
                    </h2>
                    <div className="flex items-center mb-4">
                        <label htmlFor="search" className="mr-2 text-gray-950">
                            Buscar por ID:
                        </label>
                        <input
                            type="text"
                            id="search"
                            className="border border-gray-300 rounded px-2 py-1"
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID Envio
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Destino
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Valor
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID Usuario
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredShipments.map((shipment) => (
                                    <tr key={shipment.id_envio}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {shipment.id_envio}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {shipment.destino}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {shipment.valor}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {shipment.id_usuario}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
