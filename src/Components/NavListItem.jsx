import React, { useState } from "react";
import { Link } from "react-router-dom";
//For each item in navbar, links to a react page

function NavListItem({ text, link, currentPage }) {
    const isActive = currentPage === link;

    return (
        <li className="list-none">
            <label className="cursor-pointer hover:border-b-4 hover:rounded-sm hover:border-prim">
                <Link to={link} className={`${isActive ? "text-prim " : ""}`}>
                    {text}
                </Link>
            </label>
        </li>
    );
}

export default NavListItem;