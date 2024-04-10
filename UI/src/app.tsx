import React, { FC } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "./components/Layout"

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  )
}