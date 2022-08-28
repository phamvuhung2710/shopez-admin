import { DeleteFilled, CheckOutlined } from '@ant-design/icons'
import { Tooltip, message, Popconfirm, Table, Tag } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { baseURL } from '../../constants'
import { formatMoney } from '../../utils/helper'
import ProductDetailModal from './detailProductModal'

export default function AdminOrders() {
  const [data, setData] = useState([])
  const [showDetailProduct, setShowDetailProduct] = useState(false)
  const [listProduct, setListProduct] = useState([])
  const [productSelected, setProductSelected] = useState(null)


  useEffect(() => {
    async function fetchData() {
      axios
        .post(
          `${baseURL}/invoices/invoice_get_list_paging_sort_search_filter`,
          {
            searchKey: '',
            pageNumber: 1,
            pageSize: 10000
          }
        )
        .then((res) => {
          setData(res?.data?.data?.content)
        })
        .catch((error) => console.log(error))
    }

    async function fetchDataProducts() {
      axios
        .post(
          `${baseURL}/products/product_get_list_paging_sort_search_filter`,
          {
            searchKey: '',
            pageNumber: 1,
            pageSize: 10000
          }
        )
        .then((res) => {
          setListProduct(res?.data?.data?.content)
        })
        .catch((error) => console.log(error))
    }

    fetchData()
    fetchDataProducts()
  }, [])

  const handleConfirmOrder = (id) => {
    axios
      .post(`${baseURL}/invoices/invoice_complete`, {
        ids: [id]
      })
      .then(() => {
        axios
          .post(
            `${baseURL}/invoices/invoice_get_list_paging_sort_search_filter`,
            {
              searchKey: '',
              pageNumber: 1,
              pageSize: 10000
            }
          )
          .then((res) => {
            setData(res?.data?.data?.content)
          })
          .catch((error) => console.log(error))

        message.info('Xác nhận đơn hàng thành công')
      })
      .catch((error) => console.log(error))
  }
  const handleRejectOrder = (id) => {
    axios
      .post(`${baseURL}/invoices/invoice_cancel`, {
        ids: [id]
      })
      .then(() => {
        axios
          .post(
            `${baseURL}/invoices/invoice_get_list_paging_sort_search_filter`,
            {
              searchKey: '',
              pageNumber: 1,
              pageSize: 10000
            }
          )
          .then((res) => {
            setData(res?.data?.data?.content)
          })
          .catch((error) => console.log(error))

        message.info('Hủy đơn hàng thành công')
      })
      .catch((error) => console.log(error))
  }

  const renderType = (type) => {
    if (type === 0) {
      return {
        text: 'Đang xử lý',
        color: 'green'
      }
    }
    if (type === 1) {
      return {
        text: 'Đã hủy',
        color: 'red'
      }
    }
    if (type === 2) {
      return {
        text: 'Hoàn thành',
        color: 'blue'
      }
    }
  }

  const handleDetailProduct = (idProduct) => {
    setShowDetailProduct(true)
    setProductSelected(listProduct.find(product => product.id === idProduct))
  }

  return (
    <>
      <div className="flex justify-start mb-5">
        <h2 className="text-2xl font-semibold capitalize">Quản lí hóa đơn</h2>
      </div>
      <Table
        pagination={false}
        rowKey={(record) => record.id}
        columns={[
          {
            title: 'STT',
            align: 'center',
            render: (text, record, index) => index + 1
          },
          {
            title: 'Người đặt',
            dataIndex: 'name',
            align: 'center',
            width: 200,
            render: (name, record) => (
              <div className="flex flex-col">
                <span className="mb-1">Họ tên: {name}</span>
                <span className="mb-1">Số điện thoại: {record?.phone}</span>
                <span className="mb-1">
                  Địa chỉ: đường {record?.street || ''} huyện{' '}
                  {record?.ward || ''} quận {record?.district || ''} tỉnh{' '}
                  {record?.province || ''}{' '}
                </span>
              </div>
            )
          },
          {
            title: 'Sản phẩm',
            dataIndex: 'invoiceDetails',
            align: 'center',
            render: (invoiceDetails) => (
              <ul>
                {invoiceDetails?.map((invoice) => (
                  <li
                    className="flex flex-col py-2 border-b shadow-sm cursor-pointer"
                    onClick={() => handleDetailProduct(invoice?.productt?.id)}
                  >
                    <span className="mb-1">
                      Tên sản phẩm: {invoice?.productt?.name}
                    </span>
                    <span>Giá sản phẩm: {formatMoney(invoice?.price)}</span>
                    <span>Số lượng: {formatMoney(invoice?.quantity)}</span>
                  </li>
                ))}
              </ul>
            )
          },
          {
            title: 'Voucher',
            dataIndex: 'voucher',
            align: 'center',
            render: (voucher) => (
              <div className="flex flex-col">
                <span className="mb-1">Tên voucher: {voucher?.name}</span>
                <span className="mb-1">Mã voucher: {voucher?.code}</span>
                <span className="mb-1">Giảm giá: {voucher?.discount}</span>
              </div>
            )
          },
          {
            title: 'Giá trước khi giảm',
            dataIndex: 'amount',
            align: 'center'
          },
          {
            title: 'Giảm giá',
            dataIndex: 'discount',
            align: 'center'
          },
          {
            title: 'Tổng tiền',
            dataIndex: 'totalAmount',
            align: 'center',
            render: (totalAmount) => <span>{formatMoney(totalAmount)}</span>
          },
          {
            title: 'Trạng thái',
            dataIndex: 'type',
            align: 'center',
            render: (type) => (
              <Tag
                className="px-2 py-1 rounded-sm"
                color={renderType(type)?.color}
              >
                {renderType(type)?.text}
              </Tag>
            )
          },
          {
            title: 'Ngày tạo hóa đơn',
            dataIndex: 'date',
            align: 'center'
          },

          {
            title: 'Thao tác',
            align: 'center',
            width: 200,
            render: (text, record, index) => {
              return (
                <div key={index} className="flex justify-center">
                  <Popconfirm
                    title="Bạn có muốn xác nhận đơn hàng ?"
                    onConfirm={() => handleConfirmOrder(record.id)}
                  >
                    <Tooltip title="Xác nhận đơn hàng">
                      <CheckOutlined className="mr-4" />
                    </Tooltip>
                  </Popconfirm>

                  <Popconfirm
                    title="Bạn có muốn hủy đơn hàng ?"
                    onConfirm={() => handleRejectOrder(record.id)}
                  >
                    <Tooltip title="Hủy đơn hàng">
                      <DeleteFilled />
                    </Tooltip>
                  </Popconfirm>
                </div>
              )
            }
          }
        ]}
        dataSource={data.filter((item) => item.username !== 'admin')}
      />

      <ProductDetailModal
        productSelected={productSelected}
        show={showDetailProduct}
        onHideModal={() => setShowDetailProduct(false)}
      />
    </>
  )
}
