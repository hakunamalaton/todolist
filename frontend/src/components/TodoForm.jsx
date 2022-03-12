import React, { useEffect, useState } from 'react';
import {loadTodos} from '../services/todoService'

const axios = require('axios')

function TodoForm() {
    const [list,setList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/todos')
            .then(res => res.json())
            .then(json => setList(json)
            )
    }, [])

    return (
        list.map((item) => (
                <h1>{item.title}</h1>
        ))
    )
}


export default TodoForm;