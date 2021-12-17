import { fetch } from 'extra-fetch'
import { head, put, get, del, IHTTPOptionsTransformer } from 'extra-request'
import { url, pathname, json, text, csv, searchParams, signal, basicAuth, keepalive }
  from 'extra-request/transformers/index.js'
import { NotFound } from '@blackglory/http-status'
import { ok, toJSON, toCSV, toText } from 'extra-response'
import { timeoutSignal, raceAbortSignals } from 'extra-abort'
import { Falsy } from 'justypes'

export { HTTPClientError } from '@blackglory/http-status'

interface IItem<T> {
  revision: string
  payload: T
}

interface IInfo {
  namespace: string
  items: number
}

export enum Mode {
  Exact = 'exact'
, Ceiling = 'ceiling'
, Floor = 'floor'
, Nearest = 'nearest'
, Lower = 'lower'
, Higher = 'higher'
}

export interface INStoreClientOptions {
  server: string
  token?: string
  basicAuth?: {
    username: string
    password: string
  }
  keepalive?: boolean
  timeout?: number
}

export interface INStoreClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
  timeout?: number | false
}

export interface INStoreClientRequestOptionsWithRevision extends INStoreClientRequestOptions {
  revision?: string
}

export interface INStoreClientRequestOptionsWithoutToken {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

export class NStoreClient {
  constructor(private options: INStoreClientOptions) {}

  private getCommonTransformers(
    options: INStoreClientRequestOptions | INStoreClientRequestOptionsWithoutToken
  ): Array<IHTTPOptionsTransformer | Falsy> {
    const token = 'token' in options
                  ? (options.token ?? this.options.token)
                  : this.options.token
    const auth = this.options.basicAuth

    return [
      url(this.options.server)
    , auth && basicAuth(auth.username, auth.password)
    , token && searchParams({ token })
    , signal(raceAbortSignals([
        options.signal
      , options.timeout !== false && (
          (options.timeout && timeoutSignal(options.timeout)) ??
          (this.options.timeout && timeoutSignal(this.options.timeout))
        )
      ]))
    , keepalive(options.keepalive ?? this.options.keepalive)
    ]
  }

  /**
   * @throws {AbortError}
   */
  async set(
    namespace: string
  , id: bigint
  , payload: string
  , options: INStoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/nstore/${namespace}/items/${id}`)
    , text(payload)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async setJSON<T>(
    namespace: string
  , id: bigint
  , payload: T
  , options: INStoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/nstore/${namespace}/items/${id}`)
    , json(payload)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async setCSV<T extends object>(
    namespace: string
  , id: bigint
  , payload: T[]
  , options: INStoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/nstore/${namespace}/items/${id}`)
    , csv(payload)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async has(
    namespace: string
  , id: bigint
  , mode: Mode = Mode.Exact
  , options: INStoreClientRequestOptionsWithRevision = {}
  ): Promise<boolean> {
    const req = head(
      ...this.getCommonTransformers(options)
    , pathname(`/nstore/${namespace}/items/${id}`)
    , searchParams({ mode })
    )

    try {
      await fetch(req).then(ok)
      return true
    } catch (e) {
      if (e instanceof NotFound) return false
      throw e
    }
  }

  /**
   * @throws {AbortError}
   */
  async get(
    namespace: string
  , id: bigint
  , mode?: Mode
  , options?: INStoreClientRequestOptionsWithRevision
  ): Promise<IItem<string> | undefined> {
    try {
      return await this._get(namespace, id, mode, options).then(async res => ({
        revision: res.headers.get('ETag')!
      , payload: await toText(res)
      }))
    } catch (e) {
      if (e instanceof NotFound) return undefined
      throw e
    }
  }

  /**
   * @throws {AbortError}
   */
  async getJSON<T>(
    namespace: string
  , id: bigint
  , mode?: Mode
  , options?: INStoreClientRequestOptionsWithRevision
  ): Promise<IItem<T> | undefined> {
    try {
      return await this._get(namespace, id, mode, options).then(async res => ({
        revision: res.headers.get('ETag')!
      , payload: await toJSON(res)
      }))
    } catch (e) {
      if (e instanceof NotFound) return undefined
      throw e
    }
  }

  /**
   * @throws {AbortError}
   */
  async getCSV<T extends object>(
    namespace: string
  , id: bigint
  , mode?: Mode
  , options?: INStoreClientRequestOptionsWithRevision
  ): Promise<IItem<T[]> | undefined> {
    try {
      return await this._get(namespace, id, mode, options).then(async res => ({
        revision: res.headers.get('ETag')!
      , payload: await toCSV(res) as T[]
      }))
    } catch (e) {
      if (e instanceof NotFound) return undefined
      throw e
    }
  }

  /**
   * @throws {NotFound}
   * @throws {AbortError}
   */
  private async _get(
    namespace: string
  , id: bigint
  , mode: Mode = Mode.Exact
  , options: INStoreClientRequestOptionsWithRevision = {}
  ): Promise<Response> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/nstore/${namespace}/items/${id}`)
    , searchParams({ mode })
    )

    return await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async del(
    namespace: string
  , id: bigint
  , options: INStoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/nstore/${namespace}/items/${id}`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async clear(
    namespace: string
  , options: INStoreClientRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/nstore/${namespace}`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async stats(
    namespace: string
  , options: INStoreClientRequestOptionsWithoutToken = {}
  ): Promise<IInfo> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/nstore/${namespace}/stats`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as IInfo
  }

  /**
   * @throws {AbortError}
   */
  async getAllItemIds(
    namespace: string
  , options: INStoreClientRequestOptions = {}
  ): Promise<bigint[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/nstore/${namespace}/items`)
    )

    const data = await fetch(req)
      .then(ok)
      .then(toJSON) as string[]

    return data.map(x => BigInt(x))
  }

  /**
   * @throws {AbortError}
   */
  async getAllNamespaces(
    options: INStoreClientRequestOptionsWithoutToken = {}
  ): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/nstore')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }
}
