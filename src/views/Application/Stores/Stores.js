import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

import Breadcrumb from '../../../components/Application/Base/Breadcrumb'

import UserService from '../../../services/users.service'


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
            <Breadcrumb first="App" second="Stores" />
            <div className="row layout-top-spacing">
            {
                loading 
                ?
                    <div><center><Spinner style={{ width:"8rem", height:"8rem", color:"#4361ee" }} animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></center></div>

                :
                <>
                    {
                        stores.map( store => (
                            <div className="col-4" onClick={() => handelSelectStore(store.reference)} key={store.reference} style={{ backgroundColor: "#f0f0ff" }}>
                                <span style={{ color: "#000000" }}>{ store.title }</span>
                            </div>
                        ))
                    }
                </>
            }
            </div>
        </>
    )
}

export default Stores