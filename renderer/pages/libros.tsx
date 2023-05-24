import ProfileLayout from "../components/ProfileLayout"
import Ceo from "../data/Ceo" // CEO data
import ListTable from  "../components/ListTable"
import axios from "axios";
import { useState, useEffect } from "react";

const libros = () => {

  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books");
      if (Array.isArray(response.data.data)) {
        const booksData = response.data.data.map((book) => {
          const precio = parseFloat(book.precio);
          return {
            ...book,
            precio: Number.isFinite(precio) ? precio : 0,
          };
        });
        setBooks(booksData);
      } else {
        console.log(
          "La respuesta de la API no es un array válido:",
          response.data
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);



  return (
    <div>
        <Ceo page="Libros" />
        <ProfileLayout>
          <ListTable  />
        </ProfileLayout>
        <p className="font-bold text-3xl text-gray-700 mb-16"></p>
    </div>
  )
}

export default libros