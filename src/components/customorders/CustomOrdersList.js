import "./CustomOrdersList.css"
import TransparantTeaAI from "../../images/TransparantTeaAI.png"
import { useFirestore } from "../../hooks/useFirestore"
import { useState } from "react"
export default function CustomOrdersList({ allItems }) {
    const [deleted, setDeleted] = useState(false)
    const { deleteDocument, response } = useFirestore("customRecipe")
    return (
        <div>
            {deleted && <p className="removedFromCart">Removed from Cart.</p>}
            {allItems.map((order) => (
                <div className="eachCustom">
                    <img src={TransparantTeaAI} className="itemImg" />
                    <div>
                        <p className="recipeName"><strong>{order.recipeName}</strong> </p>
                        <div className="allIngs">
                            <p className=""><em className="ingsAdded">Ingredients Added :</em> </p> {order.customIngs.map((eachIng) => (
                                <p className="eachIng">{eachIng}</p>
                            ))}
                        </div>
                        <div className="cookingDesc"> <p ><em>Instructions:</em> </p>   {order.cookingInstr}</div>
                    </div>
                    <div className="extremeRightCustom">
                        <strong>   <p>TOTAL</p>  </strong>
                        <strong>  <p>₹ 69</p> </strong>
                    </div>
                    <button className="removeBtn" onClick={() =>
                        setTimeout(() => {
                            deleteDocument(order.id).then(
                                () => {
                                    setDeleted(true)
                                    setTimeout(() => {
                                        setDeleted(false);
                                    }, 2000);
                                    window.location.reload()
                                }
                            )
                        }, 500)}
                    >Remove</button>
                </div>
            ))}
        </div>
    )
}













