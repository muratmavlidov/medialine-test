module.exports = {
  webpack: (config, options) => {
    config.module.rules.push(
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: "file-loader",
        options: {
        outputPath: '../public/images/', // if you don't use ../ it will put it inside ".next" folder by default
        publicPath: 'images/',
        }
      },
      
    )
    return config
  },
}