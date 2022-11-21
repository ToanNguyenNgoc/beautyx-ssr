import favorites from "api/favorite"
import IStore from "interface/IStore"
import { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

interface FavoriteProps {
    id?: number,
    org_id: number,
    type: "ORG" | "SERVICE" | "PRODUCT" | "COMBO",
    count: number,
    favorite: boolean
}

export function useFavorite(
    { id, org_id, type, count, favorite }: FavoriteProps
) {
    const history = useHistory()
    const [favoriteSt, setFavoriteSt] = useState({
        is_favorite: false,
        favorite_count: 0
    })
    useMemo(() => {
        setFavoriteSt({ is_favorite: favorite, favorite_count: count })
    }, [favorite, count])
    const { USER } = useSelector((state: IStore) => state.USER)
    const onToggleFavoriteOrg = async () => {
        if (favoriteSt?.is_favorite) {
            await favorites.deleteFavorite(org_id)
            setFavoriteSt({
                is_favorite: false,
                favorite_count: favoriteSt.favorite_count - 1
            })
        } else {
            await favorites.postFavorite(org_id)
            setFavoriteSt({
                is_favorite: true,
                favorite_count: favoriteSt.favorite_count + 1
            })
        }
    }
    const onToggleFavoriteDetail = async () => {
        const values = {
            org_id: org_id,
            service_id: type === "SERVICE" && id,
            product_id: type === "PRODUCT" && id
        }
        if (favoriteSt?.is_favorite) {
            await favorites.deleteFavoriteItem(values)
            setFavoriteSt({
                is_favorite: false,
                favorite_count: favoriteSt.favorite_count - 1
            })
        } else {
            await favorites.postFavoriteItem(values)
            setFavoriteSt({
                is_favorite: true,
                favorite_count: favoriteSt.favorite_count + 1
            })
        }
    }
    const onToggleFavorite = () => {
        if (USER) {
            if (type === "ORG") {
                onToggleFavoriteOrg()
            } else {
                onToggleFavoriteDetail()
            }
        } else {
            history.push('/sign-in?1')
        }
    }
    return { favoriteSt, onToggleFavorite }
}