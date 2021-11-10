var periodicTasks = function () {
  this.periodicTasks = require('./periodicTasks.json')
}

periodicTasks.prototype.excecutePeriodicTasks = function () {
  var periodicTasks = this.periodicTasks
  for (var index in periodicTasks) {
    var method = periodicTasks[index].method
    var path = periodicTasks[index].path
    var periodicityInMiliSeconds = periodicTasks[index].periodicity

    console.log('method ' + method + ' from script ' + path + ' with periodicity in miliseconds ' + periodicityInMiliSeconds)
    require(path).prototype[method]()
    setInterval(require(path).prototype[method], periodicityInMiliSeconds)
  }
}

module.exports = periodicTasks
