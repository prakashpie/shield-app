This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Components used

### 1. Table.tsx

In the table component, there is easy way to define table header and its rows.
It also can sort the table if column marked as sortable. Shimmer can be added while loading state for the table.

### 2. DateRangeInput.tsx 

This component holds all the logics to get a date range from the user.  TODO: fix prev month and next month handler. 

This component then shown in the table action area as children. 