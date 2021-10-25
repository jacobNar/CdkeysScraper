const cheerio = require('cheerio');
const got = require('got');

const vgmUrl= 'https://www.cdkeys.com/pc';

(async () => {
  const response = await got(vgmUrl);
  const $ = cheerio.load(response.body);

  var oldPrices = $('span[data-price-type="oldPrice"] span')
  var products = $("li.product-item")

  products.each((i, product) => {
    // const href = link.text();
    prod = JSON.parse(product.attribs['data-impression'])

    console.log((prod.name + " - $" + prod.price + " - " + oldPrices[i].children[0].data + "\n"));

  });
})();