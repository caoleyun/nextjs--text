https://caoleyun.github.io/nextjs--text/
# nextjs--text
nextjs--测试项目

下载后 
$ cnpm install 
运行
$ npm run dev




在next.js生产打包阶段打包出来的js文件请求路径中带有版本号，而真实打包出来的文件夹却没有实际对应的目录，也就是打包出来的是虚拟目录，这里如果使用nginx就需要特别注意。好在next.js提供配置项来修改build id，以下是我的真实代码：

// next.config.js
module.exports = {
  generateBuildId: async () => {
    // For example get the latest git commit hash here
    return 'v1'
  }
}

这样打包出来的虚拟路径大概是_next/v1/page/xxx.js，如果你使用cdn前缀，这里有一点区别，但是版本号依然存在。


				搭建react+nextjs 服务端渲染 环境


*******************************************************************************************

//前言
//www.npmjs.com
////最好先用cnpm
1. Next.js 只支持React 16.
2. http://nextjs.frontendx.cn
3. next规定所有页面文件写在 pages文件夹下
4. 在根目录下新建文件夹叫static。代码可以通过/static/来引入相关的静态资源	不要自定义静态文件夹的名字，只能叫static ，因为只有这个名字 Next.js 才会把它当作静态资源。



*******************************************************************************************

//初始化 package.json
$  npm init -y


*******************************************************************************************


//下载依赖   -S 和--save 一个作用  把 下载的依赖存到package.json文件中
npm install next react react-dom -S


*******************************************************************************************


//配置package.json
{
	"scripts":{
		"dev":"next"
	}
}


*******************************************************************************************


//next规定所有页面文件写在 pages文件夹下
在根目录创建 pages文件夹 
在pages文件夹 下 创建 index.js

//index.js 有状态组件
import React from 'react';

class Index extends React.Component{
	render(){
		return (
			<div>
				gdfgfg、、、
			</div>
		)
	}
}
export default Index;
//index.js 无状态组件
export default ()=>(
	<div>
		gdfgfg、、、
	</div>
)


*******************************************************************************************


//修改 package.json
//启动命令

//原来的
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
//修改后的
"scripts": {
    "dev": "next"
  }


*******************************************************************************************

 //启动项目 默认3000端口
 $ npm run dev


*******************************************************************************************




 //热替换  基于webpack做出的    next包括此功能
 

*******************************************************************************************
 //样式的使用  
 $ npm install -S @zeit/next-css
 //如果未成功  手动添加 package.json
 //或者 将node_modules 全部删除  重新   npm install 
 //或者使用 cnpm  yarn
 


 //配置样式
 
 //next.config.js
const withCSS = require('@zeit/next-css')
module.exports = withCSS()

//在根目录下创建 styles文件夹
//在styles文件夹 中写css文件   **.css
//在组件中 引入.css   import "../styles/**.css"


//如果导入不成功
//改变next.config.js文件
const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  cssModules: true
})


//同样 
//www.npmjs.com  搜索
@zeit/next-css
@zeit/next-cass
@zeit/next-less
@zeit/next-stylus

//配置 less
npm install --save @zeit/next-less less


//使用less  记得将css或者其他的 next.config.js 文件配置删除  
//那么用了less  引入css  会报错！！解决方法 看下一条
// next.config.js
const withLess = require('@zeit/next-less')
module.exports = withLess()

// next.config.js
const withLess = require('@zeit/next-less')
module.exports = withLess({
  cssModules: true
})

//解决方法   既可以使用css又可以使用less等等等  sass等类比
const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');
module.exports ={
  webpack(config,...args){
  		config=withCSS().webpack(config,...args);
  		config=withLess().webpack(config,...args);
  		return config;
  }
}


//添加内联样式
<style jsx>{`

`}</style>

//写在 
render(){
	return(
		<style jsx>{`

		`}</style>
	)
}




******************************************************************************************
//定制Head

		//方法一
//在需要添加 头部的  页面 添加
import Head from 'next/head';
export default () =>(
  <div>
    <Head>
      <title>My page title</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
    </Head>
    <p>Hello world!</p>
  </div>
)

//如果写了两个  Head   我们定义key属性来避免重复的<head>标签，保证<head>只渲染一次，
//左后出现的  Head  会被渲染
//  注意  在卸载组件时，<head>的内容将被清除。请确保每个页面都在其<head>定义了所需要的内容，而不是假设其他页面已经加过了

		//方法二
//定制全局	layout	并复用
//在 pages文件夹中  新建文件夹components 添加 组件  Layout.js  


//Layout.js 
import Head from 'next/head';

//从参数 props  中结构出 children
export default ({children})=>(
	<div>
		<Head>
		    <title>测试阿屎擦</title>
		    <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
		</Head>
		{children}
		<footer>
			版权所有************
		</footer>
	</div>
)  


********************************
//这时 每个页面  不必再引用  import Head from 'next/head';
//而是 引用   import Layout from './components/Layout.js';
import Layout from './components/Layout.js';
export default ()=>(
	<Layout>
		<div>
			组件内容
		</div>
	</Layout>
)




******************************************************************************************
//next  生命周期
//next 具有react所有生命周期  还有自己的生命周期
getInitialProps   在初始化组件 props 属性时被调用 ，只在服务器端运行！！，没有跨域的限制。
					不能用于子组件上，只能用于页面组件上
						在这个组件内的请求  因为是服务端运行所以 客户端看不见请求的 具体内容   安全（用于公司内部资源调用）

参数
pathname  	访问页面路径
query		？后面传输的数据  参数
asPath		全路径？
req 		客户端发送到服务器端
res			服务器端反应

******************************************************************************************
cnpm install axios -S
axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，本质上也是对原生XHR的封装，只不过它是Promise的实现版本，符合最新的ES规范，它本身具有以下特征：
1.从浏览器中创建 XMLHttpRequest
2.支持 Promise API
3.客户端支持防止CSRF
4.提供了一些并发请求的接口（重要，方便了很多的操作）
5.从 node.js 创建 http 请求
6.拦截请求和响应
7.转换请求和响应数据
8.取消请求
9.自动转换JSON数据



******************************************************************************************
使用next 上面的环境 
写一个 链接api得到数据的页面
破解防盗链
"X-Host":"mall.film-ticket.film.list"

import React from 'react';
import axios from 'axios';

class Films extends React.Component{

	static async getInitialProps(){
		const res=await axios.get("https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=4200279",{
			headers:{
				"X-Host":"mall.film-ticket.film.list"
			}
		});

		return {
			films:res.data.data.films
		}
	}

	render(){
		return(
			<div>
				<h2>电影</h2>
				<ul>
					{
						this.props.films.map((item)=>{
							return <li key={item.filmId}>
							{item.name}
							<img src={item.poster} />
							</li>
						})
					}
				</ul>
			</div>
		)
	}
}

export default Films;

******************************************************************************************

路由1111

import Head from 'next/head';
import Link from 'next/link';


//从参数 props  中结构出 children
export default ({children})=>(
	<div>
		<Head>
		    <title>共同的标题</title>
		    <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
		</Head>
		<div>
			<Link href="/"><a>主页</a></Link> |
			<Link href="/films"><a>电影</a></Link> |
		</div>
		{children}
		<footer>
			版权所有************
		</footer>
	</div>
) 

//注意 Link 里面有 a标签
<Link href="/"><a>主页</a></Link> 
//路由不能大写》？
******************************************************************************************


路由222222
编程式跳转
index.js 点击h1 转向 detail.js
//index.js
import React from 'react';
import '../styles/app.less';
import '../styles/app.css';
// import Head from 'next/head';
import Layout from './components/Layout.js';

import Router from 'next/router';


class Index extends React.Component{
	render(){
		return (
			<Layout>
				<div>
					<p>gdfgfg、、sdsdfd、</p>
					<h1 onClick={()=>Router.push('/detail')}>sdsdf</h1>
				</div>
			</Layout>
		)
	}
}
export default Index;

//default.js
export default()=>(
	<div>
		<h2>default页面</h2>
	</div>
)
******************************************************************************************

//路由传参！！！
////index.js
<h1 onClick={()=>Router.push('/detail?haha='+1)}>sdsdf</h1>


//default.js
export default({url})=>(
	<div>
		<h2>default页面</h2>
		{url.query.haha}
	</div>
)


******************************************************************************************



//优化路由
////index.js
///
<h1 onClick={()=>Router.push(
	{
		pathname:"/detail",
		query:{haha:321}
	}
)}>sdsdf</h1>


******************************************************************************************


//路由遮盖！！！！
//<Link as="l" href="/films"><a>电影</a></Link> 
// 添加 as  
import Head from 'next/head';
import Link from 'next/link';


export default ({children})=>(
	<div>
		<Head>
		    <title>共同的标题</title>
		    <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
		</Head>
		<div>
			<Link href="/"><a>主页</a></Link> |
			<Link as="l" href="/films"><a>电影</a></Link> |
		</div>
		{children}
		<footer>
			版权所有************
		</footer>
	</div>
) 

******************************************************************************************
预加载
懒加载
  

路由的预加载 
方法一 <Link>标签添加prefetch属性
			例如	 <Link href="/" prefetch ><a>主页</a></Link>
方法二 使用withRouter高阶组件，在组件中使用
		router.prefetch('dynamic');


//Layout.js
import Head from 'next/head';
import Link from 'next/link';
import withRouter from 'next/router';


//从参数 props  中结构出 children
export default ({children,router})=>(
	<div>
		<Head>
		    <title>共同的标题</title>
		    <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
		</Head>
		<div>
			<Link href="/"><a>主页</a></Link> |
			{router.prefetch('/')}
			<Link href="/films"><a>电影</a></Link> |
		</div>
		{children}
		<footer>
			版权所有************
		</footer>
	</div>
) 





******************************************************************************************
路由事件                      路由守卫（权限设置？）

routeChangeStart(url) 路由跳转开始
routeChangeComplete(url) 路由跳转完成
routeChangeError(err,url) 路由跳转失败
beforeHistoryChange(url) 浏览器历史改变



//Layout.js
import Head from 'next/head';
import Link from 'next/link';
import  Router from 'next/router';

Router.events.on('routerChangeStart',(url)=>{
	if('url'=='/detail'){
		//当路由为 /list 时候 要做的事情   比如跳转  权限验证等等？
		location.href='/films';
	}
})


//从参数 props  中结构出 children
export default ({children})=>(
	<div>
		<Head>
		    <title>共同的标题</title>
		    <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
		</Head>
		<div>
			<Link href="/"><a>主页</a></Link> |
			<Link href="/films"><a>电影</a></Link> |
		</div>
		{children}
		<footer>
			版权所有************
		</footer>
	</div>
) 


******************************************************************************************

路由跳转   路由拦截

import Head from 'next/head';
import Link from 'next/link';
import  Router from 'next/router';


Router.onRouteChangeStart = url=> {
  console.log('App is changing to: ', url)

  if(url=='/haha2'){
		//当路由为 /list 时候 要做的事情   比如跳转  权限验证等等？
		location.href='/haha1';
	}
}




//从参数 props  中结构出 children
export default ({children})=>(
	<div>
		<Head>
		    <title>共同的标题</title>
		    <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
		</Head>
		<div>
			<Link href="/"><a>主页</a></Link> |
			<Link href="/films"><a>电影</a></Link> |
			<Link href="/haha1"><a>haha1</a></Link> |
			<Link href="/haha2"><a>haha2</a></Link> |
		</div>
		{children}
		<footer>
			版权所有************
		</footer>
	</div>
) 

******************************************************************************************
自定义错误页面

在pages目录里面 新建  _error.js  定制自己的错误页面
只需要 新建页面  _error.js      然后重启服务器



//坑 无状态组件  是()!!!  不是 {}

export default ()=>()
//_error.js 
export default ()=>(
	<h2>自定义错误页面</h2>
)



******************************************************************************************
在nextjs  框架里面你使用 redux                    redux 

使用脚手架 创建工程

使用npm :
$ npm install -g create-next-app
$ create-next-app --example with-redux with-redux-app

使用yarn(推荐)  
with-redux-app 为项目名字
yarn create-next-app --example with-redux with-redux-app

使用npx
npx create-next-app --example with-redux with-redux-app



******************************************************************************************
创建完成后

程序文件解读

_app.js  覆盖next的app 配置  全局引入redux

with-redux-store.js  高阶组件，  用来向 _app.js 注入 store

store.js  初始化 store 和编写 reducer



******************************************************************************************
运行项目
$ npm run dev

默认访问3000端口

初始化 是官方的一个小案例





******************************************************************************************
使用 next 部署
  打包  next build
  运行	next start -p 80


  也可以与express 结合部署


******************************************************************************************

未完
