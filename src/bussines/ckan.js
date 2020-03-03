const fs = require('fs');
const fetch = require('node-fetch');
const axios = require('axios');
const request = require('request');
const instancesFile = require('./instances.json')

module.exports = function CKAN() {
    async function generateVisualizationData(instanceName) {
        try {
            const instance = instancesFile.instances.find(instance => instance.name === instanceName)
            const packagesInfo = await getPackageInfo(instance)
            return createNodesAndLinks(packagesInfo)
        } catch (error) {
            console.error(error)
            // throw new Error(`Error charging data to graphics.`, error)
        }
    }

    async function getPackageInfo(instance) {
        const packagesList = await getCKANservice(`${instance.url}api/rest/package`)
        const packageInfo = []
        for (const package of packagesList) {
            packageInfo.push(await getCKANservice(`${instance.url}api/rest/package/${package}`))
        }
        return packageInfo
    }

    async function getCKANservice(url) {
        try {
            const response = await axios.get(url);
            return response.data
        } catch (error) {
            throw new Error(`Error getting package list. ${error.message}`, error)
        }
    }

    function formatInstanceName(instanceUrl) {
        let temp_name = instanceUrl.replace("https://", "")
        temp_name = temp_name.replace("http://", "")
        temp_name = temp_name.replace(".", "_")
        temp_name = temp_name.replace("/", "")
        return temp_name
    }

    async function createNodesAndLinks(packages) {
        const nodes = []
        const links = []
        const packagesSorted = sortPackageByName(packages)
        for (const package of packages) {
            nodes.push(await getNodes(package))
            links.push(await getLinks(package, packagesSorted))
        }
        const result = {
            nodes,
            links
        }
        console.log(result)
        return result
    }

    function sortPackageByName(packages) {
        const newPackage = {};
        for (const package of packages) {
            return newPackage[package.name] = package;
        }
        return newPackage
    }

    async function getNodes(package) {
        try {
            tempPackageData = {
                ratings_average: package.ratings_average,
                ratings_count: package.ratings_count,
                text: package.title,
                id: package.id,
                nodeTitle: package.name ? package.name : package.title,
                license_title: package.license_title,
                size: package.num_resources,
                state: package.state
            }
            if (package.extras && package.extras.triples) {
                tempPackageData.cluster = calculateClusterByTripletes(package)
                tempPackageData.triples = triples
            }
            return tempPackageData
        } catch (error) {
            console.error(error)
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

    async function getLinks(package, sortedPackages) {
        try {
            let toPackageName;
            let count;
            const links = []
            // console.log(package)
            if (package.extras) {
                for (const extra in package.extras) {
                    if (extra.startsWith('links:')) {
                        toPackageName = extra.split(':')[1]
                        if (sortedPackages.hasOwnProperty(toPackageName)) {
                            console.log(`${package.extras} has link to ${toPackageName} which doesnt exist`)
                            continue
                        }
                        count = assignValue(package.extras, extra)
                        links.push([package.id, sortedPackages[toPackageName]['id'], count])
                    }
                }
            }
            return links
        } catch (error) {
            console.error(error)
            throw new Error('Error creating links.', error)
        }

    }

    function assignValue(extras, extra) {
        let count
        try {
            count = parseInt(extras[extra])
        } catch (error) {
            count = 1
        }
        return count
    }

    async function createDataFile(instanceName) {
        await fs.writeFile(`lod_${instanceName}.js`, data);

    }

    return {
        generateVisualizationData,
        getPackageInfo
    }
}