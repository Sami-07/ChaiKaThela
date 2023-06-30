import styles from "./Login.module.css"
import MyButton from "../../components/custombtn/MyButton"
import TeaCheers from "../../images/TeaCheers.png"
import { useLogin } from "../../hooks/useLogin"
import { useState } from "react"  
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css";
import { useTheme } from "../../hooks/useTheme"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, error, isPending } = useLogin()
    const { color , changeColor} = useTheme()
    function handleSubmit(e) {
        e.preventDefault()
        login(email, password)
        setEmail("")
        setPassword("")
    }
    useEffect(()=>{
        AOS.init({duration:2000})
    },[])
    return (
        <div className={styles.loginMain} 
        data-aos="fade-down">
            <img src={TeaCheers} className={styles.cheersImg} />
            <p>Welcome back! <br /> Login with your existing account.</p>
            <form onSubmit={handleSubmit} className={styles.loginBox}>
                <label>

                    <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </label>
                <label>

                    <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </label>
                {!isPending && <MyButton btnText="Login" bgColor={color} fontSize="22px" width="170px"
                    height="50px" borderRadius="20px" />}

                {isPending && <MyButton btnText="Loading" bgColor="green" fontSize="22px" width="170px"
                    height="50px" borderRadius="20px" />}
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}