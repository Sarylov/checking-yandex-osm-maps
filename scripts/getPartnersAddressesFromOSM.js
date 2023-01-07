const partners = require("../data/partners.json");
const { createAllIncoming } = require("../helpers/createAllIncoming");

createAllIncoming(partners, "resultPartners");
