import { LoadingOutlined } from '@ant-design/icons'
import {
  Button,
  DatePicker,
  Form,
  Modal,
  Select,
  Spin,
  Tabs,
  TimePicker,
  Input
} from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'

function AccountUpdateModal({ show, onCreate, onHideModal, accountSelected }) {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(accountSelected)
  }, [form, accountSelected])

  const onFinish = (value) => {
    onCreate({ ...accountSelected, ...value })
    onHideModal()
  }

  return (
    <Modal
      key="userUpdateModal"
      width={600}
      title="Chỉnh sửa tài khoản"
      visible={show}
      onCancel={() => {
        onHideModal()
      }}
      footer={null}
    >
      {accountSelected && (
        <Form
          form={form}
          name="userUpdateModal"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            name: accountSelected.name
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Họ tên"
            name="name"
            rules={[{ required: true, message: 'Họ tên không được để trống!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Email không được để trống!' }]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: 'Mật khẩu không được để trống!' }
            ]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem 2rem',
                height: '40px',
                borderRadius: '5px',
                marginTop: '20px'
              }}
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  )
}

export default AccountUpdateModal
