import { BrowserRouter, Route, Routes } from "react-router";
import {routes} from './constants/routes';
import { APODPage, DetailsPage, EarthImageryPage, HomePage, Layout, MarsRoverPage, NEOPage } from "./pages/index";

export const Router=()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path={routes.HOME} element={<HomePage/>}/>
                    <Route path={routes.APOD} element={<APODPage/>}/>
                    <Route path={routes.MARS_ROVER} element={<MarsRoverPage/>}/>
                    <Route path={routes.NEO} element={<NEOPage/>}/>
                    <Route path={routes.EARTH_IMAGERY} element={<EarthImageryPage/>}/>
                    <Route path={routes.DETAILS} element={<DetailsPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}