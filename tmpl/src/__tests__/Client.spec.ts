import { Stream } from "codeclimate-connector-sdk"
import {
  buildFakeLogger,
  buildFakeRecordProducer,
  buildFakeStateManager,
} from "codeclimate-connector-sdk/lib/TestHelpers"

import { Client } from "../Client"

describe(Client, () => {
  describe("verifyConfiguration", () => {
    test.skip("says valid config is valid", () => {
      const client = new Client(
        new Map([
          // TODO - your config keys go here
        ]),
        buildFakeRecordProducer(),
        buildFakeStateManager(),
        buildFakeLogger(),
      )

      return client.verifyConfiguration().then((result) => {
        expect(result.isValid).toBe(true)
      })
    })

    test.skip("says invalid config invalid, with errors", () => {
      const client = new Client(
        new Map(),
        buildFakeRecordProducer(),
        buildFakeStateManager(),
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
        buildFakeRecordProducer(),
        buildFakeStateManager(),
        buildFakeLogger(),
      )

      const stream = new Stream({
        type: "Stream",
        attributes: {
          id: "your-id-here",
          self: "http://example.com/your-uri-here",
          name: "your-name-here",
        }
      })
      const dateCutoff = new Date(new Date().valueOf() - 1_000_000)

      return client.syncStream(stream, dateCutoff).then((_result) => {
        // TODO - check that `client.manager.sentMessages` contains what you
        // expect
      })
    })
  })
})
