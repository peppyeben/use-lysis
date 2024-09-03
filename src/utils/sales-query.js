// sales(limit: 3000, orderBy: timestamp_DESC_NULLS_LAST) {
export const salesQuery = `query MyQuery {
    sales(orderBy: timestamp_ASC_NULLS_LAST) {
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

//   nameRegisteredEvents(limit: 20, orderBy: timestamp_DESC_NULLS_LAST) {
export const nameQuery = `
  query MyQuery {
  nameRegisteredEvents(orderBy: timestamp_ASC_NULLS_LAST) {
    id
    expires
    label
    name
    owner
    timestamp
  }
}
  `;

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
