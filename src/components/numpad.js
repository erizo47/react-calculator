import { useCallback, useEffect, useRef, useState } from "react"

export function Numpad ({id, value, keyCode, wide, tall, operator, addToInput}) {
    const button = useRef(null);
    const [padActive, SetPadActive] = useState(false)

    const keyPress = useCallback(
        (event) => {
            if (keyCode === event.keyCode) {
                event.preventDefault();
                button.current.click();
            }
            }, [keyCode])

            
    useEffect(() => {
        document.addEventListener('keyup', keyPress);
        return () => {
            document.removeEventListener('keyup', keyPress)
        }
    }, [keyPress])

    const toggleActive = () => {
        setTimeout(() => {
          SetPadActive(false)
        }, 100)
        SetPadActive(true)
      }
    
    return (
        
        <div 
        className={`numpad ${wide ? "wide" : ""} ${operator ? 'operator' : ''} ${tall ? "tall" : ""} ${padActive ? "active" : ""}`}
        id={id}
        value={value}
        keycode={keyCode}
        ref={button}
        onClick={() => {addToInput(value); toggleActive()}}
        >
            {value}
        </div>
    )
}