import { useState } from 'react'
import './formInput.scss'



const FormInput = (props) => {
    const [focused, setFocused] = useState(false)
    const { onChange, id,errorMessage, ...inputProps } = props

    const handleFocus = (e) => {
        setFocused(true)
    }
    return (
        <div className='formInput'>
            <input 
                {...inputProps} 
                onChange={onChange} 
                onBlur={handleFocus}
                onFocus={()=>inputProps.name === 'confirmPassword' && setFocused(true)} 
                focused={focused.toString()}
            />
            <span>{errorMessage}</span>
        </div>
    )
}

export default FormInput