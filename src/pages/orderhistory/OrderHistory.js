import "./OrderHistory.css"
import { useCollection } from "../../hooks/useCollection"
import Orders from "../../components/orders/Orders"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css";
import Backdrop from "../../components/backdrop/Backdrop"
export default function OrderHistory() {
    useEffect(() => {
        AOS.init({ duration: 2000 })
    }, [])
    const { user } = useAuthContext()
    const { documents, error } = useCollection("users", ["userId", "==", user.uid])

    return (
        <div className="ordersHistoryMain">
            <div data-aos="fade-up" >
                <p className="accountName" >Hello, {user.displayName}</p>
                <p className="ordersHead">Your Order History</p>
                <div className="orders" data-aos="fade-up">
                {!documents && <Backdrop />}
                    {documents && <Orders orders={documents} />}
                </div>
            </div>
        </div>
    )
}