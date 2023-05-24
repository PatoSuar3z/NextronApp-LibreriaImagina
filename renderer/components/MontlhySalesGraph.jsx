import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";

const MontlhySalesGraph = () => {


var ventas = [2, 5, 3, 6];
var mes = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"];

var midata = {
    labels: mes,
    datasets: [ // Cada una de las líneas del gráfico
        {
            label: 'Ventas Mensuales',
            data: ventas,
            tension: 0.2,
            fill: true,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            pointRadius: 3,
            pointBorderColor: 'rgba(255, 99, 132)',
            pointBackgroundColor: 'rgba(255, 99, 132)',
        },
    ],
};


var misoptions = {
    layout: {
        padding: 10
    },
    scales: {
        y: {
            min: 0,
            ticks: { color: 'rgb(255, 99, 132)' }
        },
        x: {
            ticks: { color: 'rgb(255, 99, 132)' }
        }
    }
};


    return (
        <Card className="mt-6 w-96 ">
            <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    Grafico de Ventas Mensuales
                </Typography>
                <Line data={midata} options={misoptions} className='w-auto h-auto'/>
            </CardBody>
        </Card>
    )
}
export default MontlhySalesGraph
