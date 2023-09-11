import styles from './styles.module.scss'

import { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
}

function Button({ children }: ButtonProps) {
    return (
        <button className={styles.button}>
            <a className={styles.buttonText}>{children}</a>
        </button>
    )
}

export default Button