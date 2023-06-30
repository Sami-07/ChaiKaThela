import "./ReadyToDrinkCatalogue.css"
import MyButton from "../../components/custombtn/MyButton"
export default function ReadyToDrinkCatalogue({ items }) {
    return (
        <div className="rtdMain">
            {items.map((item) => (
                <div className="eachRtdItem">
                    <img className="beverageImg" src={item.imgSrc} />
                    <p className="beverageTitle">{item.title}</p>
                    <p className="beveragePrice">₹ {item.price}</p>
                    <MyButton btnText="ADD" width="100px" height="30px" borderRadius="10px" fontSize="18px" />

                </div>
            ))}
        </div>
    )
}