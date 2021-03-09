const PACKAGE = require('../business/package')()

module.exports = function () {
  async function getPackages (req, res) {
    try {
      res.send(await PACKAGE.findPackages())
    } catch (error) {
      res.status(500).jsonp({ message: error.message })
    }
  }

  async function postPackages (req, res) {
    try {
      res.send(await PACKAGE.addNewPackage(req.body))
    } catch (error) {
      res.status(500).jsonp({ message: error.message })
    }
  }

  async function getPackagesByInstance (req, res) {
    const { instanceId } = req.params
    try {
      res.send(await PACKAGE.findPackageByInstance(instanceId))
    } catch (error) {
      res.status(500).jsonp({ message: error.message })
    }
  }

  return {
    getPackages,
    postPackages,
    getPackagesByInstance
  }
}
