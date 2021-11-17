const CKAN = require('./ckan')()

module.exports = class populate {
  async populateDB () {
    await CKAN.setInstancesData()
  }
}
