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

### 1. Server-Side Pagination
To optimize network traffic and prevent memory overhead on the client side, a **Server-Side Pagination** architecture was implemented.
* **Logic:** The `ProductList` component manages the current page state. Every state change triggers a `useEffect` hook that requests a specific data slice from the Spring Boot backend.
* **UX Enhancement:** A "Smooth Scroll" feature was integrated using `useRef`. Upon page transition, the window automatically scrolls to the top of the product grid for a seamless transition.

### 2. Dynamic Data Routing
The application handles product details through a highly scalable dynamic routing system.
* Using the `:id` parameter and `useParams` hook, the system fetches specific product data from the API. This allowed me to support thousands of unique items using a single, memory-efficient template component: `ProductDetailPage.jsx`.

### 3. State Management (State Lifting)
The category filtering system in the `Shop.jsx` page follows the **State Lifting** pattern.
* Selected categories are maintained in a central state and passed down to the `FilterSidebar`. Any change in the filter triggers a refined API call, ensuring the UI and the database remain in sync without unnecessary re-renders.

### 4. Service Layer Pattern
Following the **Separation of Concerns (SoC)** principle, all HTTP logic is decoupled from UI components and centralized in `services/ProductService.js`. This makes the codebase:
* Easier to maintain and test.
* Resilient to API endpoint changes.
* Highly reusable across different components.

---

## 📂 Project Structure

```text
src/
├── components/     # Reusable UI components (Header, Card, Sidebar)
├── pages/          # Main views (Home, Shop, ProductDetailPage)
├── services/       # API communication layer
├── css/            # Modular and variable-based stylesheets
├── assets/         # Static assets and brand images
├── App.jsx         # Route configuration and layout
└── main.jsx        # Entry point and Router provider
