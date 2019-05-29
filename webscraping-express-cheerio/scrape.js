const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream("post.csv");

const url = "http://www.drjensdogblog.com/";

//Headers

writeStream.write(`Post ID,Title,Link,Date,Summary\n`);

request(url, (err, response, html) => {
  let data = [];
  if (!err & (response.statusCode == 200)) {
    const $ = cheerio.load(html);

    // const siteHero = $(".hero-main-content");

    // // const output = siteHero.find("h1").text();
    // const children = siteHero.children();
    // console.log(children.html());

    $(".post-content").each((i, el) => {
      const id = $(el).attr("id");

      const title = $(el)
        .find(".entry-title a")
        .text()
        .replace(/\s\s+/g, "");

      const link = $(el)
        .find(".entry-title a")
        .attr("href");

      const date = $(el)
        .find("time.entry-date")
        .text()
        .replace(/,/, "");

      const summary = $(el)
        .find(".entry-summary p")
        .text();

      writeStream.write(`${id}, ${title}, ${link}, ${date}, ${summary} \n`);
    });
  }
});
