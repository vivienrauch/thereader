import React from "react";
import NoResults from "../assets/no-results.png";
import styles from "../styles/NotFound.module.css";
import Asset from "./Asset";

const NotFound = () => {
    return (
        <div className={styles.NotFound}>
            <Asset
                src={NoResults}
                message={`Sorry! Can't find what you are looking for.`}
            />
        </div>
    );
};

export default NotFound;