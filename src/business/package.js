const packageDB = require('../db/lib/package')()

module.exports = function instancePackage() {
    async function findPackages() {
        try {
            return packagesFile.packages
        } catch (error) {
            throw new Error(`Error finding packages.`, error)
        }
    }

    async function addNewPackage(package) {
        try {
           
        } catch (error) {
            throw new Error(`Error adding a new package.${error}`, error)
        }
    }

    async function findPackageByInstance(instanceId) {
        try {
            return packageDB.findPackagesByQuery({instanceId})
          } catch (error) {
            throw new Error('Error finding instances.', error)
          }
    }

    function analyseData(packageInfo){
        let accessible = getPercentageAccessibility(packageInfo)
        let relevant = 100
        let open = 0
    }

    function getPercentageAccessibility(packageInfo){
        let totalPercentage = 1;
        const downloadUrl = packageInfo.download_url
        const resources = packageInfo.resources 
        const url = packageInfo.url
        const ckanUrl = packageInfo.ckan_url

        const accessibilityUrls = [downloadUrl, url, ckanUrl]
        const percentageByField = 1/(accessibilityUrls.length+1)
        
        for (const url of accessibilityUrls) {
            if(!verifyURLState(url)){
                totalPercentage-=percentageByField
            }
        }
        totalPercentage-= getPercentageByResources(resources) * percentageByField
        return totalPercentage
    }

    function getPercentageByResources(resources){
        const percentageByResource = 1/resources.length
        let totalPercentageForResources = 1;
        for (const resource of resources) {
            if(!verifyURLState(resource.url)){
                totalPercentageForResources -= percentageByResource
            }
        }
        return totalPercentageForResources
    }

    async function verifyURLState(url){
        try {
            await axios.get(url);
            return true
        } catch (error) {
            return false
        }
    }

    function getPercentageRelevance(){

        
    }

    function getPercentageOpening(){

        
    }

    return {
        findPackages,
        findPackageByInstance,
        addNewPackage,
    }
}