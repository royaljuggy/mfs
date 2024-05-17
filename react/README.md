This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

For the layout/design of each page, see [below](https://github.com/royaljuggy/mfs/edit/main/react/README.md?plain=1#L41)
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

You may need to install the required modules: `npm install`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Page Layout
For getting started deploying the front-end, scroll down just a little bit!

### Pages
Home-page
- About the application
- Nav-bar to other pages

Search page
- Text field for query string
- Drop-down, form-type HTML element for filtering, with: the ability to filter
- > rating range
  > genres (can populate by querying table for all unique genres, and creating the drop-down dynamically)
  > year range (date-time element)
  > score range
  > star (drop-down like genre)
  > runtime range
- Also add a drop-down to sort results based on columns available in the table + by ascending or descending

About page
- About the project, reasons for its creation
- About the author
- etc.

