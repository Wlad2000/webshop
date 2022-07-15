import React,{useContext, useState} from 'react'
import { CustomContext } from '../../Context'
import { useTranslation } from 'react-i18next'
import {Link, NavLink} from "react-router-dom"


const Header = () => {
    const {t,i18n} = useTranslation()

    const changesLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

    const {user, logOutUser, cart} = useContext(CustomContext)

    const [lang, setLang] = useState('ru')

  return (
      
    <header className='header'>
        <div className='container'>
            <div className='header__inner'>
                <div>
                   <span> <a><svg width="19" height="25" viewBox="0 0 19 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.5169 22.6493L18.1587 20.9776C17.4207 17.5332 16.0683 14.2964 14.1387 11.3529V8.64058C15.0275 7.97178 15.6035 6.9084 15.6035 5.71289V4.24805C15.6035 3.84355 15.2756 3.51562 14.8711 3.51562H14.1387V0.732422C14.1387 0.32793 13.8107 0 13.4062 0C13.0018 0 12.6738 0.32793 12.6738 0.732422V3.52339C11.3584 3.6001 10.2059 4.29209 9.5 5.31528C8.79409 4.29209 7.6416 3.6001 6.32617 3.52339V0.732422C6.32617 0.32793 5.99824 0 5.59375 0C5.18926 0 4.86133 0.32793 4.86133 0.732422V3.51562H4.1289C3.72441 3.51562 3.39648 3.84355 3.39648 4.24805V5.71289C3.39648 6.9084 3.97246 7.97178 4.86133 8.64058V11.3529C2.93174 14.2964 1.57934 17.5332 0.841256 20.9776L0.483053 22.6493C0.406491 23.0066 0.605074 23.3658 0.948532 23.4909C3.69741 24.4923 6.57451 25 9.5 25C12.4255 25 15.3026 24.4923 18.0515 23.4909C18.3949 23.3658 18.5935 23.0067 18.5169 22.6493ZM12.918 4.98047H14.1387V5.71289C14.1387 6.92446 13.153 7.91016 11.9414 7.91016H10.2324V7.66602C10.2324 6.1852 11.4372 4.98047 12.918 4.98047ZM4.86133 4.98047H6.08203C7.56284 4.98047 8.76758 6.1852 8.76758 7.66602V7.91016H7.05859C5.84702 7.91016 4.86133 6.92446 4.86133 5.71289V4.98047ZM7.05859 9.375H11.9414C12.1922 9.375 12.4371 9.34956 12.6738 9.30132V10.8398H6.32617V9.30132C6.56289 9.34956 6.80781 9.375 7.05859 9.375ZM9.5 23.5352C6.95849 23.5352 4.45561 23.128 2.05073 22.3244L2.27353 21.2846C2.96118 18.0757 4.21054 15.0566 5.98901 12.3047L13.0109 12.3047C14.7894 15.0566 16.0388 18.0757 16.7264 21.2845L16.9492 22.3244C14.5444 23.128 12.0415 23.5352 9.5 23.5352Z" fill="black"/></svg></a></span>
                    Womazing
                </div>
             
                <ul className='header__links'>
                    <li><NavLink className='header__item' to="/">{t("header.link1")}</NavLink></li>
                    <li><NavLink className='header__item' to="/shop">{t("header.link2")}</NavLink></li>
                    <li><NavLink className='header__item' to="/brands">{t("header.link3")}</NavLink></li>
                    <li><NavLink className='header__item' to="/contact">{t("header.link4")}</NavLink></li>
                </ul>
                <div className="header__call"> 
                    <a href="tel:+7 (495) 823-54-12" >
                        <span className="header__icon-call"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.7483 2.43513L11.8551 0.548477L7.92337 4.47367L9.44758 6.04781C9.19214 6.50125 8.6379 7.3699 7.69334 8.31447C6.74865 9.25918 5.87366 9.81971 5.41587 10.0792L3.87261 8.55562L0.0022583 12.4029L1.8851 14.2983C2.60485 15.0181 3.69998 15.2046 4.6102 14.7625C5.99921 14.0879 8.09546 12.8431 10.1943 10.7443C12.2931 8.64552 13.5379 6.54924 14.2125 5.16023C14.3723 4.83109 14.45 4.47787 14.45 4.12692C14.45 3.5072 14.2078 2.89464 13.7483 2.43513ZM13.1977 4.66732C12.5609 5.97846 11.3845 7.95865 9.39661 9.94658C7.40868 11.9345 5.42849 13.1109 4.11735 13.7477C3.63935 13.9799 3.06287 13.8806 2.6842 13.5019L1.59746 12.4079L3.87543 10.1436L5.19015 11.4415L5.5419 11.2849C5.59905 11.2595 6.95947 10.6438 8.49116 9.11215C10.0239 7.57947 10.6267 6.23054 10.6515 6.17386L10.8041 5.82683L9.50677 4.48705L11.8559 2.14178L12.9512 3.23327C13.3307 3.6133 13.4298 4.18952 13.1977 4.66732Z" fill="#6E9C9F"/></svg>
                        </span>
                        +7 (495) 823-54-12
                    </a>
                    <Link to="/cart"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.8454 8.2243C23.7281 8.10906 23.5642 8.05442 23.4012 8.07624H17.0343V5.26295C17.0343 2.4826 14.7804 0.228699 12.0001 0.228699C9.21971 0.228699 6.96582 2.4826 6.96582 5.26295V8.07624H0.598861C0.421164 8.07624 0.243523 8.07624 0.154646 8.2243C0.0352739 8.33902 -0.0201042 8.5051 0.00659291 8.66851L2.22761 20.81C2.53789 22.5037 4.00034 23.7431 5.72199 23.7713H18.278C20.0046 23.7289 21.464 22.4797 21.7724 20.7804L23.9934 8.66851C24.0201 8.5051 23.9648 8.33902 23.8454 8.2243ZM8.1503 5.26295C8.1503 3.13682 9.87388 1.41324 12 1.41324C14.1261 1.41324 15.8497 3.13682 15.8497 5.26295V8.07624H8.1503V5.26295ZM20.5879 20.6323C20.3884 21.7547 19.4179 22.5759 18.278 22.5868H5.72199C4.58212 22.5759 3.61161 21.7547 3.41215 20.6323L1.30959 9.26078H22.6904L20.5879 20.6323Z" fill="black"/></svg> {cart.length} </Link>
                </div>
                <div>
                    <button className={`header_languageBtn ${lang === 'ru' && 'activeBtn'}`} type="button" onClick={()=> {changesLanguage('ru') ; setLang('ru')}}>ru</button>
                    <button className={`header_languageBtn ${lang === 'en' && 'activeBtn'}`} type="button" onClick={()=> {changesLanguage('en'); setLang('en')}}>en</button>
                </div>
               

                {
                    user.login.length
                     ? <div><Link to="/account">{t("account.about.title")}</Link> | <Link onClick={() => logOutUser()} to="/"> Выйти</Link>  </div>
                     :  <Link to="/login"> Войти</Link>
                }


            
            </div>
        </div>
    </header>
  )
}

export default Header