const { default: axios } = require("axios");
const { nominatimUrl } = require("../keys");

const deleteBanWord = (address) => {
  const banWord = "подъезд";
  if (address.indexOf(banWord) !== -1) {
    const index = address.indexOf(banWord);
    return address.slice(0, index);
  } else return address;
};

const fetchData = (address) => {
  const q = address.replace(/,/g, "").replace(/ /g, "+");

  return axios.get(nominatimUrl, {
    params: { q, format: "jsonv2" },
  });
};

const checkingForFinding = (extractedData, address) => {
  const addressArr = address.replace(/,/g, "").trim().split(" ");
  const lastObject = addressArr[addressArr.length - 1];
  let res = false;

  extractedData.forEach((extracted) => {
    if (extracted.display_name.indexOf(lastObject) !== -1) res = true;
  });
  return res;
};

// interface IDataObj{
//   address:string,
//   longitude:number,
//   latitude:number,
//   title?:string
//   name?: string,
//   phone?: string
// }

// interface IData{
//   obj:IDataObj[]
// }

const createAllIncomingClient = (data) => {
  data.forEach(async (element) => {
    const address = deleteBanWord(element.address);
    const extracted = await fetchData(address);
    const isIncoming = checkingForFinding(extracted.data, address);
    console.log(isIncoming);
  });
};

module.exports = { createAllIncomingClient };
