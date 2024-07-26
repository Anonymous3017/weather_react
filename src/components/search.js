import React from 'react'
import './search.css'

const search = () => {
    return (
        <>
            <div class="search">
                <input type="text" placeholder="Enter city name" spellCheck="false" />
                <button><img src="images/search.png" alt="" /></button>
            </div>
        </>
    )
}

export default search