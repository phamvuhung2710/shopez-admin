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

        message.info('Xóa tài khoản thành công')
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
        message.info('Tạo sản phẩm thành công')
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
            message.info('Cập nhật sản phẩm thành công')
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
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold capitalize">Quản lí sản phẩm</h2>
        <Input
          className="w-1/3 rounded-md py-2 px-3"
          onChange={handleChangeSearch}
          placeholder="Tìm kiếm sản phẩm"
        />
        <Button
          type="primary"
          className="bg-[#00aefd] border-none rounded-md"
          onClick={() => {
            setShowProductModal(true)
          }}
        >
          Tạo sản phẩm
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
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            align: 'center'
          },
          {
            title: 'Giá sản phẩm',
            dataIndex: 'price',
            align: 'center',
            render: (price) => <span>{formatMoney(price)}</span>
          },
          {
            title: 'Mã sản phẩm',
            dataIndex: 'code',
            align: 'center'
          },
          {
            title: 'Mô tả sản phẩm',
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
            title: 'Hình ảnh',
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
            title: 'Thể loại',
            dataIndex: 'category',
            align: 'center',
            render: (category) => <span>{category?.name || ''}</span>
          },
          {
            title: 'Thao tác',
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
                    title="Xác nhận xoá"
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
            return item?.name.search(searchValue)
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
