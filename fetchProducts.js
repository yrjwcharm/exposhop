import { fetchProductSuccess } from './productActions';
import WooCommerceRestApi from 'react-native-woocommerce-api';

//Need to deal with sideffects add more actions
export function fetchProducts() {
    let WooCommerceApi= new WooCommerceRestApi({
        url: 'http://192.168.1.52/wordpress', // Your store URL
        ssl: true,
        consumerKey: 'ck_1aba32214b9f41bf09f421d701ce25d409edf35d', // Your consumer secret
        consumerSecret: 'cs_16b7b82f0897f6a14a1d41a871867db5e0079760', // Your consumer secret
        wpAPI: true, // Enable the WP REST API integration
        version: 'wc/v2', // WooCommerce WP REST API version
        queryStringAuth: true
    });

    return dispatch => {
        //dispatch(fetchProductsPending());
        WooCommerceApi.get('products')
        .then(res => {
            if(res.error) {
                console.log(res.error);
            }
            //sort out from huge list of objects
            let productDetails = res.map(product =>({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    images: product.images[0].src
                }
            ));
            
            dispatch(fetchProductSuccess(productDetails));
            return productDetails;
        })
    }
}


