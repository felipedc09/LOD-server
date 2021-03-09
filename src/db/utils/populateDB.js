const CKAN = require('./ckan')()

module.exports = class populate {
  async populateDB () {
    console.log('populate DB')
    await CKAN.setInstancesData()
  }
}
