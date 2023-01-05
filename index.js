const { default: axios } = require("axios");
const { createAllIncomingClient } = require("./scripts/createAllIncoming");
const clientJSON = require("./data/clients.json");
const client = JSON.parse(clientJSON);

// убрать подъезд
// убрать все кварталы
// убрать все проезды

createAllIncomingClient(client);
