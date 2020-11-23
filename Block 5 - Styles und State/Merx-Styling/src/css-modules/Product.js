import cx from 'classnames';
import Heart from './Heart';
import styles from './Product.module.css';
import appStyles from './App.module.css';

const Product = ({ id, title, body, price, image }) => {
  return (
    <div className={cx(styles.product, id % 4 && styles.highlighted)}>
      <a href={`/products/${id}`}>
        <img className={styles.image} src={image} alt={title} />
        <h5 className={styles.title}>{title}</h5>
      </a>
      <div className={styles.body}>{body}</div>
      <div className={id % 3 ? styles.price : styles.cheap}>
        <div className={appStyles.spread}>
          <button className={appStyles.clean}>
            <Heart />
          </button>
          {price}
        </div>
      </div>
    </div>
  );
};

export default Product;
