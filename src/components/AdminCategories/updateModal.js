import { Button, Form, Input, Modal } from 'antd'
import React, { useEffect } from 'react'

function CategoryUpdateModal({
  show,
  onCreate,
  onHideModal,
  categorySelected
}) {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(categorySelected)
  }, [form, categorySelected])

  const onFinish = (value) => {
    onCreate({ ...categorySelected, ...value })
    onHideModal()
  }

  return (
    <Modal
      key="categoryUpdateModal"
      width={600}
      title="Chỉnh sửa danh mục"
      visible={show}
      onCancel={() => {
        onHideModal()
      }}
      footer={null}
    >
      {categorySelected && (
        <Form
          form={form}
          name="categoryUpdateModal"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            name: categorySelected.name
          }}
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
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  )
}

export default CategoryUpdateModal
