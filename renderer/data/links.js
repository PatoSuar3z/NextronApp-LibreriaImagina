import { 
HomeIcon,
UserIcon,
BookOpenIcon,
TruckIcon,
WrenchIcon,
ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";

const links = [
    { href: '/inicio', text: 'Inicio', icon: <HomeIcon className="w-4 h-4" /> },
    { href: '/perfiles', text: 'Perfiles', icon: <UserIcon className="w-4 h-4" />},
    { href: '/ventas', text: 'Ventas', icon: <UserIcon className="w-4 h-4" />},
    { href: '/libros', text: 'Libros', icon: <BookOpenIcon className="w-4 h-4" /> },
    { href: '/envios', text: 'Envios', icon: <TruckIcon className="w-4 h-4" /> },
    { href: '/mantenciones', text: 'Mantenciones', icon: <WrenchIcon className="w-4 h-4" /> },

];

export default links;