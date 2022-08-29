import { Modal } from 'antd'
import React from 'react'
import { originalURL } from '../../constants'
import { formatMoney } from '../../utils/helper'

function EditIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-4 h-4 mr-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
      />
    </svg>
  )
}

function ProductDetailModal({ show, onCreate, onHideModal, productSelected }) {
  return (
    <Modal
      key="detailProductCreateModal"
      width={600}
      title="Chi tiết sản phẩm"
      visible={show}
      onCancel={() => {
        onHideModal()
      }}
      footer={null}
    >
      <div className="flex items-center justify-start mb-2">
        <EditIcon />
        <p>Tên sản phẩm: </p>
        <p className="ml-2">{productSelected?.name}</p>
      </div>

      <div className="flex items-center justify-start mb-2">
        <EditIcon />
        <p>Giá sản phẩm: </p>
        <p className="ml-2">{productSelected?.price}</p>
      </div>

      <div className="flex items-center justify-start mb-2">
        <EditIcon />
        <p>Danh mục sản phẩm: </p>
        <p className="ml-2">{productSelected?.category?.name}</p>
      </div>

      <div className="flex items-center justify-start mb-2">
        <EditIcon />
        <p>Mô tả sản phẩm: </p>
        <p className="w-5/6 ml-2">{productSelected?.description}</p>
      </div>

      <div className="flex items-center justify-start mb-4">
        <EditIcon />
        <p>Giá sản phẩm: </p>
        <p className="ml-2">{formatMoney(productSelected?.price)}</p>
      </div>

      <div className="flex items-center justify-start">
        <EditIcon />
        <p>Hình ảnh sản phẩm: </p>
        <img
          src={`${originalURL}${productSelected?.imageUrl}`}
          className="object-cover h-full mx-auto ml-2 rounded-md w-60"
          alt="..."
        />
      </div>
    </Modal>
  )
}

export default ProductDetailModal
