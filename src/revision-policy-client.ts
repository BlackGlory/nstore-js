import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { pathname, json } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import { INStoreManagerRequestOptions, NStoreManagerBase } from './utils'

interface IRevisionPolicy {
  updateRevisionRequired: boolean | null
  deleteRevisionRequired: boolean | null
}

export class RevisionPolicyClient extends NStoreManagerBase {
  async getNamespaces(options: INStoreManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/admin/nstore-with-revision-policies')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async get(
    namespace: string
  , options: INStoreManagerRequestOptions = {}
  ): Promise<IRevisionPolicy> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/nstore/${namespace}/revision-policies`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as IRevisionPolicy
  }

  async setUpdateRevisionRequired(
    namespace: string
  , val: boolean
  , options: INStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/nstore/${namespace}/revision-policies/update-revision-required`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeUpdateRevisionRequired(
    namespace: string
  , options: INStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/nstore/${namespace}/revision-policies/update-revision-required`)
    )

    await fetch(req).then(ok)
  }

  async setDeleteRevisionRequired(
    namespace: string
  , val: boolean
  , options: INStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/nstore/${namespace}/revision-policies/delete-revision-required`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeDeleteRevisionRequired(
    namespace: string
  , options: INStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/nstore/${namespace}/revision-policies/delete-revision-required`)
    )

    await fetch(req).then(ok)
  }
}
