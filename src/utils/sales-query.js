export const salesQuery = `query MyQuery {
    sales(limit: 1) {
      buyer
      id
      isERC721
      paymentCoin
      salePrice
      seller
      timestamp
      tokenAddress
      tokenId
    }
  }`;
