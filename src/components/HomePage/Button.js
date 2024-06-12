import React from 'react';
import { Link } from 'react-router-dom';

function Button ({ InnerText, to, bottom, left}) {
    return (
        <Link to={to} className="button-link" style={{ position: "absolute", bottom: bottom, left: left, transform: "translate(-50%, -50%)" }}>
            <button className="bg-white text-blue-500 font-bold py-6 px-14 rounded-full shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                {InnerText}
            </button>
        </Link>
    );
};

export default Button;