class Products {
  constructor(products) {
    this.products = products;
  }
}

async function getProducts() {
  try {
    const snapshot = await firebase.firestore().collection("products").get();
    const productData = snapshot.docs.map((doc) => {
      return {
        data: doc.data(),
        id: doc.id,
        averageRating: 0,
        productReviews: [],
      };
    });

    for (let i = 0; i < productData.length; i++) {
      const reviewSnapshot = await firebase
        .firestore()
        .collection("products")
        .doc(productData[i].id)
        .collection("productReviews")
        .orderBy("timestamp", "asc")
        .get();
      productData[i].productReviews = reviewSnapshot.docs.map((doc) =>
        doc.data()
      );

      productData[i].averageRating =
        productData[i].productReviews.length > 0
          ? (
              productData[i].productReviews.reduce((a, b) => a + b.rating, 0) /
              productData[i].productReviews.length
            ).toFixed(1)
          : null;
    }

    return productData;
  } catch (error) {
    throw new Error(error);
  }
}

document.onload = onLoad();

async function onLoad() {
  const products = await getProducts();
  console.log(products);
  const a = new Products(products);
}
