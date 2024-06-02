/* eslint-disable react/prop-types */
import { Button, Card } from "antd";
const { Meta } = Card;
import { useDispatch } from "react-redux";

const SingleProduct = ({ product }) => {
  const dispatch = useDispatch();

  //update Cart
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: 1 },
    });
  };
  return (
    <Card
      style={{
        width: 240,
        margin: "20px 12px",
      }}
      cover={
        <img alt={product.name} src={product.image} style={{ height: 200 }} />
      }
    >
      <Meta title={product.name} description={product.category} />

      <div className="item-button">
        <Button onClick={() => handleAddToCart()}>Add to cart</Button>
      </div>
    </Card>
  );
};

export default SingleProduct;
