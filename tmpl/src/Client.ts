import {
  AbstractClient,
  ClientInterface,
  Stream,
  VerifyConfigurationResult,
} from "codeclimate-connector-sdk"

export class Client extends AbstractClient implements ClientInterface {
  verifyConfiguration(): Promise<VerifyConfigurationResult> {
    this.logger.debug("TODO - implement verifyConfiguration")
    return Promise.resolve({ isValid: true })
  }

  discoverStreams(): Promise<void> {
    this.logger.debug(`TODO - implement discoverStreams.`)
    return Promise.resolve()
  }

  syncStream(stream: Stream, earliestDataCutoff: Date): Promise<void> {
    this.logger.debug(`TODO - implement syncStream. Got ${stream.id}, ${earliestDataCutoff}`)
    return Promise.resolve()
  }
}
