try {
  const { createRandomPair } = require("../helpers/createRandomPair");
  const clients = require("../results/resultCustomers.json");
  const parners = require("../results/resultPartners.json");

  createRandomPair(parners, clients, 1000);
  console.log("файл создан");
} catch (e) {
  // console.log("в папке результата нет клиентов или партнеров");
  console.log(e);
}
