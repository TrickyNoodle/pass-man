# pass-man

Just another password manager, nothing fancy.

## Description

`pass-man` is a simple password manager built with Next.js and TypeScript. It provides basic functionality for storing and managing your passwords securely.

## Table of Contents

- [Description](#description)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Technologies Used

*   **Next.js:** A React framework for building web applications.
*   **TypeScript:** A typed superset of JavaScript that enhances code quality and maintainability.
*   **React:** A JavaScript library for building user interfaces.
*   **MySQL:** A relational database management system for storing user data and passwords.
*   **Bcrypt:** A password-hashing function for securely storing passwords.
*   **JSON Web Tokens (JWT):** A standard for securely transmitting information between parties as a JSON object.
*   **Shadcn UI:** For pre-built UI components.
*   **Tailwind CSS:** A utility-first CSS framework for styling the application.
*   **Sonner:** For toast notifications.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/TrickyNoodle/pass-man.git
    cd pass-man
    ```

2.  **Install dependencies:**

    ```bash
    npm install # or yarn install or pnpm install or bun install
    ```

3.  **Set up the environment variables:**

    Create a `.env.local` file in the root directory and populate it with the necessary environment variables.  Refer to `.env.example` for the required variables:

    ```
    SESSION_SECRET=your_secret_key_128bit_or_256bit
    SQL_user=username
    SQL_password=password
    SQL_database=passman
    SQL_port=3306
    SQL_host=localhost
    HASHING_SALT=10
    ```

    **Note:** Ensure you use a strong, randomly generated `SESSION_SECRET` for security.

4.  **Database Setup:**

    Make sure you have a MySQL database set up and running. The application uses the credentials provided in the `.env.local` file to connect to the database.

## Usage

1.  **Run the development server:**

    ```bash
    npm run dev # or yarn dev or pnpm dev or bun dev
    ```

2.  **Open your browser and navigate to `http://localhost:3000`** (or the port your development server is running on).

## Features

*   **Secure Password Storage:** Passwords are encrypted using bcrypt before being stored in the database.
*   **User Authentication:** Users can register and log in to access their password vault.
*   **Password Management:** Users can add, edit, and delete their stored passwords.
*   **JWT-Based Authentication:** Uses JSON Web Tokens for secure session management.
*   **Modern UI:** Built with Shadcn UI for a clean and accessible user interface.
*   **Responsive Design:** The application is designed to be responsive and work on different screen sizes.
*   **Toast Notifications:** Provides user feedback through Sonner toast notifications.
*   **Environment Variable Configuration:** Uses `.env.local` for easy configuration of database credentials and secrets.
