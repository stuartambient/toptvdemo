const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);

// ADDING IMAGES FOLDER
const dir = path.join(__dirname, "images");
const mime = {
  html: "text/html",
  txt: "text/plain",
  css: "text/css",
  jpg: "image/jpeg",
  svg: "image/svg+xml",
  js: "application/javascript"
};

const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempDetails = fs.readFileSync(
  `${__dirname}/templates/template-details.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const dataObj = JSON.parse(data);
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //const type = path.extname(pathname);
  const fileName = path.basename;
  //const filePath = path.parse(pathname);
  const file = path.join(`${__dirname}`, pathname);
  const type = mime[path.extname(file).slice(1)]; //=== "image/jpeg");

  //console.log(`${filePath.root}${filePath.dir}${filePath.base}`);

  if (type === "image/jpeg" || type == "image/svg+xml") {
    const s = fs.createReadStream(file);
    s.on("open", () => {
      res.setHeader("Content-Type", type);
      s.pipe(res);
    });
  }

  //OVERVIEW;
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html"
    });

    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join("");
    output = tempOverview.replace("{%SHOW_CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathname === "/show") {
    const show = dataObj[query.id];
    res.writeHead(200, {
      "Content-type": "text/html"
    });
    const output = replaceTemplate(tempDetails, show);
    res.end(output);
  }
});

server.listen(PORT, () => {
  console.log(`Listening to requests on ${PORT}/`);
});
