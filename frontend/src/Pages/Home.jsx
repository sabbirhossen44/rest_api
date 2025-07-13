import React from 'react'
import Banner from '../components/Banner/Banner'
import Additionalinfo from '../components/Additionalinfo/Additionalinfo'
import Advertise from '../components/Advertise/Advertise'
import NewArrivals from '../components/NewArrivals/NewArrivals'
import SpecialOffers from '../components/SpecialOffers/SpecialOffers'
import BestSale from '../components/BestSale/BestSale'
import Ads_2 from '../components/Ads_2/Ads_2'
import Subscribe from '../components/Subscribe/Subscribe'

const Home = () => {
  return (
    <>
        <Banner/>
        <Additionalinfo/>
        <Advertise/>
        <NewArrivals/>
        <BestSale/>
        <Ads_2/>
        <SpecialOffers/>
        <Subscribe/>
    </>
  )
}

export default Home