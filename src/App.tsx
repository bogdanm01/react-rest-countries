import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeContextProvider } from "./context/ThemeContext.tsx";

import AppLayout from "./components/AppLayout.tsx";
import Countries from "./pages/CountriesPage.tsx";
import CountryPage from "./pages/CountryPage.tsx";

function App() {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" index element={<Countries />} />
            <Route path="/:code" element={<CountryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;
