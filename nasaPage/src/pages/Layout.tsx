import { Outlet } from "react-router"
import { Fragment } from "react/jsx-runtime"
import { Header } from "../components"

export const Layout = () => {
    return (
       <Fragment>
              <Header/>

              <main>
                <Outlet/>
              </main>
       </Fragment>
    )
}