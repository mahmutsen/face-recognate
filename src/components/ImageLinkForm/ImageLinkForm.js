import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => { //Destructered instead of props.oninputchange
    return (
        <div>
            <p className ='f3'>
            {'This Shooter will dedect faces in your pictures. Give it a try!'}
            </p>
            <div className = 'center'>
                <div className = 'center form pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70' type = 'text' onChange = {onInputChange}/>
                    <button 
                    className='w-30 grow br3 pv2 dib link white bg-dark-green'
                    onClick = {onPictureSubmit}
                    >Detect</button>
                </div>          
            </div>
        </div>
    )
}

export default ImageLinkForm;