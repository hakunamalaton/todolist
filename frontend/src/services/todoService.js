const baseUrl = `${process.env.REACT_APP_API_URL}/todos`;

export const loadTodos = () => {
    return fetch(baseUrl)
        .then((res) => res.json());
}

export const getTodo = (id) => {
    return fetch(`http://localhost:8000/products/${id}`)
        .then((res) => res.json());
}

export const createTodo = (todo) => {
    return fetch(`${baseUrl}`, {
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: todo.title,
            completed: todo.completed
        }) 
    }).then((res) => res.json())
}

export const updateTodo = (todo) => {
    return fetch(`${baseUrl}/${todo.id}`, {
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: todo.title,
            completed: todo.completed
        }) 
    }).then((res) => res.json())
}

export const deleteTodo = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE"
    }).then((res) => res.json())
} 
