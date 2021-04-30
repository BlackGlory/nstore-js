import { fetch } from 'extra-fetch'
import { head, put, get, del } from 'extra-request'
import { url, pathname, json, text, csv, searchParams, signal, basicAuth, keepalive } from 'extra-request/lib/es2018/transformers'
import { NotFound } from '@blackglory/http-status'
import { ok, toJSON, toCSV, toText } from 'extra-response'

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
}

export interface INStoreClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
}

export interface INStoreClientRequestOptionsWithRevision extends INStoreClientRequestOptions {
  revision?: string
}

export interface INStoreClientRequestOptionsWithoutToken {
  signal?: AbortSignal
  keepalive?: boolean
}

export class NStoreClient {
  constructor(private options: INStoreClientOptions) {}

  async set(
    namespace: string
  , id: bigint
  , payload: string
  , options: INStoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = put(
      url(this.options.server)
    , pathname(`/nstore/${namespace}/items/${toHex(id)}`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , text(payload)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  async setJSON<T>(
    namespace: string
  , id: bigint
  , payload: T
  , options: INStoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = put(
      url(this.options.server)
    , pathname(`/nstore/${namespace}/items/${toHex(id)}`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , json(payload)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  async setCSV<T extends object>(
    namespace: string
  , id: bigint
  , payload: T[]
  , options: INStoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = put(
      url(this.options.server)
    , pathname(`/nstore/${namespace}/items/${toHex(id)}`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , csv(payload)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  async has(
    namespace: string
  , id: bigint
  , mode: Mode = Mode.Exact
  , options: INStoreClientRequestOptionsWithRevision = {}
  ): Promise<boolean> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = head(
      url(this.options.server)
    , pathname(`/nstore/${namespace}/items/${toHex(id)}`)
    , searchParams({ mode })
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
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
   * @throws {NotFound}
   */
  get(
    namespace: string
  , id: bigint
  , mode?: Mode
  , options?: INStoreClientRequestOptionsWithRevision
  ): Promise<IItem<string>> {
    return this._get(namespace, id, mode, options).then(async res => ({
      revision: res.headers.get('ETag')!
    , payload: await toText(res)
    }))
  }

  /**
   * @throws {NotFound}
   */
  getJSON<T>(
    namespace: string
  , id: bigint
  , mode?: Mode
  , options?: INStoreClientRequestOptionsWithRevision
  ): Promise<IItem<T>> {
    return this._get(namespace, id, mode, options).then(async res => ({
      revision: res.headers.get('ETag')!
    , payload: await toJSON(res)
    }))
  }

  /**
   * @throws {NotFound}
   */
  getCSV<T extends object>(
    namespace: string
  , id: bigint
  , mode?: Mode
  , options?: INStoreClientRequestOptionsWithRevision
  ): Promise<IItem<T[]>> {
    return this._get(namespace, id, mode, options).then(async res => ({
      revision: res.headers.get('ETag')!
    , payload: await toCSV(res) as T[]
    }))
  }

  /**
   * @throws {NotFound}
   */
  private async _get(
    namespace: string
  , id: bigint
  , mode: Mode = Mode.Exact
  , options: INStoreClientRequestOptionsWithRevision = {}
  ): Promise<Response> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = get(
      url(this.options.server)
    , pathname(`/nstore/${namespace}/items/${toHex(id)}`)
    , searchParams({ mode })
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    return await fetch(req).then(ok)
  }

  async del(
    namespace: string
  , id: bigint
  , options: INStoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = del(
      url(this.options.server)
    , pathname(`/nstore/${namespace}/items/${toHex(id)}`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  async clear(
    namespace: string
  , options: INStoreClientRequestOptions = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = del(
      url(this.options.server)
    , pathname(`/nstore/${namespace}`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  async stats(
    namespace: string
  , options: INStoreClientRequestOptionsWithoutToken = {}
  ): Promise<IInfo> {
    const auth = this.options.basicAuth
    const req = get(
      url(this.options.server)
    , pathname(`/nstore/${namespace}/stats`)
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as IInfo
  }

  async getAllItemIds(
    namespace: string
  , options: INStoreClientRequestOptions = {}
  ): Promise<bigint[]> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = get(
      url(this.options.server)
    , pathname(`/nstore/${namespace}/items`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    const data = await fetch(req)
      .then(ok)
      .then(toJSON) as string[]

    return data.map(x => BigInt(x))
  }

  async getAllNamespaces(
    options: INStoreClientRequestOptionsWithoutToken = {}
  ): Promise<string[]> {
    const auth = this.options.basicAuth
    const req = get(
      url(this.options.server)
    , pathname('/nstore')
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }
}

function toHex(val: bigint): string {
  return '0x' + val.toString(16)
}
