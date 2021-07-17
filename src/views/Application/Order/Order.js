/* eslint import/no-webpack-loader-syntax: off */

import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory, useParams } from 'react-router-dom'
import { useReactToPrint } from "react-to-print";
import { Spinner } from 'react-bootstrap'

import OrdersService from '../../../services/orders.service'

import Breadcrumb from '../../../components/Application/Base/Breadcrumb'

import invoicePreviewStyle from '!!raw-loader!./invoice-preview.css'


const Printable = React.forwardRef((props, ref) => {
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)

    const { orderID } = useParams()

    const extractID = (shopifyID) => {
        return shopifyID.split('/')[ shopifyID.split('/').length -1 ]
    }

    useEffect(() => {
        (async function Grabbing() {
            const orderResponse = await OrdersService.getOrder( orderID )
            if ( orderResponse.response_code  === 0 ){
                setOrder( orderResponse.order )
                setLoading( false )
            }
        })();
    }, [])

    return (
        <div className="col-xl-9" ref={ref}>
            {
                loading
                ?
                <div><center><Spinner style={{ width:"8rem", height:"8rem", color:"#4361ee" }} animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></center></div>

                :
                <div className="invoice-container">
                    <div className="invoice-inbox">
                        <div id="ct" className="">
                            <div className="invoice-00001">
                                <div className="content-section">
                                    <div className="inv--head-section inv--detail-section">
                                        <div className="row">
                                            <div className="col-sm-6 col-12 mr-auto">
                                                <div className="d-flex">
                                                    <img className="company-logo" style={{ width: "60px", height:"60px" }} src="https://res.cloudinary.com/dchmztvzz/image/upload/v1623810851/scaly/logos/fav-white_ksja5d.png" alt="company" />
                                                    <h3 className="in-heading align-self-center">SCALY Inc.</h3>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 text-sm-right">
                                                <p className="inv-list-number">
                                                    <span className="inv-title">Order : </span>
                                                    <span className="inv-number">#{ extractID(order.id) }</span>
                                                </p>
                                            </div>

                                            <div className="col-sm-6 align-self-center mt-3">
                                                <p className="inv-created-date">
                                                    <span className="inv-title">Order Date : </span>
                                                    <span className="inv-date">{ order.createdAt }</span>
                                                </p>
                                                <p className="inv-created-date">
                                                    <span className="inv-title">City :</span>
                                                    <span className="badge badge-lg badge-primary">
                                                    {
                                                        order.shippingAddress == null
                                                        ?<>Does not exist</>
                                                        :<>order.shippingAddress.city</>
                                                    }
                                                    </span>
                                                </p>
                                                <p className="inv-created-date">
                                                    <span className="inv-title">Address1 : </span>
                                                    <span className="badge badge-lg badge-dark">
                                                    {
                                                        order.shippingAddress == null
                                                        ?<>Does not exist</>
                                                        :<>order.shippingAddress.address1</>
                                                    }
                                                    </span>
                                                </p>
                                                <p className="inv-created-date">
                                                    <span className="inv-title">Address2 : </span>
                                                    <span className="badge badge-lg badge-success">
                                                    {
                                                        order.shippingAddress == null
                                                        ?<>Does not exist</>
                                                        :<>order.shippingAddress.address2</>
                                                    }
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inv--product-table-section">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead className="">
                                                    <tr>
                                                        <th scope="col">Order Line ID</th>
                                                        <th scope="col">Variant </th>
                                                        <th className="text-right" scope="col">Unit price</th>
                                                        <th className="text-right" scope="col">Quantity</th>
                                                        <th className="text-right" scope="col">Total price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        order.lineItems.edges.map( lineItem => (
                                                            <tr>
                                                                <td>{ extractID( lineItem.node.id ) }</td>
                                                                <td>{ lineItem.node.variant.displayName }</td>
                                                                <td className="text-right">{ lineItem.node.variant.price }$</td>
                                                                <td className="text-right">x{ lineItem.node.quantity }</td>
                                                                <td className="text-right">{ lineItem.node.quantity * lineItem.node.variant.price }$</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    

                                    <div className="inv--note">
                                        <div className="row mt-4">
                                            <div className="col-sm-12 col-12 order-sm-0 order-1">
                                                <p>Note: Thank you for doing Business with us.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            }
        </div>
    )
})

const Order = props => {
    const printableRef = useRef();
    const { orderID } = useParams()
    const history = useHistory()

    const [loading, setLoading] = useState(false)

    const FulfillOrder = (fulfullementStatus) => {
        setLoading(true)
        const FulfillOrderResponse = OrdersService.fulfillOrder([orderID], fulfullementStatus)
        if ( FulfillOrderResponse.response_code === 0 ){
            history.goBack()
        } else {
            history.goBack()
        }
    }

    return (
        <>
        <Helmet>
            <style rel="stylesheet" type="text/css">{ invoicePreviewStyle }</style>
        </Helmet>
        <Breadcrumb first="App" second="Order" third="" />
        <div className="row invoice layout-top-spacing">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="doc-container">
                    <div className="row">
                        <Printable ref={printableRef} />
                        <div className="col-xl-3">
                            <div className="invoice-actions-btn">
                                <div className="invoice-action-btn">
                                    <div className="row">
                                        <div className="col-xl-12 col-md-3 col-sm-6 mt-4">
                                            <button disabled={loading} className="btn btn-success" style={{ width: "100%" }} onClick={() => FulfillOrder('3000111')}>Deliever&nbsp;Order</button>
                                        </div>
                                        <div className="col-xl-12 col-md-3 col-sm-6 mt-4">
                                            <button disabled={loading} className="btn btn-warning" style={{ width: "100%" }} onClick={() => FulfillOrder('3000112')}>Return&nbsp;Order</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}



export default Order
