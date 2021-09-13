class Products {
  constructor(products) {
    this.products = products;
  }

  createProductNameElement(product) {
    const productNameElement = document.createElement("h1");
    productNameElement.classList.add("product-name");
    productNameElement.innerText = product.data.productName;
    return productNameElement;
  }

  createProductHTML() {
    const producFragment = document.createDocumentFragment();

    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      const div = document.createElement("div");
      div.classList.add("product", `product-${product.id}`, "card");

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const hr = document.createElement("hr");

      //Creating product name element
      const productNameElement = this.createProductNameElement(product);
           
      cardBody.appendChild(productNameElement);
      cardBody.appendChild(hr);

      div.appendChild(cardBody);
      producFragment.append(div);
    }

    document.getElementById("products").appendChild(producFragment);
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
  const a = new Products(products);
  a.createProductHTML();
}
