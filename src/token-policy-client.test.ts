import * as token_policy_client from "@src/token-policy-client"

// @ponicode
describe("getNamespaces", () => {
    let inst: any

    beforeEach(() => {
        inst = new token_policy_client.TokenPolicyClient({ server: "UPDATE Projects SET pname = %s WHERE pid = %s", adminPassword: "accessdenied4u", keepalive: true, timeout: 0.0005 })
    })

    test("0", async () => {
        await inst.getNamespaces({})
    })

    test("1", async () => {
        await inst.getNamespaces(undefined)
    })
})

// @ponicode
describe("get", () => {
    let inst: any

    beforeEach(() => {
        inst = new token_policy_client.TokenPolicyClient({ server: "DELETE FROM Projects WHERE pid = %s", adminPassword: "accessdenied4u", keepalive: true, timeout: 5.0 })
    })

    test("0", async () => {
        await inst.get("Anas", {})
    })

    test("1", async () => {
        await inst.get("Edmond", {})
    })

    test("2", async () => {
        await inst.get("Pierre Edouard", {})
    })

    test("3", async () => {
        await inst.get("George", {})
    })

    test("4", async () => {
        await inst.get("Jean-Philippe", {})
    })

    test("5", async () => {
        await inst.get("", undefined)
    })
})

// @ponicode
describe("setWriteTokenRequired", () => {
    let inst: any

    beforeEach(() => {
        inst = new token_policy_client.TokenPolicyClient({ server: "DELETE FROM Projects WHERE pid = %s", adminPassword: "NoWiFi4you", keepalive: false, timeout: 150 })
    })

    test("0", async () => {
        await inst.setWriteTokenRequired("Edmond", false, {})
    })

    test("1", async () => {
        await inst.setWriteTokenRequired("Pierre Edouard", true, {})
    })

    test("2", async () => {
        await inst.setWriteTokenRequired("Jean-Philippe", true, {})
    })

    test("3", async () => {
        await inst.setWriteTokenRequired("Anas", false, {})
    })

    test("4", async () => {
        await inst.setWriteTokenRequired("Michael", true, {})
    })

    test("5", async () => {
        await inst.setWriteTokenRequired("", true, undefined)
    })
})

// @ponicode
describe("removeWriteTokenRequired", () => {
    let inst: any

    beforeEach(() => {
        inst = new token_policy_client.TokenPolicyClient({ server: "SELECT * FROM Movies WHERE Title=’Jurassic Park’ AND Director='Steven Spielberg';", adminPassword: "!Lov3MyPianoPony", keepalive: false, timeout: 15 })
    })

    test("0", async () => {
        await inst.removeWriteTokenRequired("Pierre Edouard", {})
    })

    test("1", async () => {
        await inst.removeWriteTokenRequired("Michael", {})
    })

    test("2", async () => {
        await inst.removeWriteTokenRequired("Anas", {})
    })

    test("3", async () => {
        await inst.removeWriteTokenRequired("George", {})
    })

    test("4", async () => {
        await inst.removeWriteTokenRequired("Edmond", {})
    })

    test("5", async () => {
        await inst.removeWriteTokenRequired("", undefined)
    })
})

// @ponicode
describe("setReadTokenRequired", () => {
    let inst: any

    beforeEach(() => {
        inst = new token_policy_client.TokenPolicyClient({ server: "UPDATE Projects SET pname = %s WHERE pid = %s", adminPassword: "YouarenotAllowed2Use", keepalive: true, timeout: 0.0001 })
    })

    test("0", async () => {
        await inst.setReadTokenRequired("Pierre Edouard", true, {})
    })

    test("1", async () => {
        await inst.setReadTokenRequired("Michael", false, {})
    })

    test("2", async () => {
        await inst.setReadTokenRequired("Edmond", false, {})
    })

    test("3", async () => {
        await inst.setReadTokenRequired("Jean-Philippe", true, {})
    })

    test("4", async () => {
        await inst.setReadTokenRequired("Michael", true, {})
    })

    test("5", async () => {
        await inst.setReadTokenRequired("", false, undefined)
    })
})

// @ponicode
describe("removeReadTokenRequired", () => {
    let inst: any

    beforeEach(() => {
        inst = new token_policy_client.TokenPolicyClient({ server: "SELECT * FROM Movies WHERE Title=’Jurassic Park’ AND Director='Steven Spielberg';", adminPassword: "$p3onyycat", keepalive: false, timeout: 3 })
    })

    test("0", async () => {
        await inst.removeReadTokenRequired("Jean-Philippe", {})
    })

    test("1", async () => {
        await inst.removeReadTokenRequired("Pierre Edouard", {})
    })

    test("2", async () => {
        await inst.removeReadTokenRequired("Anas", {})
    })

    test("3", async () => {
        await inst.removeReadTokenRequired("Michael", {})
    })

    test("4", async () => {
        await inst.removeReadTokenRequired("George", {})
    })

    test("5", async () => {
        await inst.removeReadTokenRequired("", undefined)
    })
})

// @ponicode
describe("setDeleteTokenRequired", () => {
    let inst: any

    beforeEach(() => {
        inst = new token_policy_client.TokenPolicyClient({ server: "DELETE FROM Projects WHERE pid = %s", adminPassword: "NoWiFi4you", keepalive: true, timeout: 0.05 })
    })

    test("0", async () => {
        await inst.setDeleteTokenRequired("Anas", true, {})
    })

    test("1", async () => {
        await inst.setDeleteTokenRequired("Pierre Edouard", true, {})
    })

    test("2", async () => {
        await inst.setDeleteTokenRequired("Edmond", false, {})
    })

    test("3", async () => {
        await inst.setDeleteTokenRequired("Anas", false, {})
    })

    test("4", async () => {
        await inst.setDeleteTokenRequired("Pierre Edouard", false, {})
    })

    test("5", async () => {
        await inst.setDeleteTokenRequired("", true, undefined)
    })
})

// @ponicode
describe("removeDeleteTokenRequired", () => {
    let inst: any

    beforeEach(() => {
        inst = new token_policy_client.TokenPolicyClient({ server: "UPDATE Projects SET pname = %s WHERE pid = %s", adminPassword: "accessdenied4u", keepalive: true, timeout: 60 })
    })

    test("0", async () => {
        await inst.removeDeleteTokenRequired("Anas", {})
    })

    test("1", async () => {
        await inst.removeDeleteTokenRequired("Michael", {})
    })

    test("2", async () => {
        await inst.removeDeleteTokenRequired("Pierre Edouard", {})
    })

    test("3", async () => {
        await inst.removeDeleteTokenRequired("George", {})
    })

    test("4", async () => {
        await inst.removeDeleteTokenRequired("Jean-Philippe", {})
    })

    test("5", async () => {
        await inst.removeDeleteTokenRequired("", undefined)
    })
})
