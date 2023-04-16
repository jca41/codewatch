<img src="./static/logo.png">
</br>
</br>

**CodeWatch** is an open source desktop client for [ActivityWatch](https://activitywatch.net).

<video src="./codewatch-demo.mov"></video>

# Install & setup

You can download the latest installer from the [releases section](https://github.com/jca41/codewatch/releases).

## Pre-requisites

- Install <a href={AW_URL}>ActivityWatch</a>. Check out their homepage for instructions. Make sure the server is running.
- Install the extension for Visual Studio Code, <a
  		href="https://marketplace.visualstudio.com/items?itemName=activitywatch.aw-watcher-vscode">here</a>.
- Add an entry to the CORS configuration so the application can communicate with `aw-server`.

  Edit `~/Library/Application\ Support/activitywatchaw-server.toml` (<a href="https://docs.activitywatch.net/en/latest/directories.html#config-directory">Config docs</a>) and add `cors_origins = "tauri://localhost"` to the `[server]` section.

# Platforms

- MacOS (universal installer)

We plan on creating installers for Windows and Linux.

# Code editors

- Visual Studio Code

We plan on extending this list as long as there's an activity watch extension for it already.

# Roadmap

Some of the features being considered:

- Filters by project and/or language
- Support more code editors
- Windows/Linux support
- Display CPU/RAM etc info with `Alwinator/aw-watcher-utilization`
- A more performant charts library
- Better error handling

# Found a bug, have a suggestion?

Feel free to open an issue!
