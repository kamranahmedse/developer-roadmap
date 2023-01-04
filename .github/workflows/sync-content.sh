name: Sync v1 Content

on:
  workflow_dispatch: # allow manual run
  schedule:
    - cron: '0 0 * * *' # daily at midnight

jobs:
  sync-v1-content:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - uses: pnpm/action-setup@v2.2.2
        with:
          version: 7.13.4
      - name: Install dependencies
        run: |
          pnpm install
          cd bin && git clone --depth 1 -b master https://${{ secrets.GH_TOKEN }}@github.com/kamranahmedse/developer-roadmap.git
          npm run sync-content
      - name: Create PR
        uses: peter-evans/create-pull-request@v4
        with:
          delete-branch: false
          branch: "sync-content"
          base: "master"
          labels: |
            sync-content
            automated pr
          reviewers: kamranahmedse
          commit-message: "chore: sync changes from v1 to v2"
          title: "Sync content changes from v1 to v2"
          body: |
            Synchronizes content changes from v1 to v2
            Please review the changes and merge if everything looks good.
