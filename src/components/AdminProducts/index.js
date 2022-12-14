import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { Button, Input, message, Popconfirm, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { baseURL } from '../../constants'
import { formatMoney } from '../../utils/helper'
import ProductCreateModal from './createModal'
import ProductUpdateModal from './updateModal'

export default function AdminProducts() {
  const [showProductModal, setShowProductModal] = useState(false)
  const [showProductUpdateModal, setShowProductUpdateModal] = useState(false)
  const [productSelected, setProductSelected] = useState(null)
  const [data, setData] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function fetchData() {
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
          setData(res?.data?.data?.content)
        })
        .catch((error) => console.log(error))
    }

    async function fetchCategories() {
      axios
        .post(
          `${baseURL}/categories/category_get_list_paging_sort_search_filter`,
          {
            searchKey: '',
            pageNumber: 1,
            pageSize: 10000
          }
        )
        .then((res) => {
          setCategories(res?.data?.data?.content)
        })
        .catch((error) => console.log(error))
    }

    fetchData()
    fetchCategories()
  }, [])

  const handleDeleteProduct = (id) => {
    axios
      .post(`${baseURL}/products/product_delete`, {
        ids: [id]
      })
      .then(() => {
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
            setData(res?.data?.data?.content)
          })
          .catch((error) => console.log(error))

        message.info('X??a t??i kho???n th??nh c??ng')
      })
      .catch((error) => console.log(error))
  }

  const handleCreateProduct = (values) => {
    const imageName = `product-${new Date().getTime()}`
    const imageFile = values.imageFile[0].originFileObj
    let formData = new FormData()
    formData.append('name', values.name)
    formData.append('code', values.code)
    formData.append('description', values.description)
    formData.append('categoryId', values.categoryId)
    formData.append('price', values.price)
    formData.append('imageFile', imageFile, imageName)

    axios({
      method: 'post',
      url: `${baseURL}/products/product_create`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(async () => {
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
            setData(res?.data?.data?.content)
          })
          .catch((error) => console.log(error))
        message.info('T???o s???n ph???m th??nh c??ng')
      })
      .catch((error) => console.log(error))
  }

  const handleUpdateProduct = (values) => {
    const imageName = `product-${new Date().getTime()}`
    const imageFile = values.imageFile
      ? values?.imageFile[0]?.originFileObj
      : null
    let formData = new FormData()
    formData.append('id', values.id)
    formData.append('name', values.name)
    formData.append('code', values.code)
    formData.append('description', values.description)
    formData.append('categoryId', values.categoryId)
    formData.append('price', values.price)

    if (imageFile) {
      formData.append('imageFile', imageFile, imageName)
    }

    axios({
      method: 'put',
      url: `${baseURL}/products/product_update`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(async () => {
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
            setData(res?.data?.data?.content)
            message.info('C???p nh???t s???n ph???m th??nh c??ng')
          })
          .catch((error) => console.log(error))
      })
      .catch((error) => console.log(error))
  }

  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold capitalize">Qu???n l?? s???n ph???m</h2>
        <Input
          className="w-1/3 px-3 py-2 rounded-md"
          onChange={handleChangeSearch}
          placeholder="T??m ki???m s???n ph???m"
        />
        <Button
          type="primary"
          className="bg-[#00aefd] border-none rounded-md"
          onClick={() => {
            setShowProductModal(true)
          }}
        >
          T???o s???n ph???m
        </Button>
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
            title: 'T??n s???n ph???m',
            dataIndex: 'name',
            align: 'center'
          },
          {
            title: 'Gi?? s???n ph???m',
            dataIndex: 'price',
            align: 'center',
            render: (price) => <span>{formatMoney(price)}</span>
          },
          {
            title: 'M?? s???n ph???m',
            dataIndex: 'code',
            align: 'center'
          },
          {
            title: 'M?? t??? s???n ph???m',
            dataIndex: 'description',
            align: 'center',
            width: 200,
            render: (description) => (
              <span>
                {description?.length > 50
                  ? `${description?.slice(0, 50)}...`
                  : description}
              </span>
            )
          },
          {
            title: 'H??nh ???nh',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            align: 'center',
            render: (imageUrl) => (
              <div className="flex justify-center">
                <img
                  className="object-cover w-40 h-20 rounded-md"
                  src={`${baseURL.replace('/api/v1', '')}${imageUrl}`}
                  alt="..."
                />
              </div>
            )
          },
          {
            title: 'Th??? lo???i',
            dataIndex: 'category',
            align: 'center',
            render: (category) => <span>{category?.name || ''}</span>
          },
          {
            title: 'Thao t??c',
            align: 'center',
            width: 200,
            render: (text, record, index) => {
              return (
                <div key={index} className="flex justify-center">
                  <EditFilled
                    className="mr-3"
                    onClick={() => {
                      setShowProductUpdateModal(true)
                      setProductSelected(record)
                    }}
                  />
                  <Popconfirm
                    title="X??c nh???n xo??"
                    onConfirm={() => handleDeleteProduct(record.id)}
                  >
                    <DeleteFilled />
                  </Popconfirm>
                </div>
              )
            }
          }
        ]}
        dataSource={data.filter((item) => {
          if (searchValue) {
            return item?.name.toLowerCase().includes(searchValue.toLowerCase())
          }

          return true
        })}
      />

      <ProductUpdateModal
        categories={categories}
        productSelected={productSelected}
        show={showProductUpdateModal}
        onCreate={handleUpdateProduct}
        onHideModal={() => setShowProductUpdateModal(false)}
      />

      <ProductCreateModal
        categories={categories}
        show={showProductModal}
        onCreate={handleCreateProduct}
        onHideModal={() => setShowProductModal(false)}
      />
    </>
  )
}
