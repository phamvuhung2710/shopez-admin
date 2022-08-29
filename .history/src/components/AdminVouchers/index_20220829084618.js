import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { Button, message, Popconfirm, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { baseURL } from '../../constants'
import VoucherCreateModal from './createModal'
import VoucherUpdateModal from './updateModal'

export default function AdminVouchers() {
  const [showVoucherModal, setShowVoucherModal] = useState(false)
  const [showVoucherUpdateModal, setShowVoucherUpdateModal] = useState(false)
  const [voucherSelected, setvoucherSelected] = useState(null)
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      axios
        .post(
          `${baseURL}/vouchers/voucher_get_list_paging_sort_search_filter`,
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

  const handleDeleteVoucher = (id) => {
    axios
      .post(`${baseURL}/vouchers/voucher_delete`, {
        ids: [id]
      })
      .then(() => {
        axios
          .post(
            `${baseURL}/vouchers/voucher_get_list_paging_sort_search_filter`,
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

        message.info('Xóa voucher thành công')
      })
      .catch((error) => console.log(error))
  }

  const handleCreateVoucher = (values) => {
    axios
      .post(`${baseURL}/vouchers/voucher_create`, {
        name: values.name,
        discount: values.discount
      })
      .then(async () => {
        axios
          .post(
            `${baseURL}/vouchers/voucher_get_list_paging_sort_search_filter`,
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

        message.info('Tạo voucher thành công')
      })
      .catch((error) => console.log(error))
  }

  const handleUpdateVoucher = (values) => {
    axios
      .put(`${baseURL}/vouchers/voucher_update`, {
        id: values.id,
        name: values.name,
        discount: values.discount
      })
      .then(async () => {
        axios
          .post(
            `${baseURL}/vouchers/voucher_get_list_paging_sort_search_filter`,
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

        message.info('Cập nhật voucher thành công')
      })
      .catch((error) => console.log(error))
  }

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold capitalize">Quản lí voucher</h2>
        <Button
          type="primary"
          className="mb-5 bg-[#00aefd] border-none rounded-sm"
          onClick={() => {
            setShowVoucherModal(true)
          }}
        >
          Tạo voucher
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
            title: 'Tên voucher',
            dataIndex: 'name',
            align: 'center'
          },
          {
            title: 'Mã voucher',
            dataIndex: 'code',
            align: 'center'
          },
          {
            title: 'Giảm giá',
            dataIndex: 'discount',
            align: 'center',
            render: (discount) => <span>{discount}</span>
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
                      setShowVoucherUpdateModal(true)
                      setvoucherSelected(record)
                    }}
                  />
                  <Popconfirm
                    title="Xác nhận xoá"
                    onConfirm={() => handleDeleteVoucher(record.id)}
                  >
                    <DeleteFilled />
                  </Popconfirm>
                </div>
              )
            }
          }
        ]}
        dataSource={data}
      />

      <VoucherUpdateModal
        voucherSelected={voucherSelected}
        show={showVoucherUpdateModal}
        onCreate={handleUpdateVoucher}
        onHideModal={() => setShowVoucherUpdateModal(false)}
      />

      <VoucherCreateModal
        show={showVoucherModal}
        onCreate={handleCreateVoucher}
        onHideModal={() => setShowVoucherModal(false)}
      />
    </>
  )
}
