# Pixabay Image Search Tool - Topline Pro Assessment 

## Setting up Locally

1. Clone this repository
2. Update name of  `.env.example ` to `.env.local` and add your Pixabay API key under `NEXT_PUBLIC_PIXABAY_API_KEY`
3. Run `yarn && yarn dev`

## Thought Process
Before getting started I spent some time mapping out the requirements to a set of tasks I'd need to complete and components I needed to build.

With a limited time to get this assignment completed, I decided to prioritize some tasks over others:

- Prioritized:
 - Functionality
 - UI
- Deprioritized:
 - Testing
 - Bundle Size (Decided to use ThirdParty libraries to quickly add functionality)

## Features Added
- Image Search
- View Image Details
- Download Image
- Like Images 
- View Liked Images
- Form Validation (Can only submit search results if search is not empty)
## Next Steps - If I had more time
- Add Unit Tests
- Improve UI
  - More form validation
  - Improve loading/error states
- Abstract Code

## [Live Demo deployed to Vercel](https://pixabay-image-search-rho.vercel.app/)