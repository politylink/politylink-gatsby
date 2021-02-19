import {slide as Menu} from "react-burger-menu";
import {Link} from "gatsby";
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
            <Link to='/bills' className='menu-item'>法律案一覧</Link>
            <Link to='/members' className='menu-item'>議員一覧</Link>
            <Link to='/committees' className='menu-item'>委員会一覧</Link>
            <Link to='/timelines' className='menu-item'>国会タイムライン</Link>
            <Link to='/calender' className='menu-item'>法律案カレンダー</Link>
            <Link to='/articles' className='menu-item'>開発者ブログ</Link>
            <Link to='/about' className='menu-item'>PolityLinkについて</Link>
        </Menu>
    );
}