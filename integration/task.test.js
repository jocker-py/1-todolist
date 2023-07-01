describe("editableSpan", () => {
  const host = "http://localhost:9009/";
  const frameId = "iframe.html?id=";

  it("task done, visually looks correct", async () => {
    const path = "todolists-task--task-is-done";
    // APIs from jest-puppeteer
    await page.goto(host + frameId + path, { waitUntil: "networkidle2" });
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });

  it("task is not done, visually looks correct", async () => {
    // APIs from jest-puppeteer
    const path = "todolists-task--task-is-not-done";
    await page.goto(host + frameId + path, { waitUntil: "networkidle2" });
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});
