import React from 'react';
import { Link } from 'react-router-dom';

const Notfound = () => (
  <div>
    <p>We're sorry, the page does not exist, please go back:</p>
    <Link to="/">
      Let's go
    </Link>
  </div>
);

export default Notfound;