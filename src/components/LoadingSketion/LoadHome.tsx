import Skeleton from 'react-loading-skeleton'
import img from '../../constants/img'
import './style.css'

export const LoadHomeBanner = () => {
    let tagsLoad: React.ReactElement[] = []
    for (var i = 0; i < 16; i++) {
        const tagsItem =
            <li key={i} className="item">
                <div className="item_load_img">
                    <Skeleton width="100%" height="100%" borderRadius={'20px'} />
                </div>
                <div className="item_load_text">
                    <Skeleton width="100%" height="100%" />
                </div>
            </li>
        tagsLoad.push(tagsItem)
    }
    return (
        <>
            <div className="load-home-banner">
                <div className="load-home-banner__img">
                    <img src={img.bannerBlur} alt="" />
                </div>
                <div className="load-home-banner__right">
                    <div className="load-home-banner__right-item">
                        <Skeleton style={{ width: '100%', height: '100%', borderRadius: '20px' }} />
                    </div>
                    <div className="load-home-banner__right-item">
                        <Skeleton style={{ width: '100%', height: '100%', borderRadius: '20px' }} />
                    </div>
                    <div className="load-home-banner__right-item">
                        <Skeleton style={{ width: '100%', height: '100%', borderRadius: '20px' }} />
                    </div>
                    <div className="load-home-banner__right-item">
                        <Skeleton style={{ width: '100%', height: '100%', borderRadius: '20px' }} />
                    </div>
                </div>
            </div>
            <div className="load-home-tag">
                <ul className="tag-list">
                    {tagsLoad}
                </ul>
            </div>
        </>
    )
}