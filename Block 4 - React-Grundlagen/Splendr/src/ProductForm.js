function ProductForm() {
  return (
    <div className="panel panel-default">
       <div className="panel-heading">
          <h3 className="panel-title">Neuen Artikel eintragen</h3>
       </div>

       <div className="panel-body">
          <form className="products-form">
             <input className="form-control" type="text" name="name" placeholder="Produktname" />
             <input className="form-control" type="url" name="url" placeholder="Artikel-URL" />
             <input className="form-control" type="url" name="image" placeholder="Artikel-Bild" />
             <div className="row">
                <div className="col-xs-6 input-group">
                   <input type="number" className="form-control" name="price" placeholder="Preis" />
                   <span className="input-group-addon">€</span>
                </div>
                <div className="col-xs-6">
                   <button className="btn btn-primary btn-block btn-create">Anlegen</button>
                   <button className="btn btn-primary btn-block btn-update">Aktualisieren</button>
                </div>
             </div>
             <input type="hidden" name="id" />
          </form>
       </div>
    </div>
  );
}

export default ProductForm;
