import React, { useState, useEffect } from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
} from '@material-tailwind/react'
import axios from 'axios'
import { Toaster, toast } from 'sonner'

export default function MaintenanceCard() {
    const [maintenanceRequests, setMaintenanceRequests] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const day = String(currentDate.getDate()).padStart(2, '0')

    const formattedDate = `${day}/${month}/${year}`

    const [mantencion, setMantencion] = useState({
        id_tecnico: null ,
        fecha_solicitud: formattedDate,
        comentarios: '',
        estado: 'Pendiente',
        correo: '',
        user_id: null,
    })

    const fetchRequests = async () => {
        try {
            const response = await axios.get(
                'http://localhost:5000/api/requests'
            )
            if (Array.isArray(response.data.data)) {
                setMaintenanceRequests(response.data.data)
                console.log(response.data)
            } else {
                console.log(
                    'La respuesta de la API no es un array válido:',
                    response.data
                )
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchRequests()
        const intervalId = setInterval(fetchRequests, 5000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    const changeStatus = async (id, status) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/requests/${id}`,
                {
                    estado: status,
                }
            )
            if (response.data.data) {
                toast.success('Estado actualizado correctamente')
                fetchRequests()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const registrarMantencion = async () => {
        try {
            console.log(mantencion)
            const response = await axios.post(
                `http://localhost:5000/api/requests`,
                mantencion
            )
            if (response.data.data) {
                toast.success('Mantencion registrada correctamente')
                fetchRequests()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const pendingRequests = maintenanceRequests.filter(
        (request) => request.estado === 'Pendiente'
    )

    const inProgressRequests = maintenanceRequests.filter(
        (request) => request.estado === 'En Curso'
    )

    const completedRequests = maintenanceRequests.filter(
        (request) => request.estado === 'Finalizada'
    )

    const filteredRequests = completedRequests.filter((request) =>
        request.id.toString().includes(searchTerm)
    )
    return (
        <>
            <Card className="mb-5">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none"
                >
                    <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Registrar Nueva Matencion
                            </Typography>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <div className="flex flex-col w-1/2 mr-2">
                                <Typography variant="h6">ID Tecnico</Typography>
                                <input
                                    type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    onChange={(e) =>
                                        setMantencion({
                                            ...mantencion,
                                            id_tecnico: e.target.value,
                                        })
                                    }
                                ></input>
                            </div>
                            <div className="flex flex-col w-1/2 ml-2">
                                <Typography variant="h6">
                                    Fecha Solicitud
                                </Typography>

                                <input
                                    type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    value={formattedDate}
                                    disabled
                                ></input>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-col w-1/2 mr-2">
                                <Typography variant="h6">
                                    Comentarios
                                </Typography>
                                <input
                                    type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    onChange={(e) =>
                                        setMantencion({
                                            ...mantencion,
                                            comentarios: e.target.value,
                                        })
                                    }
                                ></input>
                            </div>
                            <div className="flex flex-col w-1/2 ml-2">
                                <Typography
                                    variant="h6"
                                    className="text-gray-950"
                                >
                                    Estado
                                </Typography>
                                <input
                                    type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    value="Pendiente"
                                    disabled
                                ></input>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-col w-1/2 mr-2">
                                <Typography variant="h6">Correo</Typography>
                                <input
                                    type="email"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    onChange={(e) =>
                                        setMantencion({
                                            ...mantencion,
                                            correo: e.target.value,
                                        })
                                    }
                                ></input>
                            </div>
                            <div className="flex flex-col w-1/2 ml-2">
                                <Typography variant="h6">ID Usuario</Typography>
                                <input
                                    type="email"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    onChange={(e) =>
                                        setMantencion({
                                            ...mantencion,
                                            user_id: e.target.value,
                                        })
                                    } 
                                ></input>
                            </div>
                        </div>
                        <Button
                            onClick={(e) => registrarMantencion()}
                            color="blue"
                            className="mt-4"
                        >
                            Registrar Mantencion
                        </Button>
                    </div>
                </CardBody>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardBody>
                        <h2 className="text-lg font-bold mb-4">Pendientes</h2>
                        {pendingRequests.map((request) => (
                            <div
                                key={request.id}
                                className="p-4 mb-4 rounded-lg"
                            >
                                <h3 className="font-semibold">
                                    ID Solicitud: {request.id}
                                </h3>
                                <p className="text-sm">
                                    Comentario : {request.comentarios}
                                </p>
                                <p className="text-sm">
                                    Usuario : {request.correo}
                                </p>
                                <p className="text-sm">
                                    Fecha Solicitud: {request.fecha_solicitud}
                                </p>
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 mt-2 rounded"
                                    onClick={() =>
                                        changeStatus(request.id, 'En Curso')
                                    }
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
                        {inProgressRequests.map((request) => (
                            <div
                                key={request.id}
                                className="p-4 mb-4 rounded-lg"
                            >
                                <h3 className="font-semibold">
                                    ID Solicitud: {request.id}
                                </h3>
                                <p className="text-sm">
                                    Comentario : {request.comentarios}
                                </p>
                                <p className="text-sm">
                                    Usuario : {request.correo}
                                </p>
                                <p className="text-sm">
                                    Fecha Solicitud: {request.fecha_solicitud}
                                </p>
                                <button
                                    className="bg-blue-500  text-white px-2 py-1 mt-2 rounded"
                                    onClick={() =>
                                        changeStatus(request.id, 'Finalizada')
                                    }
                                >
                                    Marcar como finalizada
                                </button>
                            </div>
                        ))}
                    </CardBody>
                </Card>

                <div className="col-span-2">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-bold mb-4 text-gray-950">
                            Finalizadas
                        </h2>
                        <div className="flex items-center mb-4">
                            <label
                                htmlFor="search"
                                className="mr-2 text-gray-950"
                            >
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
                                            ID Solicitud
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Usuario
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Descripción
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Solicitud
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredRequests.map((request) => (
                                        <tr key={request.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {request.id}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {request.correo}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {request.comentarios}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {request.estado}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Toaster position="bottom-right" richColors />
            </div>
        </>
    )
}
