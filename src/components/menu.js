import {slide as Menu} from 'react-burger-menu'
import React from "react";

const styles = {
    bmBurgerButton: {
        position: 'fixed',
        width: '30px',
        height: '25px',
        right: '15px',
        top: '15px'
    },
    bmBurgerBars: {
        background: '#fff'
    },
    bmCrossButton: {
        height: '40px',
        width: '40px'
    },
    bmCross: {
        background: '#bdc3c7',
    },
    bmMenuWrap: {
        position: 'fixed',
        height: '100%'
    },
    bmMenu: {
        background: '#174a5c',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
    },
    bmMorphShape: {
        fill: '#373a47'
    },
    bmItemList: {
        color: '#fff',
        padding: '0.8em'
    },
    bmItem: {
        color: '#fff',
        textDecoration: 'none',
        margin: '1em',
        outline: 'none'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    }
}

export default function HamburgerMenu() {
    return (
        <Menu right noOverlay styles={styles}>
            <a className="menu-item" href="/timelines">国会タイムライン</a>
            <a className="menu-item" href="/">議案一覧</a>
            <a className="menu-item" href="/committees">委員会一覧</a>
            <a className="menu-item" href="/about">PolityLinkについて</a>
        </Menu>
    );
}