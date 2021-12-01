

# 一、antd的使用

官网：https://ant-design.gitee.io/components/overview-cn/

安装

yarn add antd

引入需要的组件：

```react
import { Button, Input } from 'antd';
```

使用：

```react
<Button type="primary">Primary Button</Button>
<Input placeholder="Basic usage" />
```

# 二、antd的按需引入+配置主题

```react
1.安装依赖：yarn add react-app-rewired customize-cra babel-plugin-import less less-loader

2.修改package.json
				....
					"scripts": {
						"start": "react-app-rewired start",
						"build": "react-app-rewired build",
						"test": "react-app-rewired test",
						"eject": "react-scripts eject"
					},
				....
                
3.根目录下创建config-overrides.js
				//配置具体的修改规则
				const { override, fixBabelImports,addLessLoader} = require('customize-cra');
				module.exports = override(
					fixBabelImports('import', {
						libraryName: 'antd',
						libraryDirectory: 'es',
						style: true,
					}),
					addLessLoader({
						lessOptions:{
							javascriptEnabled: true,
							modifyVars: { '@primary-color': 'green' },
						}
					}),
				);

4.备注：不用在组件里亲自引入样式了，即：import 'antd/dist/antd.css'应该删掉
```

