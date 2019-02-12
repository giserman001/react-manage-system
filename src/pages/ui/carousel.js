import React, { Component } from 'react'
import { Card, Carousel } from 'antd'
import style from './index.module.less'

class Carousels extends Component {
  render() {
    return (
      <div>
        <Card title='文字背景轮播' className={`${style['card-wraper']} ${style['mb20']}`}>
          <Carousel autoplay effect='fade'>
            <div><h3>Ant Motion Banner - React</h3></div>
            <div><h3>Ant Motion Banner - Vue</h3></div>
            <div><h3>Ant Motion Banner - Angular</h3></div>
            <div><h3>Ant Motion Banner - Jquery</h3></div>
          </Carousel>,
        </Card>
        <Card title='图片背景轮播' className='slider-wrap'>
          <Carousel autoplay effect='fade'>
            <div>
              <img src='/carousel-img/carousel-1.jpg' />
            </div>
            <div>
              <img src='/carousel-img/carousel-2.jpg' />
            </div>
            <div>
              <img src='/carousel-img/carousel-3.jpg' />
            </div>
          </Carousel>,
        </Card>
      </div>
    )
  }
}
export default Carousels