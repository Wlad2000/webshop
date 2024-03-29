
import React,{useContext, useState} from 'react'
import { CustomContext } from '../../Context'
import { useTranslation } from 'react-i18next'
import {Link, NavLink} from "react-router-dom"
import {useForm} from "react-hook-form"
import axios from 'axios'


const Account = () => {
    const {t} = useTranslation()
    const {user, setUser} = useContext(CustomContext)
    const [change, setChange] = useState(false)
    const [passwordChange, setPasswordChange] = useState(false)
    const [view,setView] = useState('history')


    const {
      register,
      handleSubmit,
      formState: {
        errors
      },
      watch
    } = useForm({
      mode:"onBlur"
    })


    const changeUser =  (data) => {

        axios.patch(`https://womazings.herokuapp.com/api/users/${user.id}`, data)
        .then(({data}) => {
          setUser(data)
          localStorage.setItem('user',JSON.stringify(data))
          setChange(false)
        })
      
    }

    const changePassword =  (data) => {
      axios.patch(`https://womazings.herokuapp.com/api/users/${user.id}`, {password: data.password})
      .then(() => setPasswordChange(false))

  }

  return (
    <section className="account">
    <div className="container">
       <h2 className="title">{t("account.about.title")}</h2>
       <div className='page-links'>
            <Link to="/">{t("account.about.link1")}</Link>
            -
            <NavLink to="/account">{t("account.about.link2")}</NavLink>
        </div>
        <button className={`${view === 'history' && 'activeBtn'}`} onClick={() => setView('history')}> История заказов</button>
        <button className={`${view === 'setting' && 'activeBtn'}`} onClick={() => setView('setting')}> Настройки</button>

        {
            user.login.length
                     ?  
                      view === 'history'
                      ?
                      <div className="account__info" >
                        <h3>History</h3>
                        
                        <div className="cart__info">
                          <p className="cart__info-title">Данные заказа</p>
                          <ul className="cart__info-list">
                            <li className="cart__info-item">Заказ</li>
                            
                          </ul>
                        </div>

                        <div>
                     
                          {
                            user.orders.map((item,idx) => (
                            <div key={idx} className="cart__orders">
                              <div className='cart__orders-left'>
                              <p>data</p>
                              <p>{item.date}</p>
                              <p>price</p>
                              <p>{item.price}$</p>
                              </div>

                              <div className='cart__orders-right'>
                          
                              <img className="cart__product-img" src={item.clothes[0].image} />
                              <p className="cart__info-item">{item.clothes[0].title}</p>
                              <p className="cart__info-item">{item.clothes[0].price}$</p>
                              <p className="cart__info-item">{item.clothes[0].title}</p>
                              <p className="cart__info-item">{item.clothes[0].size}</p>
                              <p className="cart__info-item">{item.clothes[0].count}</p>
                              <p className="cart__info-item">{item.clothes[0].color}</p>
                            </div>
                            </div>
                            )
                            )
                          }
                        </div>


        
                      </div>
                      :
                     <div>
                     <form className="account__info" onSubmit={handleSubmit(changeUser)}>
                      <h3>Личные данные</h3>
                      <span className='account__change' onClick={() => setChange(!change)}>
                        {change 
                        ?
                          'Закрыть'
                        :
                         'Изменить'
                        }
                      </span>
                     <p className="account__info-text">
                        <span>email: </span>
                         {change ? <input {...register('email')} type='text' defaultValue={user.email}/>  : user.email}
                      </p>
                     <p className="account__info-text">
                        <span>login: </span> 
                        {change ? <input  {...register('login')} type='text' defaultValue={user.login}/> :  user.login}
                     </p>
                     <p className="account__info-text">
                        <span>phone: </span> 
                        {change ? <input  {...register('phone')} type='text' defaultValue={user.phone}/>  :  user.phone}
                      </p>
                     {
                      change ? <button type='submit'>Сохранить изменения</button> : ''
                     }
                    </form>
                    <div className="account__info">
                      <h3>Пароль</h3>
                      <span className='account__change' onClick={() => setPasswordChange(!passwordChange)}>
                        {change 
                        ?
                          'Закрыть'
                        :
                         'Изменить'
                        }
                      </span>
                      {
                      passwordChange ? 
                        <form onSubmit={handleSubmit(changePassword)}>
                           <p className="account__info-text">
                            <span>Новый пароль: </span> 
                            <input  {...register('password' , {
                              required: "you must specify a password",
                              minLength: {
                                value: 6,
                                message: "Password must have at least 6 characters"
                              }
                            })} type='password'/>
                            {errors?.password && <p>{errors?.password?.message}</p>}
                           </p>
                           <p className="account__info-text">
                            <span>Подтвердите пароль: </span> 
                            <input  {...register('confirmPwd', {
                              validate:(val) => {
                                if(watch('password') !== val){
                                  return "Your password do no math"
                                }
                              }
                            })} type='password'/>
                            {errors?.confirmPwd && <p>{errors?.confirmPwd?.message}</p>}
                           </p>
                           {
                             passwordChange ? <button type='submit'>Сохранить изменения</button> : ''
                          }
                        </form> : ''
                     }
                      
                     
                    </div>
                    </div>
                  
                     : <div className="account__non"> 
                         <p className="account__info-text"> Войдите в свой аккаунт или пройдите Регистрацию</p>
                         <Link  className="account__non-text" to="/login"> Войти</Link>
                         <Link  className="account__non-text" to="/register">Регистрация</Link>
                     </div>
                }

    </div>
  </section>
  )
}

export default Account