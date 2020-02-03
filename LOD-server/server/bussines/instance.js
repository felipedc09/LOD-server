const request = require('request');
const fs = require('fs');
const confCKANAPI = require('./configurationCKANapi.json')
const instancesFile = require('./instances.json')

module.exports = function instance() {
    const URLCKANAPI = `${confCKANAPI.host}:${confCKANAPI.port}/`
    async function findInstances() {
        try {
            console.log(instancesFile.instances)
            return instancesFile.instances
        } catch (error) {
            throw new Error(`Error finding instances.`, error)
        }
    }

    async function addNewInstance(instance) {
        console.log(instance)
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
            const instance = instancesFile.instances.find(function (instance) {
                return instance.name === instanceName;
            });
            return new Promise(function (resolve, reject) {
                request(`${URLCKANAPI}${instance.url}`, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        resolve(JSON.parse(body).data)
                    } else {
                        reject(`Error finding instances in python server ${URLCKANAPI}names.`, error)
                    }
                })
            })
        } catch (error) {
            throw new Error(`Error finding instance by name.`, error)
        }
    }

    return {
        findInstances,
        addNewInstance,
        findInstanceByName
    }
}