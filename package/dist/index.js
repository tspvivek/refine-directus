
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./refine-directus.cjs.production.min.js')
} else {
  module.exports = require('./refine-directus.cjs.development.js')
}
