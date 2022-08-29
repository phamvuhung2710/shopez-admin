import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import useQuery from 'src/hooks/useQuery'
import { formatMoney, generateNameId } from 'src/utils/helper'
import { getPurchases } from '../user.slice'
import * as S from './purchase.style'

const purchaseStatus = {
  all: -1,
  processing: 0,
  cancel: 1,
  confirm: 2
}

function Purchase(props) {
  const [purchases, setPurchases] = useState([])
  const dispatch = useDispatch()


  return (
    <div>
      <S.PurchaseTabs>
        <S.PurchaseTabItem
          // to={'/orders'}
          // isActive={handleActive(purchaseStatus.all)}
        >
          Tất cả
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={{
            pathname: '/orders'
          }}
          isActive={handleActive(purchaseStatus.waitForConfirmation)}
        >
          Chờ xác nhận
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={{
            pathname: '/orders'
          }}
          isActive={handleActive(purchaseStatus.waitForGetting)}
        >
          Chờ lấy hàng
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={{
            pathname: '/orders'
          }}
          isActive={handleActive(purchaseStatus.inProgress)}
        >
          Đang giao
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={{
            pathname: '/orders'
          }}
          isActive={handleActive(purchaseStatus.delivered)}
        >
          Đã giao
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={{
            pathname: '/orders'
          }}
          isActive={handleActive(purchaseStatus.cancelled)}
        >
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
