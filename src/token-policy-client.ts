import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { pathname, json } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import { INStoreManagerRequestOptions, NStoreManagerBase } from './utils'

interface ITokenPolicy {
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
  deleteTokenRequired: boolean | null
}

  export class TokenPolicyClient extends NStoreManagerBase {
  async getNamespaces(options: INStoreManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/admin/nstore-with-token-policies')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async get(
    namespace: string
  , options: INStoreManagerRequestOptions = {}
  ): Promise<ITokenPolicy> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/nstore/${namespace}/token-policies`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as ITokenPolicy
  }

  async setWriteTokenRequired(
    namespace: string
  , val: boolean
  , options: INStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/nstore/${namespace}/token-policies/write-token-required`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeWriteTokenRequired(
    namespace: string
  , options: INStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/nstore/${namespace}/token-policies/write-token-required`)
    )

    await fetch(req).then(ok)
  }

  async setReadTokenRequired(
    namespace: string
  , val: boolean
  , options: INStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/nstore/${namespace}/token-policies/read-token-required`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeReadTokenRequired(
    namespace: string
  , options: INStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/nstore/${namespace}/token-policies/read-token-required`)
    )

    await fetch(req).then(ok)
  }

  async setDeleteTokenRequired(
    namespace: string
  , val: boolean
  , options: INStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/nstore/${namespace}/token-policies/delete-token-required`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeDeleteTokenRequired(
    namespace: string
  , options: INStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/nstore/${namespace}/token-policies/delete-token-required`)
    )

    await fetch(req).then(ok)
  }
}
