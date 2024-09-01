export const viewOnBaseScan = (address) => {
    window.open(`${process.env.VUE_APP_BASESCAN_URL}/${address}`, "_blank");
};
