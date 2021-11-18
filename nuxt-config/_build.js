/**
 * Additional build configurations & webpack config extension
 * https://nuxtjs.org/api/configuration-build
 */

const path = require('path')
const webpack = require('webpack')
const sassVars = require('../assets/variables/index.js')

module.exports = {

  analyze: false,

  // fix devtools styles break when onchange
  cssSourceMap: false,

  plugins: [

    // globals
    new webpack.ProvidePlugin({
      gsap: ['gsap', 'gsap'],
      _get: ['lodash/get'],
      $propTypes: [path.resolve(__dirname, '../assets/js/modules/PropTypes/index.js'), 'default']
    })
  ],

  extend (config, { isDev, isClient }) {
    // eslint
    if (isDev && isClient) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      })
    }

    // stylelint
    if (isDev) {
      const StyleLintPlugin = require('stylelint-webpack-plugin')
      config.plugins.push(new StyleLintPlugin({
        files: '**/*.{scss,vue}',
        configFile: 'stylelint.config.js'
      }))
    }

    // SVG Loader
    const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))

    svgRule.test = /\.(png|jpe?g|gif|webp)$/

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        },
        {
          loader: 'vue-svg-loader',
          options: {
            svgo: false
          }
        }
      ]
    })

    // make '~/assets/variables' available in .scss files (rebuild after changes)
    config.module.rules.forEach(rule => {
      if (/scss/.test(rule.test.toString())) {
        rule.oneOf.forEach(key => {
          if (key.use) {
            key.use.push({
              loader: '@epegzz/sass-vars-loader',
              options: {
                syntax: 'sсss',
                vars: { ...sassVars }
              }
            })
          }
        })
      }
    })
  }
}
