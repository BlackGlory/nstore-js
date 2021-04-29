# nstore-js

## Install

```sh
npm install --save @blackglory/nstore-js
# or
yarn add @blackglory/nstore-js
```

## API

### NStoreClient

```ts
new NStoreClient({
  server: string
, token?: string
, basicAuth?: {
    username: string
  , password: string
  }
, keepalive?: boolean
})
```

```ts
interface INStoreClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
}

interface INStoreClientRequestOptionsWithRevision extends INStoreClientRequestOptions {
  revision?: string
}

interface INStoreClientRequestOptionsWithoutToken {
  signal?: AbortSignal
  keepalive?: boolean
}
```

#### set

```ts
NStoreClient#set(
  namespace: string
, id: string
, payload: string
, options?: INStoreClientRequestOptionsWithRevision
): Promise<void>
```

#### setJSON

```ts
NStoreClient#setJSON(
  namespace: string
, id: string
, payload: Json
, options?: INStoreClientRequestOptionsWithRevision
): Promise<void>
```

#### setCSV

```ts
NStoreClient#setJSON<T extends object>(
  namespace: string
, id: string
, payload: T[]
, options?: INStoreClientRequestOptionsWithRevision
): Promise<void>
```

#### has

```ts
NStoreClient#has(
  namespace: string
, id: string
, options?: INStoreClientRequestOptionsWithRevision
): Promise<boolean>
```

#### get

```ts
NStoreClient#get(
  namespace: string
, id: string
, options?: INStoreClientRequestOptionsWithRevision
): Promise<{
  revision: string
  payload: string
}>
```

#### getJSON

```ts
NStoreClient#getJSON(
  namespace: string
, id: string
, options?: INStoreClientRequestOptionsWithRevision
): Promise<{
  revision: string
  payload: Json
}>
```

#### getCSV

```ts
NStoreClient#getCSV<T extends object>(
  namespace: string
, id: string
, options?: INStoreClientRequestOptionsWithRevision
): Promise<{
  revision: string
  payload: T[]
}>
```

#### del

```ts
NStoreClient#del(
  namespace: string
, id: string
, options?: INStoreClientRequestOptionsWithRevision
): Promise<void>
```

#### clear

```ts
NStoreClient#clear(
  namespace: string
, options?: INStoreClientRequestOptions
): Promise<void>
```

#### getAllItemIds

```ts
NStoreClient#getAllItemIds(
  namespace: string
, options?: INStoreClientRequestOptions
): Promise<string[]>
```

#### getAllNamespaces

```ts
NStoreClient#getAllNamespaces(
  options?: INStoreClientRequestOptionsWithoutToken
): Promise<string[]>
```

#### stats

```ts
NStoreClient#stats(
  namespace: string
, options?: INStoreClientRequestOptionsWithoutToken
): Promise<<{
  id: string
  items: number
}>
```

### NStoreManager

```ts
new NStoreManager({
  server: string
  adminPassword: string
})
```

```ts
interface INStoreManagerRequestOptions {
  signal?: AbortSignal
}
```

#### JsonSchema

##### getNamespaces

```ts
NStoreManager#JsonSchema.getNamespaces(
  options?: INStoreManagerRequestOptions
): Promise<string[]>
```

##### get

```ts
NStoreManager#JsonSchema.get(namespace: string, options?: INStoreManagerRequestOptions): Promise<Json>
```

##### set

```ts
NStoreManager#JsonSchema.set(
  namespace: string
, schema: Json
, options?: INStoreManagerRequestOptions
): Promise<void>
```

##### remove

```ts
NStoreManager#JsonSchema.remove(
  namespace: string
, options?: INStoreManagerRequestOptions
): Promise<void>
```

#### RevisionPolicy

##### getNamespaces

```ts
NStoreManager#RevisionPolicy.getNamespaces(
  options?: INStoreManagerRequestOptions
): Promise<string[]>
```

##### get

```ts
NStoreManager#RevisionPolicy.get(
  namespace: string
, options?: INStoreManagerRequestOptions
): Promise<{
  updateRevisionRequired: boolean | null
  deleteRevisionRequired: boolean | null
}>
```

##### setUpdateRevisionRequired

```ts
NStoreManager#RevisionPolicy.setUpdateRevisionRequired(
  namespace: string
, val: boolean
, options?: INStoreManagerRequestOptions
): Promise<void>
```

##### removeUpdateRevisionRequired

```ts
NStoreManager#RevisionPolicy.removeUpdateRevisionRequired(
  namespace: string
, options?: INStoreManagerRequestOptions
): Promise<void>
```

##### setDeleteRevisionRequired

```ts
NStoreManager#RevisionPolicy.setDeleteRevisionRequired(
  namespace: string
, val: boolean
, options?: INStoreManagerRequestOptions
): Promise<void>
```

##### removeDeleteRevisionRequired

```ts
NStoreManager#RevisionPolicy.removeDeleteRevisionRequired(
  namespace: string
, options?: INStoreManagerRequestOptions
): Promise<void>
```

#### Blacklist

##### getNamespaces

```ts
NStoreManager#Blacklist.getNamespaces(
  options?: INStoreManagerRequestOptions
): Promise<string[]>
```

##### add

```ts
NStoreManager#Blacklist.add(
  namespace: string
, options?: INStoreManagerRequestOptions
): Promise<void>
```

##### remove

```ts
NStoreManager#Blacklist.remove(
  namespace: string
, options?: INStoreManagerRequestOptions
): Promise<void>
```

#### Whitelist

##### getNamespaces

```ts
NStoreManager#Whitelist.getNamespaces(
  options?: INStoreManagerRequestOptions
): Promise<string[]>
```

##### add

```ts
NStoreManager#Whitelist.add(
  namespace: string
, options?: INStoreManagerRequestOptions
): Promise<void>
```

##### remove

```ts
NStoreManager#Whitelist.remove(
  namespace: string
, options?: INStoreManagerRequestOptions
): Promise<void>
```

#### TokenPolicy

##### getNamespaces

```ts
NStoreManager#TokenPolicy.getNamespaces(
  options?: INStoreManagerRequestOptions
): Promise<string[]>
```

##### get

```ts
NStoreManager#TokenPolicy.get(
  namespace: string
, options?: INStoreManagerRequestOptions
): Promise<{
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
  deleteTokenRequired: boolean | null
}>
```

##### setWriteTokenRequired

```ts
NStoreManager#TokenPolicy.setWriteTokenRequired(
  namespace: string
, val: boolean
, options?: INStoreManagerRequestOptions
): Promise<void>
```

##### removeWriteTokenRequired

```ts
NStoreManager#TokenPolicy.removeWriteTokenRequired(
  namespace: string
, options?: INStoreManagerRequestOptions
): Promise<void>
```

##### setReadTokenRequired


```ts
NStoreManager#TokenPolicy.setReadTokenRequired(
  namespace: string
, val: boolean
, options?: INStoreManagerRequestOptions
): Promise<void>
```

##### removeReadTokenRequired

```ts
NStoreManager#TokenPolicy.removeReadTokenRequired(
  namespace: string
, options?: INStoreManagerRequestOptions
): Promise<void>
```

##### setDeleteTokenRequired

```ts
NStoreManager#TokenPolicy.setDeleteTokenRequired(
  namespace: string
, val: boolean
, options?: INStoreManagerRequestOptions
): Promise<void>
```

##### removeDeleteTokenRequired

```ts
NStoreManager#TokenPolicy.removeDeleteTokenRequired(
  namespace: string
, options?: INStoreManagerRequestOptions
): Promise<void>
```

#### Token

##### getNamespaces

```ts
NStoreManager#Token.getNamespaces(options?: INStoreManagerRequestOptions): Promise<string[]>
```

##### getTokens

```ts
NStoreManager#Token.getTokens(
  namespace: string
, options?: INStoreManagerRequestOptions
): Promise<Array<{
  token: string
  write: boolean
  read: boolean
  delete: boolean
}>>
```

##### addWriteToken

```ts
NStoreManager#Token.addWriteToken(
  namespace: string
, token: string
, options?: INStoreManagerRequestOptions
): Promise<void>
```

##### removeWriteToken

```ts
NStoreManager#Token.removeWriteToken(
  namespace: string
, token: string
, options?: INStoreManagerRequestOptions
): Promise<void>
```

##### addReadToken

```ts
NStoreManager#Token.addReadToken(
  namespace: string
, token: string
, options?: INStoreManagerRequestOptions
): Promise<void>
```

##### removeReadToken

```ts
NStoreManager#Token.removeReadToken(
  namespace: string
, token: string
, options?: INStoreManagerRequestOptions
): Promise<void>
```

##### addDeleteToken

```ts
NStoreManager#Token.addDeleteToken(
  namespace: string
, token: string
, options?: INStoreManagerRequestOptions
): Promise<void>
```

##### removeDeleteToken

```ts
NStoreManager#Token.removeDeleteToken(
  namespace: string
, token: string
, options?: INStoreManagerRequestOptions
): Promise<void>
```
