import { Button, Form, Input, Modal, Select, Upload } from 'antd'
import React, { useEffect } from 'react'
import { UploadOutlined } from '@ant-design/icons'

const { TextArea } = Input

function ProductUpdateModal({
  show,
  onCreate,
  onHideModal,
  productSelected,
  categories
}) {
  const [form] = Form.useForm()

  useEffect(() => {
    const categoryId = productSelected?.category?.id || null
    form.setFieldsValue({ ...productSelected, categoryId })
  }, [form, productSelected])

  const onFinish = (value) => {
    const categoryId = value.categoryId
      ? value.categoryId
      : productSelected.category.id
    onCreate({
      ...productSelected,
      ...value,
      categoryId
    })
    onHideModal()
  }

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }

    return e?.fileList
  }

  return (
    <Modal
      key="productUpdateModal"
      width={600}
      title="Chỉnh sửa sản phẩm"
      visible={show}
      onCancel={() => {
        onHideModal()
      }}
      footer={null}
    >
      {productSelected && (
        <Form
          form={form}
          name="productUpdateModal"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
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

          <Form.Item
            label="Mã sản phẩm"
            name="code"
            rules={[
              { required: true, message: 'Mã sản phẩm không được để trống!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Mô tả sản phẩm" name="description">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Danh mục" name="categoryId">
            <Select>
              {categories.map((category) => (
                <Select.Option value={category.id}>
                  {category.name}
                </Select.Option>
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
              <Button icon={<UploadOutlined />}>Nhấn để upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[
              { required: true, message: 'Giá sản phẩm không được để trống!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
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

export default ProductUpdateModal
