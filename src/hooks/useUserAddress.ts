import userAddressApi from "api/userAddressApi";
import { AxiosError, AxiosResponse } from "axios";
import { IUserAddress } from "interface";
import { useState } from "react";
import useSWR from "swr"

export interface ContextAddress {
  context: IUserAddress[],
  updated_at?: string
}

export type AddressType = {
  latitude?: string;
  longitude?: string;
  address?: string;
  is_default?: boolean;
}
export type PostAddress = {
  body: AddressType;
  cb?: (data: AddressType) => void;
  onError?: (error: AxiosError) => void
}
export type DeletePost = Omit<PostAddress, 'body'> & {
  id: number | string;
}
export type UpdatePost = Omit<PostAddress, 'body'> & {
  id: number | string;
  body?: AddressType
}

export function useUserAddress() {
  const [load, setLoad] = useState({ create: false, delete: false, update: false })
  const { data, mutate, isValidating } = useSWR('useraddresses?limit=15&page=1', {
    revalidateOnFocus: false
  })
  const addresses: IUserAddress[] = data?.data?.context ?? []
  const postAddress = async ({ body, cb, onError }: PostAddress) => {
    setLoad({ ...load, create: true })
    try {
      const response = await userAddressApi.postAddress(body)
      const newAddress = response.data.context
      addresses[addresses.findIndex(i => i.is_default === true)].is_default = false
      const mutateData: AxiosResponse<ContextAddress> = {
        ...data,
        data: {
          context: [...addresses, newAddress]
        }
      }
      mutate(mutateData, false)
      if (cb) cb(newAddress)
      setLoad({ ...load, create: false })
    } catch (error) {
      setLoad({ ...load, create: false })
      const err = error as AxiosError
      if (onError) { onError(err) }
    }
  }
  const deleteAddress = async ({ id, cb, onError }: DeletePost) => {
    setLoad({ ...load, delete: true })
    try {
      await userAddressApi.deleteAddress(id)
      const mutateData: AxiosResponse<ContextAddress> = {
        ...data,
        data: {
          context: addresses.filter(i => i.id !== id)
        }
      }
      mutate(mutateData, false)
      if (cb) cb(data)
      setLoad({ ...load, delete: false })
    } catch (error) {
      setLoad({ ...load, delete: false })
      const err = error as AxiosError
      if (onError) { onError(err) }
    }
  }
  const updateAddress = async ({ id, body, cb, onError }: UpdatePost) => {
    try {
      const response = await userAddressApi.updateAddress({
        id: id,
        address: body?.address
      })
      if (body?.is_default === true) {
        addresses[addresses.findIndex(i => i.is_default === true)].is_default = false
      }
      addresses[addresses.findIndex(i => i.id === id)] = {
        ...addresses[addresses.findIndex(i => i.id === id)],
        ...body
      }
      const mutateData: AxiosResponse<ContextAddress> = {
        ...data,
        data: {
          context: addresses,
          updated_at: response.data?.context?.updated_at
        }
      }
      mutate(mutateData, false)
    } catch (error) {
      const err = error as AxiosError
      if (onError) { onError(err) }
    }
  }
  return {
    isValidating,
    load,
    addresses,
    postAddress,
    deleteAddress,
    updateAddress,
  }
}