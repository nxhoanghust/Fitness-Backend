const cheerio = require("cheerio");
const express = require("express");
const fs = require("fs");
const crawlRouter = express.Router();
require("es6-promise").polyfill();
require("isomorphic-fetch");

crawlRouter.get("/district/:districtId", (req, res) => {
  console.log(req.params.districtId);
  fs.readFile(
    `./data/${req.params.districtId}.json`,
    { encoding: "utf8" },
    (error, data) => {
      if (error) {
        res.status(500).json({
          sucess: false,
          message: error.message
        });
      } else {
        res.status(200).json({
          sucess: true,
          data: JSON.parse(data)
        });
      }
    }
  );
});

crawlRouter.get("/cau-giay", (req, res) => {
  const name = [];
  const address = [];
  const type = [];
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
      $(".column-3").each(function(i, element) {
        type.push($(this).text());
      });
      var typeN = type.slice(1, address.length - 1);
      var dongda = { nameN, addressN, typeN };
      console.log(dongda);
      fs.writeFile(
        "./data/cau-giay.json",
        JSON.stringify(dongda),
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
crawlRouter.get("/dong-da", (req, res) => {
  const name = [];
  const address = [];
  const type = [];

  fetch("https://wefit.vn/studios/hn-dong-da//", {
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
      $(".column-3").each(function(i, element) {
        type.push($(this).text());
      });
      var typeN = type.slice(1, address.length - 1);
      var dongda = { nameN, addressN, typeN };
      console.log(dongda);
      fs.writeFile(
        "./data/dong-da.json",
        JSON.stringify(dongda),
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
crawlRouter.get("/hai-ba-trung", (req, res) => {
  const name = [];
  const address = [];
  const type = [];
  fetch("https://wefit.vn/studios/hn-hai-ba-trung/", {
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
      $(".column-3").each(function(i, element) {
        type.push($(this).text());
      });
      var typeN = type.slice(1, address.length - 1);
      var dongda = { nameN, addressN, typeN };
      console.log(dongda);
      fs.writeFile(
        "./data/hai-ba-trung.json",
        JSON.stringify(dongda),
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
crawlRouter.get("/hoan-kiem", (req, res) => {
  const name = [];
  const address = [];
  const type = [];
  fetch("https://wefit.vn/studios/hn-hoan-kiem/", {
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
      $(".column-3").each(function(i, element) {
        type.push($(this).text());
      });
      var typeN = type.slice(1, address.length - 1);
      var dongda = { nameN, addressN, typeN };
      console.log(dongda);
      fs.writeFile(
        "./data/hoan-kiem.json",
        JSON.stringify(dongda),
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
//not fetch
crawlRouter.get("/ba-dinh", (req, res) => {
  const name = [];
  const address = [];
  const type = [];
  fetch("https://wefit.vn/studios/hn-ba-dinh/", {
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
      $(".column-3").each(function(i, element) {
        type.push($(this).text());
      });
      var typeN = type.slice(1, address.length - 1);
      var dongda = { nameN, addressN, typeN };
      console.log(dongda);
      fs.writeFile(
        "./data/ba-dinh.json",
        JSON.stringify(dongda),
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
crawlRouter.get("/tay-ho", (req, res) => {
  const name = [];
  const address = [];
  const type = [];
  fetch("https://wefit.vn/studios/hn-tay-ho/", {
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
      $(".column-3").each(function(i, element) {
        type.push($(this).text());
      });
      var typeN = type.slice(1, address.length - 1);
      var dongda = { nameN, addressN, typeN };
      console.log(dongda);
      fs.writeFile(
        "./data/tay-ho.json",
        JSON.stringify(dongda),
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
crawlRouter.get("/hoang-mai", (req, res) => {
  const name = [];
  const address = [];
  const type = [];
  fetch("https://wefit.vn/studios/hn-hoang-mai/", {
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
      $(".column-3").each(function(i, element) {
        type.push($(this).text());
      });
      var typeN = type.slice(1, address.length - 1);
      var dongda = { nameN, addressN, typeN };
      console.log(dongda);
      fs.writeFile(
        "./data/hoang-mai.json",
        JSON.stringify(dongda),
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
crawlRouter.get("/ha-dong", (req, res) => {
  const name = [];
  const address = [];
  const type = [];
  fetch("https://wefit.vn/studios/hn-ha-dong/", {
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
      $(".column-3").each(function(i, element) {
        type.push($(this).text());
      });
      var typeN = type.slice(1, address.length - 1);
      var dongda = { nameN, addressN, typeN };
      console.log(dongda);
      fs.writeFile(
        "./data/ha-dong.json",
        JSON.stringify(dongda),
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
crawlRouter.get("/bac-tu-liem", (req, res) => {
  const name = [];
  const address = [];
  const type = [];
  fetch("https://wefit.vn/studios/hn-bac-tu-liem/", {
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
      $(".column-3").each(function(i, element) {
        type.push($(this).text());
      });
      var typeN = type.slice(1, address.length - 1);
      var dongda = { nameN, addressN, typeN };
      console.log(dongda);
      fs.writeFile(
        "./data/bac-tu-liem.json",
        JSON.stringify(dongda),
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
//done
crawlRouter.get("/nam-tu-liem", (req, res) => {
  const name = [];
  const address = [];
  const type = [];
  fetch("https://wefit.vn/studios/hn-nam-tu-liem/", {
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
      $(".column-3").each(function(i, element) {
        type.push($(this).text());
      });
      var typeN = type.slice(1, address.length - 1);
      var dongda = { nameN, addressN, typeN };

      console.log(dongda);
      fs.writeFile(
        "./data/nam-tu-liem.json",
        JSON.stringify(dongda),
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
crawlRouter.get("/thanh-xuan", (req, res) => {
  const name = [];
  const address = [];
  const type = [];
  fetch("https://wefit.vn/studios/hn-thanh-xuan/", {
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
      $(".column-3").each(function(i, element) {
        type.push($(this).text());
      });
      var typeN = type.slice(1, address.length - 1);
      var dongda = { nameN, addressN, typeN };
      console.log(dongda);
      fs.writeFile(
        "./data/thanh-xuan.json",
        JSON.stringify(dongda),
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
crawlRouter.get("/long-bien", (req, res) => {
  const name = [];
  const address = [];
  const type = [];
  fetch("https://wefit.vn/studios/hn-long-bien/", {
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
      $(".column-3").each(function(i, element) {
        type.push($(this).text());
      });
      var typeN = type.slice(1, address.length - 1);
      var dongda = { nameN, addressN, typeN };
      console.log(dongda);
      fs.writeFile(
        "./data/long-bien.json",
        JSON.stringify(dongda),
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
crawlRouter.get("/thanh-tri", (req, res) => {
  const name = [];
  const address = [];
  const type = [];
  fetch("https://wefit.vn/studios/hn-thanh-tri/", {
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
      $(".column-3").each(function(i, element) {
        type.push($(this).text());
      });
      var typeN = type.slice(1, address.length - 1);
      var dongda = { nameN, addressN, typeN };
      console.log(dongda);
      fs.writeFile(
        "./data/thanh-tri.json",
        JSON.stringify(dongda),
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
