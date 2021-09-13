// IMPORT DATA FROM STATIC JSON FILE
import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';

// COMPONENT

export const addReview = async (payload) => {
    try{
        const reviewId = uuidv4();
        const reviewSnapshot = await firebase.firestore().collection('products').doc(payload.productId).collection('productReviews').doc(reviewId);

        await reviewSnapshot.set({
            rating: payload.rating,
            reviewText: payload.reviewText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        return {
            productId : payload.productId,
            rating: payload.rating,
            reviewText: payload.reviewText
        };
    }
    catch(error){
        throw new Error(error);
    }
    
};


export const fetchProducts = async () => {
    try{
        const snapshot = await firebase.firestore().collection('products').get();
        const productData = snapshot.docs.map(doc => {
            return {
                data: doc.data(),
                id: doc.id,
                averageRating: 0,
            };
        });

        const productReviews = {};
        for (let i = 0; i < productData.length; i++) {
            productReviews[productData[i].id] = {};
            const reviewSnapshot = await firebase.firestore().collection('products').doc(productData[i].id).collection('productReviews').orderBy('timestamp', 'asc').get();
            productReviews[productData[i].id].productId = productData[i].id;
            productReviews[productData[i].id].reviews = [];
            productReviews[productData[i].id].reviews  = reviewSnapshot.docs.map(doc => doc.data());

            productData[i].averageRating = productReviews[productData[i].id].reviews.length > 0 ? (productReviews[productData[i].id].reviews.reduce((a, b) => a + b.rating , 0) / productReviews[productData[i].id].reviews.length).toFixed(1): null;
        }
        
        return {productData , productReviews};
    }
    catch(error){
        throw new Error(error);
    }
};