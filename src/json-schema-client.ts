import { fetch } from 'extra-fetch'
import { Json } from 'justypes'
import { get, put, del } from 'extra-request'
import { pathname, json } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import { INStoreManagerRequestOptions, NStoreManagerBase } from './utils'

export class JsonSchemaClient extends NStoreManagerBase {
  async getNamespaces(options: INStoreManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/admin/nstore-with-json-schema')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async get(namespace: string, options: INStoreManagerRequestOptions = {}): Promise<unknown> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/nstore/${namespace}/json-schema`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON)
  }

  async set(
    namespace: string
  , schema: Json
  , options: INStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/nstore/${namespace}/json-schema`)
    , json(schema)
    )

    await fetch(req).then(ok)
  }

  async remove(
    namespace: string
  , options: INStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/nstore/${namespace}/json-schema`)
    )

    await fetch(req).then(ok)
  }
}
