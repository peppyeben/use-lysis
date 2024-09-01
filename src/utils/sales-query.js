export const salesQuery = `query MyQuery {
    sales(limit: 3000, orderBy: timestamp_DESC_NULLS_LAST) {
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

// export const customSalesQuery = () => {
//     return `query MyQuery {
//     sales(limit: 100, orderBy: timestamp_DESC_NULLS_LAST) {
//       buyer
//       id
//       isERC721
//       paymentCoin
//       salePrice
//       seller
//       timestamp
//       tokenAddress
//       tokenId
//     }
//   }`;
// };
