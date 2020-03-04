const request = require('request');
const fs = require('fs');
const confCKANAPI = require('./configurationCKANapi.json')
const instancesFile = require('./instances.json')
const ckan = require('./ckan')()

module.exports = function instance() {
    async function findInstances() {
        try {
            return instancesFile.instances
        } catch (error) {
            throw new Error(`Error finding instances.`, error)
        }
    }

    async function addNewInstance(instance) {
        try {
            let instanceTemp = instancesFile.instances
            instanceTemp.push({
                "name": instance.name,
                "url": instance.url
            })
            const instances = `{
                  "instances": ${JSON.stringify(instanceTemp)}
                }`
            console.log(instances)
            await new Promise((resolve, reject) => {
                fs.writeFile('./instances.json', instances, async (err, data) => {
                    err ? reject(err) : resolve(data);
                });
            });
            console.log(instancesFile.instances)
            return instancesFile.instances
        } catch (error) {
            throw new Error(`Error adding a new instance.${error}`, error)
        }
    }

    async function findInstanceByName(instanceName) {
        try {
            const instance = instancesFile.instances.find(instance => instance.name === instanceName)
            const packageInfo= ckan.getPackageInfo(instance)
            packageInfo.accessible = getPercentageAccessibility(packageInfo)
            return packageInfo
        } catch (error) {
            throw new Error(`Error finding instance by name.`, error)
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

    function verifyURLState(url){
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
        findInstances,
        addNewInstance,
        findInstanceByName
    }
}