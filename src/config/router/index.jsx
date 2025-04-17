import BasicLayout from '@/component/Layout/BasicLayout'
import Error from '@/component/Status/Error'
import Home from '@/page/home'
import { LazyImport } from '@/util/route'
import { getUrlQuery } from '@/util/url'
import { lazy } from 'react'
import { createBrowserRouter, redirect } from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: <BasicLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/detail',
				loader: ({ request }) => {
					const { auth } = getUrlQuery(request.url)
					if (auth === 'false') {
						return redirect('/403')
					}
					return null
				},
				element: LazyImport(lazy(() => import('@/page/detail'))),
			},
			{
				path: '/403',
				element: <Error status={403} />,
			},
			{
				path: '*',
				element: <Error status={404} />,
			},
		],
	},
])

export default router
