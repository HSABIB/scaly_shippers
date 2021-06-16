import React from "react"

const Scrollup = () => {

    return (
        <div style={{position: "fixed", bottom: "43px", right: "21px", zIndex: 1025}} className="online-actions">
            <button className="btn btn-secondary scroll-top-btn" style={{marginLeft: "6px", padding: "6px 9px", display: "none", border: "none", boxShadow: "rgb(72, 1, 255) 0px 10px 20px -10px", backgroundImage: "linear-gradient(-225deg, rgb(172, 50, 228) 0%, rgb(121, 24, 242) 48%, rgb(72, 1, 255) 100%)"}}>
                <svg style={{width: "15px", height: "15px", strokeWidth: 2, verticalAlign: "middle"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
            </button>
        </div>
    )
}

export default Scrollup