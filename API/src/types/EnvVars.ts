// Environments variables declared here
/* eslint-disable node/no-process-env */
export default {
  NodeEnv: (String(process.env.NODE_ENV) ?? ""),
  DataDir: (String(process.env.DATA_DIR) ?? "datastore"),
  Port: (Number(process.env.PORT) ?? 0),
} as { NodeEnv: string, DataDir: string, Port: number }
