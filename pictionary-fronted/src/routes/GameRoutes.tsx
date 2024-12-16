import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import GamePage from "../pages/GamePage"

const GameRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pictionary" element={<GamePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default GameRoutes
