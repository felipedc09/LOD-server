const axios = require('axios');

const requester = function () {

}

requester.prototype.get = async function (uri, callback) {
    try {
        const response = await axios.get(uri);
        callback(response);
    } catch (error) {
        throw `Request error: ${error}`
    }
}

module.exports = requester;