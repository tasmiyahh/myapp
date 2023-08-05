import logo from './logo.svg';
import Navbar from './compnents/navbar';
import './App.css';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios'




function App() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [code, setCode] = useState("")
  const [products, setproducts] = useState([])
  const [toggle, setToggle] = useState(false)
  const [editproduct, setEditproduct] = useState(null)



  useEffect(() => {
    axios.get("https://tricky-pantyhose-slug.cyclic.app/products"
    )
      .then(function (response) {
        console.log(response.data.data);
        setproducts(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      })

  }, [toggle])




  const onsubmit = (e) => {
    e.preventDefault()

    var productimage = document.getElementById("productimage");
    console.log("fileInput: ", productimage.files); // local url



    let formData = new FormData();
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append#syntax


    formData.append("name", name); // this is how you add some text data along with file
    formData.append("description", description); // this is how you add some text data along with file
    formData.append("price", price); // this is how you add some text data along with file
    formData.append("productimage", productimage.files[0]); // file input is for browser only, use fs to read file in nodejs client


   

    
    axios({
      method: 'post',
      url : "https://tricky-pantyhose-slug.cyclic.app/product",
    //  url: "http://localhost:5000/product",
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
       withCredentials: true
    })
      .then(res => {
        console.log(`upload Success` + res.data);
        setToggle(!toggle)
      })
      .catch(err => {
        console.log(err);
      })
  



  }
  const updateProduct = () => {
    axios.put(`https://tricky-pantyhose-slug.cyclic.app/product/${editproduct._id}`, {
      name: editproduct.name,
      description: editproduct.description,
      price: editproduct.price,
      code: editproduct.code
    })
      .then(function (response) {
        console.log("edited" + response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (

    <div>
  <Navbar/>
  

      <form action="" onSubmit={onsubmit}>
        name : <input type="text"
          onChange={(e) => {
            setName(e.target.value)
          }} />
        description : <input type="text"
          onChange={(e) => {
            setDescription(e.target.value)
          }} />
        price : <input type="number"
          onChange={(e) => {
            setPrice(e.target.value)
          }} />
        code : <input type="text"
          onChange={(e) => {
            setCode(e.target.value)
          }} />
          productimage: <input type="file" id="productimage" accept='image/*'
            onChange={() => {
              ////// to display imager instantly on screen
              var productimage = document.getElementById("productimage");
              var url = URL.createObjectURL(productimage.files[0])
              console.log("url: ", url);
              document.getElementById("img").innerHTML = `<img width="300px" height="300px" src="${url}" alt="" id="img"> `
            }} />

        <div id="img" ></div>
        <button>done</button>
      </form>

      {
        (editproduct === null) ? null : (
          <div>
            <form action="" onSubmit={updateProduct}>
              name : <input type="text"
                onChange={(e) => {
                  setEditproduct({ ...editproduct, name: e.target.value })
                }} />
              description : <input type="text"
                onChange={(e) => {
                  setEditproduct({ ...editproduct, description: e.target.value })
                }} />
              price : <input type="number"
                onChange={(e) => {
                  setEditproduct({ ...editproduct, price: e.target.value })
                }} />
              code : <input type="text"
                onChange={(e) => {
                  setEditproduct({ ...editproduct, code: e.target.value })
                }} />
              <button>done</button>
            </form>
          </div>
        )
      }





      <div>
        {products.map((eachProduct => (
          <div key={eachProduct._id}>
            <img className="productimg" width="120px" src={eachProduct.productimage} alt="" />

            <h4>{eachProduct?.name}</h4>
            <div>{eachProduct?.description}</div>
            <div>{eachProduct?.price}</div>
            <div>{eachProduct?.code}</div>
            <button onClick={() => {
              axios.delete(`https://tricky-pantyhose-slug.cyclic.app/product/${eachProduct._id}`)
                .then(function (response) {
                  console.log(response, "deleted");
                  setToggle(!toggle)

                })
                .catch(function (error) {
                  console.log(error);
                });
            }}>delete</button>
            <button onClick={() => {
              setEditproduct({
                _id: eachProduct?._id,
                name: eachProduct?.name,
                description: eachProduct?.description,
                price: eachProduct?.price,
                code: eachProduct?.code
              })

            }}>edit</button>

          </div>
        )))}
      </div>


















    </div>
  )
}




export default App;
