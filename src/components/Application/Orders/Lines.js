import React, { useState, useEffect } from 'react'
import { Modal, Spinner } from 'react-bootstrap'

const Product = props => {
    const [loading, setLoading] = useState(true)
    const [shopifyLines, setShopifyLines] = useState(null)
    const [orderName, setOrderName] = useState(null)

    const extractID = (shopifyID) => {
        return shopifyID.split('/')[ shopifyID.split('/').length -1 ]
    }

    useEffect(() => {
        setShopifyLines( JSON.parse(localStorage.getItem( 'olines' )) )
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
                        :<span>Order {orderName} lines</span>
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: "1rem" }}>
            {
                loading
                ?
                    <div><center><Spinner style={{ width:"8rem", height:"8rem", color:"#4361ee" }} animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></center></div>
                :
                    <div className="container">
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="">
                                    <tr>
                                        <th scope="col">Line ID</th>
                                        <th scope="col">Variant&nbsp;Name</th>
                                        <th className="text-right" scope="col">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        shopifyLines.map( (line, key) => (
                                            <tr>
                                                <td>{extractID(line.node.id)}</td>
                                                <td style={{ whiteSpace: "nowrap" }}>{line.node.variant.displayName}</td>
                                                <td className="text-right">x&nbsp;{line.node.quantity}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }
            </Modal.Body>
        </Modal>
    )
}

export default Product