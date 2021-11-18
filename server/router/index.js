const Router = require('koa-router')
const koaBody = require('koa-body')({ multipart: true })
const GlobalDataController = require('../controllers/global-data.controller')
const PagesController = require('../controllers/pages.controller')
const response = require('../db/uk/pages/form/post-response.json')

const router = new Router({
  prefix: '/fake-api'
})

/**
 *  Global data route
 */

router.get('/global-data', GlobalDataController.get)

/**
 *  All other routes
 */

router.get('*', PagesController.get)

/**
 * For testing forms
 */
router.post('/submit', koaBody, function (ctx) {
  const errors = Object.keys(response.errors).reduce((acc, current) => {
    const val = ctx.request.body[current]
    const typedVal = Number.isInteger(val) ? +val : val
    if (!typedVal) {
      acc[current] = response.errors[current]
    }
    return acc
  }, {})

  console.log(errors)

  if (Object.keys(errors).length) {
    ctx.status = 422
    ctx.body = errors
  } else {
    ctx.status = 200
    ctx.body = response.success
  }
})

module.exports = router
