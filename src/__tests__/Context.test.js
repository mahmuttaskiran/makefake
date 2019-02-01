const { createContext } = require("../Context");

it("should create context that it's context's parent is root", function() {
  var context = createContext();
  var content = context.pushContent("xType");
  expect(function() {
    content.getParent();
  }).toThrow();
});

it("should return parent content right and remove last content as expected", function() {
  var context = createContext();
  var xContent = context.pushContent("xType");
  var yContent = context.pushContent("yType");
  expect(yContent.getParent().isContentType("xType")).toBe(true);
  expect(context.getCurrentContent().isContentType("yType")).toBe(true);
  yContent.release();
  expect(context.getCurrentContent().isContentType("xType")).toBe(true);
});

it("should setParam and getParam works as expected", function() {
  var context = createContext();
  var xContent = context.pushContent("xType");
  xContent.setParam("x", 1);
  xContent.setParam("y", 0);
  expect(xContent.getParam("x")).toEqual(1);
  expect(xContent.getParam("y")).toEqual(0);
});

it("should getLastContentType works as expected", function() {
  var context = createContext();
  context.pushContent("xType");
  var xType = context.pushContent("xType");
  var yType = context.pushContent("yType");
  context.pushContent("zType");
  context.pushContent("zType");
  xType.setParam("x", 1);
  yType.setParam("y", 1);
  expect(context.getLastContentWithType("xType").getParam("x")).toEqual(1);
  expect(context.getLastContentWithType("yType").getParam("y")).toEqual(1);
});
