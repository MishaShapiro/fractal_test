import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"
import { defaultMessage, msessageType } from "./App"

interface props {
    error: boolean,
    setError: Dispatch<SetStateAction<boolean>>,
    setMessage: Dispatch<SetStateAction<msessageType>>
}

function Form({error, setError, setMessage}: props) {

    const [selection, setSelection]: [string, Dispatch<SetStateAction<string>>] = useState("user")
    const [name, setName]: [string, Dispatch<SetStateAction<string>>] = useState("")

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const url = `https://api.github.com/${selection}s/${name}`
        e.preventDefault()
        fetch(url)
        .then((res) => {
            if (res.status === 404) {
                throw new Error
            }
            return res.json()
        })
        .then((res) => {
            if (selection === "user") {
                const userName: string = res.name ? res.name : res.login
                setMessage({
                    sendType: "user", 
                    firstParam: userName, 
                    secondeParam: res.public_repos 
                })
            } else {
                setMessage({
                    sendType: "repo", 
                    firstParam: res.name, 
                    secondeParam: res.stargazers_count 
                })
            }
            setName("")
        })
        .catch(() => {
            setError(true)
        })
    }, [selection, name])

    useEffect(() => {
        setError(false)
    }, [name])

    return (
        <form>
            <button onClick={handleClick}>Отправить</button>
            <select name="selectedType" defaultValue="user" onChange={(e) => {setSelection(e.target.value)}}>
                <option value="user">user</option>
                <option value="repo">repo</option>
            </select>
            <input type="text" onChange={(e) => {
                setMessage(defaultMessage)
                setName(e.target.value)}
            } value={name}/>
            {error ?
            (selection === "user" ?
                <p>Not found users with name: {name}</p>
                :
                <p>Not found repos with name {name}</p>
            )
            :
            <></>}
        </form>
    )
}

export default Form