import React, { useEffect, useState } from 'react'
import { baseURL } from '../../constants'
import { formatMoney } from '../../utils/helper'
import * as S from './purchase.style'
import axios from 'axios'

const purchaseStatus = {
  all: -1,
  processing: 0,
  cancel: 1,
  confirm: 2
}

function Purchase(props) {
  const [purchases, setPurchases] = useState([])

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
    console.log('value: ', value)
  }

  return (
    <div className="mt-[120px] mb-[120px] mx-auto">
      <S.PurchaseTabs>
        <S.PurchaseTabItem
          className="bg-slate-200"
          onClick={() => handleChange('all')}
        >
          Tất cả
        </S.PurchaseTabItem>
        <S.PurchaseTabItem onClick={() => handleChange('processing')}>
          Đang xử lí
        </S.PurchaseTabItem>
        <S.PurchaseTabItem onClick={() => handleChange('confirm')}>
          Đã xác nhận
        </S.PurchaseTabItem>
        <S.PurchaseTabItem onClick={() => handleChange('cancel')}>
          Đã hủy
        </S.PurchaseTabItem>
      </S.PurchaseTabs>
      <S.PurchaseList>
        {purchases.map((purchase) => (
          <S.OrderCart key={purchase._id}>
            <S.OrderCartContent>
              <S.OrderCartDetail>
                <img src={purchase.product.image} alt="" />
                <S.OrderContent>
                  <S.OrderName>{purchase.product.name}</S.OrderName>
                  <S.OrderQuantity>
                    x {purchase.product.buy_count}
                  </S.OrderQuantity>
                </S.OrderContent>
              </S.OrderCartDetail>
              <S.OrderCartPrice>
                đ{formatMoney(purchase.product.price)}
              </S.OrderCartPrice>
            </S.OrderCartContent>
            <S.OrderCartButtonContainer>
              <S.PurchaseButton
                // to={path.product + `/${generateNameId(purchase.product)}`}
                light={1}
              >
                Xem sản phẩm
              </S.PurchaseButton>
              <S.TotalPrice>
                <S.TotalPriceLabel>Tổng giá tiền</S.TotalPriceLabel>
                <S.TotalPricePrice>
                  đ{formatMoney(purchase.product.price * purchase.buy_count)}
                </S.TotalPricePrice>
              </S.TotalPrice>
            </S.OrderCartButtonContainer>
          </S.OrderCart>
        ))}
      </S.PurchaseList>
    </div>
  )
}

export default Purchase
