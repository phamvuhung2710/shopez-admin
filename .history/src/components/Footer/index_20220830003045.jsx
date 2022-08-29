import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

function Footer() {
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
          <Link
            to={'https://www.facebook.com/profile.php?id=100036790722499'}
            target="_blank"
            className="footer-text"
          >
            FACEBOOK
          </Link>
          <br />
          <Link
            to={'https://www.instagram.com/dientacong/'}
            target="_blank"
            className="footer-text"
          >
            INSTAGRAM
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
