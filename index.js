const cheerio = require('cheerio');
const got = require('got');

const vgmUrl= 'https://www.cdkeys.com/pc';

(async () => {
  const response = await got(vgmUrl);
  var $ = cheerio.load(response.body);

  var oldPrices = $('span[data-price-type="oldPrice"] span')
  var products = $("li.product-item")

  for(let i =0; i < products.length; i++){
    prod = JSON.parse(products[i].attribs['data-impression'])
    // let amazonPrice = await getProductPrice(prod)
    console.log((prod.name + " - $" + prod.price + " - " + oldPrices[i].children[0].data ));
  }

  // products.each((i, product) => {
  //   // const href = link.text();
  //   prod = JSON.parse(product.attribs['data-impression'])
  //   let amazonPrice = await getProductPrice(prod)
  //   console.log((prod.name + " - $" + prod.price + " - " + oldPrices[i].children[0].data + " - " + amazonPrice + "\n"));

  // });
})();


async function getProductPrice (prod) {
  let amazonResp = await got(`https://www.amazon.com/s?k=${prod.name}&i=videogames&ref=nb_sb_noss_2`)
    var $ = cheerio.load(amazonResp.body)
    console.log(amazonResp)
    var amazonPrices = $("span.a-price-whole")
    return amazonPrices[0]
}