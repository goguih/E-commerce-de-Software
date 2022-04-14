const tokenId = 'token';
const productDetails = '@productDetails';

export default {
    getToken: () => {
        return localStorage.getItem(tokenId)
    },

    setToken: (token) => {
        localStorage.setItem(tokenId, token)
    },

    clearToken: () => {
        localStorage.setItem(tokenId, '');
    },

    setProductDetails: (productId) => {
        localStorage.setItem(productDetails, productId);
    },

    getProductDetails: () => {
        return localStorage.getItem(productDetails);
    }
}