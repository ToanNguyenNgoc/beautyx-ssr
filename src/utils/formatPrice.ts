

export default function formatPrice(num: any) {
      return parseInt(num)?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
export const formatSalePriceService = (special_price: number, special_price_momo: number) => {
      let sale = 0;
      if (special_price_momo > 0) {
            return sale = special_price_momo
      }
      else if (special_price > 0) {
            return sale = special_price
      }
      return sale
}