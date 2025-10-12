import EnquireNow from "./EnquiryNow";
import UpScholFooter from "./Footer";
import UpScholHeader from "./Header";
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children }) => {
  return (
    <div>
    
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