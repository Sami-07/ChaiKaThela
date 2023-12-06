import styles from "./Catalogue.module.css"
import AiTeaCup from "../../images/AiTeaCup.jpg"
import Products from "../../components/productsSet/Products"
import { useCollection } from "../../hooks/useCollection"
import AOS from "aos"
import "aos/dist/aos.css";
import { useEffect } from "react"
import Backdrop from "../../components/backdrop/Backdrop"
export default function Catalogue() {
    useEffect(() => {
        AOS.init({ duration: 2000 })
    }, [])
    const { documents, error } = useCollection("products")

    return (
        <div data-aos="fade-up">
            <p className={styles.CatalogueHead} fade-up>Catalogue</p>
            <div className={styles.hookSet}>
                <div class={styles.curvedImageContainer}>
                    <img src={AiTeaCup} className={styles.AiTeaCupImg} />
                </div>
                <p className={styles.catalogueHook} data-aos="fade-up">Sip with confidence and
                    bask in the pride of choosing
                    our distinguished tea collection.</p>
            </div>
            <div className={styles.displayProducts} data-aos="fade-up">
                {error && <p>{error}</p>}

                {!documents && <Backdrop />}
                {documents && <Products products={documents} />}
            </div>
        </div>
    )
}