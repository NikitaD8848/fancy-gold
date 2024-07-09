import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import useNavbar from '../../hooks/GeneralHooks/NavbarHooks/NavbarHook';
import logo from '../../public/assets/images/logo.png';
import HeaderCategories from './HeaderCategories';

const Navbar = () => {
  const { navbarData, isLoading, errorMessage,selectedCurrencyValue } = useNavbar();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: any) => {
    e.preventDefault();
    router.push('/product-detail/' + searchTerm);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <>
      <header className="header">
        <nav>
          <div className="navbar">
            <div className="w-100 d-flex justify-content-between pt-3">
              <div>
                <Link href="/" legacyBehavior>
                  <a>
                    <Image className="pb-2 mb-1" src={logo} alt="logo" width={50} />
                  </a>
                </Link>
              </div>
              <div className="d-block search-bar mx-2">
                <div className="search-input">
                  <input
                    type="text"
                    className="form-control search-bar-height"
                    placeholder="Search here"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    onChange={(e: any) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
              <div>
                <ul className="nav  list-inline d-flex justify-content-evenly">
                  <li className="list-inline-item">
                    <Link href="/" legacyBehavior>
                      <a className="link-dark label">
                        <div className="icon-container">
                          <ShoppingCartOutlinedIcon className="icon" />
                          <span className="badge badge-warning">2</span>
                          <span className="d-none d-md-inline-block theme-blue">Cart</span>
                        </div>
                      </a>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="/" legacyBehavior>
                      <a className="link-dark label">
                        <div className="icon-container">
                          <FavoriteBorderIcon className="icon" />
                          <span className="badge badge-warning" id="lblCartCount">
                            {/* {wishlistCount} */}
                          </span>
                          <span className="d-none d-md-inline-block theme-blue ">Wishlist</span>
                        </div>
                      </a>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="/" legacyBehavior>
                      <a className="link-dark label">
                        <div className="icon-container">
                          <FormatListBulletedOutlinedIcon className="icon" />
                          <span className="d-none d-md-inline-block ms-1 theme-blue">Order List</span>
                        </div>
                      </a>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="/" legacyBehavior>
                      <a className="link-dark label">
                        <div className="icon-container">
                          <LogoutOutlinedIcon className="icon" />
                          <span className="d-none d-md-inline-block ms-1 theme-blue">Sign-out</span>
                        </div>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
        <HeaderCategories navbarData={navbarData} isLoading={isLoading} errorMessage={errorMessage} selectedCurrencyValue={selectedCurrencyValue}/>
    </>
  );
};

export default Navbar;
