import { useEffect, useState } from 'react';
import {Product} from '../interface/product'

function useFilterPro(searchTerm: any, list: any) {
      const [listBySearchTerm, setListBySearchTerm] = useState<Product[]>([])
      useEffect(() => {
            async function handleSearchTerm() {
                  const result = list.filter((item: { [x: string]: { toString: () => string; }; }) => {
                        return Object.keys(item).some(key =>
                              item[key]?.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
                        )
                  })
                  setListBySearchTerm(result);
            }
            handleSearchTerm()
      }, [list, searchTerm])
      return listBySearchTerm
}

export default useFilterPro;