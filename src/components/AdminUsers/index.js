import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { Button, message, Popconfirm, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { baseURL } from '../../constants'
import AccountCreateModal from './createModal'
import AccountUpdateModal from './updateModal'

export default function AdminUsers() {
  const [showAccountModal, setShowAccountModal] = useState(false)
  const [showAccountUpdateModal, setShowAccountUpdateModal] = useState(false)
  const [accountSelected, setAccountSelected] = useState(null)
  const [data, setData] = useState([])

  // const [pagination, setPagination] = useState({
  //   current: 1,
  //   pageSize: 5,
  //   total: 0
  // })

  useEffect(() => {
    async function fetchData() {
      axios
        .post(`${baseURL}/user/user_get_list_paging_sort_search_filter`, {
          searchKey: '',
          pageNumber: 1,
          pageSize: 1000
        })
        .then((res) => {
          setData(res?.data?.data?.content)
        })
        .catch((error) => console.log(error))
    }

    fetchData()
  }, [])

  const handleDeleteAccount = (id) => {
    axios
      .post(`${baseURL}/user/user_delete`, {
        ids: [id]
      })
      .then(() => {
        axios
          .post(`${baseURL}/user/user_get_list_paging_sort_search_filter`, {
            searchKey: '',
            pageNumber: 1,
            pageSize: 1000
          })
          .then((res) => {
            setData(res?.data?.data?.content)
          })
          .catch((error) => console.log(error))

        message.info('Xóa tài khoản thành công')
      })
      .catch((error) => console.log(error))
  }

  const handleCreateAccount = (values) => {
    axios
      .post(`${baseURL}/user/user_create`, {
        username: values.username,
        password: values.password,
        email: values.email,
        name: values.name,
        role: 1
      })
      .then(async () => {
        axios
          .post(`${baseURL}/user/user_get_list_paging_sort_search_filter`, {
            searchKey: '',
            pageNumber: 1,
            pageSize: 1000
          })
          .then((res) => {
            setData(res?.data?.data?.content)
          })
          .catch((error) => console.log(error))

        message.info('Tạo tài khoản thành công')
      })
      .catch((error) => console.log(error))
  }

  const handleUpdateAccount = (values) => {
    axios
      .put(`${baseURL}/user/user_update`, {
        id: values.id,
        email: values.email,
        name: values.name,
        password: values.password,
        username: values.username,
        role: 1
      })
      .then(async () => {
        axios
          .post(`${baseURL}/user/user_get_list_paging_sort_search_filter`, {
            searchKey: '',
            pageNumber: 1,
            pageSize: 1000
          })
          .then((res) => {
            setData(res?.data?.data?.content)
          })
          .catch((error) => console.log(error))

        message.info('Cập nhật tài khoản thành công')
      })
      .catch((error) => console.log(error))
  }

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold capitalize">Quản lí tài khoản</h2>
        <Button
          type="primary"
          className="mb-5 bg-[#00aefd] border-none rounded-sm"
          onClick={() => {
            setShowAccountModal(true)
          }}
        >
          Tạo tài khoản
        </Button>
      </div>

      <Table
        pagination={false}
        rowKey={(record) => record.id}
        // pagination={pagination}
        columns={[
          {
            title: 'STT',
            align: 'center',
            render: (text, record, index) => index + 1
          },
          {
            title: 'Email',
            dataIndex: 'email',
            align: 'center'
          },
          {
            title: 'Username',
            dataIndex: 'username',
            align: 'center'
          },
          {
            title: 'Họ tên',
            dataIndex: 'name',
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
                      setShowAccountUpdateModal(true)
                      setAccountSelected(record)
                    }}
                  />
                  <Popconfirm
                    title="Xác nhận xoá"
                    onConfirm={() => handleDeleteAccount(record.id)}
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

      <AccountUpdateModal
        accountSelected={accountSelected}
        show={showAccountUpdateModal}
        onCreate={handleUpdateAccount}
        onHideModal={() => setShowAccountUpdateModal(false)}
      />

      <AccountCreateModal
        show={showAccountModal}
        onCreate={handleCreateAccount}
        onHideModal={() => setShowAccountModal(false)}
      />
    </>
  )
}
