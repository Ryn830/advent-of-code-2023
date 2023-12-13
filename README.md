### Advent of Code 2023

Solutions to [Advent of Code for 2023](https://adventofcode.com/2023)

#### Run Tests

Utilizes Node's built in [test runner](https://nodejs.org/api/test.html) and [assertion library](https://nodejs.org/api/assert.html) (`node:test` & `node:assert`, respectively). Some summarized docs can be found [here](https://www.sonarsource.com/blog/node-js-test-runner/).

```sh
npm run day1
```

#### Debugging Setup (VSCode)

- Install `tsx` globally

```sh
npm i -g tsx
```

- Add the following to your VSCode `launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "tsx debug",
      "type": "node",
      "request": "launch",
      "args": ["${relativeFile}"],
      "runtimeExecutable": "tsx",
      "cwd": "${workspaceRoot}",
      "internalConsoleOptions": "openOnSessionStart"
    }
  ]
}
```

- Launch `tsx debug` with your test file focused and with a breakpoint in either the test or source code.
