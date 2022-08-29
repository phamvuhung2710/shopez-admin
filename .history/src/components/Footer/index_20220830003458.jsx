import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

function Footer() {

  const handleClickFb = () => {
    const win = window.open(
      'https://marketplace.axieinfinity.com/login',
      '_blank'
    )
    win.focus()
  }

  const handleClickInstagram = () => {
    const win = window.open(
      'https://marketplace.axieinfinity.com/login',
      '_blank'
    )
    win.focus()
  }

  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-text-container">
          <div className="footer-title">CÔNG TY</div>
          <Link
            className="footer-text"
            to="/about"
            onClick={() => {
              window.scrollTo(0, 0)
            }}
          >
            Giới thiệu về Sho:ez
          </Link>
          <div className="footer-text">Tin tức</div>
          <div className="footer-text">Chăm sóc khách hàng</div>
          <Link
            className="footer-text"
            to="/contact"
            onClick={() => {
              window.scrollTo(0, 0)
            }}
          >
            Liên hệ
          </Link>
        </div>

        <div className="footer-text-container">
          <div className="footer-title">CHÍNH SÁCH KHÁCH HÀNG</div>
          <div className="footer-text">Chính sách khách hàng thân thiết</div>
          <Link
            className="footer-text"
            to="/returnrefund"
            onClick={() => {
              window.scrollTo(0, 0)
            }}
          >
            Chính sách đổi &amp; trả hàng
          </Link>
          <div className="footer-text">Chính sách bảo hành</div>
          <div className="footer-text">Chính sách bảo mật</div>
        </div>

        <div className="footer-text-container">
          <div className="footer-title">NHẬN THÔNG BÁO TỪ CHÚNG TÔI</div>
          <div className="footer-email-text">Nhập email của bạn</div>
          <div className="footer-text, footer-email-line"></div>
          <br></br>
          <div className="footer-text" onClick={handleClickFb}>FACEBOOK</div>
          <div className="footer-text" onClick={handleClickFb}>INSTAGRAM</div>
        </div>
      </div>
    </div>
  )
}

export default Footer
