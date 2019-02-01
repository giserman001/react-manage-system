import React, { Component } from 'react';
import { Card, Row, Col } from 'antd'
// import style from './index.module.less'

class Gallery extends Component {
  render() {
    const imgs = [
      ['1.png', '2.png', '3.png', '4.png', '5.png'],
      ['6.png', '7.png', '8.png', '9.png', '10.png'],
      ['11.png', '12.png', '13.png', '14.png', '15.png'],
      ['16.png', '17.png', '18.png', '19.png', '20.png'],
      ['21.png', '22.png', '23.png', '24.png', '25.png']
    ]
    const imgList = imgs.map((list) => list.map((item) => {
      return (
        <Card key={item} cover={<img src={'/gallery/' + item} alt='' />}>
          <Card.Meta title='React Admin' description='I Love React' />
        </Card>
      )
    }))
    return (
      <div>
        <Row>
          {
            imgList.map((item, index) => {
              return (
                <Col key={index} md={imgList.length > (index + 1) ? 5 : 4}>
                  {item}
                </Col>
              )
            })
          }
        </Row>
      </div>
    )
  }
}

export default Gallery