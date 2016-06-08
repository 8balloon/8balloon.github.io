var autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    devServer: 'webpack-dev-server/client?http://localhost:8080',
    devServerHot: 'webpack/hot/dev-server',
    jsx: './src/index.js',
    html: './src/index.html'
  },
  output: {
      path: './',
      filename: 'bundle.js'
  },
  module: {
      loaders: [
          {
              test: /libs|\.jsx?$/,
              exclude: /node_modules/,
              loader: 'babel', //'babel-loader?presets[]=react,presets[]=es2015'
              query: {
                  presets: ['react', 'es2015'],
                  cacheDirectory: true
              }
          },
          {
              test: /\.s?css$/,
              loaders: ['style', 'css', 'postcss', 'sass']
          },
          {
              test: /(assets.*)|(index\.html$)/,
              exclude: /node_modules/,
              loader: 'file?name=[name].[ext]'
          }
      ]
  },
  postcss: [
    autoprefixer()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
}
