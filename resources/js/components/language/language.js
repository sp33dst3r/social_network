import React,{ useContext} from 'react'
import TranslationContext from '../../with-translation/with-translation'
export const Language = () => {
    const {toggleLanguage} = useContext(TranslationContext);
    const handleChange = (event) => {
        toggleLanguage(event.target.value);
    }
    return (
        <select onChange={handleChange}>
            <option value="en">en</option>
            <option value="ru">ru</option>
        </select>
    )
}

