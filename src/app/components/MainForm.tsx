"use client";
import Input from "@/app/components/Input";
import {ChangeEvent, useState} from "react";
import {
    getFlattenedNameList,
    getPageOrderByName,
    nameArrayToNameListObject,
    nameArrayToString,
    stringToNameArray,
    wordToNumber
} from "@/app/funtions";
import IconBtn from "@/app/components/IconBtn";
import DeleteBtn from "@/app/components/DeleteBtn";
import AddBtn from "@/app/components/AddBtn";
import {IName} from "@/app/types";


export default function MainForm() {
    const isBrowser = typeof window !== "undefined"
    const getLocalStorage = (name: string) => isBrowser ? localStorage.getItem(name) : ''
    const [zkr, setZkr] = useState<string>(getLocalStorage('zkr') || 'سبحان الله وبحمده، عدد خلقه، ورضا نفسه، وزنة عرشه، ومداد كلماته عشر مرات ❤');
//     const [names, setNames] = useState<string>(getLocalStorage('names') || `{
//     "1": [
//         "أبو انس",
//         "أبو خالد خاروف",
//         "بشار مدلل",
//         "توفيق الشبلي",
//         "ثابت الدبش",
//         "خالد خاروف",
//         "رامز العبد الله",
//         "سامر سرور",
//         "علي",
//         "عماد طباع",
//         "طارق ذي النون",
//         "محمد شما",
//         "معتز"
//     ],
//     "2": [
//         "أبو اديب",
//         "أبو نسيب",
//         "احمد أبو لبدة",
//         "احمد عباس",
//         "احمد مشلي",
//         "اسامة",
//         "بشر",
//         "خالد نبعة",
//         "خليل خلو",
//         "زهير كحلوس",
//         "سامي العش",
//         "عمر",
//         "عمر زعيتر",
//         "عبادة بقلة",
//         "عبود",
//         "فراس",
//         "كنان تسابحجي",
//         "ماجد",
//         "محمد الوالي",
//         "محمد فتال",
//         "معاذ الادلبي",
//         "معاذ كعدان",
//         "أحمد دحبور"
//     ]
// }`);
    const [names2, setNames2] = useState<IName[]>(stringToNameArray(getLocalStorage('names2')));
    const [duaa, setDuaa] = useState<string>(getLocalStorage('duaa') || 'للهم اجعلنا مدبرين مقبلين الى دوام ذكرك وشكرك وحسن عبادك ولا تجعلنا من المعرضين');
    const [startPage, setStartPage] = useState<number>(parseInt(getLocalStorage('startPage') || '302', 10));
    const [recitationNumber, setRecitationNumber] = useState<string>(getLocalStorage('recitationNumber') || '20');

    const name2List = nameArrayToNameListObject(names2);
    const partNumber = () => {
        const startPart = Math.ceil(startPage / 20);
        const endPart = Math.ceil((startPage + getFlattenedNameList(name2List).length) / 20);
        return startPart === endPart
            ? `${wordToNumber(startPart)}`
            : `${wordToNumber(startPart)} ~ ${wordToNumber(endPart)}`;
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        if (name.startsWith('names2_')) {
            const index = name.split('_')[2]
            const isName = name.split('_')[1] === 'name';
            setNames2(old => {
                const updatedNames = [...old];
                if (index !== undefined && /^[0-9]+$/.test(index)) {
                    const idx = parseInt(index, 10);
                    if (idx >= 0 && idx < updatedNames.length) {
                        const obj: IName = isName ?
                            {name: value, count: updatedNames[idx].count ?? 1} :
                            {name: updatedNames[idx].name, count: parseInt(value ?? '')}
                        updatedNames[idx] = obj
                    } else if (idx === updatedNames.length) {
                        console.log(value)
                        // Add new name if index is equal to the current length
                        const obj: IName = isName ?
                            {name: value, count: updatedNames[idx].count ?? 1} :
                            {name: updatedNames[idx].name ?? '', count: parseInt(value ?? '')}
                        updatedNames.push(obj);
                    }
                }
                if (isBrowser)
                    localStorage.setItem('names2', nameArrayToString(updatedNames));
                return updatedNames;
            });
        } else {
            if (isBrowser)
                localStorage.setItem(name, value); // Save to localStorage whenever an input changes

        }
        switch (name) {
            case 'zkr':
                setZkr(value);
                break;
            // case 'names':
            //     setNames(value);
            //     break;
            case 'duaa':
                setDuaa(value);
                break;
            case 'startPage':
                setStartPage(Number(value));
                break;
            case 'recitationNumber':
                setRecitationNumber(value);
                break;
            default:
                break;
        }
    };

    const result = `# ذكر اليوم : ${zkr}
الختمة { ${recitationNumber} }
توزيع الجزء ${partNumber()}
رقم الصفحة   اخي بالله
${getPageOrderByName(startPage, name2List)}
${duaa}`;

    const copyResult = () => {
        // Copy the text inside the text field
        navigator.clipboard.writeText(result).then(function () {
            // Alert the user that the text has been copied
            // alert("Text copied to clipboard");
        }).catch(function (error) {
            console.error('Error copying text: ', error);
        });
    }

    return (
        <div dir='rtl'>
            <div className='m-5'>
                <Input
                    name='recitationNumber'
                    title='الختمة'
                    type='number'
                    min={0}
                    defaultValue={recitationNumber.toString()}
                    onChange={handleInputChange}
                />
            </div>
            <div className='m-5'>
                <Input
                    name='startPage'
                    title='صفحة البدء'
                    type='number'
                    max={604}
                    min={0}
                    defaultValue={startPage.toString()}
                    onChange={handleInputChange}
                />
            </div>
            <div className='m-5'>
                <Input
                    name='zkr'
                    title='الذكر'
                    defaultValue={zkr}
                    onChange={handleInputChange}
                />
            </div>
            <div className='m-5'>
                <Input
                    name='duaa'
                    title='الدعاء'
                    defaultValue={duaa}
                    onChange={handleInputChange}
                />
            </div>
            <hr/>
            <div className='m-5'>
                {names2.map((_, index) => (
                    <div className='my-5' key={index} style={{display: 'flex', gap: '10px'}}>
                        <Input
                            name={`names2_name_${index}`}
                            title='الاسم'
                            defaultValue={names2[index]?.name}
                            onChange={handleInputChange}
                        />
                        <Input
                            name={`names2_count_${index}`}
                            title='عدد الصفحات'
                            type={'number'}
                            defaultValue={names2[index]?.count as unknown as string}
                            onChange={handleInputChange}
                        />
                        <DeleteBtn onClick={() => setNames2(old => {
                            const updatedNames = [...old];
                            updatedNames.splice(index, 1);
                            if (isBrowser)
                                localStorage.setItem('names2', nameArrayToString(updatedNames));
                            return updatedNames;
                        })}/>
                    </div>
                ))}
                <AddBtn onClick={() => setNames2(old => {
                    const updatedNames = [
                        ...old,
                        {name: '', count: 1} // Add a new name with default values
                    ];
                    if (isBrowser)
                        localStorage.setItem('names2', nameArrayToString(updatedNames)); // Save the updated list to localStorage
                    return updatedNames;
                })}/>
                <hr/>
            </div>
            {/*<div className='m-5'>
                <Textarea
                    name='names'
                    title='قائمة الاسماء'
                    onChange={handleInputChange}
                    defaultValue={names}/>
            </div>*/}
            <div className='mx-5'>
                <IconBtn onClick={() => copyResult()}/>
            </div>
            <div className='mx-5 my-10 border-2 p-5'>
                <h2>النتيجة</h2>
                <pre>{result}</pre>
            </div>
        </div>
    );
}
