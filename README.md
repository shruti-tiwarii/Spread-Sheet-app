# Spreadsheet Application

## Overview

This project is a spreadsheet application built with [Next.js](https://nextjs.org/), [Zustand](https://github.com/pmndrs/zustand) for state management, and [Tailwind CSS](https://tailwindcss.com/) for styling. The application features a grid of 1000 editable cells with functionalities including cell formatting, data validation, search and filter, pagination, and undo/redo capabilities.

## Features

- **Editable Cells**: Users can input and update cell values.
- **Cell Formatting**: Adjust cell alignment and font size.
- **Cell Validation**: Enforce numeric value restrictions.
- **Search and Filter**: Locate specific cell values.
- **Pagination**: Navigate through different pages of cells.
- **Undo/Redo**: Revert or reapply changes to cell values.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/)

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/your-repository.git
   cd your-repository
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

## Running the Application

1. **Start the Development Server**:

   ```bash
   npm run dev
   ```

2. **Open in Browser**:

   Navigate to `http://localhost:3000` in your web browser to view the application.

## Usage

### Spreadsheet Grid

- **Edit Cells**: Click on any cell to make it editable. Press `Enter` or click outside the cell to save changes.
- **Format Cells**: Use the toolbar to change cell alignment and font size.
- **Validate Cells**: Numeric-only validation will trigger an alert if a non-numeric value is entered.
- **Search Cells**: Enter a search term in the search box and click the search button to filter cells based on their values.
- **Pagination**: Use the "Previous" and "Next" buttons to navigate through pages of cells.
- **Undo/Redo**: Use the undo and redo buttons in the toolbar to revert or reapply changes.

### Toolbar

- **Undo**: Revert the last change made to the spreadsheet.
- **Redo**: Reapply the last reverted change.
- **Search**: Enter text to search for cell values.

## Development

- **Styling**: Tailwind CSS is used for styling. Update the Tailwind configuration if necessary.
- **State Management**: Zustand manages the state of cells, history, and undo/redo functionality.
- **Pagination**: Cells are displayed in pages of 100. Adjust the `cellsPerPage` variable in `SpreadsheetGrid.tsx` if needed.

## Contributing

1. **Fork the Repository**.
2. **Create a New Branch**:

   ```bash
   git checkout -b feature/your-feature

   ```
