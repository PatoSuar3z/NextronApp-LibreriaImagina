import React from 'react'
import { PencilIcon } from "@heroicons/react/24/solid";
import {
    Typography,
    Avatar,
    IconButton,
} from "@material-tailwind/react";

const BooksAlphillia = ({ alphilliaBooks }) => {
    return (
        <>
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
                            <Typography variant="small" color="blue-gray" className="font-bold">
                                {book.titulo}
                            </Typography>
                        </div>
                    </td>
                    <td >
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {book.isbn}
                        </Typography>
                    </td>
                    <td >
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {book.stock}/100
                        </Typography>
                    </td>
                    <td >
                        <div className="w-max">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                ${book.precio}
                            </Typography>
                        </div>
                    </td>

                </tr>
            ))}
        </>
    )
}

export default BooksAlphillia