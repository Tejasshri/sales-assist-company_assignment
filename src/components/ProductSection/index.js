import { useContext } from "react";
import styles from "./index.module.css";
import ReactContext from "../../context/ReactContext";
import { BsBoxArrowUp } from "react-icons/bs";

import ProductItem from "../../components/ProductItem";
import ProductItemPlaceholder from "../ProductItemPlaceholder";
import { v4 } from "uuid";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inprogress: "IN_PROGRESS",
};

const ProductSection = () => {
  const { data, categoryText, apiStatus } = useContext(ReactContext);

  const filtered = data.filter((each) =>
    each.category.includes(categoryText.toLowerCase())
  );

  const laodingView = () => {
    const ls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <>
        {ls.map((each) => (
          <ProductItemPlaceholder key={v4()} productDetails={each} />
        ))}
      </>
    );
  };

  const getView = () => {
    switch (apiStatus) {
      case apiStatusConstants.inprogress:
        return laodingView();
      case apiStatusConstants.failure:
        return "error";
      case apiStatusConstants.success:
        return (
          <>
            {filtered.map((each) => (
              <ProductItem key={v4()} productDetails={each} />
            ))}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.productSection}>
      <div className={styles.productCategoryDetails}>
        <p>{categoryText === "" && "All"}</p>
        <div className={styles.subDetails}>
          {filtered.length}&nbsp; Products &nbsp; <BsBoxArrowUp size={20} />
        </div>
      </div>
      <ul className={styles.productItemDetails}>{getView()}</ul>
    </div>
  );
};

export default ProductSection;
