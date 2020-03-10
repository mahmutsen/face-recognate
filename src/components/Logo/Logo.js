import React from 'react';
import Tilt from 'react-tilt';
import shooter from './shooter.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className ='zindex ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa3">
                <img style = {{paddingTop : '4px'}}alt = 'logo' src = {shooter}/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;