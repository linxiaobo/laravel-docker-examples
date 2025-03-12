import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import TodoList from "./TodoList.jsx"

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<TodoList />);
