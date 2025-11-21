import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import { AdminProductProvider } from "../components/Context/AdminProductContext"
import AdminProductsList from "../components/adminComponents/AdminProductsList/AdminProductsList"

export const AdminLayaouts = () => {
  return (
    <AdminProductProvider>
      <section className="admin-layout"> 
          <Navbar/> 
          <h1>Panel de Administración</h1>
          <Outlet />
          <AdminProductsList />
      </section>
    </AdminProductProvider>
  )
}