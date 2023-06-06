import { PencilIcon } from '@heroicons/react/24/solid'
import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
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
import React, { useEffect, useState } from 'react'
import Books from './Books'
import BooksAlphillia from './BooksAlphillia'
import { Toaster, toast } from 'sonner'

export default function ListaTable() {
    const [alphilliaBooks, setAlphilliaBooks] = useState([])
    const [books, setBooks] = useState([])
    const [newBook, setNewBook] = useState({
        isbn: '',
        titulo: '',
        autor: '',
        editorial: '',
        paginas: '',
        precio: '',
        imagen: '',
        genero: '',
        idioma: '',
        fecha_publicacion: '1/1/2021',
        descripcion: '',
        stock: '',
    })

    const [searchTerm, setSearchTerm] = useState('')
    const [alphilliaSearchTerm, setAlphilliaSearchTerm] = useState('')

    ///GET BACKEND

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/books')
            if (Array.isArray(response.data.data)) {
                const booksData = response.data.data.map((book) => {
                    const precio = parseFloat(book.precio)

                    return {
                        ...book,
                        precio: Number.isFinite(precio) ? precio : 0,
                    }
                })
                setBooks(booksData)
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
        fetchBooks()
    }, [])

    ///GET API ALPHILLIA

    const fetchAlphilliaBooks = async () => {
        try {
            const response = await axios.get('http://localhost:9001/books')
            if (Array.isArray(response.data)) {
                setAlphilliaBooks(response.data)
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
        fetchAlphilliaBooks()
    }, [])

    ///REGISTRAR LIBRO
    const addBook = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/books',
                newBook
            )
            console.log(response.data)
            toast.success('Libro Registrado')
            fetchBooks()
        } catch (error) {
            console.log(error)
            console.log(error.response)
            console.log(newBook)
        }
    }

    ///ELIMINAR LIBRO

    const deleteBook = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/books/${id}`
            )
            console.log(response.data)
            toast.error('Libro Eliminado')
            fetchBooks()
        } catch (error) {
            console.log(error)
            console.log(error.response)
        }
    }

    const filterBooks = () => {
        return books.filter((book) => {
            const { titulo, isbn } = book
            const lowerCaseSearchTerm = searchTerm.toLowerCase()
            return (
                titulo?.toLowerCase().includes(lowerCaseSearchTerm) ||
                isbn?.toString().toLowerCase().includes(lowerCaseSearchTerm)
            )
        })
    }

    const filterAlphilliaBooks = () => {
        return alphilliaBooks.filter((book) => {
            const { titulo, isbn } = book
            const lowerCaseSearchTerm = alphilliaSearchTerm.toLowerCase()
            return (
                titulo?.toLowerCase().includes(lowerCaseSearchTerm) ||
                isbn?.toString().toLowerCase().includes(lowerCaseSearchTerm)
            )
        })
    }

    const TABLE_HEAD = ['Libro', 'isbn', 'Stock', 'Precio', 'Editar']

    const TABLE_HEAD_ALPHILLIA = ['Libro', 'isbn', 'Stock', 'Precio']

    return (
        <div>
            <Card>
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none"
                >
                    <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Agregar Nuevo Libro
                            </Typography>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <div className="flex flex-col w-1/2 mr-2">
                                <Typography variant="h6">ISBN</Typography>
                                <input
                                    type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            isbn: e.target.value,
                                        })
                                    }
                                ></input>
                            </div>
                            <div className="flex flex-col w-1/2 ml-2">
                                <Typography variant="h6">Titulo</Typography>

                                <input
                                    type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            titulo: e.target.value,
                                        })
                                    }
                                ></input>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-col w-1/2 mr-2">
                                <Typography variant="h6">Autor</Typography>
                                <input
                                    type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            autor: e.target.value,
                                        })
                                    }
                                ></input>
                            </div>
                            <div className="flex flex-col w-1/2 ml-2">
                                <Typography
                                    variant="h6"
                                    className="text-gray-950"
                                >
                                    Editorial
                                </Typography>
                                <input
                                    type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            editorial: e.target.value,
                                        })
                                    }
                                ></input>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-col w-1/2 mr-2">
                                <Typography variant="h6">Paginas</Typography>
                                <input
                                    type="number"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            paginas: e.target.value,
                                        })
                                    }
                                ></input>
                            </div>
                            <div className="flex flex-col w-1/2 ml-2">
                                <Typography variant="h6">Precio</Typography>

                                <input
                                    type="number"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            precio: e.target.value,
                                        })
                                    }
                                ></input>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-col w-1/2 mr-2">
                                <Typography variant="h6">Imagen</Typography>
                                <input
                                    type="url"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    placeholder="URL Imagen"
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            imagen: e.target.value,
                                        })
                                    }
                                ></input>
                            </div>
                            <div className="flex flex-col w-1/2 ml-2">
                                <Typography variant="h6">Genero</Typography>

                                <select
                                    id="userType"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            genero: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Seleccionar Genero</option>
                                    <option value="Ciencia Ficcion">
                                        Ciencia Ficcion
                                    </option>
                                    <option value="Fantasia">Fantasia</option>
                                    <option value="Accion">Accion</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-col w-1/2 mr-2">
                                <Typography variant="h6">Idioma</Typography>
                                <select
                                    id="userType"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            idioma: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Seleccionar Idioma</option>
                                    <option value="Ciencia Ficcion">
                                        Español
                                    </option>
                                    <option value="Fantasia">Ingles</option>
                                    <option value="Accion">Frances</option>
                                </select>
                            </div>
                            <div className="flex flex-col w-1/2 ml-2">
                                <Typography variant="h6">
                                    Fecha Publicacion
                                </Typography>

                                <input
                                    type="date"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                ></input>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-col w-1/2 mr-2">
                                <Typography variant="h6">Stock</Typography>
                                <input
                                    type="number"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    onClick={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            stock: e.target.value,
                                        })
                                    }
                                ></input>
                            </div>
                            <div className="flex flex-col w-1/2 ml-2">
                                <Typography variant="h6">Descipcion</Typography>
                                <input
                                    type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            descripcion: e.target.value,
                                        })
                                    }
                                ></input>
                            </div>
                        </div>
                        <Button
                            onClick={(e) => addBook()}
                            color="blue"
                            className="mt-4"
                        >
                            Agregar
                        </Button>
                    </div>
                </CardBody>
            </Card>

            <Card className="mt-8">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none"
                >
                    <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Libros Disponibles
                            </Typography>
                            <Typography
                                color="gray"
                                className="mt-1 font-normal"
                            >
                                Listado de Libros disponible en bodega
                            </Typography>
                        </div>
                        <div className="flex w-full shrink-0 gap-2 md:w-max">
                            <div className="w-full md:w-72">
                                <Input
                                    icon={
                                        <MagnifyingGlassIcon className="h-5 w-5" />
                                    }
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="py-2 pr-2 pl-8"
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0  style={{ maxHeight: '400px' }}">
                    <table className="w-full min-w-max table-auto text-left ">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
                            {books.map((book) => (
                                <tr key={book.id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                src={book.imagen}
                                                width={60}
                                                alt={book.titulo}
                                                size="md"
                                                className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                            />
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                {book.titulo}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {book.isbn}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {book.stock}/100
                                        </Typography>
                                    </td>
                                    <td>
                                        <div className="w-max">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                ${book.precio}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            as="a"
                                            href="#"
                                            variant="small"
                                            color="blue"
                                            className="font-medium"
                                            onClick={() => deleteBook(book.id)}
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
                                        >
                                            Edit
                                        </Typography>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Button variant="outlined" color="blue-gray" size="sm">
                        Anterior
                    </Button>
                    <div className="flex items-center gap-2">
                        <IconButton
                            variant="outlined"
                            color="blue-gray"
                            size="sm"
                        >
                            1
                        </IconButton>
                        <IconButton
                            variant="outlined"
                            color="blue-gray"
                            size="sm"
                        >
                            2
                        </IconButton>
                        <IconButton
                            variant="outlined"
                            color="blue-gray"
                            size="sm"
                        >
                            3
                        </IconButton>
                        <IconButton
                            variant="outlined"
                            color="blue-gray"
                            size="sm"
                        >
                            <ArrowDownTrayIcon className="h-5 w-5" />
                        </IconButton>
                    </div>
                    <Button variant="contained" color="blue" size="sm">
                        Siguiente
                    </Button>
                </CardFooter>
            </Card>

            {/* Card Alphillia  */}

            <Card className="mt-8">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none"
                >
                    <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Libros Proovedor Alphillia
                            </Typography>
                            <Typography
                                color="gray"
                                className="mt-1 font-normal"
                            >
                                Listado de Libros de nuestro proovedor
                            </Typography>
                        </div>
                        <div className="flex w-full shrink-0 gap-2 md:w-max">
                            <div className="w-full md:w-72">
                                <Input
                                    icon={
                                        <MagnifyingGlassIcon className="h-5 w-5" />
                                    }
                                    value={alphilliaSearchTerm}
                                    onChange={(e) =>
                                        setAlphilliaSearchTerm(e.target.value)
                                    }
                                    className="py-2 pr-2 pl-8"
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD_ALPHILLIA.map((head) => (
                                    <th
                                        key={head}
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
                            {alphilliaBooks.map((book) => (
                                <tr key={book.id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                src={book.foto}
                                                width={60}
                                                alt={book.titulo}
                                                size="md"
                                                className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                            />
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                {book.titulo}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {book.isbn}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal ml-5"
                                        >
                                            {book.stock}
                                        </Typography>
                                    </td>
                                    <td>
                                        <div className="w-max">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal ml-4"
                                            >
                                                ${book.precio}
                                            </Typography>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Button variant="outlined" color="blue-gray" size="sm">
                        Anterior
                    </Button>
                    <div className="flex items-center gap-2">
                        <IconButton
                            variant="outlined"
                            color="blue-gray"
                            size="sm"
                        >
                            1
                        </IconButton>
                        <IconButton
                            variant="outlined"
                            color="blue-gray"
                            size="sm"
                        >
                            2
                        </IconButton>
                        <IconButton
                            variant="outlined"
                            color="blue-gray"
                            size="sm"
                        >
                            3
                        </IconButton>
                        <IconButton
                            variant="outlined"
                            color="blue-gray"
                            size="sm"
                        >
                            <ArrowDownTrayIcon className="h-5 w-5" />
                        </IconButton>
                    </div>
                    <Button variant="contained" color="blue" size="sm">
                        Siguiente
                    </Button>
                </CardFooter>
            </Card>

            <Toaster position="bottom-right" richColors />
        </div>
    )
}
