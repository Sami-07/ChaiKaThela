import styles from "./CartSet.module.css"
import { useFirestore } from "../../hooks/useFirestore"
import { useState, useEffect } from "react";
export default function CartSet({ cartItems }) {
    const { deleteDocument, response } = useFirestore("cart")
    const [deleted, setDeleted] = useState(false)

   

    return (
        <div> {deleted && <p className={styles.removedFromCart}>Removed from Cart.</p>}
            <div className={styles.cartPage}>

                <div>
                    {cartItems.map((item) => (
                        <div className={styles.eachCart}>
                            <img src={item.imgSrc} className={styles.itemImg} />
                            <div className={styles.rightPart}>
                                <p className={styles.cartItemName}> <strong>{item.itemName}</strong>  </p>
                                <p>Quantity : {item.quantity}</p>
                                <p>Flavor : {item.flavor}</p>
                                {item.inStock && <p>Available</p>}
                            </div>
                            <div className={styles.extremeRight}>
                                <p>
                                    <strong> TOTAL</strong>
                                </p>
                                <p>
                                    <strong>₹ {item.price}</strong>
                                </p>
                            </div>
                            <button onClick={() => setTimeout(() => {
                                deleteDocument(item.id).then(
                                    () => {
                                        setDeleted(true)
                                        // setTimeout(() => {
                                        //     setDeleted(false);
                                         
                                        // }, 2000);
                                        window.location.reload()
                                    }
                                )
                            }, 500)}
                                className={styles.removeBtn}>Remove</button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}