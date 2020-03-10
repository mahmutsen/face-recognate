import React from 'react';
import './FaceRecognation.css'

const FaceRecognation = ( {imageUrl, boxRegion} ) => { 
    return (
        <div className ='center ma'>
            <div className = 'absolute mt2'>
                <img id ='inputImage' alt ='' src = {imageUrl} width ='500px' height ='auto' />
                <div className = 'bounding-box' style = {{top: boxRegion.topRow, right: boxRegion.rightCol, bottom: boxRegion.bottomRow, left: boxRegion.leftCol}}></div>
            </div>            
        </div>
    )
}

export default FaceRecognation;