import { server } from '@test/nstore.mock'
import { NStoreClient } from '@src/nstore-client'
import { TOKEN } from '@test/utils'
import '@blackglory/jest-matchers'
import 'jest-extended'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('NStoreClient', () => {
  test(`
    set(namespace: string, id: bigint, payload: string): Promise<void>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 1n
    const doc = 'message'

    const result = client.set(namespace, id, doc)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test(`
    setJSON(namespace: string, id: bigint, payload: Json): Promise<void>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 1n
    const doc = { message: 'message' }

    const result = client.setJSON(namespace, id, doc)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test(`
    setCSV<T extends object>(
      namespace: string
    , id: bigint
    , payload: T[]
    ): Promise<void>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 1n
    const doc = [{ message: 'message' }]

    const result = client.setCSV(namespace, id, doc)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('has(namespace, string, id: bigint): Promise<boolean>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 1n

    const result = client.has(namespace, id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeTrue()
  })

  test(`
    get(
      namespace: string
    , id: bigint
    ): Promise<{ revision: string; payload: string }>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.get(namespace, 1n)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      revision: 'revision'
    , payload: 'text'
    })
  })

  test(`
    getJSON(
      namespace: string
    , id: string
    ): Promise<{ revision: string; payload: Json }>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.getJSON(namespace, 2n)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      revision: 'revision'
    , payload: { 'hello': 'world' }
    })
  })

  test(`
    getCSV<T extends object>(
      namespace: string
    , id: string
    ): Promise<{ revision: string; payload: T[] }>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.getCSV(namespace, 3n)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      revision: 'revision'
    , payload: [
        { key: 'hello', value: 'world' }
      ]
    })
  })

  test('getAllItemIds(namespace: string): Promise<bigint[]>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.getAllItemIds(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual([1n])
  })

  test('getAllNamespaces(): Promise<string[]>', async () => {
    const client = createClient()

    const result = client.getAllNamespaces()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['namespace'])
  })

  test('del(namespace: string, id: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 1n

    const result = client.del(namespace, id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('clear(namespace: string): Prmise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.clear(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test(`
    stats(namespace: string): Promise<{ namespace: string; items: number }>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.stats(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      namespace
    , items: 1
    })
  })
})

function createClient() {
  return new NStoreClient({
    server: 'http://localhost'
  , token: TOKEN
  })
}
