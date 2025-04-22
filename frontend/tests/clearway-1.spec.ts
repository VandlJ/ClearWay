import { test, expect } from "@playwright/test";

test("Check if the page is loaded - Czech", async ({ page }) => {
  await page.goto("http://localhost:3000/cs");
  await expect(page.getByRole("heading", { name: "ClearWay" })).toBeVisible({
    timeout: 40_000,
  });
});

test("Check if the page is loaded - English", async ({ page }) => {
  await page.goto("http://localhost:3000/en");
  await expect(page.getByRole("heading", { name: "ClearWay" })).toBeVisible({
    timeout: 40_000,
  });
});

test("Check if the dialog is open after clicking on ambulance button", async ({
  page,
}) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("button", { name: "Policie Police" }).click();

  await expect(page.getByRole("button", { name: "Close" })).toBeVisible({
    timeout: 40_000,
  });
});
