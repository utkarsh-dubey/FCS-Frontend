import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import { Home, NotFound } from "./Components/default";
import Header from "./Components/Header/Header";
import TemplateProvider from "./templates/TemplateProvider";
import ContextProvider from "./context/ContextProvider";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Home/Products";
import ItemDetail from "./Components/ItemDetails/ItemDetail";
import AllUser from "./Components/ItemDetails/AllUser";
import AllProduct from "./Components/ItemDetails/AllProduct";
import AllPdf from "./Components/ItemDetails/AllPdf";
import AddProduct from "./Components/ItemDetails/AddProduct";
import UploadProduct from "./Components/ItemDetails/UploadProduct";
import { Box } from "@material-ui/core";
import Checkout from "./Components/Cart/Checkout";
import OrderFailure from "./Components/Cart/OrderFailure";
import Admin from "./Components/Admin/Admin";
import OrderSuccess from "./Components/Cart/OrderSuccess";
import MyProfile from "./Components/MyProfile/MyProfile";

function App() {
  const [text, setText] = React.useState("");
  const [pdfid, setPdfid] = useState();
  const [sessionId, setSessionId] = useState();
  console.log("pdf", pdfid)

  return (
    // <div></div>
    <TemplateProvider>
      <ContextProvider>
        <BrowserRouter>
          <Header text={text} setText={setText} />
          <Box style={{ marginTop: 54 }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/cart" component={Cart} />
              {/* <Route exact path= '/product' render={()=<Products  />} /> */}
              <Route
                exact path="/product"
                component={() => <Products text={text} setText={setText} />}
              />
              <Route exact path="/uploadproduct" component={() => <UploadProduct setPdfid={setPdfid} /> }/>
              <Route  path="/product/form" component={() => <AddProduct pdfid={pdfid} /> } />
              <Route  path="/product/:id" component={ItemDetail} />
              <Route exact path="/checkout" component={() => <Checkout setSessionId={setSessionId} /> } />
              <Route exact path="/orderfailure" component={OrderFailure} />
              <Route exact path="/ordersuccess" component={() => <OrderSuccess sessionId={sessionId} /> } />
              <Route exact path="/alluser" component={AllUser} />
              <Route exact path="/allproduct" component={AllProduct} />
              <Route exact path="/allpdf" component={AllPdf} />
              {/* <Route exact path="/admin" component={Admin} /> */}
              <Route exact path="/myProfile" component={MyProfile} />

              {/* <Route exact path= '/admin' component={Admin} /> */}

              {/* <UploadProduct /> */}
              <Route component={NotFound} />
            </Switch>
          </Box>
        </BrowserRouter>
      </ContextProvider>
    </TemplateProvider>
  );
}

export default App;
