/* eslint import/no-webpack-loader-syntax: off */

import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Helmet } from "react-helmet";
import { Spinner } from 'react-bootstrap'

import OrdersService from '../../../services/orders.service'

import tableStyle from '!!raw-loader!./table.css'
import checkboxesStyle from '!!raw-loader!./checkboxes.css'

import Address from './Address'
import Lines from './Lines'

const Table = (props) => {
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState(null)

    const history = useHistory()
    const { storeID } = useParams()

    const [showAddress, setshowAddress] = useState(false)
    const [showLines, setShowLines] = useState(false)
    const [loaded, setLoaded] = useState(false)

    const extractID = (shopifyID) => {
        return shopifyID.split('/')[ shopifyID.split('/').length -1 ]
    }

    const handelOrderClick = (orderID) => {
        history.push('/app/order/'+orderID)
    }

    const fetchOrders = async () => {
        setLoading(true)
        setOrders(null)
        const ordersResponse = await OrdersService.getOrders( storeID )
        console.log( ordersResponse )
        if ( ordersResponse.response_code === 0 ){
            setOrders( ordersResponse.orders)
            setLoading(false)
        }
    }


    const handelAddressClick = (orderName, address) => {
        if ( address !== null && address.city !== "" ){
            localStorage.setItem('oaddress', JSON.stringify(address))
            localStorage.setItem('oName', orderName)
            setLoaded(true)
            setshowAddress(true)
        }
    }

    const handelLinesClick = (orderName, lines) => {
        localStorage.setItem('olines', JSON.stringify(lines))
        localStorage.setItem('oName', orderName)
        setLoaded(true)
        setShowLines(true)
    }


    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <>
            <Helmet>
                <style rel="stylesheet" type="text/css">{ tableStyle }</style>
                <style rel="stylesheet" type="text/css">{ checkboxesStyle }</style>
            </Helmet>
            <div className="col-12 layout-spacing">
                <div className="widget widget-table-two" style={{ position: "relative", padding: "20px", borderRadius: "6px", background: "#ffffff", border: "1px solid #e0e6ed", boxShadow: "0 0 40px 0 rgb(94 92 154 / 6%)" }}>
                    <div className="widget-heading" style={{ marginBottom: "15px" }}>
                        <h4 style={{ fontSize: "19px", marginBottom: "20px", letterSpacing: "0px", display: "block", color: "#0e1726", fontWeight: 600 }}>
                            Orders
                        </h4>
                    </div>
                    <div className="widget-content" style={{ marginTop: "20px", background: "transparent" }}>
                    {
                        loading ?
                        <div><center><Spinner style={{ width:"8rem", height:"8rem", color:"#4361ee" }} animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></center></div>
                        :
                        <div className="table-responsive">
                        <table className="table table-hover" style={{ borderCollapse: "separate", borderSpacing: "0 5px", marginBottom: 0, }}>
                            <thead>
                                <tr>
                                <th style={{ textTransform: "initial",fontWeight: 600,borderTop: "none",background: "rgb(186 231 255 / 34%)",borderRight: "none",borderLeft: "none",paddingTop: 0,paddingBottom: 0,paddingRight: 0,paddingKeft: 0,transition: "all 0.1s ease",padding: "10px 0 10px 15px"}}>
                                        <div className="th-content">orderID</div>
                                    </th>
                                    <th style={{ textTransform: "initial",fontWeight: 600,borderTop: "none",background: "rgb(186 231 255 / 34%)",borderRight: "none",borderLeft: "none",paddingTop: 0,paddingBottom: 0,paddingRight: 0,paddingKeft: 0,transition: "all 0.1s ease",padding: "10px 0 10px 15px"}}>
                                        <div className="th-content">Customer</div>
                                    </th>
                                    <th style={{ textTransform: "initial",fontWeight: 600,borderTop: "none",background: "rgb(186 231 255 / 34%)",borderRight: "none",borderLeft: "none",paddingTop: 0,paddingBottom: 0,paddingRight: 0,paddingKeft: 0,transition: "all 0.1s ease",padding: "10px 0 10px 15px"}}>
                                        <div className="th-content">Address</div>
                                    </th>
                                    <th style={{ textTransform: "initial",fontWeight: 600,borderTop: "none",background: "rgb(186 231 255 / 34%)",borderRight: "none",borderLeft: "none",paddingTop: 0,paddingBottom: 0,paddingRight: 0,paddingKeft: 0,transition: "all 0.1s ease",padding: "10px 0 10px 15px", whiteSpace: "nowrap" }}>
                                        <div className="th-content">Lines</div>
                                    </th>
                                    <th style={{ textTransform: "initial",fontWeight: 600,borderTop: "none",background: "rgb(186 231 255 / 34%)",borderRight: "none",borderLeft: "none",paddingTop: 0,paddingBottom: 0,paddingRight: 0,paddingKeft: 0,transition: "all 0.1s ease",padding: "10px 0 10px 15px", whiteSpace: "nowrap" }}>
                                        <div className="th-content">Total Price</div>
                                    </th>
                                    <th style={{ textTransform: "initial",fontWeight: 600,borderTop: "none",background: "rgb(186 231 255 / 34%)",borderRight: "none",borderLeft: "none",paddingTop: 0,paddingBottom: 0,paddingRight: 0,paddingKeft: 0,transition: "all 0.1s ease",padding: "10px 0 10px 15px"}}>
                                        <div className="th-content">Created at</div>
                                    </th>
                                    <th style={{ textTransform: "initial",fontWeight: 600,borderTop: "none",background: "rgb(186 231 255 / 34%)",borderRight: "none",borderLeft: "none",paddingTop: 0,paddingBottom: 0,paddingRight: 0,paddingKeft: 0,transition: "all 0.1s ease",padding: "10px 0 10px 15px", whiteSpace: "nowrap" }}>
                                        <div className="th-content"></div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map( (order, key) => (
                                        <tr style={{ height: "62px", cursor: "pointer" }} key={order.reference}>
                                            <td><div className="td-content product-brand text-primary" style={{ fontWeight:"bold", fontSize:"15px" }}>{ extractID(order.id) }</div></td>
                                            <td>
                                                <div className="td-content" style={{ whiteSpace:"nowrap" }}>
                                                    {
                                                        order.customer === null 
                                                        ?
                                                        <span >No Customer</span>
                                                        :
                                                        <span>{ order.customer.lastName } { order.customer.firstName }</span>
                                                    }
                                                </div>
                                            </td>
                                            <td onClick={ () => handelAddressClick(order.name, order.shippingAddress) }>
                                                <div className="td-content" style={{ whiteSpace:"nowrap" }}>
                                                    {
                                                        order.shippingAddress === null 
                                                        ? <span>No Address</span>
                                                        :
                                                        <span>
                                                            {
                                                                order.shippingAddress.city === "" 
                                                                ? <span>No Address</span>
                                                                :
                                                                <>
                                                                    { order.shippingAddress.city }&nbsp;&nbsp;
                                                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ color: "#4361ee" }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                                </>
                                                            }
                                                        </span>
                                                    }
                                                </div>
                                            </td>
                                            <td onClick={ () => handelLinesClick(order.name, order.lineItems.edges) }>
                                                <div className="td-content" style={{ whiteSpace:"nowrap" }}>
                                                    { order.lineItems.edges.length } Lines&nbsp;&nbsp;
                                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ color: "#4361ee" }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="td-content product-brand text-primary" style={{ fontWeight:"bold", fontSize:"15px", whiteSpace: "nowrap" }}>
                                                    { order.totalPriceSet.shopMoney.amount } { order.totalPriceSet.shopMoney.currencyCode }
                                                </div>
                                            </td>
                                            <td><div className="td-content"><span className='badge badge-primary'>{ order.createdAt }</span></div></td>
                                            <td>
                                                <div className="td-content">
                                                    <button className="btn btn-darl btn-round" onClick={() => handelOrderClick( extractID( order.id ))}>Check order</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        </div>
                    }
                    </div>
                </div>
            </div>
            {
                <>
                    {
                        loaded && (
                            <>
                                <Address show={showAddress} onHide={() => setshowAddress(false)} />
                                <Lines show={showLines} onHide={() => setShowLines(false)} />
                            </>
                        )
                    }
                </>
            }
        </>
    )

}

export default Table