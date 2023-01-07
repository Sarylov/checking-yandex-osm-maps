const { createAllIncoming } = require("./scripts/createAllIncoming");
const partners = require("./data/partners.json");

createAllIncoming(partners, "resultParners");

