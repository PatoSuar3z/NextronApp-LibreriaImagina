import React, { useState, Fragment, useEffect } from 'react'
import {
    Card,
    CardBody,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from '@material-tailwind/react'
import axios from 'axios'
import { Toaster, toast } from 'sonner'
import { BellIcon } from '@heroicons/react/24/solid'

const UserList = ({}) => {
    const [selectedUser, setSelectedUser] = useState(null)
    const [open, setOpen] = useState(false)
    const [profiles, setProfiles] = useState([])
    const [userType, setUsertype] = useState('')
    const [rol, setRol] = useState()
    const [newUser, setNewUser] = useState({
        username: '',
        correo: '',
        password: '',
    })

    const handleOpen = () => setOpen(!open)

    const TABLE_HEAD = ['ID Usuario', 'Nombre', 'Correo', 'Rol', '']

    ///GET ALL PROFILES
    const fetchProfiles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users')
            if (Array.isArray(response.data.data)) {
                setProfiles(response.data.data)
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
        fetchProfiles()
        const intervalId = setInterval(fetchProfiles, 5000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    const ClientRequest = profiles.filter(
        (profile) => profile.tipo_usuario === 'Cliente'
    )

    const TechnicianRequest = profiles.filter(
        (profile) => profile.tipo_usuario === 'Técnico'
    )

    const AdminRequest = profiles.filter(
        (profile) => profile.tipo_usuario === 'Administrador'
    )

    ///DELETE PROFILE
    const deleteProfile = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/users/${id}`
            )
            if (response.status === 200) {
                toast.error('Usuario eliminado')
                fetchProfiles()
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

    ///CREATE PROFILE
    const createProfile = async () => {
        try {
            console.log(newUser)
            const response = await axios.post(
                'http://localhost:5000/auth/signup',
                newUser
            )
            if (
                (response.status === 200,
                console.log(response.data),
                toast.success('Usuario creado'))
            ) {
                fetchProfiles()
            } else {
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
            toast.error('Error al crear usuario')
        }
    }

    ///UPDATE PROFILE
    const updateProfile = async (id) => {
        try {
            const response = await axios.patch(
                `http://localhost:5000/api/users/update/${id}`,
                {
                    tipo_usuario: rol,
                }
            )
            if (
                (response.status === 200,
                toast.success('Usuario actualizado'),
                handleOpen())
            ) {
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

    return (
        <div className="flex flex-col w-full h-full">
            <div>
                <Card className="w-auto">
                    <CardBody>
                        <h2 className="text-lg font-bold mb-4">
                            Registrar Nuevo Cliente
                        </h2>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <div className="flex flex-col w-1/2 mr-2">
                                    <Typography variant="h6">Nombre</Typography>
                                    <input
                                        type="text"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                        onChange={(e) =>
                                            setNewUser({
                                                ...newUser,
                                                username: e.target.value,
                                            })
                                        }
                                    ></input>
                                </div>
                                <div className="flex flex-col w-1/2 ml-2">
                                    <Typography variant="h6">Correo</Typography>

                                    <input
                                        type="text"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                        onChange={(e) =>
                                            setNewUser({
                                                ...newUser,
                                                correo: e.target.value,
                                            })
                                        }
                                    ></input>
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="flex flex-col w-1/2 mr-2">
                                    <Typography variant="h6">
                                        Contraseña
                                    </Typography>
                                    <input
                                        type="text"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                        onChange={(e) =>
                                            setNewUser({
                                                ...newUser,
                                                password: e.target.value,
                                            })
                                        }
                                    ></input>
                                </div>
                                <div className="flex flex-col w-1/2 ml-2">
                                    <Typography
                                        variant="h6"
                                        className="text-gray-950"
                                    >
                                        Confirmar Contraseña
                                    </Typography>
                                    <input
                                        type="text"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    ></input>
                                </div>
                            </div>

                            <CardBody>
                                <Button
                                    color="blue"
                                    buttonType="filled"
                                    size="regular"
                                    rounded={false}
                                    block={false}
                                    iconOnly={false}
                                    ripple="light"
                                    onClick={createProfile}
                                >
                                    Registrar
                                </Button>
                            </CardBody>
                        </div>
                    </CardBody>
                </Card>

                <Card className="w-auto mt-5">
                    <CardBody>
                        <h2 className="text-lg font-bold mb-4">
                            Cuentas Clientes
                        </h2>

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
                                    {ClientRequest.map((profile) => (
                                        <tr
                                            key={profile.id}
                                            className="even:bg-blue-gray-50/50"
                                        >
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {profile.id}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {profile.username}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {profile.correo}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {profile.tipo_usuario}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    as="a"
                                                    href="#"
                                                    variant="small"
                                                    color="blue"
                                                    className="font-medium"
                                                    onClick={() =>
                                                        deleteProfile(
                                                            profile.id
                                                        )
                                                    }
                                                >
                                                    Eliminar
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    as="a"
                                                    href="#"
                                                    variant="small"
                                                    color="blue"
                                                    className="font-medium"
                                                    onClick={() => {
                                                        {
                                                            handleOpen()
                                                            setSelectedUser(
                                                                profile.id
                                                            )
                                                        }
                                                    }}
                                                >
                                                    Editar
                                                </Typography>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>
                    </CardBody>
                </Card>
            </div>

            <div className="flex flex-row justify-center">
                <Card className="w-1/2 mt-8 mr-2">
                    <CardBody>
                        <h2 className="text-lg font-bold mb-4">Técnicos</h2>
                        {TechnicianRequest.map((profile) => (
                            <div
                                key={profile.id}
                                className="p-4 mb-4 rounded-lg bg-gray-200 shadow-md"
                            >
                                <h3 className="font-semibold">
                                    ID Usuario: {profile.id}{' '}
                                </h3>
                                <p className="text-sm">
                                    Nombre: {profile.username}{' '}
                                </p>
                                <p className="text-sm">
                                    Correo: {profile.correo}
                                </p>
                                <p className="text-sm">
                                    Rol: {profile.tipo_usuario}
                                </p>
                                <p className="text-sm mt-1">
                                    <Typography
                                        as="a"
                                        href="#"
                                        variant="small"
                                        color="blue"
                                        className="font-medium"
                                        onClick={() => handleOpen()}
                                    >
                                        Editar
                                    </Typography>
                                </p>
                                <p>
                                    <Typography
                                        as="a"
                                        href="#"
                                        variant="small"
                                        color="blue"
                                        className="font-medium"
                                        onClick={() =>
                                            deleteProfile(profile.id)
                                        }
                                    >
                                        Eliminar
                                    </Typography>
                                </p>
                            </div>
                        ))}
                    </CardBody>
                </Card>

                <Card className="w-1/2 mt-8 ml-2 ">
                    <CardBody>
                        <h2 className="text-lg font-bold mb-4">
                            Cuentas Administradores
                        </h2>
                        {AdminRequest.map((profile) => (
                            <div
                                key={profile.id}
                                className="p-4 mb-4 rounded-lg bg-gray-200 shadow-md"
                            >
                                <h3 className="font-semibold">
                                    ID Usuario:{profile.id}
                                </h3>
                                <p className="text-sm">
                                    Nombre: {profile.username}
                                </p>
                                <p className="text-sm">
                                    Correo: {profile.correo}
                                </p>
                                <p className="text-sm">
                                    Rol: {profile.tipo_usuario}
                                </p>
                                <p className="text-sm mt-1">
                                    <Typography
                                        as="a"
                                        href="#"
                                        variant="small"
                                        color="blue"
                                        className="font-medium"
                                        onClick={() =>
                                            handleOpen() &&
                                            setSelectedUser(profile.id)
                                        }
                                    >
                                        Edit
                                    </Typography>
                                    <Typography
                                        as="a"
                                        href="#"
                                        variant="small"
                                        color="blue"
                                        className="font-medium"
                                        onClick={() =>
                                            deleteProfile(profile.id)
                                        }
                                    >
                                        Eliminar
                                    </Typography>
                                </p>
                            </div>
                        ))}
                    </CardBody>
                </Card>
            </div>

            <Fragment>
                <Dialog
                    open={open}
                    size="xs"
                    animate={{
                        mount: { scale: 1, y: 50 },
                        unmount: { scale: 0.9, y: -100 },
                    }}
                >
                    <DialogHeader className="text-gray-950">
                        Editar Usuario
                    </DialogHeader>
                    <DialogBody>
                        <div className="">
                            <Typography variant="h6" className="text-gray-950">
                                Rol
                            </Typography>

                            <select
                                id="userType"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => setRol(e.target.value)}
                                value={userType}
                            >
                                <option value="">Seleccionar Rol</option>
                                <option value="Técnico">Tecnico</option>
                                <option value="Cliente">Cliente</option>
                                <option value="Administrador">
                                    Administrador
                                </option>
                            </select>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="black"
                            onClick={() => updateProfile(selectedUser)}
                            className="ml-1"
                        >
                            <span>Guardar</span>
                        </Button>
                        <Button
                            variant="text"
                            color="blue"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Cancelar</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </Fragment>

            <Toaster position="bottom-right" richColors />
        </div>
    )
}

export default UserList
