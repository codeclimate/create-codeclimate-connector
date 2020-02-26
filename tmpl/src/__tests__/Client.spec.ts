import { buildFakeManager, buildFakeLogger } from "codeclimate-collector-sdk/lib/TestHelpers"

import { Client } from "../Client"

describe(Client, () => {
  describe("verifyConfiguration", () => {
    test.skip("says valid config is valid", () => {
      const client = new Client(
        new Map([
          // TODO - your config keys go here
        ]),
        buildFakeManager(),
        buildFakeLogger(),
      )

      return client.verifyConfiguration().then((result) => {
        expect(result.isValid).toBe(true)
      })
    })

    test.skip("says invalid config invalid, with errors", () => {
      const client = new Client(
        new Map(),
        buildFakeManager(),
        buildFakeLogger(),
      )

      return client.verifyConfiguration().then((result) => {
        expect(result.isValid).toBe(false)
        expect(result.errorMessages).toBeDefined()
        expect(result.errorMessages!.length).toBeGreaterThan(0)
      })
    })
  })

  describe("syncStream", () => {
    test.skip("it syncs", () => {
      const client = new Client(
        new Map([
          // TODO - your config keys go here
        ]),
        buildFakeManager(),
        buildFakeLogger(),
      )

      const streamId = "test-stream-id"
      const dateCutoff = new Date(new Date().valueOf() - 1_000_000)

      return client.syncStream(streamId, dateCutoff).then((_result) => {
        // TODO - check that `client.manager.sentMessages` contains what you
        // expect
      })
    })
  })
})
