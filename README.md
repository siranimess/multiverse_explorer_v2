# WEB102 Project 6 - Multiverse Explorer

Submitted by: **Animesh Niraula**

**Multiverse Explorer** is an interactive data dashboard that allows users to explore characters from the Rick and Morty universe. The application fetches real-time character data from the Rick and Morty API and displays statistics, interactive charts, and detailed character profiles.

Time spent: **6** hours spent in total.

## Required Features

The following **required** functionality is completed:

- [x] Clicking on an item in the dashboard list navigates to a detail view for that character.
- [x] Each detail view displays additional information not available in the dashboard.
- [x] The same sidebar is displayed on both the dashboard and detail pages.
- [x] Each character has a unique URL using React Router.
- [x] React Router's `Link` component is used for navigation.
- [x] React Router's `useParams()` hook is used to retrieve character IDs from URLs.
- [x] The dashboard includes at least two charts created using fetched API data.
- [x] Each chart represents a different aspect of the dataset.

## Stretch Features

The following **optional** functionality is completed:

- [x] The dashboard includes additional explanations and insights about the dataset.
- [x] Users can toggle between different data visualizations.
- [x] Dashboard charts update dynamically when filters are changed.
- [x] Users can search for characters by name.
- [x] Users can filter characters by species, status, and episode appearances.
- [x] Character detail pages display additional information, including origin, location, gender, species, and episode history.
- [x] The application includes loading and error-handling functionality.
- [x] The website uses responsive styling for different screen sizes.

## Video Walkthrough

Here's a walkthrough of the implemented required features:

<div>
    <a href="https://www.loom.com/share/6bea5e801aaf4630bc5ddff51ad708c8">
    </a>
    <a href="https://www.loom.com/share/6bea5e801aaf4630bc5ddff51ad708c8">
      <img style="max-width:300px;" src="https://www.loom.com/v1/videos/6bea5e801aaf4630bc5ddff51ad708c8/thumbnail.gif">
    </a>
  </div>

## Project Description

Multiverse Explorer is a React-based data dashboard that allows users to explore and analyze information about characters from the animated television series Rick and Morty.

The application retrieves character information from the public Rick and Morty API and presents it through an interactive dashboard.

Users can search for specific characters, filter results, analyze character statistics, and navigate to individual character profiles.

The project demonstrates the use of API integration, React components, React Router, data visualization, and responsive web design.

## Features

### 1. Interactive Dashboard

The dashboard displays four key statistics:

- Total characters loaded
- Number of living characters
- Number of unique species
- Average episode appearances

These statistics are calculated using data retrieved from the API.

### 2. Character Search and Filtering

Users can filter the character database using:

- Character name
- Species
- Survival status
- Minimum episode appearances

The dashboard updates automatically when filters are changed.

### 3. Data Visualizations

The application includes two interactive charts created using Recharts.

**Chart 1: Character Status Distribution**

A donut chart displays the proportion of characters who are:

- Alive
- Dead
- Unknown

This visualization helps users understand the survival distribution of characters in the selected dataset.

**Chart 2: Character Appearances**

A horizontal bar chart displays characters with the highest number of episode appearances.

Users can toggle between:

- Episode appearances
- Species distribution

Both visualizations update based on the selected filters.

### 4. Character Detail Pages

Each character has an individual detail page.

React Router dynamically generates character-specific URLs.

For example:

/character/1

/character/2

/character/3

The detail pages display:

- Character name
- Character image
- Survival status
- Species
- Gender
- Character type
- Origin
- Last known location
- Total episode appearances
- First episode appearance
- Latest listed episode appearance

### 5. Shared Sidebar

The application contains a navigation sidebar that remains consistent across the dashboard and character detail pages.

Users can navigate between the dashboard, data insights, and character directory.

## Technologies Used

- React.js
- JavaScript
- HTML5
- CSS3
- React Router
- Recharts
- Vite
- Fetch API
- Rick and Morty API

## API Used

Rick and Morty API

Website:
https://rickandmortyapi.com/

Documentation:
https://rickandmortyapi.com/documentation

The API provides information about characters, episodes, and locations from the Rick and Morty universe.

The dashboard retrieves the first three pages of character data, representing up to 60 characters.

Individual character detail pages retrieve additional information using the selected character's ID.

## Installation

1. Clone the repository.

2. Open the project directory.

3. Install dependencies:

   npm install

4. Start the development server:

   npm run dev

5. Open the local URL displayed in the terminal.

   http://localhost:5173/

## Notes

### Challenges Encountered

One of the main challenges was integrating React Router into the existing dashboard while maintaining consistent navigation across different pages.

Another challenge involved transforming raw API data into meaningful visualizations.

To address this, I used JavaScript array methods to calculate character statistics and prepare datasets for the charts.

I also implemented dynamic filtering so that the displayed charts update automatically based on user selections.

### What I Learned

Through this project, I gained experience with:

- Implementing client-side navigation using React Router.
- Creating dynamic routes for individual data points.
- Using the `useParams()` hook to retrieve URL parameters.
- Integrating third-party visualization libraries into React.
- Transforming API responses into chart-ready datasets.
- Managing application state using React hooks.
- Developing reusable components.
- Building responsive dashboards.

## Future Improvements

Some possible future improvements include:

- Adding pagination to explore the complete character database.
- Implementing more advanced search functionality.
- Adding additional charts comparing character origins and locations.
- Allowing users to save their favorite characters.
- Providing more detailed episode information.
- Adding a comparison feature for multiple characters.

## License

Copyright 2026 Animesh Niraula.

This project was developed for CodePath WEB102 - Intermediate Web Development.
