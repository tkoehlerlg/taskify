import React, {useRef} from "react";
import "./styles.css"
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

interface Props {
    todo: string
    loading: boolean
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAdd: (e: React.FormEvent) => void
}

const InputField: React.FC<Props> = ({todo, loading, setTodo, handleAdd}) => {
    const inputRef = useRef<HTMLInputElement>(null)

    return <form className="input" onSubmit={(e) => {
        handleAdd(e)
        inputRef.current?.blur()
    }}>
        <input
            ref={inputRef}
            type="input"
            value={todo}
            disabled={loading}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Wassermelone"
            className="input_box"
        />
        <button className="input_submit"  type="submit" disabled={loading}>{loading ? "Lädt..." : "Speichern"}</button>
    </form>
}

export default InputField
