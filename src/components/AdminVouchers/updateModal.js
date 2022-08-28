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

function VoucherUpdateModal({ show, onCreate, onHideModal, voucherSelected }) {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(voucherSelected)
  }, [form, voucherSelected])

  const onFinish = (value) => {
    onCreate({ ...voucherSelected, ...value })
    onHideModal()
  }

  return (
    <Modal
      key="voucherUpdateModal"
      width={600}
      title="Chỉnh sửa voucher"
      visible={show}
      onCancel={() => {
        onHideModal()
      }}
      footer={null}
    >
      {voucherSelected && (
        <Form
          form={form}
          name="voucherUpdateModal"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            name: voucherSelected.name
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên voucher"
            name="name"
            rules={[
              { required: true, message: 'Tên voucher không được để trống!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Giảm giá" name="discount">
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

export default VoucherUpdateModal
