const cheerio = require("cheerio");
const express = require("express");
const fs = require("fs");
const crawlRouter = express.Router();
require("es6-promise").polyfill();
require("isomorphic-fetch");

const name = [];
const address = [];
crawlRouter.get("/cau-giay", (req, res) => {
  fetch("https://wefit.vn/studios/hn-cau-giay/", {
    method: "POST"
  })
    .then(res => {
      return res.text();
    })
    .then(data => {
      $ = cheerio.load(data);
      $(".column-1").each(function(i, element) {
        name.push($(this).text());
      });
      var nameN = name.slice(1, name.length - 1);
      $(".column-2").each(function(i, element) {
        address.push($(this).text());
      });
      //console.log(address);
      addressN = address.slice(1, address.length - 1);
      var caugiay = { nameN, addressN };
      console.log(caugiay);
      fs.writeFile(
        "./data.json",
        JSON.stringify(caugiay),
        { encoding: "utf8" },
        error => {
          if (error) {
            throw error;
          } else {
            res.status(201).json({
              sucess: true
            });
          }
        }
      );
    })
    .catch(err => {
      throw err;
    });
});

module.exports = crawlRouter;
