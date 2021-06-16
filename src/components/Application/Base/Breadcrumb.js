import React from "react"

const Breadcrumb = (props) => {

    return (
        <div className="page-header">
            <nav className="breadcrumb-one" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">{props.first}</a></li>
                    {
                        props.third === undefined 
                        ?
                        <>
                            <li className="breadcrumb-item active" aria-current="page">
                                <a href="/app/dashboard">
                                    {props.second}
                                </a>
                            </li>
                        </>
                        :
                        <>
                            <li className="breadcrumb-item">
                                <a href="#">
                                    {props.second}
                                </a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                <a href="#">
                                    {props.third}
                                </a>
                            </li>
                        </>
                    }
                    
                    
                </ol>
            </nav>
        </div>
    )
}

export default Breadcrumb