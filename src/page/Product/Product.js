import {useLocation, useParams} from "react-router-dom"
import React,{useEffect, useState, useContext} from 'react'
import axios from "axios";
import {CustomContext} from "../../Context";
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import CreateColors from "../CreateProduct/CreateColors";
import CreateSize from "../CreateProduct/CreateSize";

const Product = () => {
    const {t} = useTranslation();
    const params = useParams()
    const location = useLocation()
    const {register, reset, handleSubmit} = useForm()
    
    const [count, setCount] = useState(1)
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')
    const [sale, setSale] = useState(false)
    const [saleCount, setSaleCount] = useState(0)

    const [change, setChange] = useState(false)


    const {shop, page, setPage, status, setStatus, addCart, product, setProduct,user,getAllClothes} = useContext(CustomContext)
    const [sizes, setSizes] = useState('')
    const [colors, setColors] = useState('')

    useEffect(() => {
        axios(`http://localhost:8080/clothes/${params.id}`)
        .then(({data}) => {
            setProduct(data)
            setColor(data.colors[0])
            setSize(data.size[0])
        })
    }, [location, shop])

    const changeProduct =  (data) => {

        axios.patch(`http://localhost:8080/clothes/${product.id}`, {
            ...data,
        })
        .then(({data}) => {
        getAllClothes()
        setChange(false)
        })
      
    }
    

  return (
    <div className="product">
        <div className="container">
            { product.title &&<>
                <h2 className='title'>{product.title}</h2>
                <div className='page-links'>
            <Link to="/">{t("shop.about.link1")}</Link>
            -
            <NavLink to="/shop" onClick={()=>{setPage(1) && setStatus(product.category)}}>{product.category}</NavLink>
            -
            <p style={{color: "#919191"}}>{product.title}</p>
        </div>
                <div className="product__content">
            <img className="product__content-img" src={`/${product.image}`} alt={product.title} />
            <div className="product__info">

                {
                     user.email === 'admin@gmail.com' ?
                        <div>
                            <span className='account__change' onClick={() => setChange(!change)}>
                            {change 
                            ?
                            '??????????????'
                            :
                            '????????????????'
                            }
                            </span>
                            {sale? <input type="number" value={saleCount} onChange={(e)=>setSaleCount(e.target.value)}/> : ''}
                             <button type="button" onClick={() => {
                                if (sale){
                                    axios.patch(`http://localhost:8080/clothes/${product.id}`, {priceSale: product.price - product.price / 100 * saleCount})
                                    .then(() =>{
                                        getAllClothes()
                                        setSaleCount(0)
                                    })
                                }
                                setSale(!sale)
                               
                             }}>{ !product.priceSale ? '????????????????' : '????????????????'} ????????????</button>
                        </div>
                    : <span></span>
                }
               
               
                    {
                        change ?
                        <form onSubmit={handleSubmit(changeProduct)}>
                            <div className='create__form-block'>
                                <label htmlFor="title">????????????????</label>
                                <input {...register('title')} type="text" id="title" defaultValue={product.title} />
                            </div>
                            <div className='create__form-block'>
                                <label htmlFor="price">????????</label>
                                <input {...register('price')} type="number" id="price" defaultValue={product.price} />
                            </div>
                            <div className='create__form-block'>
                                <label htmlFor="inStock">????????????????????</label>
                                <input {...register('inStock')} type="number" id="inStock" defaultValue={product.inStock} />
                            </div>
                            <div className='create__form-block'>
                            <label htmlFor="colors">??????????</label>
                                <ul className="product__content-sizes" id="colors">
                                    <CreateColors colors={colors} setColors={setColors} color={"blue"}/>
                                    <CreateColors colors={colors} setColors={setColors} color={"red"}/>
                                    <CreateColors colors={colors} setColors={setColors} color={"green"}/>
                                    <CreateColors colors={colors} setColors={setColors} color={"black"}/>
                                    <CreateColors colors={colors} setColors={setColors} color={"white"}/>
                                    <CreateColors colors={colors} setColors={setColors} color={"orange"}/>
                                </ul>
                            </div>
                            <div  className='create__form-block'>
                            <label htmlFor="sizes">??????????????</label>
                                <ul className="product__content-sizes" id="sizes">
                                    <CreateSize sizes={sizes} setSizes={setSizes} size={'S'}/>
                                    <CreateSize sizes={sizes} setSizes={setSizes} size={'M'}/>
                                    <CreateSize sizes={sizes} setSizes={setSizes} size={'L'}/>
                                    <CreateSize sizes={sizes} setSizes={setSizes} size={'XL'}/>
                                </ul>
                            </div>
                            <button className='product__content-btn' type='submit'>?????????????????????????? ??????????</button>
                        </form>
                        :
                        <div>
                            <p className="product__content-price">${product.priceSale 
                    ? <>
                      <span style={{textDecoration: 'line-through'}}>{product.price}</span> 
                      /
                      <span className="product__content-priceSale">${product.priceSale}</span>
                      </>
                    : product.price}</p>
                <p className="product__content-choose">???????????????? ????????????</p>
                <ul className="product__content-sizes">
                    {
                        product.size.map((item) => (
                        <li key={item} onClick={()=> setSize(item)} className={`product__content-size ${item === size ? 'product__content-sizeActive':''}`}>{item}</li>
                        ))
                   }
                </ul>
                <p className="product__content-choose">???????????????? ????????</p>
                <ul className="product__content-sizes">
                    {
                        product.colors.map((item) => (
                        <li key={item} onClick={()=> setColor(item)} style={{background: item}} className={`product__content-color ${item === color ? 'product__content-colorActive':''}`}/>
                        ))
                   }
                </ul>
             
                {
                        product.inStock > 0 ?
                        <p className="product__content-choose"> ?? ?????????????? : <span>{product.inStock}</span> </p>
                        : <p className="product__content-choose">?????? ?? ??????????????</p>
                }
                        </div>
                    }

                
               

                {
                    change ?
                    ''
                    :
                    <div className='product__content-form'>
                    <input className='product__content-input' value={count} onChange={(e) => setCount(e.target.value)} disabled={!product.inStock} min='1' max={product.inStock} />
                    <button className='product__content-btn' onClick={()=>addCart({
                       id: product.id,
                       title: product.title,
                       image: product.image,
                       color,
                       size,
                       count,
                       price: product.priceSale || product.price,
                       category: product.category
                    })} type='button'  disabled={product.inStock <= 0}>???????????????? ?? ??????????????</button>
                </div>
                }
                
            </div>
        </div>

            {
                change ?
                ''
                :
                <div>
                <p className="product__variant">{t("product.subtitle")}</p>

                <div className='product__row'>
                   {
                       shop.filter((item)=> {
                        return item.category === product.category && item.id !== product.id
                       }).slice(0,3).map((item) => (
                        <div key={item.id} className="shop__card">
                            <Link className='shop__card-link' to={`/product/${item.id}`}>
                                <img className="shop__card-img" src={`../${item.image}`} alt={item.title} />
                            </Link>
                            <h3 className="shop__card-title">{item.title}</h3>
                            <p className="shop__card-price">${item.priceSale 
                            ? <>
                                <span style={{textDecoration: 'line-through'}}>{item.price}</span> 
                                /
                                <span>${item.priceSale}</span>
                            </>
                            : item.price}</p>
                        </div>
                       ))
                   }
                </div>
                </div>
            }
            </>}
        </div>

    </div>
  )
}

export default Product