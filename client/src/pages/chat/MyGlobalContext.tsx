import { createContext, useContext, useState } from "react"
export type GlobalContent = {
    chatId: string,
    setChatId: (c: string) => void,
    chatMessage: string,
    setChatMessage: (c: string) => void,
    companyName: string,
    setCompanyName: (c: string) => void,
    companyDescription: string,
    setCompanyDescription: (c: string) => void,
    chatContent:string,
    setChatContent: (c: string) => void,
}
export const MyGlobalContext = createContext<GlobalContent>({
    chatId: '', // set a default value
    setChatId: () => { },
    chatMessage: '', // set a default value
    setChatMessage: () => { },
    companyName: 'MyStartup.AI', // set a default value
    setCompanyName: () => { },
    companyDescription: 'MyStartup.AI', // set a default value
    setCompanyDescription: () => { },
    chatContent: '', // set a default value
    setChatContent: () => { },
})
export const useGlobalContext = () => useContext(MyGlobalContext)