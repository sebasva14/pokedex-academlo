import { createBrowserRouter } from "react-router-dom"
import Layout from "../components/Layout";
import ProtectorRouter from "../components/ProtectorRouter";
import Home from "../views/Home"
import Pokedex from "../views/Pokedex";
import PokemonDetail from "../views/PokemonDetail";
import { pokedexLoader } from "./loaders/pokedexLoader";
//hola

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/pokedex",
        element: (
        <ProtectorRouter>
            <Layout />
        </ProtectorRouter>
        ),
        children: [
            {
                path: ":id",
                element: <PokemonDetail />
            },
            {
                path: "",
                element: <Pokedex />,
                loader: pokedexLoader
            }
        ]
    },
]);