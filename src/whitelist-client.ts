import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { pathname } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import { INStoreManagerRequestOptions, NStoreManagerBase } from './utils'

export class WhitelistClient extends NStoreManagerBase {
  async getNamespaces(options: INStoreManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/admin/whitelist')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async add(namespace: string, options: INStoreManagerRequestOptions = {}): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/whitelist/${namespace}`)
    )

    await fetch(req).then(ok)
  }

  async remove(namespace: string, options: INStoreManagerRequestOptions = {}): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/whitelist/${namespace}`)
    )

    await fetch(req).then(ok)
  }
}
