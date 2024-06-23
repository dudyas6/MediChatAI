import React from 'react';
import { Link } from 'react-router-dom';

function Button ({ InnerText, to,onClick, bottom, left, py, px}) {
    return (
        <Link to={to} className="button-link" style={{ position: "absolute", bottom: bottom, left: left, transform: "translate(-50%, -50%)" }}>
            <button className="bg-white text-blue-500 font-bold rounded-full shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            style ={{width: px, height: py}} onClick={onClick}>
                {InnerText}
            </button>
        </Link>
    );
};

export default Button;