import { server } from '@test/revision-policy.mock'
import { RevisionPolicyClient } from '@src/revision-policy-client'
import { ADMIN_PASSWORD } from '@test/utils'
import '@blackglory/jest-matchers'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('RevisionPolicyClient', () => {
  it('getNamespaces(): Promise<string[]>', async () => {
    const client = createClient()

    const result = client.getNamespaces()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['namespace'])
  })

  it(`
    get(namespace: string): Promise<{
      updateRevisionRequired: boolean | null
      deleteRevisionRequired: boolean | null
    }>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.get(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      updateRevisionRequired: true
    , deleteRevisionRequired: false
    })
  })

  it('setUpdateRevisionRequired(namespace: string, val: boolean): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const val = true

    const result = client.setUpdateRevisionRequired(namespace, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeUpdateRevisionRequired(namespace: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.removeUpdateRevisionRequired(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('setDeleteRevisionRequired(namespace: string, val: boolean): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const val = true

    const result = client.setDeleteRevisionRequired(namespace, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeDeleteRevisionRequired(namespace: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.removeDeleteRevisionRequired(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })
})

function createClient() {
  return new RevisionPolicyClient({
    server: 'http://localhost'
  , adminPassword: ADMIN_PASSWORD
  })
}
