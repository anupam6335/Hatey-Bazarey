import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import {MetaData, Loader} from '../../components/allComponents'
import Sidebar from './Sidebar'

import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts, clearErrors } from '../../actions/productActions'


const ProductsList = () => {

    const match = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, products } = useSelector(state => state.products);
    // const { error: deleteError, isDeleted } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, toast, error, match])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,
                actions: <>
                    <Link to={`/admin/product/${product._id}`} className="btns btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btns btn-danger py-1 px-2 ml-2" >
                        <i className="fa fa-trash"></i>
                    </button>
                </>
            })
        })

        return data;
    }

    return (
        <>
            <MetaData title={'All Products'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <>
                        <h1 className="my-5">All Products</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setProducts()}
                                className="px-3 text-center"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </>
                </div>
            </div>

        </>
    )
}

export default ProductsList