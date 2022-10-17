/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Dialog, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import {
    onSetTagsOrg,
    onSetSortOrg,
    onSetOrgsProvince,
    onSetMinPrice,
    onSetMaxPrice,
    onSetOrgsDistrict,
    fetchAsyncDistrictsByProvince,
    onResetFilter
} from '../../redux/filter/filterSlice';
import icon from '../../constants/icon';
import { IProvince, IDistrict } from '../../interface/provinces';
import { extraParamsUrl } from '../../utils/extraParamsUrl';
import { TransitionUp } from '../../utils/transition';
import { XButton } from 'components/Layout';

interface IProps {
    disableTags?: boolean,
    disableProvince?: boolean,
    onApplyFilterOrgs?: () => void
}
interface PriceList {
    id: number, min_price: string, max_price: string, title: string
}
export const pricesList: PriceList[] = [
    { id: 1, min_price: "0", max_price: "1000000", title: "Dưới 1 triệu" },
    { id: 2, min_price: "1000000", max_price: "4000000", title: "Từ 1 - 4 triệu" },
    { id: 3, min_price: "4000000", max_price: "8000000", title: "Từ 4 - 8 triệu" },
    { id: 4, min_price: "8000000", max_price: "12000000", title: "Từ 8 - 12 triệu" },
    { id: 5, min_price: "12000000", max_price: "20000000", title: "Từ 12 - 20 triệu" },
    { id: 6, min_price: "20000000", max_price: "", title: "Trên 20 triệu" }
]

function FilterOrgs(props: IProps) {
    const {
        disableTags,
        disableProvince,
        onApplyFilterOrgs
    } = props;
    const dispatch = useDispatch();
    const params: any = extraParamsUrl();
    const tagList = useSelector((state: any) => state.HOME.tags);
    const provinces = useSelector((state: any) => state.HOME.provinces);
    const {
        tags,
        sort,
        province,
        district,
        min_price,
        max_price
    } = useSelector((state: any) => state.FILTER.FILTER_ORG);
    const { DISTRICTS } = useSelector((state: any) => state.FILTER);
    const [openProvince, setOpenProvince] = useState(false);
    const [openDistrict, setOpenDistrict] = useState(false);

    useEffect(() => {
        if (params.tag) {
            dispatch(onSetTagsOrg(params.tag))
        } else if (params.province) {
            const provinceInit = provinces?.find((i: IProvince) => i.province_code === parseInt(params.province));
            dispatch(onSetOrgsProvince(provinceInit))
        }
    }, [])

    const sortList = [
        { id: 1, title: "Độ phổ biến", sort: "priority" },
        { id: 2, title: "Gần tôi", sort: "distance" },
    ]
    const onChangeTagsOrg = (tag: any) => {
        dispatch(onSetTagsOrg(tag.name))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(onSetSortOrg((event.target as HTMLInputElement).value))
    };
    const onChangeOrgsProvince = (province: IProvince) => {
        setOpenProvince(false)
        dispatch(onSetOrgsProvince(province))
        if (DISTRICTS.province_code !== province?.province_code) {
            dispatch(onSetOrgsDistrict(null))
        }
    }
    const onChangeOrgsDistrict = (district: IDistrict) => {
        dispatch(onSetOrgsDistrict(district))
    }


    const handleGetDistrictByProvince = (province: IProvince) => {
        const code = params.province ? parseInt(params.province) : province?.province_code;
        if (code) {
            if (!params.province) {
                onChangeOrgsProvince(province)
            }
            setOpenDistrict(true);
            if (DISTRICTS.province_code !== code) {
                dispatch(fetchAsyncDistrictsByProvince(code))
            }
        }
    }
    //onchange min, max price;
    const onChangeMinPrice = (e: any) => {
        if (parseInt(e.target.value) >= 0 || e.target.value === "") {
            dispatch(onSetMinPrice(e.target.value))
        }
    }
    const onChangeMaxPrice = (e: any) => {
        const max = e.target.value;
        dispatch(onSetMaxPrice(max))
    }
    const onChooseRatePrice = (item: PriceList) => {
        dispatch(onSetMinPrice(item.min_price))
        dispatch(onSetMaxPrice(item.max_price))
    }
    const handleApplyByFilter = () => {
        // console.log(min_price, max_price)
        if (min_price < max_price ||
            max_price === "" ||
            min_price === "" ||
            !min_price || !max_price
        ) {
            if (onApplyFilterOrgs) {
                onApplyFilterOrgs()
            }
        }
    }

    return (
        <>
            <div className='filter-orgs-cnt' >
                <div>
                    {
                        disableTags ? <></>
                            :
                            <div className='filter-orgs-tags'>
                                <span className="filter-orgs-cnt__title">Chọn danh mục</span>
                                <ul className="tags-list">
                                    {
                                        tagList.map((i: any, index: number) => (
                                            <li onClick={() => onChangeTagsOrg(i)} key={index} className="tags-list__item">
                                                <div className="flex-row item">
                                                    <Checkbox
                                                        checked={tags.includes(i.name) ? true : false}
                                                    />
                                                    <span
                                                        className={tags.includes(i.name) ? "item-name tag-item-name-act" : "item-name"}
                                                    >
                                                        {i.name}
                                                    </span>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                    }
                    <div className='filter-orgs-tags'>
                        <span className="filter-orgs-cnt__title">Chọn khu vực</span>
                        {
                            disableProvince ? <></> :
                                <div className="flex-row-sp filter-orgs-location-item">
                                    <div className='flex-row'>
                                        <img style={{ width: "18px", height: "18px" }} src={icon.mapPinRed} alt="" />
                                        <span onClick={() => setOpenProvince(true)} className="filter-orgs-item__text">
                                            {province ? province?.name : "Chọn tỉnh thành"}
                                        </span>
                                        <DialogProvince
                                            open={openProvince}
                                            setOpen={setOpenProvince}
                                            onChangeOrgsProvince={onChangeOrgsProvince}
                                            handleGetDistrictByProvince={handleGetDistrictByProvince}
                                            provinces={provinces}
                                            province={province}
                                        />
                                    </div>
                                    <img onClick={() => setOpenProvince(true)} src={icon.arrowDownPurple} alt="" />
                                </div>
                        }
                        <div className="flex-row-sp filter-orgs-location-item">
                            <div className='flex-row'>
                                <img style={{ width: "18px", height: "18px" }} src={icon.mapPinRed} alt="" />
                                <span
                                    onClick={() => handleGetDistrictByProvince(province)}
                                    className="filter-orgs-item__text"
                                >
                                    {district ? district?.name : "Chọn quận, huyện"}
                                </span>
                                <DialogDistrict
                                    open={openDistrict}
                                    setOpen={setOpenDistrict}
                                    onChangeOrgsDistrict={onChangeOrgsDistrict}
                                />
                            </div>
                            <img onClick={() => handleGetDistrictByProvince(province)} src={icon.arrowDownPurple} alt="" />
                        </div>
                    </div>
                    <div className='filter-orgs-tags'>
                        <FormControl>
                            <span className="filter-orgs-cnt__title">Lọc theo</span>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={sort}
                                onChange={handleChange}
                            >
                                {
                                    sortList.map(item => (
                                        <FormControlLabel
                                            key={item.id}
                                            value={item.sort}
                                            control={<Radio />} label={item.title}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='filter-orgs-tags'>
                        <span className="filter-orgs-cnt__title">Khoảng giá</span>
                        <div className="filter-orgs-ip__wrap">
                            <input
                                onChange={onChangeMinPrice}
                                value={min_price || ""}
                                className='filter-orgs-input'
                                type="number"
                                placeholder='Tốt thiểu'
                            />
                            <input
                                onChange={onChangeMaxPrice}
                                value={max_price || ""}
                                className='filter-orgs-input'
                                type="number"
                                placeholder='Tối đa'
                            />
                        </div>
                        {
                            (min_price >= max_price || min_price !=="" || max_price !=="") &&
                            <span className="filter-orgs-ip__error">
                                Vui lòng chọn khoảng giá phù hợp
                            </span>
                        }
                        <div className="filter-orgs-ip__price-list">
                            <ul className="list">
                                {
                                    pricesList.map((item: PriceList, index: number) => (
                                        <li
                                            style={
                                                (item.max_price === max_price && item.min_price === min_price) ?
                                                    {
                                                        backgroundColor: "var(--purple)",
                                                        color: "var(--white)"
                                                    } : {}
                                            }
                                            onClick={() => onChooseRatePrice(item)}
                                            key={index}
                                        >
                                            {item.title}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="filter-orgs-btn">
                <XButton
                    title='Áp dụng '
                    onClick={handleApplyByFilter}
                    loading={false}
                />
                <XButton
                    title='Thiết lập lại'
                    onClick={() => dispatch(onResetFilter())}
                    loading={false}
                />
            </div>
        </>
    );
}

export default FilterOrgs;

const DialogProvince = (props: any) => {
    const {
        open,
        setOpen,
        provinces,
        onChangeOrgsProvince,
        province,
        handleGetDistrictByProvince
    } = props
    return (
        <Dialog
            TransitionComponent={TransitionUp}
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className="filter-org-province-list">
                <div className="flex-row-sp title">
                    Chọn tỉnh, thành phố
                    <img onClick={() => setOpen(false)} src={icon.closeCircle} alt="" />
                </div>
                <div className="filter-org-province-list__input">
                    <input type="text" placeholder='Tìm kiếm tỉnh, thành phố...' />
                </div>
                <ul className="list">
                    {
                        provinces.map((item: IProvince, index: number) => (
                            <li key={index} className="flex-row-sp list-item">
                                <div
                                    onClick={() => onChangeOrgsProvince(item)}
                                    className="flex-row left"
                                >
                                    <div
                                        className="left-checkbox"
                                    >
                                        {item.province_code === province?.province_code &&
                                            <div className="left-checkbox-act"></div>
                                        }
                                    </div>
                                    {item.name}
                                </div>
                                <button
                                    onClick={() => handleGetDistrictByProvince(item)}
                                    className="right"
                                >
                                    <img src={icon.chevronRight} alt="" />
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </Dialog>
    )
}
function DialogDistrict(props: any) {
    const { open, setOpen, onChangeOrgsDistrict } = props;
    const { district } = useSelector((state: any) => state.FILTER.FILTER_ORG);
    const { districts } = useSelector((state: any) => state.FILTER.DISTRICTS);
    const onChooseDistrict = (item: IDistrict) => {
        setOpen(false);
        onChangeOrgsDistrict(item)
    }
    return (
        <Dialog
            TransitionComponent={TransitionUp}
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className="filter-org-province-list">
                <div className="flex-row-sp title">Chọn quận, huyện
                    <img onClick={() => setOpen(false)} src={icon.closeCircle} alt="" />
                </div>
                <ul className="list">
                    {
                        districts.map((item: any, index: number) => (
                            <li key={index} className="flex-row-sp list-item">
                                <div
                                    onClick={() => onChooseDistrict(item)}
                                    className="flex-row left"
                                >
                                    <div
                                        className="left-checkbox"
                                    >
                                        {item.district_code === district?.district_code &&
                                            <div className="left-checkbox-act"></div>
                                        }
                                    </div>
                                    {item.name}
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </Dialog>
    )
}