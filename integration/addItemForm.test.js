describe("addItemForm", () => {
  const host = "http://localhost:9009/";
  const frameId = "iframe.html?id=";
  const path = "todolists-additemform--add-item-form-story";
  it("addItemForm, visually looks correct", async () => {
    // APIs from jest-puppeteer
    await page.goto(host + frameId + path, { waitUntil: "networkidle2" });
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});
