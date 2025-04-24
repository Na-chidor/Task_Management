# Task Management Application

**Overview**

This application provides a comprehensive task management solution with user authentication, task tracking, and data visualization. Users can efficiently create, view, edit, delete, and monitor the progress of their tasks.

**Features**

* **User Authentication**: Secure user registration and login using Supabase.
* **Task Management**:
    * Add new tasks with titles, descriptions, and status.
    * Edit existing task details.
    * Delete tasks.
    * Mark tasks as complete to track progress.
    * Filter tasks by status (All, Completed, To Do).
* **Dashboard**: Provides a visual overview of task status using a pie chart.
* **Responsive Layout**: Adapts to various screen sizes for optimal viewing.
* **Reusable UI Components**: Leverages custom UI components for consistency and efficiency (e.g., `Button`, `Input`, `Card`).
* **Real-time Updates**: Data is managed and updated dynamically.
* **Notifications**: Provides user feedback through toast notifications.

**Technologies Used**

* React
* React Router DOM (for navigation)
* Supabase (for authentication and database)
* @mui/x-charts (for the dashboard's pie chart)
* Tailwind CSS (for styling)
* Radix UI (for select components, etc.)
* Lucide React (for icons)
* clsx and tailwind-merge (for conditional classnames)
* react-toastify (for notifications)

**File Descriptions**

* `App.jsx`: The main application component. It sets up the `TaskProvider` to manage global task state and renders the main layout with `Navbar`, `Filterbar`, `TaskList`, and `Dashboard`.
* `TaskContext.jsx`: Provides the `TaskContext` and `TaskProvider`. This context manages the global state for tasks, including fetching, adding, editing, deleting, and filtering tasks. It also manages user authentication state.
* `Navbar.jsx`: Displays the navigation bar with the application title, "Add Task" button (opens `AddTaskModal`), and "Logout" button. Handles user logout using Supabase.
* `Filterbar.jsx`: Component for filtering tasks by status ("All", "Completed", "To Do"). Uses `useTaskContext` to access the filter function.
* `TaskList.jsx`: Renders the list of tasks. It displays task details and provides functionality to edit (using `EditModal`), delete (using `DeleteModal`), and mark tasks as complete.
* `Dashboard.jsx`: Displays a pie chart visualizing task status distribution.
* `Login.jsx`: Handles user login with email and password using Supabase.
* `register.jsx`: Handles user registration with email and password using Supabase.
* `AddTaskModal.jsx`: Modal component for adding new tasks. It uses the `Input`, `Label`, `Select`, and `Button` components.
* `EditModal.jsx`: Modal component for editing existing tasks. Uses `Input` and `Button`.
* `DeleteModal.jsx`: Modal component for confirming task deletions.
* `button.jsx`: Reusable button component with various styles and sizes.
* `card.jsx`: Reusable card component for structuring content.
* `input.jsx`: Reusable input field component.
* `label.jsx`: Reusable label component for form elements.
* `select.jsx`: Reusable select (dropdown) component.
* `userAuth.jsx` (or `useAuth.js`): Custom hook for managing user authentication (signup, signin, signout).
* `supabaseClient.js`: Initializes the Supabase client for database interaction and authentication.
* `utils.js`: Utility functions, including `cn` for conditional class names.

**Setup Instructions**

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Supabase:**

    * Create a Supabase project.
    * Obtain your Supabase API URL and Anon Key from your Supabase project settings.
    * In your Supabase project, create a table named `Task` with the following columns:
        * `id` (UUID, primary key)
        * `task` (Text, not null)
        * `description` (Text)
        * `status` (Text, e.g., 'to-do', 'in-progress', 'done')
        * `user_id` (UUID, foreign key referencing the `auth.users` table)
        * `created_at` (Timestamp with time zone)
    * Enable and configure email/password authentication in your Supabase project.

4.  **Configure environment variables:**

    * Create a `.env.local` file in the root directory of your project.
    * Add your Supabase API URL and Anon Key:

    ```
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

    * *Note: If you're not using Vite, adjust the variable names as needed, e.g., `REACT_APP_SUPABASE_URL`*

5.  **Run the application:**

    ```bash
    npm start
    # or
    yarn start
    ```

6.  **Access the application:** Open your browser and navigate to the specified URL (usually `http://localhost:3000`).

**Additional Notes**

* Ensure you have Node.js and npm or Yarn installed.
* This application uses Tailwind CSS for styling; make sure it's set up correctly in your project.
* The `cn` utility function (`utils.js`) helps manage conditional class names with `clsx` and `tailwind-merge`.
* Error handling is implemented using `react-toastify` for user-friendly notifications.
* The application follows a component-based architecture for better organization and reusability.
* Supabase is used for both authentication and data storage, simplifying backend management.
