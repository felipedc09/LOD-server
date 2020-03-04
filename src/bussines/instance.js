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
            return ckan.getPackageInfo(instance)
        } catch (error) {
            throw new Error(`Error finding instance by name.`, error)
        }
    }

    function analyseData(packageInfo){
        let accessible = 0
        let relevant = 0
        let open = 0


    }

    return {
        findInstances,
        addNewInstance,
        findInstanceByName
    }
}