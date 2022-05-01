module.exports = {
  entry: './src/index.js',
  watch: true,
  output: {
	  path: `${__dirname}/public/dist`,
	  filename: 'bundle.js'
  },
};