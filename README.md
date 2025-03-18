# TanStack Query Shared Cache Demo

This repository is primary used to demonstrate how a cache can be shared across multiple tabs/windows using the following mechanisms:

* [Broadcast Channel](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel) (via [broadcastQueryClient](https://tanstack.com/query/latest/docs/framework/react/plugins/broadcastQueryClient))
* [SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker) (via [persistQueryClient](https://tanstack.com/query/latest/docs/framework/react/plugins/persistQueryClient) and a [SharedWorker persister](https://sjp.co.nz/projects/query-shared-worker-persister/))

The code itself is largely borrowed from the [TanStack Query repository](https://github.com/TanStack/query/tree/main/examples/react/rick-morty), with some modifications to support the cache sharing.

## Demo

To view the demo app in action, see: https://sjp.co.nz/projects/query-shared-worker-persister/demo

## Usage

To run this example:

- `npm install`
- `npm run dev`