import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import StatAllocationPage from './pages/StatAllocationPage'
import StagePage from './pages/StagePage'
import ResultPage from './pages/ResultPage'
import GameOverPage from './pages/GameOverPage'

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stat" element={<StatAllocationPage />} />
            <Route path="/stage" element={<StagePage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/gameover" element={<GameOverPage />} />
        </Routes>
    )
}
