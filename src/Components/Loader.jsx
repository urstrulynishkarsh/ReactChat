import React from 'react'

const Loader = () => {
    return(
        <div className="place-content-center grid  m-0 h-[100vh] ml-48">
        <svg>
            <circle cx="50" cy="50" r="40" stroke="red" strokeDasharray="78.5 235.5" strokeWidth="3" fill="none" />
            <circle cx="50" cy="50" r="30" stroke="blue" strokeDasharray="62.8 188.8" strokeWidth="3" fill="none" />
            <circle cx="50" cy="50" r="20" stroke="green" strokeDasharray="47.1 141.3" strokeWidth="3" fill="none" />
        </svg>
    </div>
     
    )
}

export default Loader