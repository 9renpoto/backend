import { StripeOptions } from 'nestjs-stripe'

const config: StripeOptions = {
  apiKey: process.env.STRIPE_KEY!
}

export default config
