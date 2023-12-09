import daBag from "../assets/dabag.png"
import styles from "./ProductCartButton.module.scss"
import { useCartStore } from '../stores/cartStore'
import { useNavigate } from "react-router-dom"


const ProductCartButton = (product) => {
    const navigate = useNavigate();
    const addToCart = useCartStore((state) => state.addToCart)
    const inBag = useCartStore((state) => state.cart);
    const restrictedAddToCart = (product) => {
        const alreadyInCart = inBag.find((element) => product.product.id === element.product.id);
        if (alreadyInCart) {
            return "Already in cart"
        }
        else {

            addToCart(product);
            return navigate('/')
        }

    }

    return (
        <div onClick={() => restrictedAddToCart(product)} onTouchStart={() => restrictedAddToCart(product)}>
            <img src={daBag} className={styles.addToCartIcon} />
        </div>
    )
}


export default ProductCartButton