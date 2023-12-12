import { Suspense, useEffect } from "react";
import { useProductsStore } from "../stores/productsStore";
import { useCategoriesStore } from "../stores/categoriesStore";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.js"
import styles from "./ProductComponent.module.scss";
import CartButtonComponent from "./CartButtonComponent";
import { useNavigate } from "react-router-dom";
import DownloadButtonComponent from "./DownloadButtonComponent";

const ProductComponent = () => {
    const navigate = useNavigate();
    const setProducts = useProductsStore((state) => state.setProducts)

    const getProductInformation = async () => {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map(async (doc) => {
            const pricesCollection = collection(doc.ref, "prices");
            const priceQuerySnapshot = await getDocs(pricesCollection);
            const productPrices = priceQuerySnapshot.docs.map((priceDoc) => {
                let productPriceData = priceDoc.data();
                return { id: doc.id, ...doc.data(), unit_amount: productPriceData.unit_amount, priceId: priceDoc.id }
            })
            return productPrices;
        })
        Promise.all(products).then(function (results) {
            const allProducts = results.flat();
            setProducts(allProducts);
        })
    }
    const statefulProducts = useProductsStore((state) => state.filteredProducts);
    const activeCategory = useCategoriesStore((state) => state.activeCategory);
    const products = useProductsStore((state) => state.products);
    const setFilteredProducts = useProductsStore((state) => state.setFilteredProducts);
    useEffect(() => {
        getProductInformation();
        const getFilteredProducts = () => {
            if (activeCategory !== "all") {
                let filteredProducts = products.filter((product) => {
                    return product.stripe_metadata_category
                        === activeCategory || product.category === activeCategory;
                })
                setFilteredProducts(filteredProducts)
            } else {
                setFilteredProducts(products);
            }
        }
        getFilteredProducts();
    }, [activeCategory, products])

    const handleProductRedirect = (product) => {
        navigate("/products/" + product.id)
    }

    const fileComponent = statefulProducts.map((product, index) => {
        if (product.unit_amount != 0) {
            return (
                <div key={index} className={styles.productContainer}>
                    <img onClick={() => handleProductRedirect(product)} onTouchStart={() => handleProductRedirect(product)} className={styles.productFileIcon} src={product.images[0]} />
                    <p className={styles.productName}>{product.name}</p>
                    <p className={styles.productPrice}>${product.unit_amount / 100}</p>
                    <CartButtonComponent product={product} />
                </div>
            )
        }
        return (
            <div key={index} className={styles.productContainer}>
                <img onClick={() => handleProductRedirect(product)} onTouchStart={() => handleProductRedirect(product)} className={styles.productFileIcon} src={product.images[0]} />
                <p className={styles.productName}>{product.name}</p>
                <p className={styles.productPrice}>${product.unit_amount}</p>
                <DownloadButtonComponent product={product} />
            </div>
        )
    }
    )
    return (
        <Suspense fallback={null}>
            <div className={styles.allProductsContainer}>
                {fileComponent}
            </div >
        </Suspense>
    )
}

export default ProductComponent