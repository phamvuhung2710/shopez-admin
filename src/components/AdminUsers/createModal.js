import { Button, Form, Input, Modal } from 'antd'
import React from 'react'

function AccountCreateModal({ show, onCreate, onHideModal }) {
  const [form] = Form.useForm()

  const onFinish = (value) => {
    onCreate(value)
    onHideModal()
    form.resetFields()
  }

  return (
    <Modal
      key="accountCreateModal"
      width={600}
      title="Tạo tài khoản"
      visible={show}
      onCancel={() => {
        onHideModal()
      }}
      footer={null}
    >
      <Form
        form={form}
        name="accountCreateModal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: 'Tên tài khoản không được để trống!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Họ tên" name="name">
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Email không được để trống!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
        >
          <Input.Password />
        </Form.Item>

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
            Tạo
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AccountCreateModal
