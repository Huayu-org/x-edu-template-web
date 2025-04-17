# x-edu-template-web

## 开始

```bash
npm install

# develop
npm run dev

# preproduction
npm run dev:pre

# product
npm run dev:pro
```

## 技术栈

- [react18](https://18.react.dev/)
- 组件库 [antd5](https://ant-design.antgroup.com/index-cn)
- 路由 [react-router](https://reactrouter.com/start/data/installation)
- 样式 [tailwindcss4](https://tailwindcss.com/)
- 请求 基于 [axios](https://axios-http.com/) 封装
- 构建 [vite6](https://cn.vitejs.dev/)
- 风格 [eslint](https://eslint.org/)、[prettier](https://prettier.io/)

## 项目结构

```plaintext
x-edu-template-web/
├── public/                  # 静态资源文件夹
├── src/                     # 源代码文件夹
│   ├── assets/              # 静态资源
│   ├── component/           # 公共组件
│   │   ├── Layout/          # 布局
│   │   ├── Theme/           # 主题相关组件
│   │   └── Status/          # 状态组件
│   ├── config/              # 配置文件
│   │   └── env              # 环境变量配置
│   │   └── router           # 路由配置
│   │   └── request          # 请求配置
│   ├── context/             # React Context 文件夹
│   ├── hooks/               # 常用 hooks，优先使用 ahooks
│   ├── page/                # 页面
│   ├── service/             # 服务
│   ├── util/                # 工具函数
│   │   └── theme.js         # 主题工具函数
│   ├── App.jsx              # 应用主组件
│   └── index.jsx            # 应用入口文件
├── .gitignore               # Git 忽略文件
├── .prettierrc              # prettierrc 配置
├── eslint.config.js         # eslint 配置
├── index.html               # 应用入口
├── package.json
├── README.md                # 项目说明文档
├── tailwind.config.js       # TailwindCSS 配置文件
├── vite.config.js           # Vite 配置文件
└── package-lock.json        # 锁定依赖版本
```

## 路由

使用 `react-router7` 的 `Data` 模式配置

## 配置

```js
const _global_env = window._global_env || process.env._global_env || 'develop'
```

根据 `_global_env` 的值加载对应的环境配置。支持 `develop` `preproduction` `product` 三个环境，根据需要自行添加。

## 请求

基于 `axios` 封装

通常针对一个域名下的服务创建请求。以 uuid 服务为例：

### 添加 api 域名配置，不用环境域名不同

```js
// /config/env/product/api.js
const config = {
	uuid: '//www.uuidtools.com', // test
}

export default config
```

### 创建请求实例

```js
// config/request/uuid
import { generateCommonAPI } from './helper'

const uuidAPI = generateCommonAPI({
	hostKey: 'uuid',
	prefix: '/api',
})

export default uuidAPI
```

### 创建服务

```js
// service/uuid
import uuidAPI from '@/config/request/uuid'

export async function getUUID() {
	const response = await uuidAPI.get('/generate/v4')
	return response.data
}
```

### 调用服务

```js
await getUUID()
```

## 数据流

使用 React Context API 来实现数据流

## 主题

支持默认主题和暗黑主题。

使用 `tailwindcss` 的 [`Dark mode`](https://tailwindcss.com/docs/dark-mode) 和 `antd` [定制主题](https://ant-design.antgroup.com/docs/react/customize-theme-cn) 来实现。

代码参考 `/component/Theme`

## 构建

使用 vite6 进行构建，没有做特殊优化，后续根据项目情况进行优化

## 安装插件

- tailwindcss intelliSense
