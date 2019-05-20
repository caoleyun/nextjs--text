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
					<h1 onClick={()=>Router.push(
						{
							pathname:"/detail",
							query:{haha:12}
						}
					)}>sdsdf</h1>
				</div>
			</Layout>
		)
	}
}
export default Index;