import "./Orders.css"
import TransparantTeaAI from "../../images/TransparantTeaAI.png"
import { useFirestore } from "../../hooks/useFirestore"
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme"

export default function Orders({ orders }) {  
    const { color , changeColor} = useTheme()
    const [canelledPrice, setCanelledPrice] = useState(0)
    const [deleted, setDeleted] = useState(false)
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleString(undefined, options);
        return formattedDate;
    }

    const { deleteDocument, response } = useFirestore("users")
    return (
        <div>
             {deleted && <p className="cancelledResponse" style={{ background: color }}>Your Order of   ₹ {canelledPrice}.00 is Cancelled</p> }
            {orders.length > 0 ? <div className="ordersPage">
                {orders.map((order) => (

                    <div className="eachBox">
                        <div className="ordersTop" >
                            <p><strong>PLACED ON</strong>
                                <br />
                           
                                 {formatTimestamp(order.createdAt)}</p>
                            <p className="ordersTotal">
                                 <strong>TOTAL</strong>
                                <br />
                            
                                ₹ {order.total}
                            </p>
                            <p className="orderDeliveryStatus">
                             <strong> DELIVERY STATUS</strong>
                                <br />
                               
                                {order.delivered ? "Delivered" : "Yet to be Delivered"}
                            </p>
                            <button onClick={() =>
                          {  setCanelledPrice(order.total)
                             deleteDocument(order.id).then(
                                () => {
                                    setDeleted(true)
                                    window.scrollTo({
                                        top: 0,
                                        left: 0,
                                        behavior: 'smooth'
                                    })
                                    setTimeout(() => {
                                        setDeleted(false);
                                    }, 4000);
                                }
                            )}} className="cancelOrder" style={{ background: color }} >Cancel Order</button>

                        </div>
                        {(order.placed).map((each) => (
                            <div className="eachOrder">
                                <img className="eachOrderImg" src={each.imgSrc} />

                                <p className="orderItemName">    {each.itemName}</p>
                                <p className="eachOrderPrice"> ₹ {each.price}</p>

                            </div>
                        ))}
                        {order.customOrders && (order.customOrders).map((each) => (
                            <div className="eachOrder">
                                <img className="eachOrderImg" src={TransparantTeaAI} />

                                <p className="orderItemName">    {each.recipeName}</p>
                                <p className="eachOrderPrice"> ₹ {each.price}</p>

                            </div>
                        ))}
                    </div>
                ))}
            </div> : ""}

        </div>
    )
}