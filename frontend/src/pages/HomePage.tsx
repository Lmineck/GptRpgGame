import { useNavigate } from 'react-router-dom'

export default function HomePage() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
            <h1 className="text-4xl font-bold mb-6">STAGE🔸FATE</h1>
            <p className="mb-8 text-center text-lg">당신의 선택이 운명을 바꿉니다</p>
            <button
                onClick={() => navigate('/stat')}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded text-white"
            >
                게임 시작
            </button>
        </div>
    )
}
