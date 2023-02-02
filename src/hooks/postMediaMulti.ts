import mediaApi from "api/mediaApi"

export async function postMediaMulti(e: any) {
    // const file = e.target.files

    const mediaList: any[] = []

    for (var i = 0; i < e.target.files.length; i++) {
        const fileItem = e.target.files[i]
        let formData = new FormData()
        let resMedia = {
            original_url: '',
            model_id: i
        }
        formData.append('file', fileItem)
        const res = await mediaApi.postMedia(formData)
        if (res) {
            resMedia = {
                original_url: res.data.context.original_url,
                model_id: res.data.context.model_id
            }
        }
        mediaList.push(resMedia)
    }
    return { mediaList }
}