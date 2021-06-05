import "../testing";
import { UserFactory } from "./user.factory";

describe("UserEntity", () => {
  it("factory", async () => {
    expect(await UserFactory.create()).toBeDefined();
  });
});
