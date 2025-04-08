import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

type Stats = {
    STR: number
    INT: number
    AGI: number
    HP: number
    MP: number
}

type Choice = {
    id: number
    text: string
    result: string
    effect: Partial<Stats>
}

const mockEvent = {
    description: '어두운 숲에서 이상한 소리를 들었습니다. 어떻게 하시겠습니까?',
    choices: [
        {
            id: 1,
            text: '조용히 숨는다',
            result: '당신은 바위 뒤에 몸을 숨겼습니다.',
            effect: { AGI: -1, MP: +2 },
        },
        {
            id: 2,
            text: '정체를 밝힌다',
            result: '소리는 단순한 바람 소리였습니다.',
            effect: { STR: +1 },
        },
        {
            id: 3,
            text: '달아난다',
            result: '당신은 너무 급히 달려 체력을 소모했습니다.',
            effect: { HP: -10 },
        },
    ] as Choice[],
}

export default function StagePage() {
    const location = useLocation()
    const navigate = useNavigate()

    const initialStats = location.state as Stats
    const [stats, setStats] = useState<Stats>(initialStats)
    const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null)

    const handleChoice = (choice: Choice) => {
        setStats((prev) => {
            const updated = { ...prev }
            for (const key in choice.effect) {
                const stat = key as keyof Stats
                updated[stat] += choice.effect[stat] || 0
            }
            return updated
        })
        setSelectedChoice(choice)
    }

    const handleNext = () => {
        // 임시로 게임오버로 이동
        navigate('/gameover', { state: { stats } })
    }

    useEffect(() => {
        if (!initialStats) navigate('/')
    }, [initialStats, navigate])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-4">
            <h1 className="text-xl font-bold mb-4">🌲 Stage 1</h1>
            <p className="mb-6 text-center text-lg max-w-md">{mockEvent.description}</p>

            {!selectedChoice ? (
                <div className="flex flex-col gap-4">
                    {mockEvent.choices.map((choice) => (
                        <button
                            key={choice.id}
                            onClick={() => handleChoice(choice)}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                        >
                            {choice.text}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-green-300 mb-4">{selectedChoice.result}</p>
                    <div className="mb-4">
                        {Object.entries(selectedChoice.effect).map(([key, value]) => (
                            <p key={key}>
                                {key}: {value >= 0 ? '+' : ''}
                                {value}
                            </p>
                        ))}
                    </div>
                    <button
                        onClick={handleNext}
                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
                    >
                        다음 스테이지
                    </button>
                </div>
            )}
            {/* 기존 스탯 하단 텍스트 부분 교체 */}
            <div className="mt-8 w-full max-w-xs space-y-4 text-sm text-gray-300">
                <div>
                    <p className="mb-1 text-red-400">HP: {stats.HP} / 100</p>
                    <div className="w-full bg-gray-700 h-4 rounded">
                        <div
                            className="bg-red-500 h-4 rounded transition-all duration-300"
                            style={{ width: `${(stats.HP / 100) * 100}%` }}
                        />
                    </div>
                </div>

                <div>
                    <p className="mb-1 text-blue-400">MP: {stats.MP} / 50</p>
                    <div className="w-full bg-gray-700 h-4 rounded">
                        <div
                            className="bg-blue-500 h-4 rounded transition-all duration-300"
                            style={{ width: `${(stats.MP / 50) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <p>STR: {stats.STR} / INT: {stats.INT} / AGI: {stats.AGI}</p>
                </div>
            </div>

        </div>
    )
}
