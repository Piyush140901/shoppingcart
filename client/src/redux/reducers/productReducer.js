// Reducer me hasmseha switch case bana ne ka

import * as actionType from '../constants/productConstant';

export const getProductsReducer=(state = {products: []}, action)=>{
    switch(action.type)
    {
        case actionType.GET_PRODUCT_SUCCESS:
            return {products: action.payload}
        case actionType.GET_PRODUCT_FAIL:
            return {error: action.payload}
        default:
            return state
    }
    
}

export const getProductDetailsReducer=(state={product: {}}, action) => {
    switch(action.type){
        case actionType.GET_PRODUCT_DETAILS_REQUEST:
            return {loading : true}
        case actionType.GET_PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload}
        case actionType.GET_PRODUCT_DETAILS_FAIL:
            return {loading: false, product: action.payload}
        case actionType.GET_PRODUCT_DETAILS_RESET:
            return { product: {}}
        default: 
            return state

    }
}