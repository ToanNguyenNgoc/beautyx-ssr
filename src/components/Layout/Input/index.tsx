import React, { KeyboardEvent } from 'react'
import { clst } from "utils"
import style from './input.module.css'

interface InputProps {
    onFocus?: () => void
    onChange?: (e: any) => void
    onKeyDown?: () => void
    placeholder?: string
    id?: string
    value?: any
    icon?: string
    type?: 'number' | 'password' | 'text'
    name?: string
    disable?: boolean,
    className?: string,
    classNamePar?: string,
    autoFocus?:boolean
}

export function Input(props: InputProps) {
    const { 
        onChange, onFocus, placeholder, icon, 
        id, value, type, name, disable, onKeyDown, autoFocus
    } = props
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
            onKeyDown && onKeyDown()
        }
    };
    const className = props.className ?? ""
    const classNamePar = props.classNamePar ?? ""

    return (
        <div className={clst([style.input_cnt, classNamePar])}>
            {icon && (
                <div className={style.input_icon}>
                    <img src={icon} width={20} height={20} alt="" />
                </div>
            )}
            <input
                className={clst([style.input_cus, className])}
                style={icon ? { paddingLeft: '40px' } : {}}
                onChange={onChange}
                onFocus={onFocus}
                autoFocus={autoFocus}
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
