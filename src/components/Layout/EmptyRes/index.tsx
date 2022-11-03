import img from '../../../constants/img';
import './style.css'
export const EmptyRes = ({title}:any) => {
    return (
        <div className="res-null flex-column">
            <span className="res-null__title">{title||'Opps! không có kết quả phù hợp'}</span>
            <img className="res-null__image" src={img.resultNull} alt=""/>
        </div>
    )
}