# Review Export Tools

The PowerShell export scripts are kept for compatibility, but Windows PowerShell can show or write different encodings depending on the console and default code page.

Use the Node.js bundle exporter for review bundles.

Full review bundle:

```bash
npm run review:bundle
```

Phase 1.5 review bundle:

```bash
npm run review:bundle:phase-1-5
```

The Node.js exporter reads source files as UTF-8 and writes the bundle as UTF-8.

The PowerShell bundle script is no longer recommended for review bundles.
