// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center text-center px-4">
    <div>
      <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
      <p className="text-4xl font-bold text-primary mb-4">Oop's!! Looks like You Took A Wrong Turn</p>
      <p className="text-lg text-muted-foreground mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <p>But Worry Not, There is more here</p>
      <Link to="/" className="btn-primary">
        Go back home
      </Link>
    </div>
  </div>
);

export default NotFound;
