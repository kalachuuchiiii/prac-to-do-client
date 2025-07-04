import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { fetchAPI } from './utils/fetch.js';
import SearchBar from './components/searchBar.jsx';
import kikiText from '/kikiFont.png'
import CreateTask from './pages/createTask.jsx';
import Homepage from './pages/homepage.jsx';
import SearchResults from './pages/searchQuery.jsx';
import ViewTask from './pages/viewTask.jsx';
import { Routes, Route, Outlet, NavLink } from 'react-router-dom';

function App() {


  return <div className = "flex flex-col items-center">
          <NavLink to = "/" className = "w-full flex justify-between items-center text-left">
        <img className="w-50 object-cover" src={kikiText} />
        <NavLink to = "/create" className = "p-4 underline text-gray-900">Create</NavLink>
      </NavLink>
    <Routes>
      <Route element={<div className="flex flex-col items-center w-full">

        <SearchBar />
        <Outlet />
      </div>}>
        <Route path="/" element={<Homepage />} />
         <Route path="/search/" element={<SearchResults/>} />
      </Route>
      <Route path="/create" element={<CreateTask />} />
      <Route path="/task/:id" element={<ViewTask/>} />
     
    </Routes>
  </div>
}

export default App
