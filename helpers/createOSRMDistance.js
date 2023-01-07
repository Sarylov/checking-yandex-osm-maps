const { default: axios } = require("axios");
const { OSRMUrl } = require("../keys");
const fs = require("fs");

const fetchData = async (clientCoordinates, partnerCoordinates) => {
  const res = await axios.get(
    `${OSRMUrl}/${partnerCoordinates};${clientCoordinates}?steps=false`
  );

  return await res.data.routes[0].distance;
};

const createOSRMDistance = (pairs) => {
  fs.writeFileSync("./results/resultOSRMDistance.csv", "");
  fs.appendFileSync(
    "./results/resultOSRMDistance.csv",
    "адрес ресторана, широта, долгота, адрес клиента, широта, долгота, OSRM дистанция \n"
  );

  pairs.forEach(async (pair, index) => {
    const { partnerAddress, partnerLongitude, partnerLatitude } = pair[0];
    const { clientAddress, clientLatitude, clientLongitude } = pair[1];
    const clientCoordinates = `${clientLongitude},${clientLatitude}`;
    const partnerCoordinates = `${partnerLongitude},${partnerLatitude}`;
    const distance = await fetchData(clientCoordinates, partnerCoordinates);
    console.log(
      partnerAddress + " \n " + clientAddress + " \n " + distance + " \n "
    );
    fs.appendFileSync(
      "./results/resultOSRMDistance.csv",
      `"${partnerAddress.replace(
        /,/g,
        ""
      )}",${partnerLatitude}, ${partnerLongitude}, "${clientAddress.replace(
        /,/g,
        ""
      )}", ${clientLatitude}, ${clientLongitude}, ${distance} \n`
    );
  });
};

module.exports = { createOSRMDistance };
