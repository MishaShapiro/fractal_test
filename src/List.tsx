import { msessageType } from "./App"

interface propType {
    message: msessageType,
}

function List({message} : propType) {
    return (
        <>
            {message.sendType === "user" ?
            <div>
                <h3>Полное имя пользователя:</h3>
                <p>{message.firstParam}</p>
                <h3>Количество репозиториев</h3>
                <p>{message.secondeParam}</p>
            </div>   
            :
            <div>
                <h3>Полное название репозитория</h3>
                <p>{message.firstParam}</p>
                <h3>Количество звёзд</h3>
                <p>{message.secondeParam}</p>
            </div>   
        }
        </>
    )
}

export default List