import daBag from "../assets/dabag.png"
import styles from "./CartButtonComponent.module.scss"
import { useCartStore } from '../stores/cartStore'


const CartButtonComponent = (product) => {
    const addToCart = useCartStore((state) => state.addToCart)
    const inBag = useCartStore((state) => state.cart);
    const restrictedAddToCart = (product) => {
        const alreadyInCart = inBag.find((element) => product.product.id === element.product.id);
        if (alreadyInCart) {
            return "Already in cart"
        }
        else {
            return addToCart(product);
        }
    }
    return (
        <div onClick={() => restrictedAddToCart(product)} onTouchStart={() => restrictedAddToCart(product)}>
            <img src={daBag} className={styles.addToCartIcon} />
        </div>
    )
}


export default CartButtonComponent
