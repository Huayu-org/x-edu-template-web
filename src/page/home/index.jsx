import { getUUID } from '@/service/uuid'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function Home() {
	const navigate = useNavigate()

	async function handleGetUUID() {
		const uuid = await getUUID()
		console.log('uuid', uuid)
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<div className="space-y-4">
				<Button type="primary" onClick={() => navigate('/detail')}>
					有权限 跳转 /detail
				</Button>
				<Button type="primary" onClick={() => navigate('/detail?auth=false')}>
					没有权限 跳转 /detail
				</Button>
				<Button type="primary" onClick={handleGetUUID}>
					获取 UUID
				</Button>
			</div>
		</div>
	)
}
