import icon from 'constants/icon';
import React, { useContext, useRef } from 'react';
import languages from "data/languages";
import i18next from "i18next";
import style from './head.module.css'
import { useHistory } from 'react-router-dom';
import { AppContext } from 'context/AppProvider';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'interface/IStore';
import { logoutUser } from 'redux/profile/userSlice';

function HeadMenu() {
    const refMenu = useRef<HTMLDivElement>();
    const onToggleMenu = (dis: "show" | "hide") => {
        if (dis === "show")
            return refMenu?.current?.classList.add(style.head_menu_show);
        if (dis === "hide")
            return refMenu?.current?.classList.remove(style.head_menu_show);
    };
    const onCloseTimeout = () => {
        setTimeout(() => { onToggleMenu('hide') }, 100)
    }
    return (
        <button
            onFocus={() => onToggleMenu("show")}
            onBlur={() => onToggleMenu("hide")}
            className={style.head_top_right_btn}
        >
            <img src={icon.Menu} alt="" />
            <HeadMenuBox refMenu={refMenu} onCloseTimeout={onCloseTimeout} />
        </button>
    );
}

export default HeadMenu;

interface HeadMenuProps {
    refMenu: any;
    onCloseTimeout: () => void
}

const HeadMenuBox = (props: HeadMenuProps) => {
    const { refMenu, onCloseTimeout } = props;
    const history = useHistory();
    const { t, language, setLanguage } = useContext(AppContext) as any;
    const { USER } = useSelector((state: IStore) => state.USER);
    const dispatch = useDispatch();
    const listMenu = [
        {
            id: 1,
            icon: icon.User,
            text: t("Header.my_acc"),
            url: "/tai-khoan/thong-tin-ca-nhan",
        },
        {
            id: 2,
            icon: icon.Clock_purple,
            text: t('Header.my_order'),
            url: "/tai-khoan/lich-su-mua",
        },
        {
            id: 3,
            icon: icon.bag,
            text: t("Header.appointment"),
            url: "/lich-hen?tab=1",
        },
        {
            id: 4,
            icon: icon.bag,
            text: t("app.my_services"),
            url: "/lich-hen?tab=2",
        },
    ];
    const handleChangeLang = (code: string) => {
        setLanguage(code);
        i18next.changeLanguage(code);
    };

    return (
        <div
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            ref={refMenu} className={style.head_menu}
        >
            <div className={style.head_menu_title}>Menu</div>
            <ul className={style.menu_list}>
                {USER &&
                    listMenu.map((item) => (
                        <li
                            onClick={() => {
                                history.push(item.url);
                                onCloseTimeout()
                            }}
                            key={item.id}
                            className={style.menu_list_item}
                        >
                            <div className={style.menu_item}>
                                <img src={item.icon} alt="" />
                                <span className={style.menu_item_text}>
                                    {item.text}
                                </span>
                            </div>
                        </li>
                    ))}
                <li className={style.menu_list_item}>
                    <div className={style.menu_list_item_left}>
                        <img src={icon.languagePurple} alt="" />
                        <span className={style.menu_item_text}>{t('Header.language')}</span>
                    </div>
                    <div className={style.switch_lang}>
                        {languages.map((lang) => (
                            <div
                                style={
                                    language === lang.code
                                        ? {
                                            backgroundColor: "var(--purple)",
                                            color: "var(--bg-white)",
                                        }
                                        : {}
                                }
                                onClick={() => handleChangeLang(lang.code)}
                                className={style.switch_lang_item}
                                key={lang.code}
                            >
                                {lang.code}
                            </div>
                        ))}
                    </div>
                </li>
            </ul>
            {USER && (
                <div className={style.menu_bottom}>
                    <div
                        onClick={() => dispatch(logoutUser())}
                        className={style.menu_bottom_btn}
                    >
                        {t("Header.sign_out")}
                    </div>
                </div>
            )}
        </div>
    );
};