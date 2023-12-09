import { useFinderStore } from "../stores/finderStore"
import { useCategoriesStore } from "../stores/categoriesStore";
import styles from "./FinderComponent.module.scss";
import Draggable from "react-draggable";
import circle from "../assets/red_circle.png";
import FinderComponentCategories from './FinderComponentCategories'
import ProductComponent from "./ProductComponent";
import CartSideBar from "./CartSideBar";
import CartComponent from "./CartComponent";
import CheckoutBar from "./CheckoutBar";

const FinderComponent = () => {
    const setFinderClose = useFinderStore((state) => state.closeFinder)
    const activeCategory = useCategoriesStore((state) => state.activeCategory);
    return (
        <Draggable>
            <div className={styles.finderCard}>
                <div className={styles.finderCardSideBar}>
                    <img src={circle} className={styles.exitCircle} onClick={() => setFinderClose()} onTouchStart={() => setFinderClose()} />
                    <h1 className={styles.categoriesText}>Categories</h1>
                    <FinderComponentCategories />
                    <CartSideBar />
                </div>
                <div className={styles.finderCardBody}>
                    {activeCategory === "cart" ? <CartComponent /> : <ProductComponent />}
                    {activeCategory === "cart" ? <CheckoutBar /> : null}
                </div>
            </div>
        </Draggable>
    )
}

export default FinderComponent