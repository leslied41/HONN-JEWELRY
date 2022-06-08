var GRFQConfigs = {
  app_url : "https://quote.globosoftware.net",
  theme_store_id : 566,
  shop_url : "honn-jewelry.myshopify.com",
  domain : "honn.se",
  front_shop_url : "honn.se",
  collection_enable : 0 ,
  product_enable : 1 ,
  rfq_page :  "request-for-quote" ,
  rfq_history :  "quotes-history" ,
  lang_translations: [],
  translation_default: {
    button: "Make a Request",
    popupsuccess: "The product %s is added to your quote.",
    popupcontinue: "Continue Shopping",
    popupviewquote: "View Quote",
    toast_message: "Product added to quote",
    pageempty: "Your quote is currently empty.",
    pagebutton: "Submit Request",
    pagesuccess: "Thank you for submitting a request a quote!",
    pagecontinueshopping: "Continue Shopping",
    pageimage: "",
    pageproduct: "Product",
    pagevendor: "Vendor",
    pagesku: "SKU",
    pageoption: "Option",
    pagequantity: "Quantity",
    pageprice: "Price",
    pageremove: "Remove",
    error_messages: {"required":"Please fill in this field","invalid_email":"Invalid email","file_size_limit":"File size exceed limit","file_not_allowed":"File extension is not allowed","required_captcha":"Please verify captcha"},
    historylogin: "You have to {login|login} to use Quote history feature.",
    historyempty: "You haven&#039;t placed any quote yet.",
    historyaccount: "Account Information",
    historycustomer: "Customer Name",
    historyid: "",
    historydate: "Date",
    historyitems: "Items",
    historyaction: "Action",
    historyview: "View",
    message_toast:  "Product added to quote" ,
  },
  show_buynow:  2 ,
  show_atc:  2 ,
  show_price:  2 ,
  convert_cart_enable:  2 ,
  redirectUrl:  '' ,
  message_type_afteratq:  "redirect" ,
  selector: {
    buynow_selector: '.shopify-payment-button',
    addtocart_selector: '.product__submit__add,form #AddToCart-product-template, form #AddToCart, form #addToCart-product-template, form .product__add-to-cart-button, form .product-form__cart-submit, form .add-to-cart, form .cart-functions > button, form .productitem--action-atc, form .product-form--atc-button, form .product-menu-button-atc, form .product__add-to-cart, form .product-add, form .add-to-cart-button, form #addToCart, form .product-detail__form__action > button, form .product-form-submit-wrap > input, form .product-form input[type="submit"], form input.submit, form .add_to_cart, form .product-item-quick-shop, form #add-to-cart, form .productForm-submit, form .add-to-cart-btn, form .product-single__add-btn, form .quick-add--add-button, form .product-page--add-to-cart, form .addToCart, form .product-form .form-actions, form .button.add, form button#add, form .addtocart, form .AddtoCart, form .product-add input.add, form button#purchase, form[action*="/cart/add"] button[type="submit"], form .product__form button[type="submit"], form #AddToCart--product-template',
    price_selector: '#ProductPrice-product-template,#ProductPrice,.product-price,.product__priceâ€”reg,#productPrice-product-template,.product__current-price,.product-thumb-caption-price-current,.product-item-caption-price-current,.grid-product__price,.product__price,span.price,span.product-price,.productitem--price,.product-pricing,span.money,.product-item__price,.product-list-item-price,p.price,div.price,.product-meta__prices,div.product-price,span#price,.price.money,h3.price,a.price,.price-area,.product-item-price,.pricearea,.collectionGrid .collectionBlock-info > p,#ComparePrice,.product--price-wrapper,.product-page--price-wrapper,.color--shop-accent.font-size--s.t--meta.f--main,.ComparePrice,.ProductPrice,.prodThumb .title span:last-child,.price,.product-single__price-product-template,.product-info-price,.price-money,.prod-price,#price-field,.product-grid--price,.prices,.pricing,#product-price,.money-styling,.compare-at-price,.product-item--price,.card__price,.product-card__price,.product-price__price,.product-item__price-wrapper,.product-single__price,.grid-product__price-wrap,a.grid-link p.grid-link__meta',
  },
  money_format: " kr",
    rules: {"all":{"enable":true},"manual":{"enable":false,"manual_products":"4669456449582,4669452550190,4669456187438,4669526474798,4669456711726,4669455171630,4669454778414,4669454876718,4669452451886,4669451927598,4669454352430,4669455106094,4669454614574,4669451894830,4669456285742,4669453041710,4669455630382,4669457170478,4669456973870,4669456089134,4669456777262,4669457137710,4669452779566,4669455499310,6543645540398"},"automate":{"enable":false,"automate_rule":[{"value":"Halo rings","where":"EQUALS","select":"TYPE"},{"value":"","where":"EQUALS","select":"TYPE"}],"automate_operator":"or"}},
    settings: {
    historylogin:  "You have to {login|login} to use Quote history feature."     },
}