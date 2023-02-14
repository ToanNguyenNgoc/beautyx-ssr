export interface LocationMapBox {
    bbox: number[],
    center: number[],
    context: [{ id: string, short_code: string, text: string, wikidata: string }],
    place_name: string,
    relevance: string,
    text: string,
    type: string
}