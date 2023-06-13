import { OrgContext, OrgContextType } from 'context'
import { useContext } from 'react'
import style from './map-org.module.css'
import MapGL from "react-map-gl";

export const MapOrg = () => {
  const { org } = useContext(OrgContext) as OrgContextType
  console.log(org)

  return (
    <div className={style.container}>
      <div className={style.left}>

      </div>
      <div className={style.right}>
        <MapGL
          style={{ width: "100%", height: "100%" }}
          initialViewState={{
            latitude: org.latitude,
            longitude: org.longitude,
            zoom: 16,
          }}
          mapStyle={'mapbox://styles/mapbox/streets-v12'}
          attributionControl={true}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
        </MapGL>
      </div>
    </div>
  )
}