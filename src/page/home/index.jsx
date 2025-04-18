import { useTheme } from '@/context/themeContext'
import { getUUID } from '@/service/uuid'
import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
	const navigate = useNavigate()
	const { theme, toggleTheme } = useTheme()

	async function handleGetUUID() {
		const uuid = await getUUID()
		console.log('uuid', uuid)
	}

	const baseContainer = 'flex min-h-screen items-center justify-center'
	const themeStyles = {
		default: 'bg-gray-100 text-black',
		dark: 'bg-gray-800 text-white',
	}
	const containerClass = `${baseContainer} ${themeStyles[theme] || themeStyles.default}`

	return (
		<div className={containerClass}>
			<div className="space-y-4 rounded-lg bg-white p-6 shadow-md dark:bg-gray-900">
				<Button type="primary" onClick={() => navigate('/detail')}>
					有权限 跳转 /detail
				</Button>
				<Button type="primary" onClick={() => navigate('/detail?auth=false')}>
					没有权限 跳转 /detail
				</Button>
				<Button type="primary" onClick={handleGetUUID}>
					获取 UUID
				</Button>
				<Button onClick={toggleTheme}>切换主题 (当前：{theme})</Button>
			</div>
		</div>
	)
}
