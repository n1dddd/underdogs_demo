import { getStorage, ref, getDownloadURL } from "firebase/storage"
import DlIcon from '/icons/dlIcon.png'
import styles from "./DownloadButtonComponent.module.scss"

const DownloadButtonComponent = (product) => {
    const storage = getStorage();
    const handleDownload = async (product) => {
        try {
            const downloadURL = await getDownloadURL(ref(storage, `${product.product.id}.rar`));
            // Create a temporary anchor element to trigger the download
            const anchor = document.createElement('a');
            anchor.href = downloadURL;
            anchor.download = `${product.id}.rar`;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor); // Clean up the anchor
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };
    return (
        <>
            <img src={DlIcon} onClick={() => handleDownload(product)} className={styles.downloadButton} />
        </>
    )
}

export default DownloadButtonComponent