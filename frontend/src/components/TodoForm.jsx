import React, { useState } from 'react';
import axios from 'axios';


function TodoForm() {

    let [commands, setCommands] = useState([[]])
    // let [space, setSpace] = useState("")

    function handlePress(e) {
        e.preventDefault()
        axios.post('https://ledis-command.herokuapp.com/commands', {
            'command': document.getElementById("get-command").value.trim()
        })
            .then(res => setCommands((command) => [...command, [document.getElementById("get-command").value,res.data]]))
            // setCommands((command) => [...command, [document.getElementById("get-command").value,result]])
    }

    function handleOutput(command) {
        if (command.length == 0) {
            return (<><tr><td>{""}</td></tr></>)
        }
        let keyWord = command[0].trim().split(" ")[0]
        let message = " ";
        if (command[1].code != 0 || keyWord.toUpperCase() == "SET" || keyWord.toUpperCase() == "DEL" || keyWord.toUpperCase() == "SADD" 
        || keyWord.toUpperCase() == "SREM" || keyWord.toUpperCase() == "SAVE" || keyWord.toUpperCase() == "RESTORE" ) {
            message = command[1].message
        }
        else if (keyWord.toUpperCase() == "GET" || keyWord.toUpperCase() == "SMEMBERS" || keyWord.toUpperCase() == "SINTER" || keyWord.toUpperCase() == "EXPIRE" || keyWord.toUpperCase() == "TTL") {
            message = command[1].value
        }
        else {
            message = command[1].keys
        }
        return (<><tr><td>{command.length > 0 ? "> " : ""}{command[0]}</td></tr>
        {Array.isArray(message) ? 
        message.length > 0 ? message.map(ele => (<tr><td>{ele != undefined ? ele : "(empty array)"}</td></tr>)) : "(empty array)"
        : 
        <tr><td >{message == 0 || message == [] || message != undefined ? message : "(nil)"}</td></tr>}</>
        )
    }

    return (
        <>
        <table className="table table-borderless">
            <tbody>
                {commands.map((command) => handleOutput(command))}
            </tbody>
        </table>

        <div className="input-group mb-3">
            <form onSubmit={handlePress} className="col-12 p-3">
                <input type="text" className="form-control" placeholder="Ledis>" aria-label="Username" aria-describedby="basic-addon1" 
                    id = "get-command"
                />
            </form>
        </div>
        </>
    )
}


export default TodoForm;