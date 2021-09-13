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

  createProductAverageElement(product) {
    const productAverageElement = document.createElement("h4");
    productAverageElement.classList.add("product-avg-rating", "m-0");
    productAverageElement.innerText = product.averageRating;
    return productAverageElement;
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

      //Creating product average rating element
      const productAverageElement = this.createProductAverageElement(product);

      //Creating product rating stars
      const productStarWrapper = this.createStars(
        Math.round(product.averageRating)
      );
      productStarWrapper.classList.add("ml-2");

      //Creating product average rating wrapper that will contain rating number and rating stars
      const productAverageRatingWrapper = document.createElement("div");
      productAverageRatingWrapper.classList.add(
        "product-avg-rating-wrapper",
        "d-flex",
        "align-items-center"
      );

      productAverageRatingWrapper.appendChild(productAverageElement);
      productAverageRatingWrapper.appendChild(productStarWrapper);

      //Creating product reviews
      const productReviewsDiv = this.createProductReview(
        product.productReviews
      );

      cardBody.appendChild(productNameElement);
      cardBody.appendChild(productAverageRatingWrapper);
      cardBody.appendChild(hr);
      cardBody.appendChild(productReviewsDiv);

      div.appendChild(cardBody);
      producFragment.append(div);
    }

    document.getElementById("products").appendChild(producFragment);
  }

  createReviewsHeadingElement() {
    const reviewsHeadingElement = document.createElement("h5");
    reviewsHeadingElement.classList.add("reviews-heading");
    reviewsHeadingElement.innerText = "Reviews";
    return reviewsHeadingElement;
  }

  createProductReview(productReviews) {
    const fragment = document.createDocumentFragment();
    const reviewsHeadingElement = this.createReviewsHeadingElement();

    fragment.appendChild(reviewsHeadingElement);

    for (let i = 0; i < productReviews.length; i++) {
      const productReviewsDiv = document.createElement("div");
      productReviewsDiv.classList.add("product-review");
      const productRating = document.createElement("div");
      productRating.classList.add("product-rating-number");

      const productReviewTextElement = document.createElement("p");
      productReviewTextElement.classList.add("product-review-text");

      productRating.innerText = productReviews[i].rating;
      productReviewTextElement.innerText = productReviews[i].reviewText;

      const starWrapper = this.createStars(productReviews[i].rating);      
      productReviewsDiv.appendChild(starWrapper);
      productReviewsDiv.appendChild(productRating);
      productReviewsDiv.appendChild(productReviewTextElement);

      fragment.appendChild(productReviewsDiv);
    }

    return fragment;
  }

  createStars(rating) {
    const starWrapper = document.createElement("div");
    starWrapper.classList.add("star-wrapper");
    let count = rating;
    for (let j = 0; j < 5; j++) {
      const stars = document.createElement("span");
      stars.classList.add("fa", "fa-star");
      if (count > 0) {
        stars.classList.add("checked");
      }
      count = count - 1;
      starWrapper.appendChild(stars);
    }
    return starWrapper;
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
