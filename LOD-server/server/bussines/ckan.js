const fs = require('fs');
const fetch = require('node-fetch');
const request = require('request');
const instancesFile = require('./instances.json')

module.exports = function CKAN() {
    async function generateVisualizationData(instanceName) {
        try {
            console.log(instanceName)
            const instance = instancesFile.instances.find(function (instance) {
                return instance.name === instanceName;
            });
            const packagesList = await getPackageList()
            // const packagesList = await new Promise(function (resolve, reject) {
            //     request(`${instance.url}api/rest/package`, function (error, response, body) {
            //         if (!error && response.statusCode == 200) {
            //             resolve(JSON.parse(body))
            //         } else {
            //             reject(`Error finding packages ${instance.url} .`, error)
            //         }
            //     })
            // })

            // const packages = await getInfoPackage(instance.url, packagesList)
            const packageInfo = []
            packagesList.forEach(async function (package, index) {
                console.log(index)
                packageInfo.push(await getInfoPackage(instance.url, package))
            });
            console.log(packageInfo)

            // const nodes = await getNodes(packages)
            // console.log(nodes.length)
            // const links = await getLinks(packages)
            // console.log(links.length)
            // return {
            //     "nodes": getNodes(metadataFile.packages),
            //     "links": getLinks(metadataFile.packages)
            // };
        } catch (error) {
            throw new Error(`Error charging data to graphics.`, error)
        }
    }

    async function getPackageList() {
        try {
            const response = await fetch(`${instance.url}api/rest/package`);
            console.log(response.json())
            return response.json()
        } catch (error) {
            throw new Error(`Error getting package list. ${error.message}`, error)
        }

    }

    async function getInfoPackage(url, package) {
        try {
            const response = await fetch(`${url}api/rest/package/${package}`);
            console.log(response.json())
            return response;
        } catch (error) {
            throw new Error(`Error getting package data.${error.message}`, error)
        }
    }

    function formatInstanceName(instanceUrl) {
        let temp_name = instanceUrl.replace("https://", "")
        temp_name = temp_name.replace("http://", "")
        temp_name = temp_name.replace(".", "_")
        temp_name = temp_name.replace("/", "")
        return temp_name
    }

    async function getNodes(packages) {
        try {
            return await packages.map((package) => {
                return {
                    'cluster': calculateClusterByTripletes(package),
                    'triples': triples,
                    'ratings_average': package.ratings_average,
                    'ratings_count': package.ratings_count,
                    'text': package.title,
                    'id': package.nternal_id,
                    'nodeTitle': package.name ? package.name : package.title,
                    'license_title': package.license_title,
                    'size': package.num_resources,
                    'state': package.state
                }
            });
        } catch (error) {
            throw new Error('Error creating nodes.', error)
        }

    }

    function calculateClusterByTripletes(package) {
        let cluster;
        let triples = package.extras.triples ? package.extras.triples : 0;
        if (triples >= 0 && triples <= 10000000) {
            cluster = 1;
        } else if (triples > 10000000 && triples <= 100000000) {
            cluster = 2;
        } else {
            cluster = 3;
        }
        return cluster
    }

    async function getLinks(packages) {
        try {
            let toPackageName;
            let count;
            let packageMap = packages.map((package) => {
                let newPackage = {};
                return newPackage[package.name] = this.package;
            });
            return await packages.map((package) => {
                package.extras.map((extra) => {
                    if (extra.key.startsWith('links:')) {
                        toPackageName = extra.key.split(':')[1];
                    }
                    count = extra.value;
                    return ([package.internal_id], packageMap[toPackageName]['internal_id'], count);
                });
            });
        } catch (error) {
            throw new Error('Error creating links.', error)
        }

    }

    async function createDataFile(instanceName) {
        await fs.writeFile(`lod_${instanceName}.js`, data);

    }

    return {
        generateVisualizationData
    }
}