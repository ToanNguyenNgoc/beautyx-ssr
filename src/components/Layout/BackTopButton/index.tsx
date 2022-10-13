import React from 'react';
import icon from '../../../constants/icon';
import './style.css';
import scrollTop from '../../../utils/scrollTop';

window.addEventListener("scroll", function () {
    const scrolled = window.scrollY;
    const btn = document.querySelector(".back-top-btn");
    const windowPosition = scrolled > 220;
    if (btn) {
        btn.classList.toggle("back-top-btn__act", windowPosition);
    }
});

export function BackTopButton() {
    return (
        <div
            className='back-top-btn'
            onClick={() => scrollTop()}
        >
            <img src={icon.arrowSmallUpWhite} alt="" />
        </div>
    );
}