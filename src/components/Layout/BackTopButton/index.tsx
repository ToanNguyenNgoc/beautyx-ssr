import icon from 'constants/icon';
import { scrollTop } from 'utils';
import './style.css';

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
            onClick={scrollTop}
        >
            <img src={icon.arrowSmallUpWhite} alt="" />
        </div>
    );
}