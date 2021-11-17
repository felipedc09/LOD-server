const INSTANCE = require('../business/instance')()

module.exports = function instance () {
  async function getInstances (req, res) {
    try {
      const resu = await INSTANCE.findInstances()
      console.log(resu)
      res.send(resu)
    } catch (error) {
      console.log(error.message)
      console.log(error)
      res.status(500).jsonp({ message: error.message })
    }
  }

  async function getInstancesById (req, res) {
    try {
      res.send(await INSTANCE.findInstanceById(req.params.id))
    } catch (error) {
      console.log(error.message)
      console.log(error)
      res.status(500).jsonp({ message: error.message })
    }
  }

  async function postInstances (req, res) {
    try {
      res.send(await INSTANCE.addNewInstance(req.body.instance))
    } catch (error) {
      console.log(error.message)
      console.log(error)
      res.status(500).jsonp({ message: error.message })
    }
  }

  async function deleteInstances (req, res) {
    try {
      res.send(await INSTANCE.deleteInstance(req.params.id))
    } catch (error) {
      console.log(error.message)
      console.log(error)
      res.status(500).jsonp({ message: error.message })
    }
  }

  return {
    getInstances,
    getInstancesById,
    postInstances,
    deleteInstances
  }
}
