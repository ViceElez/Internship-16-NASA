import { BrowserRouter, Route, Routes } from "react-router";
import {routes} from './constants/routes';
import { APODDetailPage, APODPage, EarthImageryPage, HomePage, Layout, MarsRoverDetailPage, MarsRoverPage, NEOPage } from "./pages/index";
import {ScrollToTop} from './components/index';

export const Router=()=>{
    return(
        <BrowserRouter>
        <ScrollToTop/>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path={routes.HOME} element={<HomePage/>}/>
                    <Route path={routes.APOD} element={<APODPage/>}/>
                    <Route path={routes.MARS_ROVER} element={<MarsRoverPage/>}/>
                    <Route path={routes.NEO} element={<NEOPage/>}/>
                    <Route path={routes.EARTH_IMAGERY} element={<EarthImageryPage/>}/>
                    <Route path={routes.APOD_DETAILS} element={<APODDetailPage/>}/>
                    <Route path={routes.MARS_ROVER_DETAILS} element={<MarsRoverDetailPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}