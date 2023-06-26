import styles from "./MyInput.module.css"
export default function MyInput({type , placeholder,width, bg,flexBasis,color,  placeholderColor,onClick,onChange }){
    return(
        <div className={styles.MyinputCSS}>
        <input type={type} placeholder={placeholder} onClick={onClick} onChange={onChange} style={{width : width, backgroundColor : bg, flexBasis: flexBasis, color : color, "::placeholder" : {placeholderColor} }} />
        </div>
    )
}