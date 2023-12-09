import React from 'react'
import { useCartStore } from '../stores/cartStore'
import XSymbol from "../assets/XSymbol.png"
import styles from "./CartComponent.module.scss"

const CartComponent = () => {
    const statefulCart = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const productsInCart = statefulCart.map((product, index) => {
        return (
            <div key={index} className={styles.checkoutContainer}>
                <img className={styles.productFileIcon} src={product.product.images[0]} />
                <p className={styles.productName}>{product.product.name}</p>
                <p className={styles.productPrice}>${product.product.unit_amount / 100}</p>
                <img className={styles.removeX} src={XSymbol} onClick={() => removeFromCart(product)} onTouchStart={() => removeFromCart(product)} />
            </div>
        )
    })
    return (
        <><div className={styles.allProductsCheckoutContainer}>
            {productsInCart}
        </div>
        </>
    )
}

export default CartComponent