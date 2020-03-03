const INSTANCE = require('../bussines/instance')()

module.exports = function instance() {

    async function getInstances(req, res) {
        try {
            res.send(await INSTANCE.findInstances())
        } catch (error) {
            console.log(error.message)
            console.log(error)
            res.status(500).jsonp({ message: error.message })
        }
    }

    async function postInstances(req, res) {
        let { instance } = req.body
        try {
            res.send(await INSTANCE.addNewInstance(instance))
        } catch (error) {
            console.log(error.message)
            console.log(error)
            res.status(500).jsonp({ message: error.message })
        }
    }

    async function getInstancesByURL(req, res) {
        const { instanceName } = req.params
        try {
            console.log('entro', instanceName)
            res.send(await INSTANCE.findInstanceByName(instanceName))
        } catch (error) {
            console.log(error)
            res.status(500).jsonp({ message: error.message })
        }
    }

    return {
        getInstances,
        postInstances,
        getInstancesByURL
    }
}