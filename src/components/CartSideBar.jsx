import { useCartStore } from '../stores/cartStore';
import { useCategoriesStore } from '../stores/categoriesStore'
import styles from "./CartSideBar.module.scss";


const CartSideBar = () => {
    const activeCategory = useCategoriesStore((state) => state.activeCategory);
    const setActiveCategory = useCategoriesStore((state) => state.setActiveCategory)
    const statefulCart = useCartStore((state) => state.cart)
    const activeCategoryHeader = () => {
        if (activeCategory === "cart") {
            return (
                <h1 className={styles.cartHeader__active}>Cart ({statefulCart.length})</h1>
            )
        }
        else {
            return (
                <h1 onClick={() => setActiveCategory("cart")} onTouchStart={() => setActiveCategory("cart")} className={styles.cartHeader}>Cart ({statefulCart.length})</h1>
            )
        }

    }
    return (
        activeCategoryHeader()
    )
}

export default CartSideBar