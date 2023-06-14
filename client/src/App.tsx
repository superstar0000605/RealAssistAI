import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store'
import React, { useState } from 'react'
import router from "./router"
import { MyGlobalContext } from './pages/chat/MyGlobalContext'
import './App.css';

function App() {
    const [companyName, setCompanyName] = useState<string>('MyStartup.AI');
    const [companyDescription, setCompanyDescription] = useState<string>('');
    const [chatContent, setChatContent] = useState<string>('');
    const [chatId, setChatId] = useState<string>('');
    const [chatMessage, setChatMessage] = useState<string>('');
    return(
        <Provider store={store}>
            <MyGlobalContext.Provider value={{chatId, setChatId, chatMessage, setChatMessage, companyName, setCompanyName, companyDescription, setCompanyDescription, chatContent, setChatContent}}>
                <RouterProvider
                    router={router}
                />
            </MyGlobalContext.Provider>
        </Provider>
    );
}

export default App;
