import { motion } from 'framer-motion'
import Link from 'next/link'
import LoginForm from './forms/LoginForm'

const Login = (props) => {
  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <motion.div
        className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.6,
            },
          },
        }}
      >
        <div className="md:w-1/2 px-12 md:px-12">
          <h2 className="font-bold text-2xl text-[#593535]">Login</h2>
          <p className="text-xs mt-2 text-[#593535]">
            ¿Ya tienes cuenta? Inicia fácilmente con tu correo y contraseña.
          </p>

          {/* Formulario */}
          <LoginForm onLogin={props.onLogin} />

          <p className="mt-5 text-xs text-[#593535] border-b border-[#593535] py-4 ">
            ¿Olvidó su contraseña?
          </p>

          <div className="mt-3 text-xs flex justify-between items-center">
            <p className="font-bold text-[#593535]">¿Aún no tienes cuenta? </p>
            <Link href="/register">
              <button className="py-2 px-6 bg-[#593535] border rounded-xl hover:scale-110 duration-300">
                Crear cuenta
              </button>
            </Link>
          </div>
        </div>
        <Link href="/perfil">
          <button className="py-2 px-6 bg-[#593535] border rounded-xl hover:scale-110 duration-300">
            Perfil
          </button>
        </Link>
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src="/img/li-login.png" alt="" />
        </div>
      </motion.div>
    </section>
  )
}

export default Login
