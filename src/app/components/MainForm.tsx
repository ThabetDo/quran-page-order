"use client";
import Input from "@/app/components/Input";
import Textarea from "@/app/components/Textarea";
import {ChangeEvent, useState} from "react";
import {getFlattenedNameList, getNameList, getPageOrderByName, wordToNumber} from "@/app/funtions";
import IconBtn from "@/app/components/IconBtn";

export default function MainForm() {
    const getLocalStorage = (name: string) => typeof window !== "undefined" ? localStorage.getItem(name) : ''
    const [zkr, setZkr] = useState<string>(getLocalStorage('zkr') || 'سبحان الله وبحمده، عدد خلقه، ورضا نفسه، وزنة عرشه، ومداد كلماته عشر مرات ❤');
    const [names, setNames] = useState<string>(getLocalStorage('names') || `{
    "1": [
        "أبو انس",
        "أبو خالد خاروف",
        "بشار مدلل",
        "توفيق الشبلي",
        "ثابت الدبش",
        "خالد خاروف",
        "رامز العبد الله",
        "سامر سرور",
        "علي",
        "عماد طباع",
        "طارق ذي النون",
        "محمد شما",
        "معتز"
    ],
    "2": [
        "أبو اديب",
        "أبو نسيب",
        "احمد أبو لبدة",
        "احمد عباس",
        "احمد مشلي",
        "اسامة",
        "بشر",
        "خالد نبعة",
        "خليل خلو",
        "زهير كحلوس",
        "سامي العش",
        "عمر",
        "عمر زعيتر",
        "عبادة بقلة",
        "عبود",
        "فراس",
        "كنان تسابحجي",
        "ماجد",
        "محمد الوالي",
        "محمد فتال",
        "معاذ الادلبي",
        "معاذ كعدان",
        "أحمد دحبور"
    ]
}`);
    const [duaa, setDuaa] = useState<string>(getLocalStorage('duaa') || 'للهم اجعلنا مدبرين مقبلين الى دوام ذكرك وشكرك وحسن عبادك ولا تجعلنا من المعرضين');
    const [startPage, setStartPage] = useState<number>(parseInt(getLocalStorage('startPage') || '302', 10));
    const [recitationNumber, setRecitationNumber] = useState<string>(getLocalStorage('recitationNumber') || '20');

    const nameList = getNameList(names);

    const partNumber = () => {
        const startPart = Math.ceil(startPage / 20);
        const endPart = Math.ceil((startPage + getFlattenedNameList(nameList).length) / 20);
        return startPart === endPart
            ? `${wordToNumber(startPart)}`
            : `${wordToNumber(startPart)} ~ ${wordToNumber(endPart)}`;
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        if (typeof window !== "undefined")
            localStorage.setItem(name, value); // Save to localStorage whenever an input changes
        switch (name) {
            case 'zkr':
                setZkr(value);
                break;
            case 'names':
                setNames(value);
                break;
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
توزيع الختمة ${partNumber()}
${getPageOrderByName(startPage, nameList)}
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
            <div className='m-5'>
                <Textarea
                    name='names'
                    title='قائمة الاسماء'
                    onChange={handleInputChange}
                    defaultValue={names}/>
            </div>
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
