import React from 'react'
import {Link} from 'react-scroll';

const Logo = () => {
    return (
        <div className='l'>
            <Link
              to="prof"
              spy={true}
              smooth={true}
              offset={-300}
              duration={500}
            >
            AS</Link>
        </div>
    )
}

export default Logo
