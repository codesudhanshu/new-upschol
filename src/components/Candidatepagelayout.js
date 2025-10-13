import EnquireNow from "./EnquiryNow";
import UpScholFooter from "./Footer";
import UpScholHeader from "./Header";
import Script from 'next/script';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children }) => {
  return (
    <div>
      <Script 
        src="https://kit.fontawesome.com/baf14c335c.js" 
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      <UpScholHeader />
      
      <main className="flex-1">
        {children}
      </main>
      <EnquireNow />
  
      <UpScholFooter />
    </div>
  );
};

export default Layout;