type INameListObject = { [key: number]: string[] }
export const wordToNumber = (n: number) => {
    const list: { [key: number]: string } = {
        1: "الأولى",
        2: "الثانية",
        3: "الثالثة",
        4: "الرابعة",
        5: "الخامسة",
        6: "السادسة",
        7: "السابعة",
        8: "الثامنة",
        9: "التاسعة",
        10: "العاشرة",
        11: "الحادية عشرة",
        12: "الثانية عشرة",
        13: "الثالثة عشرة",
        14: "الرابعة عشرة",
        15: "الخامسة عشرة",
        16: "السادسة عشرة",
        17: "السابعة عشرة",
        18: "الثامنة عشرة",
        19: "التاسعة عشرة",
        20: "العشرون",
        21: "الحادية والعشرون",
        22: "الثانية والعشرون",
        23: "الثالثة والعشرون",
        24: "الرابعة والعشرون",
        25: "الخامسة والعشرون",
        26: "السادسة والعشرون",
        27: "السابعة والعشرون",
        28: "الثامنة والعشرون",
        29: "التاسعة والعشرون",
        30: "الثلاثون",
        31: "الحادية والثلاثون",
        32: "الثانية والثلاثون"
    };
    return list[n]
}
export const getNameList: (nameList: String) => INameListObject = (nameList) => {
    let namesInStringJSON = nameList
        .replaceAll('\'', '"')
        .replaceAll('\n', '')
        .replace(/(\d+):/g, '"$1":');
    return JSON.parse(namesInStringJSON) as INameListObject
}
export const getFlattenedNameList: (obj: INameListObject) => string[] = (nameList) => Object.values(nameList).flat()
const nameMaxLength: (nameList: INameListObject) => number = (nameList) => getFlattenedNameList(nameList).reduce((p, c) => {
    return c.length > p ? c.length : p
}, 0)
export const getPageOrderByName: (startCount: number, nameList: INameListObject) => String = (startCount, nameList) => {
    const pageLimit: number = 604
    let result = ''

    for (let nameListKey in nameList) {
        const pagesCount: number = parseInt(nameListKey)
        nameList[nameListKey].forEach(name => {
            let pages = ''
            for (let i = 0; i < pagesCount; i++) {
                if (startCount > pageLimit) break;
                pages = pages ? `${pages}-${startCount}` : `${startCount}`
                startCount++
            }
            if (startCount > pageLimit) return;
            const spaceRepeat: number = nameMaxLength(nameList) - name.length
            result += `${pages}  ${' '.repeat(spaceRepeat < 1 ? 0 : spaceRepeat)} ${name}\n`
        })
    }
    return result
}