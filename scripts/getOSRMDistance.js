const { createOSRMDistance } = require("../helpers/createOSRMDistance");

try {
  const pairs = require("../results/resultRandomPair.json");
  createOSRMDistance(pairs);
} catch (error) {
  // console.log("нет результата пар в json формате");
  console.log(e);
}
