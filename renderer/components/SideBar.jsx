import { forwardRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDark } from '../hooks/useDark'
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Chip,
  } from '@material-tailwind/react'
import { MoonIcon,
    HomeIcon,
    UserIcon,
    BookOpenIcon,
    TruckIcon,
    WrenchIcon,
    ArrowRightOnRectangleIcon, } from '@heroicons/react/24/solid'
import React, { useEffect } from 'react'
import { Toaster, toast } from 'sonner'

const colors = {
    light: {
        background: 'bg-[#f7f7f7]',
        text: 'text-gray-600',
        border: 'border-green-500',
        button: 'bg-green-700 hover:bg-green-900',
        icon: 'text-green-700',
        link: 'text-gray-600 hover:text-green-700',
        location: 'text-gray-600',
    },
    dark: {
        background: 'bg-[#222]',
        profileBackground: 'bg-[#444]',
        text: 'text-white',
        border: 'border-blue-300',
        button: 'bg-blue-300 hover:bg-blue-500',
        icon: 'text-blue-200',
        link: 'text-gray-400',
        location: 'text-gray-300',
    },
}


const links = [
    { href: '/inicio', text: 'Inicio', icon: <HomeIcon className="w-4 h-4" /> },
    { href: '/perfiles', text: 'Perfiles', icon: <UserIcon className="w-4 h-4" />},
    { href: '/ventas', text: 'Ventas', icon: <UserIcon className="w-4 h-4" />},
    { href: '/libros', text: 'Libros', icon: <BookOpenIcon className="w-4 h-4" /> },
    { href: '/envios', text: 'Envios', icon: <TruckIcon className="w-4 h-4" /> },
    { href: '/mantenciones', text: 'Mantenciones', icon: <WrenchIcon className="w-4 h-4" /> },

];

const Teclinks = [
    { href: '/inicio', text: 'Inicio', icon: <HomeIcon className="w-4 h-4" /> },
    { href: '/mantenciones', text: 'Mantenciones', icon: <WrenchIcon className="w-4 h-4" /> },

];

const SideBar = forwardRef(({ showNav }, ref) => {
    const router = useRouter()

    const { darkMode, toggleDarkMode } = useDark()

    const color = darkMode ? colors.dark : colors.light

    const [isAuthenticated, setIsAuthenticated] = React.useState(false)
    const [isTechnician, setIsTechnician] = React.useState(false)
    const [isAdmin, setIsAdmin] = React.useState(false)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        const userType = user?.tipo_usuario

        if (userType === 'Técnico') {
            setIsTechnician(true)
        } else if (userType === 'Administrador') {
            setIsAdmin(true)
        }

        setIsAuthenticated(!!user)
        console.log(isTechnician)
        console.log(isAdmin)
    }, [])


    const handleLogout = () => {
        localStorage.clear()
        setIsAuthenticated(false)
    
        toast.success('Tu sesión ha sido cerrada, ¡vuelve pronto!', {
          position: 'bottom-right',
          duration: 5000,
        })
    
        router.push('/home')
      }

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('authToken')
            setIsAuthenticated(!!token) // !!token convierte el token en un booleano
        }

        checkToken()
    }, [])

    return (
        <div
            ref={ref}
            className={`fixed w-60 h-full shadow-sm ${color.background}`}
        >
            <div className="flex justify-center mt-6 mb-14">
                <picture>
                    <img
                        className="w-32 h-auto"
                        src="/img/zyro-image.png"
                        alt="company logo"
                    />
                </picture>
            </div>
            {isAdmin && (
                <>
            {links.map((links) => (
                <div className="flex flex-col" key={links.href}>
                    <Link href={links.href}>
                        <div
                            className={`pl-6 py-3 mx-4 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                                router.pathname === links.href
                                    ? `${color.link} ${color.text} border-l-4 ${color.border}`
                                    : 'text-gray-600 hover:text-gray-500 hover:border-l-4 hover:${color.border}'
                            }`}
                        >
                            {links.icon}

                            <div className="ml-2">
                                <p>{links.text}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
            </>
            )}
            {isTechnician && (
                <>
                {Teclinks.map((links) => (
                <div className="flex flex-col" key={links.href}>
                    <Link href={links.href}>
                        <div
                            className={`pl-6 py-3 mx-4 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                                router.pathname === links.href
                                    ? `${color.link} ${color.text} border-l-4 ${color.border}`
                                    : 'text-gray-600 hover:text-gray-500 hover:border-l-4 hover:${color.border}'
                            }`}
                        >
                            {links.icon}

                            <div className="ml-2">
                                <p>{links.text}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
                
                </>
            )}

            <div className="flex ml-10 mt-2">
                <MoonIcon className="text-gray-600 w-4 h-4 mr-3" />
                <button>
                    <p
                        onClick={toggleDarkMode}
                        className="text-center text-gray-600"
                    >
                        Modo oscuro
                    </p>
                </button>
            </div>
            {isAuthenticated} ? (
            <div className="flex ml-10 mt-2">
                <ArrowRightOnRectangleIcon className="text-gray-600 w-4 h-4 mr-3" />
                <button>
                    <p
                        onClick={handleLogout}
                        className="text-center text-gray-600"
                    >
                        Cerrar Sesión
                    </p>
                </button>
            </div>
            )

            <Toaster position="bottom-right" richColors />
        </div>
    )
})

SideBar.displayName = 'SideBar'

export default SideBar
