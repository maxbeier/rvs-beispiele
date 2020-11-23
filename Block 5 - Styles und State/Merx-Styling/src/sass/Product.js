import Heart from './Heart';
import './Product.scss';

const Product = ({ id, title, body, price, image }) => {
  return (
    <div className={`product ${id % 4 ? '' : 'product--highlighted'}`}>
      <a href={`/products/${id}`}>
        <img className="product__image" src={image} alt={title} />
        <h5 className="product__title">{title}</h5>
      </a>
      <div className="product__body">{body}</div>
      <div
        className={`product__price ${id % 3 ? '' : 'product__price--cheap'}`}
      >
        <div className="spread">
          <button className="clean">
            <Heart />
          </button>
          {price}
        </div>
      </div>
    </div>
  );
};

export default Product;
