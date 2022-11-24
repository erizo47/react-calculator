import { Numpad } from "./numpad"

export function NumpadBoard ({keys, addToInput, equals}) {
    
    return (
        <div className='numpad-board'>
            {keys.map((data) => {
                return (
                    <Numpad 
                    id={data.id}
                    value={data.value}
                    keyCode={data.keyCode}
                    key={data.id}
                    wide={data.wide}
                    operator={data.operator}
                    addToInput={addToInput}
                    equals={equals}
                    />
                )
            })}
        </div>
    )
        
    
}