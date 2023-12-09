import styles from "./FinderComponentCategories.module.scss"
import { useCategoriesStore } from '../stores/categoriesStore.js';

const FinderComponentCategories = () => {
    const setActiveCategory = useCategoriesStore((state) => state.setActiveCategory)
    const statefulCategories = useCategoriesStore((state) => state.categories);
    const activeCategory = useCategoriesStore((state) => state.activeCategory);
    const productCategories = statefulCategories.map((category, index) => {
        if (activeCategory === category) {
            return (
                <h1 key={index} className={styles.categoryName__active} onClick={() => setActiveCategory(category)}
                    onTouchStart={() => setActiveCategory(category)}>{category}</h1>
            )
        } else {
            return (
                <h1 key={index} className={styles.categoryName} onClick={() => setActiveCategory(category)} onTouchStart={() => setActiveCategory(category)}>{category}</h1>
            )
        }
    })
    return (
        <>{productCategories}</>
    )
}

export default FinderComponentCategories