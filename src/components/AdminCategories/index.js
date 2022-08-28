import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { Button, message, Popconfirm, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { baseURL } from '../../constants'
import CategoryCreateModal from './createModal'
import CategoryUpdateModal from './updateModal'

export default function AdminCategories() {
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showCategoryUpdateModal, setShowCategoryUpdateModal] = useState(false)
  const [categorySelected, setCategorySelected] = useState(null)
  const [data, setData] = useState([])

  // const [pagination, setPagination] = useState({
  //   current: 1,
  //   pageSize: 5,
  //   total: 0
  // })

  useEffect(() => {
    async function fetchData() {
      axios
        .post(
          `${baseURL}/categories/category_get_list_paging_sort_search_filter`,
          {
            searchKey: '',
            pageNumber: 1,
            pageSize: 1000
          }
        )
        .then((res) => {
          setData(res?.data?.data?.content)
        })
        .catch((error) => console.log(error))
    }

    fetchData()
  }, [])

  const handleDeleteCategory = (id) => {
    axios
      .post(`${baseURL}/categories/category_delete`, {
        ids: [id]
      })
      .then(() => {
        axios
          .post(
            `${baseURL}/categories/category_get_list_paging_sort_search_filter`,
            {
              searchKey: '',
              pageNumber: 1,
              pageSize: 1000
            }
          )
          .then((res) => {
            setData(res?.data?.data?.content)
          })
          .catch((error) => console.log(error))

        message.info('Xóa danh mục thành công')
      })
      .catch((error) => console.log(error))
  }

  const handleCreateCategory = (values) => {
    axios
      .post(`${baseURL}/categories/category_create`, {
        name: values.name,
        description: values.description
      })
      .then(async () => {
        axios
          .post(
            `${baseURL}/categories/category_get_list_paging_sort_search_filter`,
            {
              searchKey: '',
              pageNumber: 1,
              pageSize: 1000
            }
          )
          .then((res) => {
            setData(res?.data?.data?.content)
          })
          .catch((error) => console.log(error))

        message.info('Tạo danh mục thành công')
      })
      .catch((error) => console.log(error))
  }

  const handleUpdateCategory = (values) => {
    axios
      .put(`${baseURL}/categories/category_update`, {
        id: values.id,
        name: values.name,
        description: values.description
      })
      .then(async () => {
        axios
          .post(
            `${baseURL}/categories/category_get_list_paging_sort_search_filter`,
            {
              searchKey: '',
              pageNumber: 1,
              pageSize: 1000
            }
          )
          .then((res) => {
            setData(res?.data?.data?.content)
          })
          .catch((error) => console.log(error))

        message.info('Cập nhật danh mục thành công')
      })
      .catch((error) => console.log(error))
  }

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold capitalize">Quản lí danh mục</h2>
        <Button
          type="primary"
          className="mb-5 bg-[#00aefd] border-none rounded-sm"
          onClick={() => {
            setShowCategoryModal(true)
          }}
        >
          Tạo danh mục
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
            title: 'Tên danh mục',
            dataIndex: 'name',
            align: 'center'
          },

          {
            title: 'Mô tả danh mục',
            dataIndex: 'description',
            align: 'center'
          },
          {
            title: 'Ngày tạo',
            dataIndex: 'created_date',
            align: 'center'
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
                      setShowCategoryUpdateModal(true)
                      setCategorySelected(record)
                    }}
                  />
                  <Popconfirm
                    title="Xác nhận xoá"
                    onConfirm={() => handleDeleteCategory(record.id)}
                  >
                    <DeleteFilled />
                  </Popconfirm>
                </div>
              )
            }
          }
        ]}
        dataSource={data.filter((item) => item.username !== 'admin')}
      />

      <CategoryUpdateModal
        categorySelected={categorySelected}
        show={showCategoryUpdateModal}
        onCreate={handleUpdateCategory}
        onHideModal={() => setShowCategoryUpdateModal(false)}
      />

      <CategoryCreateModal
        show={showCategoryModal}
        onCreate={handleCreateCategory}
        onHideModal={() => setShowCategoryModal(false)}
      />
    </>
  )
}
