import { Container } from '@mui/material';
import img from 'constants/img';
import HomeRecommend from 'pages/HomePage/HomeRecommend';
import './style.css'
export const EmptyRes = ({ title, isRecommend }: { title: string, isRecommend?: boolean }) => {
    return (
        <Container>
            <div className="res-null flex-column">
                <span className="res-null__title">{title || 'Opps! không có kết quả phù hợp'}</span>
                <img className="res-null__image" src={img.resultNull} alt="" />
            </div>
            {isRecommend && <HomeRecommend />}
        </Container>
    )
}