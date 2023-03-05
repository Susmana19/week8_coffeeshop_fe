import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Footer from '../../components/Footer'
import NavigationBar from '../../components/NavigationBar'

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';

// import { Link } from 'react-router-dom';

import '../../assets/css/auth.css'
import emptyimg from '../../assets/images/emptyimg.jpg'

// import { saveProducts } from '../../features/productSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProduct = () => {

    const token = JSON.parse(localStorage.getItem('@userLogin')).token;

    const [nameProduct, setNameProduct] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [preview, setPreview] = useState("")
    const [category, setCategory] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const loadImage = (e) => {
        const images = e.target.files[0]
        setImage(images)
        setPreview(URL.createObjectURL(images));
    }
    

    const saveProducts = async(e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("name", nameProduct);        
        formData.append("price", price)
        formData.append("image", image);
        formData.append("category", category)
    
        if (nameProduct === '' || price === '' || image === '' || category === '') {
            return alert("All data is Required" );
            
        };

        try {
            await dispatch(axios.post('http://localhost:5000/api/v1/products', formData, {
                headers: {
                    "Content-type": 'multipart/form-data',
                    "token": token
                }
            }));        
        } catch (error) {
            console.log(error);
        }
        navigate('/products')      
    }

return (
    <>
        <NavigationBar/>

            <div className="form-detail text-center mx-auto" style={{marginTop: '15vh'}} >
                    <Breadcrumb className="breadcrumb" style={{marginLeft: '10vw'}}>
                        <Breadcrumb.Item  ><Link to={'/products'} className="text-muted"> Favorite & Promo </Link> </Breadcrumb.Item>          
                        <Breadcrumb.Item className="fw-bold fs-6" style={{color: '#6A4029'}} active>Add New Product</Breadcrumb.Item>
                    </Breadcrumb>               
                    <form onSubmit={saveProducts}  className="container-fluid px-5 text-start d-flex gap-3">
                        <div className='left-form container-fluid'>
                            <div className='text-center'>
                                {preview ? (
                                    <div className='mb-3'>
                                        <img src={preview} alt="PreviewImage" style={{width: '25vw', height: '50vh', borderRadius:'100vw'}}></img>
                                    </div>
                                )   : (
                                    <div className='mb-3'>
                                        <img src={emptyimg} alt="PreviewImage" style={{width: '25vw', height: '50vh', borderRadius:'100vw'}}></img>
                                    </div>
                                )
                                
                                }
                            </div>

                            <div className="mb-2 text-center">
                                <label for="formFileLg" className="form-label fs-4 pt-3 rounded-4 bg-dark" style={{width:'30vw', height:'12vh',color: 'white', cursor: 'pointer'}}>Take a Picture</label>
                                <input onChange={loadImage} className="form-control form-control-lg file-input h-50" id="formFileLg" type="file" placeholder='Choose From Galery' style={{display: 'none'}}/>
                            </div>                        

                            <div className="mb-3 text-center">
                                <label for="formFileLg" className="form-label fs-4 pt-3 rounded-4" style={{width:'30vw', height:'12vh', color: '#6A4029', backgroundColor: '#FFBA33', cursor: 'pointer'}}>Choose a from gallery</label>
                                <input onChange={loadImage} className="form-control form-control-lg file-input h-50" id="formFileLg" type="file" placeholder='Choose From Galery' style={{display: 'none'}}/>
                            </div>
                        </div>
                        
                        <div className='right-form container-fluid'>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label" style={{color: '#6A4029'}}>Product Name :</label>
                                <input value={nameProduct} onChange={(e)=> setNameProduct(e.target.value)} type="name" className="form-control rounded-4 fs-5 px-4" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Input the product name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label" style={{color: '#6A4029'}}>Price :</label>
                                <input value={price} onChange={(e)=> setPrice(e.target.value)} type="number" className="form-control rounded-4 fs-5 px-4" id="exampleInputPassword1" placeholder="Input the price of product"/>
                            </div>

                            <div>
                                <label for="formSelect" className='form-label' style={{color: '#6A4029'}}> Select Category :</label>
                                <select onChange={(e)=> {
                                    setCategory(e.target.value)
                                    }}
                                    id="formSelect" className="form-select fs-5" aria-label="Default select example">
                                    <option selected disabled>Choose the Category :</option>
                                    <option value="coffee" >Coffee</option>
                                    <option value="non-coffee" >Non Coffee</option>
                                    <option value="foods" >Foods</option>
                                    <option value="add-on" >Add On</option>
                                </select>                        
                            </div>
                            <br />
                            <div className="d-grid gap-2 my-3">
                                <button type='submit' className="btn-prime shadow" style={{backgroundColor: '#6A4029', color: 'white'}} >Save Product</button>
                                <button className="btn-tertiary mt-3 shadow" type="button" style={{backgroundColor: 'rgba(186, 186, 186, 0.35)'}}>Cancel</button>
                            </div>

                        </div>

                    </form>
            </div>     
        <Footer/>
    </>
  )
}

export default AddProduct