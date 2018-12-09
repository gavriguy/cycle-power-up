## For development

Open two terminal windows

On the first run

```bash
yarn start

```

On the second run


```bash
ngrok http 1234

```


- Go to https://trello.com/power-ups/admin/
- Pick your custom *power up* and paste the URL provided by `ngrok` prefixed with `/client.html`


## When ready to deploy

```bash

yarn deploy
```

- Go to https://trello.com/power-ups/admin/
- Pick your custom *power up* and paste the URL provided by `surge` prefixed with `/client.html`

