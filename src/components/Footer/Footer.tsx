import Logo from "../../assets/images/favicon.png";
import SocialSvg from "../UI/SocialSvg";

const Footer: React.FC = () => {
  const date: Date = new Date();
  const Year = date.getFullYear();

  return (
    <footer className="text-gray-400 bg-gray-900 body-font">
    <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap md:text-left justify-evenly  order-first">
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">PAGES</h2>
        <nav className="list-none mb-10 cursor-pointer">
          <li>
            <a className="text-gray-400 hover:text-white" href="/">Home</a>
          </li>
          <li>
            <a className="text-gray-400 hover:text-white">Products</a>
          </li>
          <li>
            <a className="text-gray-400 hover:text-white">Collections</a>
          </li>
          <li>
            <a className="text-gray-400 hover:text-white" href="/contactus">Contact Us</a>
          </li>
        </nav>
      </div>

      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">CATEGORIES</h2>
        <nav className="list-none mb-10 cursor-pointer">
          <li>
            <a className="text-gray-400 hover:text-white">Electronics</a>
          </li>
          <li>
            <a className="text-gray-400 hover:text-white">Jewelery</a>
          </li>
          <li>
            <a className="text-gray-400 hover:text-white">Men's Clothing</a>
          </li>
          <li>
            <a className="text-gray-400 hover:text-white">Women's Clothing</a>
          </li>
        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">SUBSCRIBE</h2>
        <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
          <div className="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
            <label htmlFor="footer-field" className="leading-7 text-sm text-gray-400">To Newsletter</label>
            <input type="text" id="footer-field" name="footer-field" className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Subscribe</button>
        </div>
        <p className="text-gray-500 text-sm mt-2 md:text-left text-center">Don’t miss out thousands of great
          <br className="lg:block hidden"/>deals & promotions.
        </p>
      </div>
    </div>
  </div>
  <div className="bg-gray-800 bg-opacity-75">
  <div className="container p-5 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-header-text">
          <img src={Logo} alt="Logo" className="w-8 h-8"/>
          <span className="ml-3 text-xl ">FakeStore</span>
        </a>
        <p className="text-sm text-header-text sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © {Year} — Alok Suman. All rights reserved
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start text-header-text ">
          <SocialSvg />
        </span>
      </div>
  </div>
</footer>
  );
}

export default Footer;
