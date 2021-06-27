import React, { useState, useEffect } from 'react'
import { Modal, ListGroup, Spinner } from 'react-bootstrap'

const Address = props => {
    const [loading, setLoading] = useState(true)
    const [shopifyAddress, setShopifyAddress] = useState(null)
    const [orderName, setOrderName] = useState(null)

    useEffect(() => {
        setShopifyAddress( JSON.parse(localStorage.getItem( 'oaddress' )) )
        setOrderName( localStorage.getItem( 'oName' ) )
        setLoading( false )
    })

    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title>
                    {
                        loading
                        ?<span>Loading...</span>
                        :<span>Order {orderName} address</span>
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: "1rem" }}>
                <div className="container">
                {
                    loading
                    ?
                        <div><center><Spinner style={{ width:"8rem", height:"8rem", color:"#4361ee" }} animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></center></div>
                    :
                        <ListGroup>
                            <ListGroup.Item>City     : { shopifyAddress.city }</ListGroup.Item>
                            <ListGroup.Item>Address 1: { shopifyAddress.address1 }</ListGroup.Item>
                            <ListGroup.Item>Address 2: { shopifyAddress.address2 }</ListGroup.Item>
                        </ListGroup>
                }
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default Address