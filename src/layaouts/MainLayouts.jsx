import { Outlet } from "react-router-dom"
import { Header } from "../components/Header/Header";

export const MainLayouts = () => {
  return (
    <section className="main-layout">   
        <Header/>
        <div className="main-content">
        <Outlet />
        </div>
    </section>
  )
}