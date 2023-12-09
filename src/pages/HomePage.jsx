import styles from "./HomePage.module.scss"
import happyFace from '../assets/highQualityHappy.png'
import FolderIcon from "../components/FolderIcon"

const HomePage = () => {
    return (
        <div className={styles.HomePageContainer}>
            <img src={happyFace} className={styles.bgImg} />
            <FolderIcon />
        </div>
    )
}

export default HomePage