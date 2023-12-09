import React, { Suspense, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from "./ProductPage.module.scss"
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useProductsStore } from '../stores/productsStore';
import ProductCartButton from '../components/ProductCartButton';
import Loading from '../components/Loading';

const ProductPage = () => {
  const { id } = useParams();
  const setActiveProduct = useProductsStore((state) => state.setActiveProduct)
  const activeProduct = useProductsStore((state) => state.activeProduct)
  const getSetProduct = async () => {
    const displayProduct = await getDoc(doc(db, "products", id))
    const productPriceQuerySnapshot = await getDocs(collection(db, "products", id, "prices"))
    productPriceQuerySnapshot.forEach((doc) => {
      setActiveProduct({ ...displayProduct.data(), unit_amount: doc.data().unit_amount, id: displayProduct.id })
    })
  }
  useEffect(() => {
    setActiveProduct({})
    getSetProduct();
  }, [])

  if (isNaN(activeProduct.unit_amount)) {
    return (
      <Loading />
    )
  } else if (activeProduct.unit_amount === 0) {
    return (
      <div className={styles.displayProductContainer}>
        <img className={styles.displayImg} src={activeProduct.images} />
        <h1 className={styles.displayProductHeader}>{activeProduct.name}</h1>
        <p className={styles.displayProductDescription}>{activeProduct.description}</p>
        <p className={styles.displayProductPrice}>${activeProduct.unit_amount / 100}</p>
      </div >
    )
  } else {
    return (
      <div className={styles.displayProductContainer}>
        <img className={styles.displayImg} src={activeProduct.images} />
        <h1 className={styles.displayProductHeader}>{activeProduct.name}</h1>
        <p className={styles.displayProductDescription}>{activeProduct.description}</p>
        <p className={styles.displayProductPrice}>${activeProduct.unit_amount / 100}</p>
        <ProductCartButton product={activeProduct} />
      </div >
    )
  }

}


export default ProductPage