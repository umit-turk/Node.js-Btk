const categories = [
  { id: "1", name: "telefon", description: "telefon kategori ürünleri" },
  { id: "2", name: "bilgisayar", description: "bilgisayar kategori ürünleri" },
  { id: "3", name: "beyaz eşya", description: "beyaz eşya kategori ürünleri" },
];

module.exports = class Category {
  constructor(name, description) {
    this.id = (categories.length + 1).toString();
    this.name = name;
    this.description = description;
  }

  saveCategory() {
    /* category sınıfından bir obje ürettiğimde bu this e karşılık geliyor */
    categories.push(this);
  }

  /* static olarak vermemizin sebebi obje üzerinden değilde sınıfın üzerinden çağırmamız */
  static getAll() {
    return categories;
  }

  static getById(id) {
    return categories.find((i) => i.id === id);
  }

  static update(category) {
    const index = categories.findIndex((i) => i.id === category.id);

    categories[index].name = category.name;
    categories[index].description = category.description;
  }

  static deleteById(id) {
    const index = categories.findIndex((i) => i.id === id);
    categories.splice(index, 1);
  }
};
