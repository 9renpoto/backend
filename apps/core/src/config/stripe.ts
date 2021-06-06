import { registerAs } from "@nestjs/config";
import { StripeOptions } from "nestjs-stripe";

const config: StripeOptions = {
  apiKey: process.env.STRIPE_KEY!,
  apiVersion: "2020-08-27",
};

export default registerAs("stripe", () => config);
