export const salesQuery = `query MyQuery {
    sales(limit: 5) {
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
