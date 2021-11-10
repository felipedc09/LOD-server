const InstanceModel = require('../models/instance')

module.exports = function () {
  async function createInstance (instance) {
    try {
      const instanceMoel = new InstanceModel(instance)
      return instanceMoel.save()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async function findInstances () {
    try {
      return InstanceModel.find()
    } catch (error) {
      throw new Error(error.message)
    }
  }


  async function findInstanceById (instanceId) {
    try {
      return InstanceModel.findOne({ _id: instanceId })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async function findInstanceByQuery (query) {
    try {
      return InstanceModel.findOne(query).sort({ _id: -1 })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async function findInstancesByQuery (query) {
    try {
      return InstanceModel.find(query)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async function updateInstance (_id, instance) {
    try {
      return InstanceModel.findOneAndUpdate(
        { _id },
        { $set: instance }
      )
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async function deleteInstance (_id) {
    try {
      return InstanceModel.deleteOne(
        { _id },
      )
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return {
    createInstance,
    findInstances,
    findInstanceById,
    findInstanceByQuery,
    updateInstance,
    deleteInstance,
    findInstancesByQuery
  }
}
