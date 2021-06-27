import React from 'react'

import Breadcrumb from '../../../components/Application/Base/Breadcrumb'
import Table from '../../../components/Application/Orders/Table'

const Orders = props => {

    return (
        <>
            <Breadcrumb />
            <div className="row layout-top-spacing">
                <Table />
            </div>
        </>
    )
}

export default Orders