import './autoTextArea.scss'
import {useEffect, useRef} from 'react'


const AutoTextArea = (props) => {
    const {placeholder, value, onChange} = props
    const textareaRef = useRef(null)
    useEffect(() => {
        if(textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [value])

    const handleChange = (e) => {
        if(textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
        onChange(e)
    }

    return (
        <textarea
            id='autoSizeTextArea'
            className='autoSizeTextArea'
            value={value}
            onChange={handleChange}
            rows={1}
            placeholder={placeholder}
            ref={textareaRef}
        />
            

    )
}

export default AutoTextArea