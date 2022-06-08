
var GRFQConfigs = GRFQConfigs || {};
GRFQConfigs.customer = {
    'id': '',
    'email': '',
    'name': ''
};
// GRFQConfigs.customer = {
//   'id': customer.id,
//   'email': customer.email,
//   'name': customer.name
// };
GRFQConfigs.pageempty = "Your quote is currently empty."
GRFQConfigs.product = null;
// GRFQConfigs.product = product;
GRFQConfigs.cartItems = [];
// for (item in cart.items) {
//   var item = {};
//   item = item;
//   item.product = item.product;
//   for (collection in item.product.collections) {
//     if (typeof item.product['collection'] === 'undefined') {
//       item.product['collection'] = [];
//       item.product['collection'].push('{{ collection.id }}'); 
//     }
//   }
//   GRFQConfigs.cartItems.push(item);
// }
if (typeof GRFQConfigs.lang_translations.find(x => x.code == Shopify.locale) != "undefined") {
  GRFQConfigs.translations = GRFQConfigs.lang_translations.find(x => x.code == Shopify.locale);
} else {
  GRFQConfigs.translations = GRFQConfigs.translation_default;
}
