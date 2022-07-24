const products = [
  {
    id: "43412",
    name: "samsung s6",
    price: 2000,
    imageUrl: "1.jpg",
    description: "iyi telefon",
    categoryId:"1",
  },
  {
    id: "43411",
    name: "samsung s7",
    price: 3000,
    imageUrl: "2.jpg",
    description: "iyi telefon",
    categoryId:"1",
  },
  {
    id: "43413",
    name: "samsung s8",
    price: 4000,
    imageUrl: "3.jpg",
    description: "iyi telefon",
    categoryId:"1",
  },
  {
    id: "43414",
    name: "buzdolabı",
    price: 5000,
    imageUrl: "1.jpg",
    description: "iyi buzdolabı",
    categoryId:"3",
  },
  {
    id: "43455",
    name: "bilgisayar s8",
    price: 6000,
    imageUrl: "4.jpg",
    description: "iyi bilgisayar",
    categoryId:"2",
  },
];

module.exports = class Product {
  constructor(name, price, imageUrl, description, categoryId) {
    this.id = (Math.floor(Math.random() * 99999) + 1).toString();
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.categoryId = categoryId;
  }

  saveProduct() {
    products.push(this);
  }

  static getAll() {
    return products;
  }

  static getById(id) {
    const product = products.find((i) => i.id === id);
    return product;
  }

  static getProductsByCategoryId(categoryId) {
    return products.filter(i => i.categoryId == categoryId)
  }

  static Update(product) {
    const index = products.findIndex(i => i.id === product.id);

    products[index].name = product.name;
    products[index].price = product.price;
    products[index].imageUrl = product.imageUrl;
    products[index].description = product.description;
    products[index].categoryId = product.categoryId;
  }

  static DeleteById(id) {
    const index = products.findIndex(i => i.id === id);
    products.splice(index, 1);
  }
};
