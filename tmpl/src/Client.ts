import {
  AbstractClient,
  ClientInterface,
  VerifyConfigurationResult,
} from "codeclimate-collector-sdk"

export class Client extends AbstractClient implements ClientInterface {
  verifyConfiguration(): Promise<VerifyConfigurationResult> {
    this.logger.debug("TODO - implement verifyConfiguration")
    return Promise.resolve({ isValid: true })
  }

  syncStream(streamId: string | null, earliestDataCutoff: Date): Promise<void> {
    this.logger.debug(`TODO - implement syncStream. Got ${streamId}, ${earliestDataCutoff}`)
    return Promise.resolve()
  }
}
