/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AUTH_LOCATION } from '../../api/authLocation'
import icon from '../../constants/icon'
import MapTagsOrgItem from './MapOrgItem'
// import { fetchAsyncOrgsByFilter } from "../../redux/filter/filterSlice";
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import Slider from 'react-slick'
import MapTagsItemMB from './MapItemMB'
import { IOrganization } from '../../interface/organization'
import MapOrgItemDetail from './MapOrgItemDetail'
import {
	GoogleMap,
	Marker,
	useLoadScript,
	InfoWindow,
	DirectionsRenderer,
} from '@react-google-maps/api'
import MapOrgFilter from './MapOrgFilter'
import { fetchAsyncOrg } from '../../redux/org/orgSlice'
import useDeviceMobile from '../../utils/useDeviceMobile'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _, { debounce } from 'lodash'
import { onSetOrgCenter } from '../../redux/org/orgMapSlice'
import { fetchOrgsMapFilter } from '../../redux/org/orgMapSlice'

interface IProps {
	orgs: IOrganization[]
}
declare type Libraries = ('drawing' | 'geometry' | 'localContext' | 'places' | 'visualization')[]
const lib: Libraries = ['places']

const MapContent = (props: IProps) => {
	const IS_MB = useDeviceMobile()
	const { orgs } = props
	// console.log(orgs)
	const key = process.env.REACT_APP_GOOGLE_MAP_API_KEY
	const { orgCenter } = useSelector((state: any) => state.ORGS_MAP)
	const [zoom, setZoom] = useState<number>(16)
	const location = useLocation()
	const LOCATION = AUTH_LOCATION()
	const org: IOrganization = useSelector((state: any) => state.ORG.org)
	const dispatch = useDispatch()
	const [map, setMap] = useState<any>()
	const slideRef = useRef<any>()
	const [openDetail, setOpenDetail] = useState({
		open: false,
		check: false,
	})
	const [local, setLocal] = useState({
		lat: LOCATION ? parseFloat(LOCATION?.split(',')[0]) : orgs[0]?.latitude,
		long: LOCATION ? parseFloat(LOCATION?.split(',')[1]) : orgs[0]?.longitude,
	})

	const refListOrg: any = useRef()
	const [openListOrg, setOpenListOrg] = useState(true)
	// const { page, totalItem } = useSelector((state: any) => state.FILTER.ORGS);
	const handleToggleListOrg = () => {
		refListOrg.current.classList.toggle('list-org__active')
		setOpenListOrg(!openListOrg)
		if (openListOrg === false && openDetail.open === false && openDetail.check === true) {
			setOpenDetail({
				...openDetail,
				open: true,
			})
		} else {
			setOpenDetail({
				...openDetail,
				open: false,
			})
		}
		if (openListOrg === false && openDetail.open === true && openDetail.check === true) {
			setOpenDetail({
				...openDetail,
				open: true,
			})
		}
	}
	const handleSetLocation = useCallback((cardMapItem: any) => {
		setLocal({
			lat: cardMapItem?.latitude,
			long: cardMapItem?.longitude,
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const { totalItem, page } = useSelector((state: any) => state.ORGS_MAP.orgsMap)
	const onViewMoreOrgs = () => {
		if (location.pathname === '/ban-do' && totalItem >= 15 && orgs.length < totalItem) {
			dispatch(
				fetchOrgsMapFilter({
					page: page + 1,
					sort: 'distance',
					path_url: location.pathname,
				})
			)
		}
	}

	const onGotoSlickOrgItem = (index: number) => {
		slideRef?.current?.slickGoTo(index)
	}

	const onPanTo = (lat: number, lng: number) => {
		map?.panTo({ lat: lat, lng: lng })
	}
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		centerPadding: '30px',
		className: 'center',
		centerMode: true,
		afterChange: function (index: any) {
			onPanTo(orgs[index]?.latitude, orgs[index]?.longitude)
			dispatch(onSetOrgCenter(orgs[index]))
		},
	}
	useEffect(() => {
		switch (orgs.length) {
			case 30:
				return setZoom(15)
			case 45:
				return setZoom(14)
			case 60:
				return setZoom(13)
			case 75:
				return setZoom(12)
			case 90:
				return setZoom(11)
			case 105:
				return setZoom(10)
		}
	}, [orgs.length])
	const { isLoaded } = useLoadScript({
		libraries: lib,
		googleMapsApiKey: `${key}`,
	})
	const onMarkerClick = (item: IOrganization, index: number) => {
		dispatch(fetchAsyncOrg(item.subdomain))
		dispatch(onSetOrgCenter(item))
		setZoom(16)
		setLocal({
			lat: item.latitude,
			long: item.longitude,
		})
		if (IS_MB && onGotoSlickOrgItem) {
			onGotoSlickOrgItem(index)
		}
		setOpenDetail({
			...openDetail,
			open: true,
			check: true,
		})
		onPanTo(item.latitude, item.longitude)
	}
	const debounceDropDown = useCallback(
		debounce((nextValue) => {
			setLocal(nextValue)
		}, 1000),
		[]
	)
	const onCenterChanged = () => {
		debounceDropDown(map?.getCenter().toJSON())
	}

	const [directionsResponse, setDirectionsResponse] = useState<any>()
	// const [step, setStep] = useState<any>()
	const handleDirection = async () => {
		if (orgCenter && LOCATION) {
			setOpenListOrg(false)
			const directionsService = new google.maps.DirectionsService()
			const results = await directionsService.route({
				// origin: originRef.current.value,
				origin: {
					lat: parseFloat(LOCATION.split(',')[0]),
					lng: parseFloat(LOCATION.split(',')[1]),
				},
				// destination: orgCenter.full_address,
				destination: { lat: orgCenter.latitude, lng: orgCenter.longitude },
				// eslint-disable-next-line no-undef
				travelMode: google.maps.TravelMode.DRIVING,
			})
			setDirectionsResponse(results)
			// setStep(results?.routes[0]?.legs[0]?.steps)
		}
	}

	return (
		<div className="map-content">
			{/* map */}
			<MapOrgFilter
				map={map}
				setZoom={setZoom}
				openDetail={openDetail}
				setOpenDetail={setOpenDetail}
			/>
			<>
				{isLoaded && (
					<>
						{/* <GoogleMap
							id="searchbox-example"
							onCenterChanged={onCenterChanged}
							mapContainerClassName="google-map-view"
							zoom={zoom}
							onLoad={(map) => setMap(map)}
							center={{
								lat: local.lat,
								lng: local.long,
							}}
						>
							{LOCATION && (
								<Marker
									position={{
										lat: parseFloat(LOCATION?.split(',')[0]),
										lng: parseFloat(LOCATION?.split(',')[1]),
									}}
								></Marker>
							)}
							{orgs?.map((item: IOrganization, index: number) => (
								<Marker
									onClick={() => onMarkerClick(item, index)}
									key={index}
									icon={{ url: icon.pinMap }}
									position={{ lat: item?.latitude, lng: item?.longitude }}
								></Marker>
							))}
							{orgCenter && (
								<InfoWindow position={{ lat: orgCenter?.latitude, lng: orgCenter?.longitude }}>
									<img className="map-org-img-marker" src={orgCenter.image_url} alt="" />
								</InfoWindow>
							)}
							{directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
						</GoogleMap> */}
					</>
				)}
			</>
			<div
				className={
					openListOrg === true ? 'dialog-map__wrapper list-org__active ' : 'dialog-map__wrapper'
				}
				ref={refListOrg}
			>
				<div className="dialog-wrap__list">
					<div id="scrollableDiv" className="dialog-map__list">
						<InfiniteScroll
							hasMore={true}
							loader={<></>}
							next={onViewMoreOrgs}
							dataLength={orgs.length}
							scrollableTarget="scrollableDiv"
						>
							{orgs?.map((item: any, index: number) => (
								<MapTagsOrgItem
									location={local}
									handleSetLocation={handleSetLocation}
									key={index}
									item={item}
									setZoom={setZoom}
									setOpenDetail={setOpenDetail}
									openDetail={setOpenDetail}
									map={map}
									setLocal={setLocal}
								/>
							))}
						</InfiniteScroll>
					</div>
					{openDetail.open === true ? (
						<MapOrgItemDetail
							org={org}
							setOpenDetail={setOpenDetail}
							openDetail={openDetail}
							handleDirection={handleDirection}
						/>
					) : null}
					<div
						onClick={() => {
							handleToggleListOrg()
						}}
						className="open-list__org close"
					>
						<img src={openListOrg === true ? icon.arrownLeftWhite : icon.arrownRightWhite} alt="" />
					</div>
				</div>
			</div>
			{IS_MB && (
				<div className="map-list__mobile">
					<Slider ref={slideRef} {...settings}>
						{orgs.length > 0 &&
							orgs.map((item: any, index: number) => (
								<MapTagsItemMB handleDirection={handleDirection} key={index} item={item} />
							))}
					</Slider>
				</div>
			)}
		</div>
	)
}
export default MapContent
