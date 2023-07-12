/**
 * @type {import('@babel/core').TransformOptions}
 */
module.exports = function (api) {
  const envName = api.env()
  const development = envName === "development" || envName === "test"
  return {
    presets: [
      [
        "@babel/preset-env",
        { useBuiltIns: "entry", corejs: "3.0", bugfixes: true },
      ],
      ["@babel/preset-typescript"],
      ["@babel/preset-react", { development, useBuiltIns: true }],
    ],
    assumptions: {
      setPublicClassFields: true,
      privateFieldsAsProperties: true,
      noDocumentAll: true,
      noClassCalls: true,
      mutableTemplateObject: true,
      ignoreFunctionLength: true,
      constantReexports: true,
      enumerableModuleMeta: true,
      ignoreToPrimitiveHint: true,
      objectRestNoSymbols: true,
      noNewArrows: true,
      setSpreadProperties: true,
      skipForOfIteratorClosing: true,
      superIsCallableConstructor: true,
      noIncompleteNsImportDetection: true,
    },
    babelrcRoots: [
      ".",
      "./packages/ui",
      "./packages/ui-preset",
      "./packages/icons",
    ],
  }
}
