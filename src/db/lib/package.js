const PackageModel = require('../models/package')

module.exports = function () {
  async function createPackage (packageData) {
    try {
      const packageMoel = new PackageModel(packageData)
      return packageMoel.save()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async function findPackagees () {
    try {
      return PackageModel.find()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async function findPackageById (packageId) {
    try {
      return PackageModel.findOne({ _id: packageId })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async function findPackageByQuery (query) {
    try {
      return PackageModel.findOne(query).sort({ _id: -1 })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async function findPackagesByQuery (query) {
    try {
      return PackageModel.find(query)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async function updatePackage (_id, packageData) {
    try {
      return PackageModel.findOneAndUpdate(
        { _id },
        { $set: packageData }
      )
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return {
    createPackage,
    findPackagees,
    findPackageById,
    findPackageByQuery,
    updatePackage,
    findPackagesByQuery
  }
}
