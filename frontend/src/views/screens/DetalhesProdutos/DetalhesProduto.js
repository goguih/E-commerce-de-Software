import FloatingActionButtonZoom from './MenuDetalhesAvaliacao'
import FooterMenu from '../Footer/Footer';
import { ShowCardProduct } from './ImagemDetalhes';
import LocalStorage from '../../../LocalStorage';

export default function DetalhesProduto() {
  return (
    <>
      <ShowCardProduct productId={LocalStorage.getProductDetails()}/>
      <FloatingActionButtonZoom productId={LocalStorage.getProductDetails()}/>
      <FooterMenu/>
    </>
  );
}
