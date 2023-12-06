import styles from "./Cart.module.css"
import CartSet from "../../components/cartset/CartSet"
import { useHistory } from "react-router-dom"
import { useCollection } from "../../hooks/useCollection"
import { useFirestore } from "../../hooks/useFirestore"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useState } from "react"
import { useEffect } from "react"
import CustomOrdersList from "../../components/customorders/CustomOrdersList"
import MyButton from "../../components/custombtn/MyButton"
import MyInput from "../../components/myinput/MyInput"
import upi from "../../images/upiIcon.png"
import AOS from "aos"
import "aos/dist/aos.css";
import cash from "../../images/cash.png"
import { useTheme } from "../../hooks/useTheme"
import Backdrop from "../../components/backdrop/Backdrop";

export default function Cart() {
    const { color, changeColor } = useTheme()
    const history = useHistory();
    const [total, setTotal] = useState(0)
    const { user } = useAuthContext()
    const { addDocument, response } = useFirestore("users")
    const { documents, error } = useCollection("cart", ["uid", "==", user.uid])
    const { documents: customOrders, error2 } = useCollection("customRecipe", ["uid", "==", user.uid])
    const { addDocument: addAddress, response2 } = useFirestore("addresses")
    const [Fname, setFname] = useState("")
    const [Lname, setLname] = useState("")
    const [email, setemail] = useState("")
    const [Addr, setAddr] = useState("")
    const [Landmark, setLandmark] = useState("")
    const [City, setCity] = useState("")
    const [State, setState] = useState("")
    const [Pin, setPin] = useState("")
    const [addressAdded, setAddressAdded] = useState(false)
    const [Notexpired, setNotExpired] = useState(false)
    const [fullTotal, setFullTotal] = useState(0)
    const [customTeaTotal, setCustomTeaTotal] = useState(0)
    const [payClick, setPayClick] = useState(false)
    const [placed, setPlaced] = useState(false)
    const [shippingCost, setShippingCost] = useState(0)
    function handlePay() {
        setPayClick(!payClick);
    }
    function handleSubmitAddress(e) {
        e.preventDefault()
        addAddress({ Fname, Lname, email, Addr, Landmark, City, State, Pin, uid: user.uid, userName: user.displayName }).then(() => {
            setFname("")
            setLname("")
            setemail("")
            setAddr("")
            setLandmark("")
            setCity("")
            setState("")
            setPin("")
            setAddressAdded(true)
            setNotExpired(true)
            setTimeout(() => {
                setNotExpired(false);
            }, 3000);
        }).catch((err) => {
            console.log(err)
            console.log("Could't Place Order")
        })
    }
    useEffect(() => {
        let calculatedTotal = 0;
        if (documents && documents.length > 0) {
            documents.forEach((item) => {
                calculatedTotal += item.price;
            });
            setTotal(calculatedTotal);
            setShippingCost(40)
        }
        if (customOrders && customOrders.length > 0) {
            setShippingCost(40)
            setCustomTeaTotal(customOrders.length * 69)
        }
        if (documents && documents.length === 0 && customOrders && customOrders.length === 0) {
            setCustomTeaTotal(0)
            setShippingCost(0)
        }
    }, [documents, customOrders]);
    useEffect(() => {
        AOS.init({ duration: 2000 })
    }, [])

    async function handleClick(e) {
        e.preventDefault()
        setTimeout(() => {
            setPlaced(true)
        }, 1000)

        if (customOrders.length > 0) {
            addDocument({ userId: user.uid, placed: documents, total: total + shippingCost + customTeaTotal, delivered: false, customOrders: customOrders }).then(() => {
                setTimeout(() => {
                    history.push("/profile")
                    window.scrollTo(0, 0)
                }, 3000)
            })
        }
        else {
            addDocument({ userId: user.uid, placed: documents, total: total + shippingCost + customTeaTotal, delivered: false }).then(() => {
                setTimeout(() => {
                    history.push("/")
                    window.scrollTo(0, 0)
                }, 3000)
            })
        }
    }
    return (
        <div
            data-aos="fade-up" className={styles.CartMain}>
           
            <p className={styles.cartHead}>MY CART</p>
            <div className={styles.separateCart}>
                <div className="ordersCustomOrders">
         
                    {documents && <CartSet cartItems={documents} />}
                    {(customOrders && customOrders.length > 0) && <p className={styles.customRecipeHead}>My Custom Recipes</p>}
                    {customOrders && <CustomOrdersList allItems={customOrders} />}
                </div>
            </div>
            <div>
                <p className={styles.checkoutHead}>CHECKOUT</p>
                <div className={styles.totalCheckoutBox}>

                    <form className={styles.addressInputs} onSubmit={handleSubmitAddress}>
                        <input type="text" onChange={(e) => (setFname(e.target.value))} placeholder="First Name" value={Fname} required />
                        <input type="text" onChange={(e) => (setLname(e.target.value))} placeholder="Last Name" value={Lname} required />
                        <input type="email" onChange={(e) => (setemail(e.target.value))} placeholder="email" value={email} />
                        <input type="text" onChange={(e) => (setAddr(e.target.value))} placeholder="Residential Address" value={Addr} />
                        <input type="text" onChange={(e) => (setLandmark(e.target.value))} placeholder="landmark" value={Landmark} />
                        <input type="text" onChange={(e) => (setCity(e.target.value))} placeholder="city/town" value={City} />
                        <input type="text" onChange={(e) => (setState(e.target.value))} placeholder="state" value={State} />
                        <input type="text" onChange={(e) => setPin(e.target.value)} placeholder="pincode" value={Pin} />
                        <div className={styles.paymentAddress}>
                            {(!Notexpired && !addressAdded) && <MyButton btnText="ADD ADDRESS" bgColor={color} fontSize="18px" width="150px" height="50px" borderRadius="5px" />}
                            {addressAdded && Notexpired ? <MyButton btnText="ADDED SUCCESSFULLY" bgColor="green" fontSize="18px" width="230px" height="50px" borderRadius="5px" /> : null}
                            <div>   <h3>Payment Mode :</h3>
                                <p>Please select Cash on Delivery</p>
                                <div className={`${styles.paymentMode} ${payClick ? styles.condiCLick : ''}`}
                                    onClick={handlePay}>  <img src={cash} /> <p>Cash on Delivery</p></div>
                                <div className={styles.paymentMode}>  <img src={upi} />More Options Coming Soon...</div>
                            </div>
                        </div>
                    </form>
               
                    <div className={styles.surroundCheckout} data-aos="fade-up" >
                        <div className={styles.totalCart}>
                            <div className={styles.promoSection}>
                                <MyInput type="text" placeholder="enter promocode" width="170px" bg="#FBEAFF" />
                                <MyButton btnText="SUBMIT" bgColor={color} fontSize="16px" width="100px" height="40px" borderRadius="5px" />
                            </div>
                            <div>  <p>Net Total </p>
                                <p>₹{total}.00</p></div>
                            <div>  <p>Custom Tea Total </p>
                                <p>₹{customTeaTotal}.00</p></div>
                            <div>
                                <p>Shipping Cost </p>
                                <p>₹ {shippingCost}.00</p></div>
                            <div>
                                <p>Discount </p>
                                <p>-₹ 0.00</p></div>

                            <div className={styles.totalCheckout}> <p>TOTAL </p>
                                <p>₹{total + shippingCost + customTeaTotal}.00 </p></div>
                        </div>
                 
                        {(addressAdded && !placed) && <MyButton bgColor={color} functionName={handleClick} btnText="PLACE ORDER" fontSize="18px" width="150px" height="50px" borderRadius="5px" />}
                       
                        {placed && <MyButton functionName={handleClick} btnText="ORDER PLACED!" bgColor="green" fontSize="18px" width="200px" height="50px" borderRadius="5px" />}

                    </div>
                </div>
            </div>
        </div>
    )
}