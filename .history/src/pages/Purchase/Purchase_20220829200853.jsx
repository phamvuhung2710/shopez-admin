import React, { useState } from 'react'
import { formatMoney } from '../../utils/helper'
import * as S from './purchase.style'

const purchaseStatus = {
  all: -1,
  processing: 0,
  cancel: 1,
  confirm: 2
}

function Purchase(props) {
  const [purchases, setPurchases] = useState([])

  return (
    <div className="mt-[120px] mb-[120px] mx-auto">
      <S.PurchaseTabs>
        <S.PurchaseTabItem>Tất cả</S.PurchaseTabItem>
        <S.PurchaseTabItem>Đang xử lí</S.PurchaseTabItem>
        <S.PurchaseTabItem>Đã xác nhận</S.PurchaseTabItem>
        <S.PurchaseTabItem>Đã hủy</S.PurchaseTabItem>
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
