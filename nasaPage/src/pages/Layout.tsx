import { Outlet } from "react-router"
import { Fragment } from "react/jsx-runtime"
import { Header } from "../components"
import '../index.css'

export const Layout = () => {
    return (
      <div className="layout-container-dark" id="layout">
        <Fragment>
            <Header/>

            <main>
              <Outlet/>
            </main>
       </Fragment>
      </div>
    )
}