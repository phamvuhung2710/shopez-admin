import { Button, Form, Input, Modal } from 'antd'
import React from 'react'

function CategoryCreateModal({ show, onCreate, onHideModal }) {
  const [form] = Form.useForm()

  const onFinish = (value) => {
    onCreate(value)
    onHideModal()
    form.resetFields()
  }

  return (
    <Modal
      key="categoryCreateModal"
      width={600}
      title="Tạo danh mục"
      visible={show}
      onCancel={() => {
        onHideModal()
      }}
      footer={null}
    >
      <Form
        form={form}
        name="categoryCreateModal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[
            { required: true, message: 'Tên danh mục không được để trống!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input />
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

export default CategoryCreateModal
