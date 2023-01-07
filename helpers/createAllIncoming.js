const { default: axios } = require("axios");
const { nominatimUrl } = require("../keys");
const fs = require("fs");

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
    console.log(extracted.display_name+"\n"+lastObject);
    const extractedAddressArr = extracted.display_name
      .replace(/,/g, "")
      .trim()
      .split(" ");
    if (extractedAddressArr.indexOf(lastObject) !== -1) res = true;
  });
  return res;
};

const createAllIncoming = (data, nameResultFile) => {
  data.forEach((element, index) => {
    setTimeout(async () => {
      const address = deleteBanWord(element.address);
      const extracted = await fetchData(address);
      const isIncoming = checkingForFinding(extracted.data, address);
      const extractedAddress =
        extracted.data.length > 0 ? extracted.data[0].display_name : "";
      const dataLength = data.length;

      console.log(`проверенно: ${index + 1} из ${dataLength} ${isIncoming}`);

      element.OSMGeocodeAddress = extractedAddress;
      if (isIncoming)
        fs.appendFileSync(
          "./results/" + nameResultFile + ".json",
          `${JSON.stringify(element)}${dataLength !== index + 1 && ","}`,
          function (error) {
            if (error) throw error; // если возникла ошибка
            console.log("Произошла ошибка. Запись файла завершена.");
          }
        );
    }, 500 * index);
  });
};

module.exports = { createAllIncoming };
