/* eslint import/no-webpack-loader-syntax: off */

import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { Helmet } from 'react-helmet'

import Breadcrumb from '../../../components/Application/Base/Breadcrumb'

import UserService from '../../../services/users.service'

import CardStyle from '!!raw-loader!./card.css'

const Stores = props => {
    const [loading, setLoading] = useState(true)
    const [stores, setStores] = useState(null)

    const history = useHistory()

    useEffect(() => {
        (async function Grabbing() {
            const storesResponse = await UserService.getStores()
            if ( storesResponse.response_code === 0 ){
                setStores(storesResponse.stores)
                setLoading(false)
            }
        })();
    }, [])

    const handelSelectStore = shopifyID => {
        history.push('/app/orders/'+shopifyID)
    }

    return (
        <>
            <Helmet>
                <style rel="stylesheet" type="text/css">{ CardStyle }</style>
            </Helmet>
            <Breadcrumb />
            <div className="row layout-top-spacing">
                <div className="col-12 layout-spacing">
                    <div className="widget widget-table-two" style={{ position: "relative", position: "relative", padding: "20px", borderRadius: "6px", background: "#ffffff", border: "1px solid #e0e6ed", boxShadow: "0 0 40px 0 rgb(94 92 154 / 6%)" }}>
                        <div className="widget-content" style={{ marginTop: "20px", background: "transparent" }}>
                        {
                            loading 
                            ?
                                <div><center><Spinner style={{ width:"8rem", height:"8rem", color:"#4361ee" }} animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></center></div>
                            :
                            <div className="row">
                                {
                                    stores.map( (store, key) => (
                                        <div className="card component-card_3" onClick={() => handelSelectStore(store.reference)} key={store.reference} >
                                            <div className="card-body">
                                                <img src="https://res.cloudinary.com/dchmztvzz/image/upload/v1623810851/scaly/logos/fav-black_idwfgu.png" className="card-img-top" alt="..." />
                                                <h5 className="card-user_name">{ store.title }</h5>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Stores