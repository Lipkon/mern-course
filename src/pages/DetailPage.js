import React, {useCallback, useState} from "react";
import {useParams} from 'react-router-dom'

export const DetailPage = () => {
    const [link, setLink] = useState(null)
    const linkId = useParams().id
    const getLink = useCallback(async () => {
        try {

        } catch (e) {
        }
    }, [])

    return (
        <div>
            <h1>Detail Page</h1>
            <h1>{linkId}e</h1>
        </div>
    )
}