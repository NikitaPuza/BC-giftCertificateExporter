const https = require("https");
const path = require("path");
const client = require("../lib/bigcommerce");
const express = require("express");
const csv = require("csv-express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

let csvForBrowser = [
  [
    "id",
    "customer_id",
    "order_id",
    "code",
    "to_name",
    "to_email",
    "from_name",
    "from_email",
    "amount",
    "balance",
    "status",
    "template",
    "message",
    "purchase_date",
    "expiry_date"
  ]
];

function asyncFunction(itemInLoop, callback) {
  setTimeout(() => {
    callback();
  }, 100);
}

router.post("/submit", (req, res) => {
  const user_name = req.body.username;
  const token = req.body.token;
  let store_url = req.body.storeurl;
  store_url = store_url.replace(/^(http|https):\/\//gim, "");
  const encode1 = user_name + ":" + token;
  const encode2 = new Buffer(encode1).toString("base64");
  const credentials = "Basic" + " " + encode2;

  let page = 1;

  function writeGiftCertificates(data) {
    console.log(data.length);
    let dataProcessed = 0;
    data.forEach(element => {
      let row = Object.keys(element).map(e => element[e]);
      csvForBrowser.push(row);
      asyncFunction(row, () => {
        dataProcessed++;
        console.log(`Total rows processed: ${dataProcessed}`);
        if (data.length === dataProcessed) {
          res.csv(csvForBrowser);
        }
      });
    });
  };

  const getCertificatesPerPage = async function(page) {
    client.config = {
      host: store_url,
      path: `/api/v2/gift_certificates?limit=250&page=${page}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: credentials,
        Accept: "application/json"
      }
    };
    try {
      const giftCertficateData = await client.get(client.config);
      return writeGiftCertificates(giftCertficateData);
    } catch (err) {
      return console.log(err);
    }
  };
  getCertificatesPerPage(1)
    .then(() => {
      //console.log("done");
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
