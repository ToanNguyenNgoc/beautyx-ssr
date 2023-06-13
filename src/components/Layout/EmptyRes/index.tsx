import { Container } from '@mui/material';
import img from 'constants/img';
import HomeRecommend from 'pages/HomePage/HomeRecommend';
import './style.css'
export const EmptyRes = (
    { title, isRecommend, imgNull }
        :
        { title: string, isRecommend?: boolean, imgNull?: string }
) => {
    return (
        <Container>
            <div className="res-null flex-column">
                <span className="res-null__title">{title || 'Opps! không có kết quả phù hợp'}</span>
                <img className="res-null__image" src={imgNull ?? img.resultNull} alt="" />
            </div>
            {isRecommend && <HomeRecommend />}
        </Container>
    )
}