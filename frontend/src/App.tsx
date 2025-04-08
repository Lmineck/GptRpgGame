import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'  // Tailwind CSS가 이 안에 들어 있음

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex flex-col items-center justify-center gap-6">
            <div className="flex gap-4">
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="w-16 h-16" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="w-16 h-16" alt="React logo" />
                </a>
            </div>
            <h1 className="text-4xl font-bold">Vite + React + Tailwind</h1>
            <div className="bg-white text-black rounded-lg px-6 py-4 shadow-lg">
                <button
                    onClick={() => setCount((count) => count + 1)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    count is {count}
                </button>
                <p className="mt-2 text-sm text-gray-700">
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
        </div>
    )
}

export default App
