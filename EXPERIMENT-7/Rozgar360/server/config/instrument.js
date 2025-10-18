// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";
import {nodeProfilingIntegration} from "@sentry/profiling-node";
Sentry.init({
  dsn: "https://3501040f54ec7ce32d4f7aeddc10e6ff@o4510211625713664.ingest.us.sentry.io/4510211630497792",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
});
Sentry.profiler.startProfiler();