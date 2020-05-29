import { StripeOptions } from 'nestjs-stripe'
import { registerAs } from '@nestjs/config'

const config: StripeOptions = {
  apiKey: process.env.STRIPE_KEY!,
  apiVersion: '2020-03-02',
}

export default registerAs('stripe', () => config)
