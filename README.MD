
# Student Roulette

## Development

1. Install [Docker](https://www.docker.com/). (On Windows [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install) will be needed as a prerequesite.)
2. Clone the GitHub repository:

    - Command line:
    ```bash
    git clone https://github.com/Student-Roulette/StudentRoulette.git
    ```
    Visual Studio Code:
    1. `ctrl/cmd + shift + P` to open the command pane
    2. Search for `git clone`
    3. Type in the repo name, `Student-Roulette/StudentRoulette`
    4. Profit
3. Install the [Remote - Container](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension.
4. Open either `react-frontend` or `express-backend` in VSC. Not the root of the project!
5. If running `express-backend` create a `.env` file in the folder with the follow content:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
PORT=3000
DB_PORT=5432
```

6. Click the icon in the bottom left and select `Reopen in Container`.

## Sexy Diagram

![Visualization of the codebase](./diagram.svg)

