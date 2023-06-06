import { useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Avatar,
    IconButton,
    Input,
} from '@material-tailwind/react'
import axios from 'axios'
import { Toaster, toast } from 'sonner'

export default function DeliveryTable() {
    const [shipping, setShipping] = useState([])
    const [selectedEstado, setSelectedEstado] = useState('')
    const [idToUpdate, setIdToUpdate] = useState('')
    const [completedShipments, setCompletedShipments] = useState([])
    const [searchText, setSearchText] = useState('')
    const [filteredShipments, setFilteredShipments] = useState([])

    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const day = String(currentDate.getDate()).padStart(2, '0')

    const formattedDate = `${year}-${month}-${day}`

    const [envio, setNewEnvio] = useState({
        id_envio: '',
        fecha: formattedDate,
        estado_envio: 'En preparación',
        valor: 3000,
        destino: '',
        ciudad: '',
        id_usuario: '',
    })

    ///OBTENER TODOS LOS ENVIOS
    useEffect(() => {
        const fetchShippingData = async () => {
            try {
                const response = await axios.get('http://localhost:9001/envios')
                {
                    setShipping(response.data)
                    console.log(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchShippingData()
        const intervalId = setInterval(fetchShippingData, 3000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    useEffect(() => {
        const completedShipments = shipping.filter(
            (shipment) => shipment.estado_envio === 'Entregado'
        )
        setCompletedShipments(completedShipments)
    }, [shipping])

    ///EDITAR ENVIO
    const handleUpdate = () => {
        console.log(idToUpdate)
        const updatedData = {
            estado_envio: selectedEstado,
        }

        axios
            .put(`http://localhost:9001/envios/${idToUpdate}`, updatedData)
            .then((response) => {
                console.log('Cambio de estado guardado exitosamente'),
                    toast.success('Cambio de estado guardado exitosamente')
                setIdToUpdate('')
            })
            .catch((error) => {
                console.error('Error en la solicitud PUT:', error)
                console.log(updatedData)
                console.log(idToUpdate)
            })
    }

    ///REGISTRAR NUEVO ENVIO
    const handleCreate = () => {
        axios
            .post('http://localhost:9001/envios', envio)
            .then((response) => {
                console.log('Envio creado exitosamente')
                toast.success('Envio creado exitosamente')
            })
            .catch((error) => {
                console.error('Error en la solicitud POST:', error)
                console.log(newShipment)
            })
    }

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
        'Ciudad',
        'Valor',
        'ID Cliente',
    ]

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
                                Registrar Nuevo Envio
                            </Typography>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <div className="flex flex-col w-1/2 mr-2">
                                <Typography variant="h6">ID envio</Typography>
                                <input
                                    type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    onChange={(e) =>
                                        setNewEnvio({
                                            ...envio,
                                            id_envio: e.target.value,
                                        })
                                    }
                                ></input>
                            </div>
                            <div className="flex flex-col w-1/2 ml-2">
                                <Typography variant="h6">
                                    Fecha Envio
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
                                    Estado Envio
                                </Typography>
                                <input
                                    type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    value="En Preparación"
                                    disabled
                                ></input>
                            </div>
                            <div className="flex flex-col w-1/2 ml-2">
                                <Typography
                                    variant="h6"
                                    className="text-gray-950"
                                >
                                    Valor
                                </Typography>
                                <input
                                    type="number"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    value="3000"
                                    disabled
                                ></input>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-col w-1/2 mr-2">
                                <Typography variant="h6">Destino</Typography>
                                <input
                                    type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    onChange={(e) =>
                                        setNewEnvio({
                                            ...envio,
                                            destino: e.target.value,
                                        })
                                    }
                                ></input>
                            </div>
                            <div className="flex flex-col w-1/2 ml-2">
                                <Typography variant="h6">Ciudad</Typography>
                                <select
                                    id="userType"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) =>
                                        setNewEnvio({
                                            ...envio,
                                            ciudad: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Seleccionar Ciudad</option>
                                    <option value="Santiago">Santiago</option>
                                    <option value="Concepcion">
                                        Concepcion
                                    </option>
                                    <option value="Valparaiso">
                                        Valparaiso
                                    </option>
                                    <option value="La Serena">La Serena</option>
                                    <option value="Antofagasta">
                                        Antofagasta
                                    </option>
                                    <option value="Temuco">Temuco</option>
                                    <option value="Iquique">Iquique</option>
                                    <option value="Rancagua">Rancagua</option>
                                    <option value="Talca">Talca</option>
                                    <option value="Arica">Arica</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-col w-1/2 mr-2">
                                <Typography variant="h6">ID Usuario</Typography>
                                <input
                                    type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    onChange={(e) =>
                                        setNewEnvio({
                                            ...envio,
                                            id_usuario: e.target.value,
                                        })
                                    }
                                ></input>
                            </div>
                            
                        </div>

                        <Button
                            onClick={(e) => handleCreate()}
                            color="blue"
                            className="mt-4"
                        >
                            Registrar Envio
                        </Button>
                    </div>
                </CardBody>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardBody>
                        <h2 className="text-lg font-bold mb-4">
                            Envíos en Preparación
                        </h2>
                        {shipping.map((shipment) =>
                            shipment.estado_envio === 'En preparación' ? (
                                <div
                                    key={shipment.id_envio}
                                    className="p-4 mb-4 rounded-lg"
                                >
                                    <Typography
                                        variant="medium"
                                        color="blue-gray"
                                        className="font-semibold"
                                    >
                                        Destino: {shipment.destino}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mt-1"
                                    >
                                        Estado Envio: {shipment.estado_envio}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mt-1"
                                    >
                                        Ciudad: {shipment.ciudad}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mt-1"
                                    >
                                        ID Envio: {shipment.id_envio}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mt-1"
                                    >
                                        ID Usuario: {shipment.id_envio}
                                    </Typography>
                                    <Button
                                        size="regular"
                                        onClick={() => {
                                            setIdToUpdate(shipment.id_envio)
                                            setSelectedEstado('En camino')
                                            handleUpdate()
                                        }}
                                        className="mt-2"
                                    >
                                        Pasar a Despacho
                                    </Button>
                                </div>
                            ) : null
                        )}
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <h2 className="text-lg font-bold mb-4">
                            Envíos en Camino
                        </h2>
                        {shipping.map((shipment) =>
                            shipment.estado_envio === 'En camino' ? (
                                <div
                                    key={shipment.id_envio}
                                    className="p-4 mb-4 rounded-lg"
                                >
                                    <Typography
                                        variant="medium"
                                        color="blue-gray"
                                        className="font-semibold"
                                    >
                                        Destino: {shipment.destino}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mt-1"
                                    >
                                        Estado Envio: {shipment.estado_envio}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mt-1"
                                    >
                                        Ciudad: {shipment.ciudad}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mt-1"
                                    >
                                        ID Envio: {shipment.id_envio}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mt-1"
                                    >
                                        ID Usuario: {shipment.id_envio}
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
                                            Ciudad
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Valor
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID Cliente
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Fecha Envio
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
                                                    {shipment.ciudad}
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
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {shipment.fecha}
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
