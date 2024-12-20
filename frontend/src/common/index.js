const backendDomin = "http://localhost:8080"

const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product`,
        method  : 'post'
    },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomin}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomin}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomin}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomin}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomin}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    },
    deleteProduct: {
        url: `${backendDomin}/api/delete-product/:id`, // เพิ่ม endpoint สำหรับ delete product
        method: 'delete' // ใช้ method 'delete' 
    },
    payment : {
        url : `${backendDomin}/api/checkout`,
        method : 'post'
    },
    getOrder : {
        url : `${backendDomin}/api/order-list`,
        method : 'get'
    },
    allOrder : {
        url : `${backendDomin}/api/all-order`,
        method : 'get'
    },
    saveOrder: {
        url: `${backendDomin}/api/save-order`,
        method: 'post',
    },
    updateOrderStatus: {
        url: `${backendDomin}/api/update-order-status`,
        method: "PATCH",
    },
    deleteOrder: {
        url: `${backendDomin}/api/delete-order`,
        method: "DELETE",
    },
    clearCart: {
        url: `${backendDomin}/api/clear-cart`,
        method: 'DELETE',
    },
}


export default SummaryApi