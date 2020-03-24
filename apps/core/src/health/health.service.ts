import {
  TerminusEndpoint,
  TerminusModuleOptions,
  TerminusOptionsFactory,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(
    private readonly typeOrmHealthIndicator: TypeOrmHealthIndicator
  ) {}

  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: '/health',
      healthIndicators: [
        async () =>
          this.typeOrmHealthIndicator.pingCheck('database', { timeout: 300 }),
      ],
    }
    return {
      endpoints: [healthEndpoint],
    }
  }
}
