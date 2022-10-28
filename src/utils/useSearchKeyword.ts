import { useEffect, useState } from 'react';

export function useSearchKeyword(keyword: string, list: any[]) {
      const [listBySearch, setListBySearch] = useState<any[]>([])
      useEffect(() => {
            function handleSearchTerm() {
                  const result = list?.filter((item: { [x: string]: { toString: () => string; }; }) => {
                        return Object.keys(item).some(key =>
                              item[key]?.toString().toLowerCase().includes(keyword.toString().toLowerCase())
                        )
                  })
                  setListBySearch(result);
            }
            handleSearchTerm()
      }, [list, keyword])
      return listBySearch
}