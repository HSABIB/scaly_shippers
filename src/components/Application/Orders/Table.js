/* eslint import/no-webpack-loader-syntax: off */

import React, { useState, useEffect } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import { Helmet } from "react-helmet";
import { Spinner } from 'react-bootstrap'

import OrdersService from '../../../services/orders.service'

import tableStyle from '!!raw-loader!./table.css'
import checkboxesStyle from '!!raw-loader!./checkboxes.css'

const Table = (props) => {
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState(null)

    const history = useHistory()
    const { storeID } = useParams()

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

    useEffect(() => {
        (async function Grabbing() {
            await fetchOrders()
        })();
    }, [])

    return (
        <>
            <Helmet>
                <style rel="stylesheet" type="text/css">{ tableStyle }</style>
                <style rel="stylesheet" type="text/css">{ checkboxesStyle }</style>
            </Helmet>
            <div className="col-12 layout-spacing">
                <div className="widget widget-table-two" style={{ position: "relative", position: "relative", padding: "20px", borderRadius: "6px", background: "#ffffff", border: "1px solid #e0e6ed", boxShadow: "0 0 40px 0 rgb(94 92 154 / 6%)" }}>
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
                                    <th style={{ textTransform: "initial",fontWeight: 600,borderTop: "none",background: "rgb(186 231 255 / 34%)",borderRight: "none",borderLeft: "none",paddingTop: 0,paddingBottom: 0,paddingRight: 0,paddingKeft: 0,transition: "all 0.1s ease",padding: "10px 0 10px 15px", whiteSpace: "nowrap" }}>
                                        <div className="th-content">Total lines</div>
                                    </th>
                                    <th style={{ textTransform: "initial",fontWeight: 600,borderTop: "none",background: "rgb(186 231 255 / 34%)",borderRight: "none",borderLeft: "none",paddingTop: 0,paddingBottom: 0,paddingRight: 0,paddingKeft: 0,transition: "all 0.1s ease",padding: "10px 0 10px 15px", whiteSpace: "nowrap" }}>
                                        <div className="th-content">Status</div>
                                    </th>
                                    <th style={{ textTransform: "initial",fontWeight: 600,borderTop: "none",background: "rgb(186 231 255 / 34%)",borderRight: "none",borderLeft: "none",paddingTop: 0,paddingBottom: 0,paddingRight: 0,paddingKeft: 0,transition: "all 0.1s ease",padding: "10px 0 10px 15px"}}>
                                        <div className="th-content">Created at</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map( (order, key) => (
                                        <tr style={{ height: "62px", cursor: "pointer" }} key={order.reference} onClick={() => handelOrderClick(order.reference)}>
                                                
                                            <td><div className="td-content product-brand text-primary" style={{ fontWeight:"bold", fontSize:"15px" }}>#{ order.reference }</div></td>
                                            <td><div className="td-content" style={{ whiteSpace:"nowrap" }}>{ order.lines.length } Lines</div></td>
                                            <td><div className="td-content"><span className="badge badge-success">Active</span></div></td>
                                            <td><div className="td-content"><span className='badge badge-primary'>{ order.created_at }</span></div></td>
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
        </>
    )

}

export default Table