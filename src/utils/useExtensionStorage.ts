import { storage } from 'webextension-polyfill'
import type { RemovableRef, StorageLikeAsync, UseStorageAsyncOptions } from '@vueuse/core'
import type { MaybeRef } from 'vue'
import { useStorageAsync } from '@vueuse/core'

const storageLocal: StorageLikeAsync = {
  removeItem(key: string) {
    return storage.local.remove(key)
  },

  setItem(key: string, value: string) {
    return storage.local.set({ [key]: value })
  },

  async getItem(key: string): Promise<string | null> {
    const item = (await storage.local.get(key))[key]
    return item === undefined ? null : String(item)
  },
}

export const useExtensionStorage = <T>(
  key: string,
  initialValue: MaybeRef<T>,
  options?: UseStorageAsyncOptions<T>,
): RemovableRef<T> => useStorageAsync(key, initialValue, storageLocal, options)
