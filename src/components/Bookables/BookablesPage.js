import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const BookabeNew = lazy(() => import("./BookableNew"));
const BookableEdit = lazy(() => import("./BookableEdit"));
const BookablesView = lazy(() => import("./BookablesView"));

export default function BookablesPage() {
  return (
    <Routes>
      <Route path="/:id" element={<BookablesView />} />
      <Route path="/" element={<BookablesView />} />
      <Route path="/:id/edit" element={<BookableEdit />} />
      <Route path="/new" element={<BookabeNew />} />
    </Routes>
  );
}
