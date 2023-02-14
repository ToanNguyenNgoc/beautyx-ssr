import style from './button-file.module.css'
import { acceptImage } from 'utils/validateForm'
import icon from 'constants/icon'
import { clst } from 'utils'

interface XButtonFileProps {
    onChange?: (file: any) => void,
    accept?: 'image/png, image/gif, image/jpeg',
    icon?: string,
    iconSize?: number,
    className?: string,
    multiple?:boolean
}

export function XButtonFile(props: XButtonFileProps) {
    const { onChange, accept, iconSize } = props
    const handleChange = (e: any) => onChange && onChange(e)
    const className = props.className || ''
    return (
        <>
            <input
                hidden
                id="file_custom"
                type="file"
                name="file_custom"
                accept={accept ?? acceptImage}
                onChange={handleChange}
                multiple={props.multiple ?? false}
            />
            <label
                htmlFor="file_custom"
                className={clst([style.btn_loading, className])}
            >
                <img
                    src={props.icon ?? icon.imageBlack} alt=""
                    height={iconSize ?? 18}
                    width={iconSize ?? 18}
                />
            </label>
        </>
    );
}