import { Link } from 'react-router-dom';
import './Sidebar.scss';

export const Sidebar: React.FC = () => {
  return (
    <nav className='sidebar'>
      <ul className='sidebar__lis'>
        <li className='sidebar__item'>
          <Link to="/world-wip" className='sidebar__link' >
            World WIP
          </Link>
        </li>

        <li className='sidebar__item'>
          <Link to="/live-by-country" className='sidebar__link'>
            Live by Country
          </Link>
        </li>

        <li className='sidebar__item'>
          <Link to="/about" className='sidebar__link'>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};