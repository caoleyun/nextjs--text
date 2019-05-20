import React from 'react';
import axios from 'axios';
import Layout from './components/Layout.js';


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
			<Layout>
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
			</Layout>
		)
	}
}

export default Films;