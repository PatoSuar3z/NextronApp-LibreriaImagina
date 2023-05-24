import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardBody, Typography, Input, Button, Table } from '@material-tailwind/react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Sales = () => {
  const annualChartRef = useRef(null);
  const [newSaleAmount, setNewSaleAmount] = useState('');
  const [salesTableData, setSalesTableData] = useState([]);

  useEffect(() => {
    // Datos de ventas anuales
    const annualLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const annualData = [2000, 2500, 3000, 2800, 3200, 3700, 4100, 3800, 3500, 3200, 2800, 2400];

    // Crear gráfico de ventas anuales
    const annualCtx = annualChartRef.current.getContext('2d');
    const annualChart = new Chart(annualCtx, {
      type: 'line',
      data: {
        labels: annualLabels,
        datasets: [
          {
            label: 'Ventas Anuales',
            data: annualData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
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
    });

    return () => {
      annualChart.destroy(); // Limpiar el gráfico al desmontar el componente
    };
  }, []);

  const handleNewSaleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para procesar el registro de la nueva venta
    console.log('Nueva venta registrada:', newSaleAmount);

    // Actualizar los datos de la tabla de ventas
    const currentDate = new Date().toLocaleDateString();
    const newSale = { date: currentDate, amount: newSaleAmount };
    setSalesTableData((prevSalesTableData) => [...prevSalesTableData, newSale]);

    // Limpiar el campo del monto de venta
    setNewSaleAmount('');
  };

  return (
    <div>
      <Card className="mt-6">
        <CardBody>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Gráfico de Ventas Anuales
          </Typography>
          <canvas ref={annualChartRef} />
        </CardBody>
      </Card>

      <div className="flex mt-6">
        <Card className="w-1/2 mr-4">
          <CardBody>
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Gráfico de Ventas Mensuales
            </Typography>
            <Line
              data={{
                labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
                datasets: [
                  {
                    label: 'Ventas Mensuales',
                    data: [2, 5, 3, 6],
                    tension: 0.2,
                    fill: true,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    pointRadius: 3,
                    pointBorderColor: 'rgba(255, 99, 132)',
                    pointBackgroundColor: 'rgba(255, 99, 132)',
                  },
                ],
              }}
            />
          </CardBody>
        </Card>

        <Card className="w-1/2">
          <CardBody>
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Registrar Nueva Venta
            </Typography>
            <form onSubmit={handleNewSaleSubmit}>
              <div className="flex items-center">
                <Input
                  type="number"
                  placeholder="Monto de la venta"
                  value={newSaleAmount}
                  onChange={(event) => setNewSaleAmount(event.target.value)}
                />
                <Button color="indigo" type="submit" ripple="light">
                  Registrar
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-6">
        <CardBody>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Ventas Registradas
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default Sales;