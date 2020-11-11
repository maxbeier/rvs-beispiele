function Product({ id, timestamp, name, url, image, price }) {
  return (
    <div className="item col-xs-4">
       <div className="thumbnail">
          <a href={url}>
             <img src={image} alt={name} />
          </a>
          <div className="buttons-edit">
             <button className="btn btn-default btn-sm btn-edit">Edit</button>
             <button className="btn btn-default btn-sm btn-delete">Delete</button>
          </div>
          <div className="caption">
             <h4><a href={url}>{name}</a></h4>
             <span className="lead">{price}</span>
          </div>
       </div>
    </div>
  );
}

export default Product;
