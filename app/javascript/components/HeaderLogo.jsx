import React from "react";
import Logo from '../../assets/images/Movie-night.png';
import { Link } from "react-router-dom";

class HeaderLogo extends React.Component {
    render() {
        return (<>
        <div className="header"><Link to={`/`}><img src={Logo} alt="Movie Night Logo" className="logo" /></Link></div>
        </>)
    }
}

export default HeaderLogo;