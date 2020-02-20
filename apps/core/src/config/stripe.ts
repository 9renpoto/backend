import { StripeOptions } from 'nestjs-stripe'
import { registerAs } from '@nestjs/config'

const config: StripeOptions = {
  apiKey: process.env.STRIPE_KEY!
}

export default registerAs('stripe', () => config)
