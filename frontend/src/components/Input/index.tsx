import { InputHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}


function Input({...rest}: InputProps){
    return(
        <input className={styles.input} {...rest} />
    )
}

export default Input