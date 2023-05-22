import { OrgContext, OrgContextType } from 'context'
import { useContext } from 'react'

export * from './map-org.module.css'

export const MapOrg = () => {
  const { org } = useContext(OrgContext) as OrgContextType
  return (
    <div>
      OrgMap
    </div>
  )
}