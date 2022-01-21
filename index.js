const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchCoordsByIP(fetchMyIP, (error, location) => {
//   console.log(location);
// });

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  fetchCoordsByIP(ip, (error, location) => {
    if (error) {
      console.log("error fetching coords");
    }
    console.log(location);
    fetchISSFlyOverTimes(location, (error, flyoverTimes) => {
      if (error) {
        console.log("error getting flyover times");
      }
      console.log(flyoverTimes);
    });
  });

});