import Main from "../src";

let main = new Main();

test('Main class test', () => {
  expect(main).toBeInstanceOf(Main);
})

test('Queue not running test', () => {
  expect(main.is_running).toBeFalsy;
})
