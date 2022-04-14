import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MeusAnuncios from "./views/screens/Meus-anuncios/MeusAnuncios";
import CadastroAnuncio from "./views/screens/Cadastro-anuncio/CadastroAnuncio";
import MinhasCompras from "./views/screens/Minhas-compras/MinhasCompras";
import Login from "./views/screens/Login/Login";
import Cadastro from "./views/screens/Cadastro/Cadastro";
import Carrinho from "./views/screens/Carrinho/Carrinho";
import Home from "./views/screens/Home/Home";
import DetalhesProduto from "./views/screens/DetalhesProdutos/DetalhesProduto";
import MeuPerfil from "./views/screens/Meu-perfil/Meu-perfil";

import Pagamento from "./views/screens/Pagamento/Pagamento";
import Header from './views/screens/Header/Header'

function App() {
  return (
    <>
      <div className="App">
        <Header />
        {/* <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/home"}>
              <a>
                <img
                  src="https://i.imgur.com/dbIyC3T.png"
                  height="80px"
                  width="100px"
                />
              </a>
            </Link>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/new-announcement"}>
                    Cadastro de anuncios
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Cadastro
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/cart"}>
                    Carrinho
                  </Link>
                  <Link className="nav-link" to={"/my-account"}>
                    Minha conta
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/my-account"}>
                    Minha conta
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav> */}


        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={Cadastro} />
              <Route path="/cart" component={Carrinho} />
              <Route path="/home" component={Home} />
              <Route path="/detalhesProduto" component={DetalhesProduto} />
              <Route path="/my-account" component={MeuPerfil} />

              <Route path="/checkout" component={Pagamento} />
              <Route path="/my-ads" component={MeusAnuncios} />
              <Route path="/new-announcement" component={CadastroAnuncio} />
              <Route path="/my-shopping" component={MinhasCompras} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;