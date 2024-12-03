import React from 'react'
import logoImg from '../../../assets/images/LOGO.png'
import sloganImg from '../../../assets/images/slogan.png'
const Logo = (props ) => {

    return (
        <>
            <img width={40} src={logoImg} alt=""/>
            <img className={'secondLogo'} width={120} src={sloganImg} alt=""/>
         </>
        )
    }

    export default Logo
