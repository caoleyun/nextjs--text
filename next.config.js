const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');
module.exports ={
  webpack(config,...args){
  		config=withCSS().webpack(config,...args);
  		config=withLess().webpack(config,...args);
  		return config;
  }
}