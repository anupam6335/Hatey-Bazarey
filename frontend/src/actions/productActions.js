import axios from 'axios';

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS

} from '../constants/productConstants'

export const getProducts = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_PRODUCTS_REQUEST })

        // let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

        // if (category) {
        //     link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
        // }

        const { data } = await axios.get('/api/v1/products')

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}


// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}