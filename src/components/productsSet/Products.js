import "./Products.css"
import React, { useEffect, useState } from 'react';
import { projectFirestore } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useTheme } from "../../hooks/useTheme"
import Backdrop from "../backdrop/Backdrop";
export default function Products({ products }) {
  const { addDocument, response } = useFirestore('cart');
  const { user } = useAuthContext();
  const [isSuccess, setIsSuccess] = useState(false);
  const [addedToCart, setAddedToCart] = useState([]);
  const [buttonText, setButtonText] = useState('ADD');
  const [isPending, setIsPending] = useState(false)
  const [loadingbar, setLoadingbar] = useState(false)
  const { color, changeColor } = useTheme()
  async function handleClick(e, index) {
    e.preventDefault();
    const itemId = e.target.value; // Retrieve the ID from e.target.value
    setIsPending(true)
    const docRef = projectFirestore.collection('products').doc(itemId);
    const clickedDocument = await docRef.get();

    addDocument({ ...clickedDocument.data(), uid: user.uid })
      .then(() => {

        const updatedAddedToCart = [...addedToCart];
        updatedAddedToCart[index] = true;
        setAddedToCart(updatedAddedToCart);
        setButtonText('ADDED TO CART');
        setTimeout(() => {
          setIsPending(false)
        }, 300)
        setTimeout(() => {
          const updatedAddedToCart = [...addedToCart];
          updatedAddedToCart[index] = false;
          setAddedToCart(updatedAddedToCart);
          setButtonText('ADD');

        }, 4000);
      })
      .catch((err) => {
        console.log(err);
        console.log("Couldn't Add");
      });
  }
  useEffect(() => {
    if (response.success) {
      setIsSuccess(true);
    }
  }, [response.success]);

  return (
    <>
      {/* {isPending ? <Backdrop /> : ""} */}
      <div className="rtdMain">
        {products.map((product, index) => (
          <form className="eachRtdItem" key={index}>
            <img src={product.imgSrc} className="beverageImg" />
            <p className="beverageTitle">{product.itemName}</p>
            <div className="twoPrices">
              <p className="prevPriceClass">₹ {product.prevPrice}</p>
              <p>₹ {product.price}</p>
            </div>
            <button
              className="addBtn"
              value={product.id}
              onClick={(e) => handleClick(e, index)}
              style={{ backgroundColor: addedToCart[index] ? 'green' : color }}
            >
             
              {addedToCart[index] ? 'ADDED TO CART' : 'ADD'}
            </button>
          
          </form>
        
        ))}
        {isPending && <Backdrop />}
      </div>
    </>
  );
}






