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
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Input,
} from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Books from './Books'
import BooksAlphillia from './BooksAlphillia'
import { da } from 'date-fns/locale'

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
        fecha_publicacion: '',
        descripcion: '',
        stock: '',
    })
    const [validation, setValidation] = useState({
        isbn: true,
        titulo: true,
        autor: true,
        editorial: true,
        paginas: true,
        precio: true,
        imagen: true,
        genero: true,
        idioma: true,
        fecha_publicacion: true,
        descripcion: true,
        stock: true,
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

    const addBook = async () => {
        // Validar los campos antes de agregar el libro
        const newValidation = {
            isbn: newBook.isbn.trim() !== '',
            titulo: newBook.titulo.trim() !== '',
            autor: newBook.autor.trim() !== '',
            editorial: newBook.editorial.trim() !== '',
            paginas: newBook.paginas.trim() !== '',
            precio: newBook.precio.trim() !== '',
            imagen: newBook.imagen.trim() !== '',
            genero: newBook.genero.trim() !== '',
            idioma: newBook.idioma.trim() !== '',
            fecha_publicacion: newBook.fecha_publicacion.trim() !== '',
            descripcion: newBook.descripcion.trim() !== '',
            stock: newBook.stock.trim() !== '',
        }

        setValidation(newValidation)

        // Verificar si hay algún campo no válido
        const isValid = Object.values(newValidation).every((valid) => valid)

        if (isValid) {
            try {
                const response = await axios.post(
                    'http://localhost:5000/api/books',
                    JSON.stringify(newBook)
                )
                console.log(response.data)
                // Actualizar la lista de libros después de agregar uno nuevo
                fetchBooks()
                // Reiniciar los valores del formulario
                setNewBook({
                    isbn: '',
                    titulo: '',
                    autor: '',
                    editorial: '',
                    paginas: '',
                    precio: '',
                    imagen: '',
                    genero: '',
                    idioma: '',
                    fecha_publicacion: '',
                    descripcion: '',
                    stock: '',
                })
            } catch (error) {
                console.log(error)
                console.log(error.response)
            }
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
                    <div className="flex flex-col gap-2">
                        <Typography variant="h6" color="blue-gray">
                            ISBN
                        </Typography>
                        <Input
                            value={newBook.isbn}
                            onChange={(e) =>
                                setNewBook({ ...newBook, isbn: e.target.value })
                            }
                            error={!validation.isbn}
                        />
                        <Typography variant="h6" color="blue-gray">
                            Titulo
                        </Typography>
                        <Input
                            value={newBook.titulo}
                            onChange={(e) =>
                                setNewBook({
                                    ...newBook,
                                    titulo: e.target.value,
                                })
                            }
                            error={!validation.titulo}
                        />
                        <Typography variant="h6" color="blue-gray">
                            Autor
                        </Typography>
                        <Input
                            value={newBook.autor}
                            onChange={(e) =>
                                setNewBook({
                                    ...newBook,
                                    autor: e.target.value,
                                })
                            }
                            error={!validation.autor}
                        />
                        <Typography variant="h6" color="blue-gray">
                            Editorial
                        </Typography>
                        <Input
                            value={newBook.editorial}
                            onChange={(e) =>
                                setNewBook({
                                    ...newBook,
                                    editorial: e.target.value,
                                })
                            }
                            error={!validation.editorial}
                        />
                        <Typography variant="h6" color="blue-gray">
                            Páginas
                        </Typography>
                        <Input
                            value={newBook.paginas}
                            onChange={(e) =>
                                setNewBook({
                                    ...newBook,
                                    paginas: e.target.value,
                                })
                            }
                            error={!validation.paginas}
                        />
                        <Typography variant="h6" color="blue-gray">
                            Precio
                        </Typography>
                        <Input
                            value={newBook.precio}
                            onChange={(e) =>
                                setNewBook({
                                    ...newBook,
                                    precio: e.target.value,
                                })
                            }
                            error={!validation.precio}
                        />
                        <Typography variant="h6" color="blue-gray">
                            Imagen
                        </Typography>
                        <Input
                            placeholder="URL de la imagen"
                            value={newBook.imagen}
                            onChange={(e) =>
                                setNewBook({
                                    ...newBook,
                                    imagen: e.target.value,
                                })
                            }
                            error={!validation.imagen}
                        />
                        <Typography variant="h6" color="blue-gray">
                            Género
                        </Typography>
                        <Input
                            value={newBook.genero}
                            onChange={(e) =>
                                setNewBook({
                                    ...newBook,
                                    genero: e.target.value,
                                })
                            }
                            error={!validation.genero}
                        />
                        <Typography variant="h6" color="blue-gray">
                            Idioma
                        </Typography>
                        <Input
                            value={newBook.idioma}
                            onChange={(e) =>
                                setNewBook({
                                    ...newBook,
                                    idioma: e.target.value,
                                })
                            }
                            error={!validation.idioma}
                        />
                        <Typography variant="h6" color="blue-gray">
                            Fecha de Publicación
                        </Typography>
                        <Input
                            value={newBook.fecha_publicacion}
                            onChange={(e) =>
                                setNewBook({
                                    ...newBook,
                                    fecha_publicacion: e.target.value,
                                })
                            }
                            error={!validation.fecha_publicacion}
                        />
                        <Typography variant="h6" color="blue-gray">
                            Descripción
                        </Typography>
                        <Input
                            value={newBook.descripcion}
                            onChange={(e) =>
                                setNewBook({
                                    ...newBook,
                                    descripcion: e.target.value,
                                })
                            }
                            error={!validation.descripcion}
                        />
                        <Typography variant="h6" color="blue-gray">
                            Stock
                        </Typography>
                        <Input
                            value={newBook.stock}
                            onChange={(e) =>
                                setNewBook({
                                    ...newBook,
                                    stock: e.target.value,
                                })
                            }
                            error={!validation.stock}
                        />
                        <Button onClick={addBook} color="blue">
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
                            <Books books={filterBooks()} />
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
                            <BooksAlphillia
                                alphilliaBooks={filterAlphilliaBooks()}
                            />
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
        </div>
    )
}
