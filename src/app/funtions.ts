import {IName, INameListObject} from "@/app/types";

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
/**
 * Converts an array of IName objects into an INameListObject.
 * @param nameArray Array of objects with {name, count}.
 * @returns Grouped INameListObject.
 */
export const nameArrayToNameListObject = (nameArray: IName[]): INameListObject => {
    const grouped: INameListObject = {};

    nameArray.forEach((item) => {
        // Calculate group key based on group size
        const groupKey = item.count;

        if (!grouped[groupKey]) {
            grouped[groupKey] = [];
        }

        grouped[groupKey].push(item.name);
    });

    return grouped;
};
/**
 * Converts a JSON string (or comma-separated list) into IName[]
 * @param str Input string containing names
 * @returns Parsed array of IName
 */
export const stringToNameArray = (str: string | null): IName[] => {
    if (!str) return [];
    try {
        // First, attempt to parse directly if it's JSON
        const parsed = JSON.parse(str);
        if (Array.isArray(parsed)) {
            // If already an array, confirm it matches IName[]
            return parsed.map(item => ({
                name: item.name || item,
                count: item.count || 1,
            }));
        } else if (typeof parsed === "object") {
            // Handle a structured object like the sample in "names"
            const names: IName[] = [];
            Object.values(parsed).forEach((group: any) => {
                if (Array.isArray(group)) {
                    group.forEach((name: string) => {
                        names.push({name, count: 1});
                    });
                }
            });
            return names;
        }
    } catch (error) {
        // Handle comma-separated list fallback
        const tempNames = str.split(",").map(name => name.trim());
        return tempNames.map(name => ({name, count: 1}));
    }
    return [];
};

/**
 * Converts an IName[] array into a string representation
 * @param nameArray Array of IName
 * @returns Stringified format of the array
 */
export const nameArrayToString = (nameArray: IName[]): string => {
    // If you want JSON output
    return JSON.stringify(nameArray);

    // Or customize it into a displayable text (comma-separated)
    // return nameArray.map(item => item.name).join(", ");
};
