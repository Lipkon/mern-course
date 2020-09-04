import React, {useContext, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const CreatePage = () => {
    const [link, setLink] = useState('')
    const {request} = useHttp()
    const auth = useContext(AuthContext)

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link},
                    {authorization: `Bearer ${auth.token}`})
                console.log(data)
            } catch (e) {
            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        id="link"
                        type="text"
                        placeholder="Вставьте ссылку"
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылк</label>
                </div>
            </div>
        </div>
    )
}