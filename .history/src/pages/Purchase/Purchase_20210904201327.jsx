import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import * as S from './purchase.style'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { getDate, getMonth, getYear } from 'date-fns'
import useQuery from 'src/hooks/useQuery'
import { getPurchases } from '../user.slice'
import { purchaseStatus } from 'src/constants/status'
import { unwrapResult } from '@reduxjs/toolkit'
import qs from 'query-string'
import { path } from 'src/constants/path'
import { formatMoney, generateNameId } from 'src/utils/helper'

Purchase.propTypes = {}

function Purchase(props) {
  const [purchases, setPurchases] = useState([])
  const dispatch = useDispatch()
  const query = useQuery()
  const status = useMemo(() => query.status || purchaseStatus.all, [query])
  useEffect(() => {
    dispatch(getPurchases(status))
      .then(unwrapResult)
      .then(res => {
        setPurchases(res.data)
      })
  }, [status, dispatch])

  const handleActive = value => () => Number(value) === Number(status)

  return (
    <div>
      <S.PurchaseTabs>
        <S.PurchaseTabItem
          to={path.purchase}
          isActive={handleActive(purchaseStatus.all)}
        >
          Tất cả
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={{
            pathname: path.purchase,
            search: `?${qs.stringify({
              status: purchaseStatus.waitForConfirmation
            })}`
          }}
          isActive={handleActive(purchaseStatus.waitForConfirmation)}
        >
          Chờ xác nhận
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={{
            pathname: path.purchase,
            search: `?${qs.stringify({
              status: purchaseStatus.waitForGetting
            })}`
          }}
          isActive={handleActive(purchaseStatus.waitForGetting)}
        >
          Chờ lấy hàng
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={{
            pathname: path.purchase,
            search: `?${qs.stringify({
              status: purchaseStatus.inProgress
            })}`
          }}
          isActive={handleActive(purchaseStatus.inProgress)}
        >
          Đang giao
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={{
            pathname: path.purchase,
            search: `?${qs.stringify({
              status: purchaseStatus.delivered
            })}`
          }}
          isActive={handleActive(purchaseStatus.delivered)}
        >
          Đã giao
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={{
            pathname: path.purchase,
            search: `?${qs.stringify({
              status: purchaseStatus.cancelled
            })}`
          }}
          isActive={handleActive(purchaseStatus.cancelled)}
        >
          Đã hủy
        </S.PurchaseTabItem>
      </S.PurchaseTabs>
      <S.PurchaseList>
        {purchases.map(purchase => (
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
                to={path.product + `/${generateNameId(purchase.product)}`}
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
