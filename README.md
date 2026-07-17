# Hepburn Architects Website — Next.js + Sanity

Complete GitHub-ready website for `www.hepburnarchitects.net`.

## Included

- Next.js public website
- Sanity Studio at `/studio`
- Editable portfolio projects and images
- Project categories, galleries and case-study pages
- Services, guides, locations, before/after, about and contact pages
- Lead-gated fee calculator
- Automatic metadata, sitemap, robots and structured data
- Birmingham and Nunthorpe business information
- Vercel-ready configuration

## Required Vercel variables

```text
NEXT_PUBLIC_SANITY_PROJECT_ID=5xwjrn3e
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_REVALIDATE_SECRET=make-a-long-private-random-value
```

## GitHub upload

1. Extract the ZIP on your computer.
2. Open a new empty GitHub repository.
3. Choose **Add file → Upload files**.
4. Drag the contents of the extracted folder into GitHub. Do not upload the ZIP itself.
5. Commit to `main`.
6. Import the repository into Vercel.
7. Add the three environment variables above.
8. Deploy and open `/studio`.

There are fewer than 100 files, so the extracted project can be uploaded in one browser upload.

## Sanity

Project ID: `5xwjrn3e`  
Dataset: `production`

Your existing CORS origin for `https://www.hepburnarchitects.net` is already configured. Add the temporary Vercel preview domain later if you need to access Studio before the live domain is moved.
