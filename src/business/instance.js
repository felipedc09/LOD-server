const instanceDB = require('../db/lib/instance')()

module.exports = function instance () {
  async function findInstances () {
    try {
      return instanceDB.findInstances()
    } catch (error) {
      throw new Error('Error finding instances.', error)
    }
  }

  async function findInstanceById (id) {
    try {
      return instanceDB.findInstanceById(id)
    } catch (error) {
      throw new Error('Error finding instances.', error)
    }
  }

  async function addNewInstance (instance) {
    try {
      return instanceDB.createInstance({ ...instance, packagesCount: 0 })
    } catch (error) {
      throw new Error(`Error adding a new instance.${error}`, error)
    }
  }

  async function deleteInstance (instanceId) {
    try {
      return instanceDB.deleteInstance(instanceId)
    } catch (error) {
      throw new Error(`Error adding a new instance.${error}`, error)
    }
  }

  async function findInstanceByName (instanceName) {
    try {
      const instance = instancesFile.instances.find(instance => instance.name === instanceName)
      const packageInfo = ckan.getPackageInfo(instance)
      // packageInfo.accessible = getPercentageAccessibility(packageInfo)
      return packageInfo
    } catch (error) {
      console.error(error)
      throw new Error('Error finding instance by name.', error)
    }
  }

  function analyseData (packageInfo) {
    const accessible = getPercentageAccessibility(packageInfo)
    const relevant = 100
    const open = 0
  }

  function getPercentageAccessibility (packageInfo) {
    let totalPercentage = 1
    const downloadUrl = packageInfo.download_url
    const { resources } = packageInfo
    const { url } = packageInfo
    const ckanUrl = packageInfo.ckan_url

    const accessibilityUrls = [downloadUrl, url, ckanUrl]
    const percentageByField = 1 / (accessibilityUrls.length + 1)

    for (const url of accessibilityUrls) {
      if (!verifyURLState(url)) {
        totalPercentage -= percentageByField
      }
    }
    totalPercentage -= getPercentageByResources(resources) * percentageByField
    return totalPercentage
  }

  function getPercentageByResources (resources) {
    const percentageByResource = 1 / resources.length
    let totalPercentageForResources = 1
    for (const resource of resources) {
      if (!verifyURLState(resource.url)) {
        totalPercentageForResources -= percentageByResource
      }
    }
    return totalPercentageForResources
  }

  async function verifyURLState (url) {
    try {
      await axios.get(url)
      return true
    } catch (error) {
      return false
    }
  }

  function getPercentageRelevance () {

  }

  function getPercentageOpening () {

  }

  return {
    findInstances,
    findInstanceById,
    addNewInstance,
    deleteInstance,
    findInstanceByName
  }
}
