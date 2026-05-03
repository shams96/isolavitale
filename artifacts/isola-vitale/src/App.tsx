import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { CartProvider } from "@/context/CartContext";
import { HeaderThemeProvider } from "@/context/HeaderThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

import HomePage from "@/pages/HomePage";
import ProductsPage from "@/pages/ProductsPage";
import ProductPage from "@/pages/ProductPage";
import CheckoutPage from "@/pages/CheckoutPage";
import CheckoutSuccessPage from "@/pages/CheckoutSuccessPage";
import OriginPage from "@/pages/OriginPage";
import SystemPage from "@/pages/SystemPage";
import TechnologyPage from "@/pages/TechnologyPage";
import JournalPage from "@/pages/JournalPage";
import AccountPage from "@/pages/AccountPage";
import RefillPage from "@/pages/RefillPage";
import ContactPage from "@/pages/ContactPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import DailyCollectionPage from "@/pages/DailyCollectionPage";
import LaboratoryCollectionPage from "@/pages/LaboratoryCollectionPage";
import CellularChronosPage from "@/pages/CellularChronosPage";
import DiagnosisPage from "@/pages/DiagnosisPage";
import AdminPage from "@/pages/AdminPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/products/:slug">{(params) => <ProductPage />}</Route>
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/checkout/success" component={CheckoutSuccessPage} />
      <Route path="/origin" component={OriginPage} />
      <Route path="/system" component={SystemPage} />
      <Route path="/technology" component={TechnologyPage} />
      <Route path="/journal" component={JournalPage} />
      <Route path="/account" component={AccountPage} />
      <Route path="/refill" component={RefillPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/daily-collection" component={DailyCollectionPage} />
      <Route path="/laboratory-collection" component={LaboratoryCollectionPage} />
      <Route path="/cellular-chronos" component={CellularChronosPage} />
      <Route path="/diagnosis" component={DiagnosisPage} />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HeaderThemeProvider>
          <CartProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Header />
              <CartDrawer />
              <Router />
              <Footer />
            </WouterRouter>
            <Toaster />
          </CartProvider>
        </HeaderThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
