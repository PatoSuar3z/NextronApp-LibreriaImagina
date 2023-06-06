import React, { useEffect, useRef, useState, Fragment } from 'react'
import { Line } from 'react-chartjs-2'
import {
    Card,
    CardBody,
    Typography,
    Input,
    Button,
    Table,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    CardHeader,
} from '@material-tailwind/react'
import { Chart, registerables } from 'chart.js'
import axios from 'axios'
import { Toaster, toast } from 'sonner'

Chart.register(...registerables)

const Sales = () => {
    const annualChartRef = useRef(null)
    const [newSaleAmount, setNewSaleAmount] = useState('')
    const [salesTableData, setSalesTableData] = useState([])
    const [open, setOpen] = useState(false)
    const [idSale, setIdSale] = useState('')
    const [saleDetails, setSaleDetails] = useState([])
    const [montoError, setMontoError] = useState('')

    const [totalVentas, setTotalVentas] = useState(0)
    const [totalVentasMonto, setTotalVentasMonto] = useState(0)
    const [totalGrafico, setTotalGrafico] = useState(0)

    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const day = String(currentDate.getDate()).padStart(2, '0')

    const formattedDate = `${year}-${month}-${day}`

    //OBTENER INFORMACION DE COMPRA
    const handleOpen = async (idSale) => {
        setIdSale(idSale)
        setOpen(true)
        try {
            const response = await axios.get(
                `http://localhost:5000/api/saleBooks/${idSale}`
            )
            if (Array.isArray(response.data.data)) {
                setSaleDetails(response.data.data)

                console.log(saleDetails)
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

    //TABLA DE VENTAS
    const TABLE_HEAD_MODAL = [
        'ID Venta',
        'ID Cliente',
        'Titulo',
        'Autor',
        'Editorial',
        'Cantidad',
    ]

    //TABLA DE VENTAS
    const TABLE_HEAD = [
        'ID Venta',
        'Monto',
        'ID Sesion',
        'Fecha Transaccion',
        'Eliminar',
        '',
    ]

    const [sales, setSales] = useState([])

    //SOLICITUD PARA OBTENER INFORMACION DE Ventas
    const fecthSales = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/sale')
            if (Array.isArray(response.data.data)) {
                setSales(response.data.data)
                console.log(response.data.data)
                let sum = 0
                for (let i = 0; i < response.data.data.length; i++) {
                    sum += response.data.data[i].monto
                }
                setTotalVentasMonto(sum)
                setTotalGrafico(sum)
                setTotalVentas(response.data.data.length)
                console.log(totalGrafico)
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
        fecthSales()
        const intervalId = setInterval(fecthSales, 5000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    //REGISTRAR VENTA
    const createSale = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/sale',
                {
                    monto: newSaleAmount,
                    fecha_transaccion: formattedDate,
                    estado_transaccion: 'INILIZIATED',
                    estado_envio: 'En Bodega',
                    id_sesion: 'Venta Aplicacion',
                    id_cliente: 123,
                    estado_envio: 'En Bodega',
                    id_envio: 123,
                }
            )
            if (response.data.success) {
                console.log('Venta registrada:', response.data.data)
                toast.success('Venta Registrada')
            } else {
                console.log('Venta Registrada', response.data)
                toast.success('Venta Registrada')
            }
        } catch (error) {
            console.log(error)
        }
        setNewSaleAmount('')
    }

    //ELIMINAR VENTA
    const deleteSale = async (idSale) => {
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/sale/${idSale}`
            )
            console.log(response.data)
            fecthSales()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // Datos de ventas anuales
        const annualLabels = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
        ]
        const annualData = [
            0, 0, 0, 0, 0, totalGrafico , 0, 0, 0, 0, 0,
            0,
        ]

        // Crear gráfico de ventas anuales
        const annualCtx = annualChartRef.current.getContext('2d')
        const annualChart = new Chart(annualCtx, {
            type: 'line',
            data: {
                labels: annualLabels,
                datasets: [
                    {
                        label: 'Ventas Anuales',
                        data: annualData,
                        borderWidth: 1,
                        tension: 0.2,
                        fill: true,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        pointRadius: 3,
                        pointBorderColor: 'rgba(255, 99, 132)',
                        pointBackgroundColor: 'rgba(255, 99, 132)',
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        })

        return () => {
            annualChart.destroy() // Limpiar el gráfico al desmontar el componente
        }
    }, [])

    return (
        <div>
            <Card className="mt-6">
                <CardBody>
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        Gráfico de Ventas Anuales
                    </Typography>
                    <canvas ref={annualChartRef} />
                    <Typography color="blue-gray" className="mt-4">
                        Total de Ventas {totalVentas}

                    </Typography>
                    <Typography color="blue-gray" className="mt-4">
                        Total Monto Ventas ${totalVentasMonto}
                        
                    </Typography>
                </CardBody>
            </Card>

            <div className=" mt-6">
                <Card>
                    <CardHeader
                        floated={false}
                        shadow={false}
                        className="rounded-none"
                    >
                        <div className=" flex flex-col justify-between gap-8 md:flex-row md:items-center w-1/2">
                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    Agregar Nueva Venta
                                </Typography>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row">
                                <div className="flex flex-col w-1/2 mr-2">
                                    <Typography variant="h6">Monto</Typography>
                                    <input
                                        type="number"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                        onChange={(e) =>
                                            setNewSaleAmount(e.target.value)
                                        }
                                    ></input>
                                </div>
                                <div className="flex flex-col w-1/2 ml-2">
                                    <Typography
                                        variant="h6"
                                        className="text-gray-950"
                                    >
                                        Fecha
                                    </Typography>
                                    <input
                                        type="date"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                        value={formattedDate}
                                        disabled
                                    ></input>
                                </div>
                            </div>
                            <div className="flex flex-col w-1/2 mr-2">
                                <Typography variant="h6">ID Sesion</Typography>
                                <input
                                    type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    value="Venta desde Aplicacion"
                                    disabled
                                ></input>
                            </div>
                            <Button
                                color="blue"
                                className="mt-4"
                                onClick={() => {
                                    createSale()
                                }}
                            >
                                Registrar Venta
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <Card className="w-auto mt-6">
                <CardBody>
                    <h2 className="text-lg font-bold mb-4">Ventas</h2>

                    <Card className="overflow-scroll h-full w-full">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sales.map((sale) => (
                                    <tr
                                        key={sale.id_venta}
                                        className="even:bg-blue-gray-50/50"
                                    >
                                        <td className="p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {sale.id_venta}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {sale.monto}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {sale.id_sesion}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {sale.fecha_transaccion}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                                onClick={() =>
                                                    deleteSale(sale.id_venta)
                                                }
                                            >
                                                Eliminar
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                                onClick={() =>
                                                    handleOpen(sale.id_venta)
                                                }
                                            >
                                                Mas Detalles
                                            </Typography>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </CardBody>
            </Card>

            <div className="justify-center  items-center">
                <Fragment>
                    <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        size="xs"
                        className=""
                        animate={{
                            mount: { scale: 1, y: 50 },
                            unmount: { scale: 0.9, y: -100 },
                        }}
                    >
                        <DialogHeader>
                            <Typography color="gray">
                                Detalles de la venta
                            </Typography>
                        </DialogHeader>

                        <DialogBody divider>
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        {TABLE_HEAD_MODAL.map((head) => (
                                            <th
                                                key={head}
                                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="gray"
                                                    className="font-normal leading-none opacity-70"
                                                >
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {saleDetails.map((sale) => (
                                        <tr
                                            key={sale.id_venta}
                                            className="even:bg-blue-gray-50/50"
                                        >
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="gray"
                                                    className="font-normal"
                                                >
                                                    {sale.id_venta}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="gray"
                                                    className="font-normal"
                                                >
                                                    {sale.cliente_id}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="gray"
                                                    className="font-normal"
                                                >
                                                    {sale.editorial}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="gray"
                                                    className="font-normal"
                                                >
                                                    {sale.titulo}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="gray"
                                                    className="font-normal"
                                                >
                                                    {sale.editorial}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="gray"
                                                    className="font-normal"
                                                >
                                                    {sale.cantidad}
                                                </Typography>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="blue"
                                onClick={() => setOpen(false)}
                            >
                                <span>Aceptar</span>
                            </Button>
                        </DialogFooter>
                    </Dialog>
                </Fragment>
            </div>

            <Toaster position="bottom-right" richColors />
        </div>
    )
}

export default Sales
