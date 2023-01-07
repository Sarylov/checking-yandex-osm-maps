const clients = require("../data/clients.json");
const { createAllIncoming } = require("../helpers/createAllIncoming");

createAllIncoming(clients, "resultCustomers");
