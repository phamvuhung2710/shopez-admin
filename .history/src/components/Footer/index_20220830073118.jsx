import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

function Footer() {
  const handleClickFb = () => {
    const win = window.open(
      'https://www.facebook.com/profile.php?id=100036790722499',
      '_blank'
    )
    win.focus()
  }

  const handleClickInstagram = () => {
    const win = window.open(' https://www.instagram.com/dientacong/', '_blank')
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

          <Link
            className="footer-text"
            to="/khachhang"
            onClick={() => {
              window.scrollTo(0, 0)
            }}
          >
            Chính sách khách hàng thân thiết
          </Link>
          <br />
          <Link
            className="footer-text"
            to="/returnrefund"
            onClick={() => {
              window.scrollTo(0, 0)
            }}
          >
            Chính sách đổi &amp; trả hàng
          </Link>
          <br />
          <Link
            className="footer-text"
            to="/baohanh"
            onClick={() => {
              window.scrollTo(0, 0)
            }}
          >
            Chính sách bảo hành
          </Link>
          <br />
          <Link
            className="footer-text"
            to="/baomat"
            onClick={() => {
              window.scrollTo(0, 0)
            }}
          >
            Chính sách bảo mật
          </Link>
        </div>

        <div className="footer-text-container mt-[100px]">
          {/* <div className="footer-title">NHẬN THÔNG BÁO TỪ CHÚNG TÔI</div>
          <div className="footer-email-text">Nhập email của bạn</div>
          <div className="footer-text, footer-email-line"></div> */}
          <br></br>
          <div className="footer-text" onClick={handleClickFb}>
            FACEBOOK
          </div>
          <div className="footer-text" onClick={handleClickInstagram}>
            INSTAGRAM
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
