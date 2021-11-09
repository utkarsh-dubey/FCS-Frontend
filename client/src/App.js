import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, NotFound } from './Components/default';
import Header from './Components/Header/Header';
import DetailView from './Components/ItemDetails/DetailView';
import TemplateProvider from './templates/TemplateProvider';
import ContextProvider from './context/ContextProvider';
import Cart from './Components/Cart/Cart';
import Products from './Components/Home/Products';
import ItemDetail  from './Components/ItemDetails/ItemDetail';
import UploadProduct  from './Components/ItemDetails/UploadProduct';
import { Box } from '@material-ui/core'
import CartView from './Components/Cart/CartView'

function App() {
  return (
    <TemplateProvider>
      <ContextProvider>
        <BrowserRouter>
          <Header />
          <Box style={{marginTop: 54}}>
            <Switch>
              <Route exact path= '/' component={Home} />
              <Route exact path= '/cart' component={Cart} />
              <Route exact path= '/product' component={Products} />
              <Route exact path= '/upload/product' component={UploadProduct} />
              <Route exact path= '/product/:id' component={ItemDetail} />
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
