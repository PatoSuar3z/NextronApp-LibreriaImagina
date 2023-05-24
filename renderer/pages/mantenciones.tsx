import ProfileLayout from "../components/ProfileLayout"
import Ceo from "../data/Ceo" // CEO data
import Maintenance from "../components/MaintenanceCard"
import MaintenanceCard from "../components/MaintenanceCard"
const mantenciones = () => { 
    
    

  return (
    <div>
        <Ceo page="Mantencioes" />
        <ProfileLayout>
        <MaintenanceCard></MaintenanceCard>
        </ProfileLayout>
        <p className="font-bold text-3xl text-gray-700 mb-16"></p>
    </div>
  )
}

export default mantenciones