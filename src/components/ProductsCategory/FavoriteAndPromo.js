// import React from 'react'

import  { React, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'


import '../../assets/css/product-category.css'
import edit_btn from '../../assets/images/edit-btn.svg'
import delete_btn from '../../assets/images/delete-btn.svg'

import {getProducts, productSelectors, deleteProducts } from '../../features/productSlice'
import {useSelector, useDispatch } from 'react-redux'

const FavoriteAndPromo = () => {

    const [isLogin, setIsLogin] = useState(false)

  useEffect(()=> {
    if(localStorage.getItem('@userLogin')) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [])


    const dispatch = useDispatch()
    const products = useSelector(productSelectors.selectAll)

    useEffect(()=> {
        dispatch(getProducts())
    }, [dispatch])

  return (
    <>
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex={0}>
                {/* Container List Product Start */}
                <div className="container mx-5">
                <div className="row row-cols-1  row-cols-4 g-1">
                    <div className="col my-3 w-100 d-flex flex-wrap gap-5 ms-3">
                    {/* List Product Start*/}
                    {products.map((item)=> {
                        return(
                            <Link to={`/products/${item.id}`} className="d-flex flex-wrap" style={{textDecoration: 'none', color: 'black', fontStyle: 'normal'}}>
                                <div key={item.id} className="card card-product rounded-5 border-0 shadow px-1 mx-2 fw-bold" style={{width: '10vw', fontFamily: 'Poppins'}}>
                                    <img src={`http://localhost:5000/uploads/images/${item.images[0
                                ].filename}`} style={{width: '8vw', height: '18vh'}} className="card-img-top rounded-circle mx-auto" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title text-center fw-bolder title-menu h-75">{item.name}</h5>
                                        <h6 className="card-text text-center price">IDR {item.price}.000</h6>
                                        {JSON.parse(localStorage.getItem('@userLogin')).user.role === "admin" && 
                                            (<div className='d-flex gap-5 justify-content-center'>
                                                <Link to={`/edit-products/${item.id}`}><img src={edit_btn} alt='edit' className='bg-primary rounded-5 p-1' style={{width: '3vw', height: '6vh'}}></img></Link> 
                                                <Link to={'/products'}><img src={delete_btn} alt='edit' onClick={()=>dispatch(deleteProducts(item.id))} className='bg-danger rounded-5 p-1' style={{width: '3vw', height: '6vh'}}></img></Link> 
                                            </div>)
                                        }  
                                    </div>
                                </div>                       
                            </Link>
                        )
                    })}

                    {/* List Product End */}
                    </div>
                </div>
                <p className="mt-5" style={{color: '#6A4029'}}>*the price has been cutted by discount appears</p>
                </div>
                {/* Container List Product End*/}
        </div>    
    </>
  )
}

export default FavoriteAndPromo
