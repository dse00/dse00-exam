## Debug On VSCode

**Prerequisite**

Before run this project, you need to install

```

- vscode
- google chrome

```

**How to use**

1. start on localhost

```

yarn
yarn dev

```

2. add code `debugger` as breakpoint, for example

```

useEffect(() => {
    if (loaded) {
      debugger // add a breakpoint here
    }
  }, [loaded])

```

3. run `debug` from configuration on vscode (chrome will be automatically loaded)
