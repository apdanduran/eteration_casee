import React from 'react'
import './Loading.css'
const Loading = () => {
    return <div className='loading' >
        <img className='loadingGif' style={{ width: "75px", height: "75px", margin: "auto" }} alt={"loading.gif"} src={process.env.PUBLIC_URL + "/images/loading.gif"} />
    </div>
}

export default Loading