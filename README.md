# LootDrop - Frontend Client

LootDrop is a high-performance e-commerce user interface specifically designed for cyberware and collectible figures. This project is built using **React 18** and **Vite**, focusing on asynchronous data management, dynamic routing, and professional architectural patterns.

---

## 🚀 Tech Stack

| Category | Technology / Library |
| :--- | :--- |
| **Framework** | React 18 |
| **Build Tool** | Vite |
| **Routing** | React Router DOM (v6) |
| **HTTP Client** | Axios |
| **Icons** | React Icons |
| **Styling** | CSS3 (Custom Variables & Responsive Design) |

---

## 🧠 Engineering Approaches & Algorithms

### 1. Localized Search & Autocomplete Protocol
Instead of a global search that triggers expensive full-page re-renders, a high-performance **Autocomplete** system was implemented within the `Header` component.
* **State Encapsulation:** Search logic is kept local to the Header, ensuring that keystrokes do not affect the Virtual DOM of the entire application.
* **Debouncing Algorithm:** To prevent server-side flooding, a **400ms debounce** was implemented using `useEffect` and `setTimeout`. This ensures an API request is only sent after the user finishes typing.
* **Click-Outside Pattern:** Utilizing `useRef` and global event listeners, the search dropdown intelligently closes when a user clicks outside the search perimeter, enhancing the UX.

### 2. Server-Side Pagination
To optimize network traffic and prevent memory overhead on the client side, a **Server-Side Pagination** architecture was implemented for the product catalog.
* **Logic:** The `ProductList` component manages the current page state. Every state change triggers a `useEffect` hook that requests a specific data slice from the Spring Boot backend.
* **UX Enhancement:** A "Smooth Scroll" feature was integrated using `useRef`. Upon page transition, the window automatically scrolls to the top of the product grid for a seamless transition.

### 3. Dynamic Data Routing
The application handles product details through a highly scalable dynamic routing system.
* Using the `:id` parameter and `useParams` hook, the system fetches specific product data from the API. This allowed me to support thousands of unique items using a single, memory-efficient template component: `ProductDetailPage.jsx`.

### 4. State Management (Lifting State Up)
The category filtering system in the `Shop.jsx` page follows the **State Lifting** pattern.
* Selected categories are maintained in a central state within the Shop page and passed down to the `FilterSidebar`. This ensures the sidebar and the product grid stay synchronized without unnecessary global state overhead.

### 5. Service Layer Pattern
Following the **Separation of Concerns (SoC)** principle, all HTTP logic is decoupled from UI components and centralized in `services/ProductService.js`. 
* Centralized API configuration.
* Reusable methods for search, list, and detail fetching.
* Robust error handling with graceful degradation.

---

## 📂 Project Structure

```text
src/
├── components/     # Reusable UI components (Header, Card, Sidebar)
├── pages/          # Main views (Home, Shop, ProductDetailPage)
├── services/       # API communication layer (Axios instances)
├── css/            # Modular and variable-based stylesheets
├── assets/         # Static assets and brand images
├── App.jsx         # Clean route configuration
└── main.jsx        # Entry point and Router provider