# Production deployments

## pm2

```shell
pm2 install typescript
pm2 start src/worker.ts --watch
```