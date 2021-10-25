const cheerio = require('cheerio');
const got = require('got');

const vgmUrl= 'https://www.cdkeys.com/pc';

(async () => {
  const response = await got(vgmUrl);
  const $ = cheerio.load(response.body);

  var productNames = $('a.product-item-link')
  var productPrices = $('span.price')
  var oldPrices = $('span.old-price')
  var products = $("li.product-item")
  // console.log(`product names: ${productNames.length} product prices: ${productPrices.length} old prices: ${oldPrices.length}`)
  console.log(products[0])
  products.each((i, product) => {
    // const href = link.text();
    prod = JSON.parse(product.attribs['data-impression'])

    console.log((prod.name + " - $" + prod.price));
    // console.log(`${product.attribs['data-imppression']['name']} - ${product.attribs['data-imppression']['price']}`)
  });
})();