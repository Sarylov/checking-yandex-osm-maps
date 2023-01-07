const fs = require("fs");

const getRandomInt = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

const createRandomPair = (partners, clients, quantity) => {
  const json = [];


  fs.writeFileSync("./results/resultRandomPair.json", "");

  for (let i = 0; i < quantity; i++) {
    const {
      OSMGeocodeAddress: partnerAddress,
      latitude: partnerLatitude,
      longitude: partnerLongitude,
    } = partners[getRandomInt(0, partners.length - 1)];
    const {
      OSMGeocodeAddress: clientAddress,
      latitude: clientLatitude,
      longitude: clientLongitude,
    } = clients[getRandomInt(0, clients.length - 1)];
    
    
    json.push([
      {
        type: "partner",
        partnerAddress,
        partnerLongitude,
        partnerLatitude,
      },
      {
        type: "customer",
        clientAddress,
        clientLatitude,
        clientLongitude,
      },
    ]);
  }

  fs.appendFileSync("./results/resultRandomPair.json", JSON.stringify(json));
};

module.exports = { createRandomPair };
