import { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import SingleProduct from "../components/SingleProduct";
import { useDispatch } from "react-redux";

const Homepage = () => {
  const [productsData, setProductsData] = useState([]);

  const [selecedCategory, setSelecedCategory] = useState("drinks");

  const categories = [
    {
      name: "drink",
      imageUrl:
        "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29mZmVlfGVufDB8MHwwfHx8MA%3D%3D",
    },
    {
      name: "rice",
      imageUrl:
        "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29mZmVlfGVufDB8MHwwfHx8MA%3D%3D",
    },
    {
      name: "breads",
      imageUrl:
        "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29mZmVlfGVufDB8MHwwfHx8MA%3D%3D",
    },
    {
      name: "noodles",
      imageUrl:
        "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29mZmVlfGVufDB8MHwwfHx8MA%3D%3D",
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get(
          "https://inv-app-backend.onrender.com/api/products/getProducts"
        );
        setProductsData(data);
        dispatch({ type: "HIDE_LOADING" });
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    getAllProducts();
  }, [dispatch]);
  //   console.log("All Products : ", productsData);
  return (
    <DefaultLayout>
      <div className="d-flex">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`d-flex category ${
              selecedCategory === category.name && "category-active"
            }`}
            onClick={() => setSelecedCategory(category.name)}
          >
            <h4>{category.name}</h4>
            <img
              src={category.imageUrl}
              alt={`${category.name}-icon`}
              height="40"
              width="60"
            />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {productsData
          .filter((i) => i.category === selecedCategory)
          .map((product) => {
            // console.log(product.name);
            return <SingleProduct key={product._id} product={product} />;
          })}
      </div>
    </DefaultLayout>
  );
};

export default Homepage;
