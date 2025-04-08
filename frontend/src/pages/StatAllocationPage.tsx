import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Stats = {
    STR: number
    INT: number
    AGI: number
}

const MAX_POINTS = 20

export default function StatAllocationPage() {
    const navigate = useNavigate()
    const [stats, setStats] = useState<Stats>({ STR: 5, INT: 5, AGI: 5 })

    const totalUsed = stats.STR + stats.INT + stats.AGI
    const remaining = MAX_POINTS - totalUsed

    const handleChange = (stat: keyof Stats, delta: number) => {
        const newValue = stats[stat] + delta
        if (newValue < 0 || totalUsed + delta > MAX_POINTS) return
        setStats((prev) => ({ ...prev, [stat]: newValue }))
    }

    const handleStart = () => {
        const baseStats = {
            ...stats,
            HP: 100,
            MP: 50,
        }
        navigate('/stage', { state: baseStats })
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white px-4">
            <h1 className="text-3xl font-bold mb-4">스탯을 분배하세요</h1>
            <p className="mb-6">총 사용 가능 포인트: <span className="text-yellow-400 font-semibold">{MAX_POINTS}</span> | 남은: <span className="text-green-400 font-semibold">{remaining}</span></p>

            <div className="space-y-4 w-full max-w-xs">
                {(['STR', 'INT', 'AGI'] as (keyof Stats)[]).map((stat) => (
                    <div key={stat} className="flex justify-between items-center">
                        <span className="w-16 font-semibold">{stat}</span>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleChange(stat, -1)}
                                className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-500"
                            >-</button>
                            <span className="w-6 text-center">{stats[stat]}</span>
                            <button
                                onClick={() => handleChange(stat, 1)}
                                className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-500"
                            >+</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <p className="text-sm text-gray-300">기본 체력: <b>100</b> / 마나: <b>50</b></p>
            </div>

            <button
                onClick={handleStart}
                disabled={remaining !== 0}
                className={`mt-8 px-6 py-3 rounded font-bold transition ${
                    remaining === 0 ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                }`}
            >
                게임 시작
            </button>
        </div>
    )
}
