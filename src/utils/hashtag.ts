export function hashtag(specialCharacters: '#' | '@' | '$', text: string) {
    let isHashtag = false
    const index = text.indexOf(specialCharacters)
    if (index === 0) {
        isHashtag = true
    }
    const textReplace = text.replace(specialCharacters, '')
    return { isHashtag, textReplace }
}