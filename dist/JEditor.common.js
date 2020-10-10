if (process.env.NODE_ENV === 'production') {
  module.exports = require('./JEditor.common.prod.js')
} else {
  module.exports = require('./JEditor.common.dev.js')
}
