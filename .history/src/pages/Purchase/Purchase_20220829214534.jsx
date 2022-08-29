import React, { useEffect, useState } from 'react'
import { baseURL, originalURL } from '../../constants'
import { formatMoney } from '../../utils/helper'
import * as S from './purchase.style'
import axios from 'axios'
import { Tag } from 'antd'

const purchaseStatus = {
  all: -1,
  processing: 0,
  cancel: 1,
  confirm: 2
}

function Purchase(props) {
  const [purchases, setPurchases] = useState([])

  console.log('purchases: ', purchases)

  const [filter, setFilter] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    async function fetchData() {
      axios
        .post(
          `${baseURL}/invoices/invoice_get_list_paging_sort_search_filter`,
          {
            dateFrom: '',
            dateTo: '',
            pageNumber: 1,
            pageSize: 1000
          }
        )
        .then((res) => {
          setPurchases(res?.data?.data?.content)
        })
        .catch((error) => console.log(error))
    }

    fetchData()
  }, [])

  const handleChange = (value) => {
    setActiveTab(value)
  }

  return (
    <div className="mt-[120px] mb-[120px] mx-auto" style={{ width: '90vw' }}>
      <S.PurchaseTabs>
        <S.PurchaseTabItem
          className={activeTab === 'all' ? `bg-orange-400` : ''}
          onClick={() => handleChange('all')}
        >
          Tất cả
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          className={activeTab === 'processing' ? `bg-orange-400` : ''}
          onClick={() => handleChange('processing')}
        >
          Đang xử lí
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          className={activeTab === 'confirm' ? `bg-orange-400` : ''}
          onClick={() => handleChange('confirm')}
        >
          Đã xác nhận
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          className={activeTab === 'cancel' ? `bg-orange-400` : ''}
          onClick={() => handleChange('cancel')}
        >
          Đã hủy
        </S.PurchaseTabItem>
      </S.PurchaseTabs>
      <S.PurchaseList>
        {purchases.map((purchase) => (
          <S.OrderCart key={purchase._id}>
            <S.OrderCartContent>
              <div className="flex items-center justify-start">
                {purchase.invoiceDetails.map((detail) => (
                  <div className="basis-1/3 flex items-center p-4 my-2 bg-white rounded-md shadow-sm">
                    <img
                      src={
                        detail?.produtt?.imageUrl
                          ? originalURL + detail?.productt?.imageUrl
                          : 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
                      }
                      alt="#"
                      className="object-cover w-40 h-20 rounded-md select-none"
                    />
                    <div className="flex items-center justify-between w-full ml-2">
                      <div className="">
                        <p className="mb-1 select-none">
                          Tên sản phẩm: {detail?.productt?.name}
                        </p>
                        <p className="mb-1 select-none">
                          Giá tiền: {formatMoney(detail?.productt?.price)}đ
                        </p>
                        <div className="flex items-center">
                          <p className="select-none">
                            Số lượng: {detail?.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </S.OrderCartContent>
            <div class="flex justify-between">
              <div>
                <p>Hình thức thanh toán: <span>{}</span></p>
              </div>
              <S.TotalPrice>
                <S.TotalPriceLabel>Tổng giá tiền</S.TotalPriceLabel>
                <S.TotalPricePrice className="text-sm">
                  {formatMoney(purchase.totalAmount)}đ
                </S.TotalPricePrice>
              </S.TotalPrice>
            </div>
          </S.OrderCart>
        ))}
      </S.PurchaseList>
    </div>
  )
}

export default Purchase
