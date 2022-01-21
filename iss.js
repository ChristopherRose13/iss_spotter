const request = require("request");

const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';
  request(url, function(error, response, body) {
    const ipAddress = JSON.parse(body);
    if (error) {
      callback(error, null);
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    if (!ipAddress) {
      callback("IP addresss not found", null);
    }
   
    callback(error, ipAddress);
    return;
  });
  
};

const fetchCoordsByIP = function(ip, callback) {
  const requestURL = `https://freegeoip.app/json/8.8.8.8?apikey=${ip}`;
  request(requestURL, function(error, response, body) {
    if (error) {
      console.log("error: ", error);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const location = JSON.parse(body);

    return callback("error", location);
    
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const requestURL = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(requestURL, function(error, response, body) {
    const times = JSON.parse(body);
    //console.log(times);
    const flytimes = times.response;
    //console.log(flytimes);
    if (error) {
      callback(error, flytimes);
    }
    callback(null, flytimes);
  });
};



module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
