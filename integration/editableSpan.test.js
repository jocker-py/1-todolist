describe("editableSpan", () => {
  const host = "http://localhost:9009/";
  const frameId = "iframe.html?id=";
  const path = "todolists-editablespan--editable-span-story";

  it("editableSpan, visually looks correct", async () => {
    // APIs from jest-puppeteer
    await page.goto(host + frameId + path, { waitUntil: "networkidle2" });
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});
