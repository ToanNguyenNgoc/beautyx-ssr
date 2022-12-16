import { Container } from '@mui/system';
import HeadMobile from 'features/HeadMobile';
import { useDeviceMobile } from 'hooks';
import React from 'react';
import { NavLink, Redirect, RouteComponentProps, Switch, useLocation } from 'react-router-dom';
import style from './community.module.css'
import TabCommunity from './TabCommunity';
import TabGroup from './TabGroup';


function Community() {
    const RouterPage = (
        props: { pageComponent: JSX.Element } & RouteComponentProps
    ) => props.pageComponent;
    const routes = [
        {
            path: `/cong-dong/trang-chu`,
            component: <TabCommunity />
        },
        {
            path: `/cong-dong/nhom`,
            component: <TabGroup />
        },
    ]
    const location = useLocation()
    const path = location.pathname?.split('/')[2]
    const IS_MB = useDeviceMobile()
    return (
        <>
            {IS_MB && <HeadMobile title='Cộng đồng' />}
            <div className={style.container}>
                <div className={style.header_tab}>
                    <Container>
                        <div className={style.head_tab_cnt}>
                            <NavLink
                                activeClassName={path === 'trang-chu' ? style.header_tab_item_act : ''}
                                className={style.header_tab_item}
                                to={{ pathname: '/cong-dong/trang-chu' }}
                            >
                                Cộng đồng
                            </NavLink>
                            <NavLink
                                activeClassName={path === 'nhom' ? style.header_tab_item_act : ''}
                                className={style.header_tab_item}
                                to={{ pathname: '/cong-dong/nhom' }}
                            >
                                Nhóm của tôi
                            </NavLink>
                        </div>
                    </Container>
                </div>
                <Switch>
                    <Redirect exact from="/cong-dong" to={`/cong-dong/trang-chu`} />
                    {routes.map((item, index) => (
                        <RouterPage
                            key={index}
                            path={item.path}
                            pageComponent={item.component}
                        />
                    ))}
                </Switch>
            </div>
        </>
    );
}

export default Community;