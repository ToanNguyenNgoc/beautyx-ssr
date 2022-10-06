import React, { KeyboardEvent } from 'react'
import style from './input.module.css'

interface InputProps {
    onFocus?: () => void
    onChange?: (e: any) => void
    onKeyDown?: () => void
    placeholder?: string
    id?: string
    value?: any
    icon?: string
    type?: 'number' | 'password'
    name?: string
    disable?: boolean
}

function Input(props: InputProps) {
    const { onChange, onFocus, placeholder, icon, id, value, type, name, disable, onKeyDown } = props

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
            onKeyDown && onKeyDown()
        }
    };

    return (
        <div className={style.input_cnt}>
            {icon && (
                <div className={style.input_icon}>
                    <img src={icon} width={20} height={20} alt="" />
                </div>
            )}
            <input
                style={icon ? { paddingLeft: '40px' } : {}}
                onChange={onChange}
                onFocus={onFocus}
                onKeyDown={handleKeyDown}
                id={id}
                name={name}
                placeholder={placeholder ?? ''}
                value={value ?? ''}
                type={type ?? 'text'}
                disabled={disable ?? false}
            />
        </div>
    )
}
export default Input
