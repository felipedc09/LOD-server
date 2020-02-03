const CKAN = require('../bussines/ckan')()

module.exports = function instance() {
    async function getInstanceGraphic(req, res) {
        const { instanceName } = req.params
        console.log(req.params)
        try {
            res.send(await CKAN.generateVisualizationData(instanceName))
        } catch (error) {
            console.log(error.message)
            console.log(error);
            res.status(500).jsonp({ message: error.message })
        }
    }

    return {
        getInstanceGraphic
    }
}