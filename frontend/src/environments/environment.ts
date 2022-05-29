// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {


  production: true,


  BASE_URL: 'http://localhost:8020',
  CartUrl: 'http://localhost:8020/',
  PlatUrl: 'http://localhost:8020',
  sellerUrl: 'http://localhost:8020/',//danger
  ChefUrl: 'http://localhost:8020',
  quantity: 'http://localhost:8020/',




  


  getallplatsurl: 'plats/',
  getallchefsurl: 'chefs/',
 
 

 
  cusUrl : 'plats/pagewise',
  addandupdatecartUrl: 'plats/addandupdatecart',
  sorting: 'plats/sorting',
  SortNewestArrival: 'plats/unsorting',
  getReview: 'plats/getratereviews',
 
  cusUrll : 'chefs/pagewise',



  addtocart: 'carts/addcart',
  getplatprice: 'getplatprice',
  getcheforigine: 'getcheforigine',

 

  GET_REVIEWS: 'plats/ratingreviews/?platId=',

  
  
  USER_REGISTRATION: 'registration',
  USER_LOGIN: 'login',
  USER_FORGET_PASSWORD: 'forgotpassword',
  USER_RESETPASSWORD: 'update',





  //Utilisé dans cart.service
  addUrl: 'customers/addcustomer',
  ADDCART: '/alamarocaine/v3/cart/addplatCart/',
  INC_PLATS_QUANTITY: '/alamarocaine/v3/cart/increaseplatsquantity?platId=',
  DEC_PLATS_QUANTITY: '/alamarocaine/v3/cart/decreaseQuantityPrice?platId=',
  REMOVE_PLATS_FROM_CART: '/alamarocaine/v3/cart/removeCartPlats',
  GET_PLATS_FROM_CART: '/alamarocaine/v3/cart/getcartplats',
  COUNT_PLATS_IN_CART: '/alamarocaine/v3/cart/platCount',
  addplatsquantity: 'addplatsquantity',


   
  //Utilisé dans chef.service
   addchefs: 'chefs',
  deleteChef: 'chefs',
  editChef: 'chefs',
  addChefImage: 'chefs/chefimage',

  getchefbyIdurl: 'chefs/',

 
 

  //Utilisé dans order.service
  PLACE_ORDER: '/alamarocaine/placeOrder?addressId=',





   //Utilisé dans plat.service
   addplats: 'plats',
   deletePlat: 'plats',
   editPlat: 'plats',
   addPlatImage: 'plats/platimage',
   avgrateofplat: 'plats/avgrate?platId=',
   getplatbyIdurl: 'plats/',
   WRITE_REVIEW: 'plats/ratingreview?platId=',
   ratereview: 'plats/getratereviews/?platId=',
   getOrdersByseller: 'alamarocaine/getOrdersByseller',
   getSortedPlatByRate: 'plats/sortbyrate',




   


   //Utilisé dans seller.service (admin.service auparavant)
  approvedPlats: 'seller/plats', //danger
  approvedChefs: 'sellerchefs',
  getallOrderedPlats: 'alamarocaine/getOrdersBySeller',//danger
  changeOrderstatus: 'alamarocaine/orderStatusBySeller', //danger



  // Utilisés dans user.service
  GET_ADDRESS_BY_ADDRES: '/address/users',
  UPDATE_ADDRESS: '/address/updateAddress',
  ADD_ADDRESS: '/address/add',



  // Utilisés dans wishlist.service
  WISHLIST_ADD: 'alamarocaine/v3/wishlist/addplatWishlist',
  WISHLIST_GET: 'alamarocaine/v3/wishlist/getwishplats',
  WISHLIST_COUNT: 'alamarocaine/v3/wishlist/wishlistcount',
  WISHLIST_REMOVE: 'alamarocaine/v3/wishlist/removeWishlist/',







  //danger approvedPlats: 'admin/plats',
 //danger getallOrderedPlats: 'alamarocaine/getOrdersByAdmin',

 //danger adminUrl: 'http://localhost:8020/',

 //danger changeOrderstatus: 'alamarocaine/orderStatusByAdmin',



};
