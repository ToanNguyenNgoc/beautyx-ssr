import API_3RD from "api/3rd-api"
import { useFetch } from "hooks"
import { LocationMapBox } from "interface"
import style from './search.module.css'

interface SearchLocationProps {
    keyword: string,
    onResult: (tabName?: string, outKeyword?: string) => void
}

function SearchLocation(props: SearchLocationProps) {
    const { keyword, onResult } = props
    const { response } = useFetch(
        keyword !== '',
        API_3RD.API_MAP_BOX_KEY_WORD(keyword)
    )
    const locations: LocationMapBox[] = response?.features
    return (
        <div className={style.section_container}>
            <span className={style.section_title}>Địa điểm làm đẹp gần</span>
            <ul className={style.location_result}>
                {
                    locations?.slice(0, 3).map((item, index) => (
                        <li
                            key={index} className={style.location_item}
                            onClick={() => onResult('cua-hang', item.place_name)}
                        >
                            {/* <Link
                                to={{ pathname: "/ket-qua-tim-kiem/cua-hang", search: `keyword=${encodeURIComponent(item.place_name)}` }}
                            > */}
                                {item.place_name}
                            {/* </Link> */}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
export default SearchLocation