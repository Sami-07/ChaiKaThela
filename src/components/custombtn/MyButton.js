import styles from "./MyButton.module.css"
export default function MyButton({ btnText, position, fontSize, bgColor,width, height, borderRadius,valueID,functionName,mTop,btnContainerDisplay }) {
    return (
        <div className={styles.btncontainer} style={{ marginTop : mTop,display : btnContainerDisplay }}>
            <button value={valueID} onClick={functionName}  className={`${styles.viewbtn} ${position ? styles.center : ""} `} style={{ fontSize: fontSize, width: width, height: height, backgroundColor : bgColor,borderRadius: borderRadius }}>{btnText}</button>
        </div>

    )
}   