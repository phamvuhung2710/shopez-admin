import { Button, Form, Input, Modal, Select, Upload } from 'antd'
import React, { useEffect } from 'react'
import { UploadOutlined } from '@ant-design/icons'

const { TextArea } = Input

function ProductCreateModal({ show, onCreate, onHideModal, categories }) {
  const [form] = Form.useForm()

  const onFinish = (value) => {
    onCreate(value)
    onHideModal()
    form.resetFields()
  }

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }

    return e?.fileList
  }

  return (
    <Modal
      key="productCreateModal"
      width={600}
      title="Tạo sản phẩm"
      visible={show}
      onCancel={() => {
        onHideModal()
      }}
      footer={null}
    >
      <Form
        form={form}
        name="productCreateModal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[
            { required: true, message: 'Tên sản phẩm không được để trống!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Mã sản phẩm" name="code">
          <Input />
        </Form.Item>

        <Form.Item label="Mô tả sản phẩm" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Giá sản phẩm"
          name="price"
          rules={[
            { required: true, message: 'Giá sản phẩm không được để trống!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Danh mục" name="categoryId">
          <Select>
            {categories.map((category) => (
              <Select.Option value={category.id}>{category.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="imageFile"
          label="Hình sản phẩm"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo" listType="picture">
            <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
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
            Tạo sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ProductCreateModal
