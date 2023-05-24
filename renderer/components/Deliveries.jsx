import React from 'react'
import {
    PencilIcon,
    TruckIcon
} from "@heroicons/react/24/solid";
import {
    Typography,
    Select, Option
} from "@material-tailwind/react";
import { useState } from 'react';





const Deliveries = ({ shipping }) => {

    const [selectedEstado, setSelectedEstado] = useState("");

    const handleUpdate = (id_envio) => {
        console.log(id_envio);
        const updatedData = {
            estado: selectedEstado
        };

        fetch(`http://localhost:9001/envios/${id_envio}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => response.json())
            .catch(error => {
                // Aquí puedes manejar errores en caso de que ocurra algún problema con la solicitud
                console.error("Error en la solicitud PUT:", error);
            });
    };


    return (
        <>
            {shipping.map((shipping) => (
                <tr key={shipping.id_envio}>
                    <td>
                        <div className="flex items-center gap-5 ml-5 mt-4">
                            <Typography variant="small" color="blue-gray" className="font-bold">
                                {shipping.id_envio}
                            </Typography>
                        </div>
                    </td>
                    <td>
                        <Typography variant="small" color="blue-gray" className="font-normal">

                        </Typography>
                    </td>
                    <td>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {shipping.estado}
                        </Typography>
                    </td>
                    <td>
                        <div className="w-max">
                            <Typography variant="small" color="blue-gray" className="font-normal ml-3">
                                {shipping.destino}
                            </Typography>
                        </div>
                    </td>
                    <td>
                        <div className="w-max">
                            <Typography variant="small" color="blue-gray" className="font-normal ml-3">
                                ${shipping.valor}
                            </Typography>
                        </div>
                    </td>
                    <td>
                        <div className="w-max">
                            <Typography variant="small" color="blue-gray" className="font-normal ml-4">
                                {shipping.id_usuario}
                            </Typography>
                        </div>
                    </td>
                    <td>
                        <div className="w-auto">
                            <Select size="xs" value={selectedEstado || ''} onChange={(value) => setSelectedEstado(value.trim())}>
                                <Option value="En Barco">En Barco</Option>
                                <Option value="En Camino">En Camino</Option>
                                <Option value="Entregado">Entregado</Option>
                                {/* Add more options as needed */}
                            </Select>

                        </div>
                    </td>
                    <td>
                        <button onClick={() => handleUpdate(shipping.id_envio)}>
                            <PencilIcon className="h-4 w-4" />
                        </button>
                    </td>
                </tr>
            ))}
        </>
    )
}

export default Deliveries