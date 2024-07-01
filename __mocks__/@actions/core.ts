import { mock } from "bun:test";
// @actions/core
// https://bun.sh/docs/test/mocks#hoisting-preloading
mock.module("@actions/core", () => {
  return {
    getInput: mock((input: string) => {
      if (input === 'comparison-date')
        return process.env.MOCK_COMPARISON_DATE
      if (input === 'fail-on-error')
        return process.env.MOCK_FAIL_ON_ERROR
    }),
    setOutput: mock(() => {}),
    setFailed: mock(() => {})
  }
})
