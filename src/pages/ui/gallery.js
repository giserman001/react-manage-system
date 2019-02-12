import React, { Component } from 'react';
import { Card, Row, Col, Modal } from 'antd'
// import style from './index.module.less'

class Gallery extends Component {
  state = {
    visible: false
  }
  openGallery = (imgSrc) => {
    this.setState({
      currentImgSrc: '/gallery/' + imgSrc,
      visible: true
    })
  }
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
        <Card
          style={{ marginBottom: 10 }}
          key={item}
          cover={
            <img
              src={'/gallery/' + item}
              alt=''
              onClick={() => { this.openGallery(item) }}
            />
          }
        >
          <Card.Meta title='React Admin' description='I Love React' />
        </Card>
      )
    }))
    return (
      <div>
        <Row gutter={10}>
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
        <Modal
          width={300}
          height={500}
          title='图片画廊'
          visible={this.state.visible}
          onCancel={() => {
            this.setState({
              visible: false
            })
          }}
          footer={null}
        >
          <img
            src={this.state.currentImgSrc}
            alt=''
            style={{width: '100%'}}
          />
        </Modal>
      </div>
    )
  }
}

export default Gallery