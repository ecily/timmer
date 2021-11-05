import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './product/Product'
import Loader from './layouts/Loader'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'




const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)

const Home = ({ match }) => {
    
    const [currentPage, setCurrentPage ] = useState(1)
    const [price, setPrice] = useState([1, 1000])
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(0)

    const categories = [
        'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
    ]

    const alert = useAlert()
    const dispatch = useDispatch()
    
    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)

    const keyword = match.params.keyword

    useEffect(() =>{
        if(error) {
            return alert.error(error)
        }
        dispatch(getProducts(keyword, currentPage, price, category, rating))
        
    }, [dispatch, alert, error, keyword, currentPage, price, category, rating])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = productsCount
    if(keyword) {
        count = filteredProductsCount
    }

    return (
        <Fragment>

        <a href="#" className="scrollToTop"><i className="icofont-rounded-up"></i></a>

	    <div className="bg-theme position-relative">
		<div className="shape-top-left  d-xxl-block wow fadeInDown" data-wow-delay="0.4s">
            <img src='/images/shape/01.png'/>
		</div>
            <div className="shape-bottom-right d-none d-xxl-block wow fadeInUp" data-wow-delay="0.4s">
            <img src='/images/shape/02.png'/>
            </div>
            <div className="shape-bottom wow fadeInUp" data-wow-delay="0.4s">
            <img src='/images/shape/03.png'/>
            </div>
            <div className="container">
                <div className="row align-items-center position-relative z-index-1">
                    <div className="col-lg-6 col-12 wow fadeInLeft" data-wow-delay="0.4s">
                        <div className="banner-content">
                            <span className="banner-sub-title text-white">Timmer's Nordmann-Tannen</span>
                            <h2 className="banner-title">Frohe Weihnachten</h2>
                            <p className="banner-desc text-white">Die Nordmann-Tanne (Abies nordmanniana), 
                            standardsprachlich Nordmanntanne, auch Nordmanns Tanne und Kaukasus-Tanne genannt, 
                            ist eine Pflanzenart aus der Gattung Tannen (Abies) in der Familie der 
                            Kieferngewächse (Pinaceae). Die Nordmanntanne ist heute die meistgenutzte Baumart 
                            als Weihnachtsbaum.</p>
                            <div className="banner-button-group d-inline-flex">
                                <a href="#pricing" className="lab-btn"><span>Jetzt einkaufen!</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-12 mt-5 mt-lg-0 wow fadeInRight" data-wow-delay="0.4s">
                        <div className="banner-thumb">
                            <img src="/images/banner/01.png" alt="ChampEvent"/>
                        </div>
                    </div>
                </div>
            </div>
	</div>

    {/* Product Section REACT */}

	
	
    {/* <!-- ==========Pricing Section Starts Here========== --> */}
	<div className="pricing-section padding-top padding-bottom position-relative" id="pricing">
		<div className="shape-top-right d-xl-block wow fadeInDown" data-wow-delay="0.4s">
			<img src="/images/shape/09.png" alt="ChampEvent"/>
		</div>
		<div className="shape-bottom wow fadeInUp" data-wow-delay="0.8s">
			<img src="/images/shape/08.png" alt="ChampEvent"/>
		</div>
		<div className="container">
			<div className="section-header text-center wow fadeInUp" data-wow-delay="0.4s">
				<span className="section-subtitle theme-color">bis 20. Dezember bestellen und rechtzeitig zum Fest geliefert bekommen</span>
				<h2 className="section-title">unsere Nordmann-Tannen</h2>
			</div>
			<div className="section-wrapper">
		

				{/* <!-- Nordmanntanne hier --> */}
				<div className="col-12">
					<div className="section-wrapper text-center">
						<div className="footer-logo wow fadeInUp" data-wow-delay="0.4s">
							<img src="/images/pricing/tree.png" alt="ChampEvent"/>
						</div>
					</div>
				</div>


<div className="row justify-content-center align-items-center g-4">
	
				{products && products.map(product => (
                <Product key={product._id} product={product} col={3}/>
				))}
			
				</div>

			</div>
		</div>
	</div>

    {/* <!-- ==========About Section Starts Here========== --> */}
	<div className="about-section padding-top padding-bottom position-relative" id="about">
		{/* <div className="shape-bottom-right d-none d-xxl-block wow fadeInUp" data-wow-delay="0.8s">
			
            <img src="/images/shape/02.png" alt="ChampEvent"/>
		</div> */}

        <div className="shape-bottom-right d-xxl-block wow fadeInUp" data-wow-delay="0.8s">
			<img src="/images/shape/05.png" alt="ChampEvent"/>
		</div>
		<div className="container">
			<div className="row align-items-center justify-content-center position-relative z-index-1">
				<div className="col-lg-6 col-12 wow fadeInLeft" data-wow-delay="0.4s">
					<div className="about-thumb ml-xxl-450">
						<img src="/images/about/01.jpg" alt="ChampEvent" className="w-xxl-none"/>
					</div>
				</div>
				<div className="col-lg-6 col-12 wow fadeInUp" data-wow-delay="0.4s">
					<div className="about-content">
						<span className="about-subtitle theme-color">Über uns</span>
						<h2 className="about-title">Timmer's Nordmann-Tannen</h2>
						<p className="about-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum alias vero, quos error quia ea eum tempora ex similique reiciendis, dolore temporibus, suscipit maxime asperiores rerum molestiae! Voluptatum, quod.</p>
						<p className="about-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae ut natus voluptatem vero architecto quas rerum ad sit expedita est repellat provident maxime distinctio aliquid totam molestiae eum, quae doloribus.</p>
						<ul className="about-list">
							<li><i className="icofont-checked"></i> We providing different.</li>
							<li><i className="icofont-checked"></i> We are one of leading.</li>
							<li><i className="icofont-checked"></i> Learn how to grow you.</li>
							<li><i className="icofont-checked"></i> We providing different.</li>
							<li><i className="icofont-checked"></i> Learn how to grow you.</li>
							<li><i className="icofont-checked"></i> We are one of leading.</li>
						</ul>
						<a href="#pricing" className="lab-btn"><span>Unsere Tannen</span></a>
					</div>
				</div>
			</div>
		</div>
	</div>
	{/* <!-- ==========About Section Ends Here========== --> */}

    {/* <!-- ==========Newsletter Section Starts Here========== --> */}
	<footer className="footer-section position-relative bg-theme">
		<div className="shape-top wow fadeInDown" data-wow-delay="0.4s">
			<img src="/images/shape/09.png" alt="ChampEvent"/>
		</div>
		<div className="shape-bottom wow fadeInUp" data-wow-delay="0.8s">
			<img src="/images/shape/08.png" alt="ChampEvent"/>
		</div>
		<div className="container">
			<div className="row">
				<div className="col-12">
					<div className="section-wrapper text-center">
						<div className="footer-logo wow fadeInUp" data-wow-delay="0.4s">
							<img src="/images/logo/Wiesenseppl.png" alt="ChampEvent"/>
						</div>
						<br/>
						<div className="footer-copyright wow fadeInUp" data-wow-delay="0.6s">
							<p className="mb-0 text-white">Firmenname - Impressum & Datenschutz - Cookiehinweis</p>
							<p className="mb-0 text-white">Kontaktadresse</p>
						</div>

						<div className="footer-social wow fadeInUp" data-wow-delay="0.5s">
							<div className="social-media">
								<a href="#" className="facebook"><i className="icofont-facebook"></i></a>
								<a href="#" className="twitter"><i className="icofont-twitter"></i></a>
								<a href="#" className="linkedin"><i className="icofont-linkedin"></i></a>
								<a href="#" className="youtube"><i className="icofont-youtube-play"></i></a>
							</div>
						</div>
					
					</div>
				</div>
			</div>
		</div>
	</footer>
	{/* <!-- ==========Newsletter Section Ends Here========== --> */}
               
        </Fragment>
    )}



export default Home
