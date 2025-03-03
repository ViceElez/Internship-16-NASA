import { useState, useEffect } from "react";
import { routes } from "../constants/routes";
import "../index.css";
import VariantButtonGroup from "./GroupedButtons";

export const Header = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        const layout = document.getElementById("layout");
        if (layout) {
            if (theme === "light") {
                layout.classList.add("layout-container-light");
            } else {
                layout.classList.remove("layout-container-light");
            }
            layout.setAttribute("data-theme", theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <header>
            <h1>NASA EXPLORER</h1>
            <nav>
                <VariantButtonGroup 
                    path1={routes.HOME} buttonMessage1="Home"
                    path2={routes.APOD} buttonMessage2="APOD" 
                    path3={routes.MARS_ROVER} buttonMessage3="Mars Rover Photos" 
                    path4={routes.NEO} buttonMessage4="NEO"
                    path5={routes.EARTH_IMAGERY} buttonMessage5="Earth Imagery"
                />
                <button onClick={toggleTheme} className="toggle-theme">
                    {theme === "dark" ? "Light 🌞" : "Dark 🌜"}
                </button>
            </nav>
        </header>
    );
};
