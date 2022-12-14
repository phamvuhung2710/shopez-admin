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

        message.info('X??c nh???n ????n h??ng th??nh c??ng')
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
              dateFrom: '',
              dateTo: '',
              pageNumber: 1,
              pageSize: 10000
            }
          )
          .then((res) => {
            setData(res?.data?.data?.content)
          })
          .catch((error) => console.log(error))

        message.info('H???y ????n h??ng th??nh c??ng')
      })
      .catch((error) => console.log(error))
  }

  const renderType = (type) => {
    if (type === 0) {
      return {
        text: '??ang x??? l??',
        color: 'green'
      }
    }
    if (type === 1) {
      return {
        text: '???? h???y',
        color: 'red'
      }
    }
    if (type === 2) {
      return {
        text: 'Ho??n th??nh',
        color: 'blue'
      }
    }
  }

  const handleDetailProduct = (idProduct) => {
    setShowDetailProduct(true)
    setProductSelected(listProduct.find((product) => product.id === idProduct))
  }

  return (
    <>
      <div className="flex justify-start mb-5">
        <h2 className="text-2xl font-semibold capitalize">Qu???n l?? h??a ????n</h2>
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
            title: 'Ng?????i ?????t',
            dataIndex: 'name',
            align: 'center',
            width: 200,
            render: (name, record) => (
              <div className="flex flex-col">
                <span className="mb-1">H??? t??n: {name}</span>
                <span className="mb-1">S??? ??i???n tho???i: {record?.phone}</span>
                <span className="mb-1">
                  ?????a ch???: ???????ng {record?.street || ''} huy???n{' '}
                  {record?.ward || ''} qu???n {record?.district || ''} t???nh{' '}
                  {record?.province || ''}{' '}
                </span>
              </div>
            )
          },
          {
            title: 'S???n ph???m',
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
                      T??n s???n ph???m: {invoice?.productt?.name}
                    </span>
                    <span>Gi?? s???n ph???m: {formatMoney(invoice?.price)}</span>
                    <span>S??? l?????ng: {formatMoney(invoice?.quantity)}</span>
                  </li>
                ))}
              </ul>
            )
          },
          {
            title: 'Voucher',
            dataIndex: 'voucher',
            align: 'center',
            render: (voucher) =>
              voucher && (
                <div className="flex flex-col">
                  <span className="mb-1">T??n voucher: {voucher?.name}</span>
                  <span className="mb-1">M?? voucher: {voucher?.code}</span>
                  <span className="mb-1">Gi???m gi??: {voucher?.discount}%</span>
                </div>
              )
          },
          {
            title: 'Gi?? tr?????c khi gi???m',
            dataIndex: 'amount',
            align: 'center',
            render: (amount) => <span>{formatMoney(amount)}</span>
          },
          {
            title: 'Gi???m gi??',
            dataIndex: 'discount',
            align: 'center'
          },
          {
            title: 'T???ng ti???n',
            dataIndex: 'totalAmount',
            align: 'center',
            render: (totalAmount) => <span>{formatMoney(totalAmount)}</span>
          },
          {
            title: 'Tr???ng th??i',
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
            title: 'Ng??y t???o h??a ????n',
            dataIndex: 'date',
            align: 'center'
          },

          {
            title: 'Thao t??c',
            align: 'center',
            width: 200,
            render: (text, record, index) => {
              return (
                <div key={index} className="flex justify-center">
                  <Popconfirm
                    title="B???n c?? mu???n x??c nh???n ????n h??ng ?"
                    onConfirm={() => handleConfirmOrder(record.id)}
                  >
                    <Tooltip title="X??c nh???n ????n h??ng">
                      <CheckOutlined className="mr-4" />
                    </Tooltip>
                  </Popconfirm>

                  <Popconfirm
                    title="B???n c?? mu???n h???y ????n h??ng ?"
                    onConfirm={() => handleRejectOrder(record.id)}
                  >
                    <Tooltip title="H???y ????n h??ng">
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
