import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import M from 'materialize-css'
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(()=>{
        M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
        } catch (e) {
        }
    }

    const loginHandler = async event => {
        event.preventDefault()
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {
        }
    }

    return (
        <div className={"row"}>
            <div className={"col s6 offset-s3"}>
                <h1>Сократи ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div className={"row"}>

                            <div className="input-field">
                                <label htmlFor="email" className="active">Email</label>
                                <input
                                    id="email"
                                    type="text"
                                    placeholder="Введите email"
                                    name="email"
                                    value={form.email}
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                            </div>

                            <div className="input-field">
                                <label htmlFor="password" className="active">Пароль</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    className="yellow-input"
                                    placeholder="Введите пароль"
                                    onChange={changeHandler}
                                />
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className={"btn yellow darken-4"}
                            onClick={loginHandler}
                            disabled={loading}>
                            Войти
                        </button>
                        <button
                            className={"btn grey lighten-1 black-text"}
                            onClick={registerHandler}
                            disabled={loading}>
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}