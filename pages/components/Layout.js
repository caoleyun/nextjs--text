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