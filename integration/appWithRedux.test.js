describe("appWithRedux", () => {
  const host = "http://localhost:9009/";
  const frameId = "iframe.html?id=";
  const path = "todolists-appwithredux--app-with-redux-story";
  it("appWithRedux, visually looks correct", async () => {
    // APIs from jest-puppeteer
    await page.goto(host + frameId + path, { waitUntil: "networkidle2" });
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});
