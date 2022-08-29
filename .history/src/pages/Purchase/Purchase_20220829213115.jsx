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
              {purchase.invoiceDetails.map((detail) => (
                <div className="flex items-center p-4 mt-2 bg-white rounded-md shadow-sm">
                  <img
                    src={
                      detail?.produtt?.imageUrl
                        ? originalURL + detail?.produtt?.imageUrl
                        : 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
                    }
                    alt="#"
                    className="object-cover w-40 h-20 rounded-md select-none"
                  />
                  <div className="flex items-center justify-between w-full ml-2">
                    <div className="">
                      <p className="mb-1 select-none">
                        {detail?.produtt?.name}
                      </p>
                      <p className="mb-1 select-none">
                        Giá tiền: {formatMoney(detail?.produtt?.price)}đ
                      </p>
                      <div className="flex items-center">
                        <p className="select-none">
                          Số lượng: {detail?.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Tag
                        className="px-2 py-1 mr-2 rounded-sm select-none"
                        color="blue"
                      >
                        {formatMoney(detail?.amout)}đ
                      </Tag>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => handleRemoveFromCart(item)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
              <S.OrderCartDetail>
                {/* <img src={purchase.product.image} alt="" /> */}
                <S.OrderContent>
                  <S.OrderName>
                    123
                    {/* {purchase.product.name} */}
                  </S.OrderName>
                  <S.OrderQuantity>
                    5000
                    {/* x {purchase.product.buy_count} */}
                  </S.OrderQuantity>
                </S.OrderContent>
              </S.OrderCartDetail>
              <S.OrderCartPrice>
                5000
                {/* {formatMoney(purchase.product.price)}đ */}
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
                <S.TotalPricePrice className="text-sm">
                  {formatMoney(purchase.totalAmount)}đ
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
