import React from 'react'
import './PageHader.css';
const PageHader = ({imgNo = 1, title = 'stayHome'}) => {

    const imgUrl = `/assets/banner/b${imgNo}.jpg`
  return (

        <section id='page-header' style={{backgroundImage: `url(${imgUrl})` }}>
            <h2>#{title}</h2>
            <p>Save up to 70% off!</p>
        </section>
  )
}

export default PageHader