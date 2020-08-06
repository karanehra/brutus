import { app } from "../src/app";
import Express from "express";

test("Express App test", () => {
  expect(app).toBeInstanceOf(Express);
});
