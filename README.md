### Advent of Code 2023

#### Debugging Setup

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
