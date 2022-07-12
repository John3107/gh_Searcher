import React, {FC, useEffect, useState} from 'react';
import style from './MainPage.module.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Navigate} from "react-router-dom";
import {UserPage} from "../UserPage/UserPage";
import {getUserTC} from "../../app/app-reducer";
import {User} from "./User";


export const MainPage: FC = () => {
    const dispatch = useAppDispatch()
    const data = useAppSelector()
    const [user, setUser] = useState<string>('')

    useEffect(() => {
       user && dispatch(getUserTC(user))
    }, [user])

    if (user) {
        return <Navigate to={`/user/${user}`}/> && <UserPage/>
    }
    return (
        <div className={style.mainPage}>
            <h1 className={style.mainPageTitle}>GitHub searcher</h1>
            <input placeholder={'Search for Users'} className={style.mainPageInput}/>
            <div className={style.mainPageSections}>{
                data.users.map(el => <User setUser={setUser}
                                           login={el.login}
                                           avatar_url={el.avatar_url}
                                           key={el.id}
                                           numRepos={el.numRepos}/>)
            }</div>
        </div>
    );
}