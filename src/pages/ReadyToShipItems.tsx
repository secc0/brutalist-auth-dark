
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const READY_PRODUCTS: Product[] = [
  {
    id: '4',
    name: 'Bolsa Marrom Pequena',
    price: 6500,
    image: 'https://meiasola.vtexassets.com/arquivos/ids/719737/bolsa-marrom-eco-big-floater-pequena-arezzo-1.jpg?v=637971444133930000'
  },
  {
    id: '7',
    name: 'Carteira Premium',
    price: 2800,
    image: 'https://cdn.anscommerce.com/image/tr:h-1000,w-1000,cm-pad_resize/data/tom_ford/17-Apr-2023/760836303157_0.jpg'
  },
  {
    id: '8',
    name: 'Lenço de Seda',
    price: 1500,
    image: 'https://images.tcdn.com.br/img/img_prod/1044001/lenco_hermes_seda_rosa_1903_1_20221004103455.jpg'
  },
  {
    id: '9',
    name: 'Pulseira de Ouro',
    price: 7800,
    image: 'https://cdn.shopify.com/s/files/1/0253/3382/7886/products/tiffany-hardwear-micro-link-bracelet-70383237_1040790_ED_M_1024x1024.jpg?v=1652273942'
  }
];

const ReadyToShipItems: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-20 max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 uppercase">Peças à pronta entrega</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {READY_PRODUCTS.map(product => (
            <div key={product.id} className="brutalist-border p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover mb-4"
              />
              <div className="text-center">
                <h3 className="font-bold mb-2">{product.name}</h3>
                <p className="text-xl font-bold mb-4">R$ {product.price.toLocaleString('pt-BR')}</p>
                <button 
                  onClick={() => navigate(`/products/${product.id}`)} 
                  className="brutalist-button w-full"
                >
                  COMPRAR AGORA
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ReadyToShipItems;
