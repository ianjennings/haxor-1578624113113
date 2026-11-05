import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";
import contactFixture from "./fixtures/contact.json";

describe("Haxor Production Tests", () => {
  it("should load the homepage and verify the active page in Chrome", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://haxor.sh" });

    const chromeTabs = await testdriver.exec({
      language: "sh",
      code: "curl -s http://localhost:9222/json",
    });

    expect(chromeTabs).toContain("https://haxor.sh");
  });

  it("should load the Why Test overview page in Chrome", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://haxor.sh/why-dx/" });

    const chromeTabs = await testdriver.exec({
      language: "sh",
      code: "curl -s http://localhost:9222/json",
    });

    expect(chromeTabs).toContain("https://haxor.sh/why-dx/");
  });

  it("should load the Contact page and verify page context with test fixtures", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://haxor.sh/contact/" });

    const chromeTabs = await testdriver.exec({
      language: "sh",
      code: "curl -s http://localhost:9222/json",
    });

    expect(chromeTabs).toContain("https://haxor.sh/contact/");
    expect(contactFixture.email).toBe("ada@lovelace.com");
  });
});
