const axios = require('axios')
const instanceDB = require('../lib/instance')()
const packageDB = require('../lib/package')()

module.exports = function () {
  async function setInstancesData () {
    try {
      const instances = await instanceDB.findInstances()
      for (const instance of instances) {
        await updateInstanceData(instance)
      }
    } catch (error) {
      console.error(error)
    // throw new Error(`Error charging data to graphics.`, error)
    }
  }

  async function updateInstanceData (instance) {
    const packagesList = await getCKANService(`${instance.url}api/rest/package`)
    console.log('instance  ----- ', instance)
    console.log(' packagesList.length ******** ', packagesList.length)
    
    if(packagesList.length > instance.packagesCount){
      await instanceDB.updateInstance(instance._id, { packagesCount: packagesList.length })
      await setPackageInfo(packagesList, instance)
    }
  }

  async function setPackageInfo (packagesList, instance) {
    for (const packageItem of packagesList) {
      const packageExist = await packageDB.findPackagesByQuery({ name: packageItem.name, instanceId: instance._id })[0]
      if(!packageExist || packageExist.metadata_modified !== packageItem.metadata_modified){
        const packageData = await getCKANService(`${instance.url}api/rest/package/${packageItem}`)
        if(!packageExist){
          await packageDB.createPackage({ ...packageData, instanceId: instance._id })
        }else{
          await packageDB.updatePackage(packageItem._id, packageData)
        }
      }
    }
  }

  async function getCKANService (url) {
    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      throw new Error(`Error getting package list. ${error.message}`, error)
    }
  }

  async function createNodesAndLinks (packages) {
    const nodes = []
    const links = []
    const packagesSorted = sortPackageByName(packages)
    for (const packageItem of packages) {
      nodes.push(await getNodes(packageItem))
      links.push(await getLinks(packageItem, packagesSorted))
    }
    const result = {
      nodes,
      links
    }
    console.log(result)
    return result
  }

  function sortPackageByName (packages) {
    const newPackage = {}
    for (const packageItem of packages) {
      newPackage[packageItem.name] = packageItem
      return packageItem
    }
    return newPackage
  }

  async function getNodes (packageItem) {
    try {
      const tempPackageData = {
        ratings_average: packageItem.ratings_average,
        ratings_count: packageItem.ratings_count,
        text: packageItem.title,
        id: packageItem.id,
        nodeTitle: packageItem.name ? packageItem.name : packageItem.title,
        license_title: packageItem.license_title,
        size: packageItem.num_resources,
        state: packageItem.state
      }
      if (packageItem.extras && packageItem.extras.triples) {
        tempPackageData.cluster = calculateClusterByTripletes(packageItem)
        tempPackageData.triples = triples
      }
      return tempPackageData
    } catch (error) {
      console.error(error)
      throw new Error('Error creating nodes.', error)
    }
  }

  function calculateClusterByTripletes (packageItem) {
    let cluster
    const triples = packageItem.extras.triples ? packageItem.extras.triples : 0
    if (triples >= 0 && triples <= 10000000) {
      cluster = 1
    } else if (triples > 10000000 && triples <= 100000000) {
      cluster = 2
    } else {
      cluster = 3
    }
    return cluster
  }

  async function getLinks (packageItem, sortedPackages) {
    try {
      let toPackageName
      let count
      const links = []
      // console.log(packageItem)
      if (packageItem.extras) {
        for (const extra in packageItem.extras) {
          if (extra.startsWith('links:')) {
            toPackageName = extra.split(':')[1]
            if (sortedPackages.hasOwnProperty(toPackageName)) {
              console.log(`${packageItem.extras} has link to ${toPackageName} which doesnt exist`)
              continue
            }
            count = assignValue(packageItem.extras, extra)
            links.push([packageItem.id, sortedPackages[toPackageName].id, count])
          }
        }
      }
      return links
    } catch (error) {
      console.error(error)
      throw new Error('Error creating links.', error)
    }
  }

  function assignValue (extras, extra) {
    let count
    try {
      count = parseInt(extras[extra])
    } catch (error) {
      count = 1
    }
    return count
  }
  return {
    setInstancesData,
    createNodesAndLinks
  }
}
