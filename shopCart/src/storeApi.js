const storeData = fetch("https://fakestoreapi.com/products")
.then((res) => res.json());

export default storeData