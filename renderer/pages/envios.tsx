import ProfileLayout from "../components/ProfileLayout"
import Ceo from "../data/Ceo" // CEO data
import { useState, useEffect } from "react";
import DeliveryTable from "../components/DeliveryTable";

const envios = () => { 
    
    
    
    const [envios, setEnvios] = useState([])

    useEffect(() => {
      const getBooks = () => {
        fetch('http://localhost:9001/envios')
          .then(res => res.json())
          .then(res => setEnvios(res))
      }
      getBooks()
    }, [])



  return (
    <div>
        <Ceo page="Libros" />
        <ProfileLayout>
          <DeliveryTable />
        </ProfileLayout>
        <p className="font-bold text-3xl text-gray-700 mb-16"></p>
    </div>
  )
}

export default envios