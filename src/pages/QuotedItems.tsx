
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

interface Product {
  id: string;
  name: string;
  price: number;
  deposit: number;
  image: string;
}

const QUOTED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Bolsa Preta com Corrente',
    price: 18000,
    deposit: 40,
    image: 'https://cdn.sistemawbuy.com.br/arquivos/4b696c75bb15f9312d4927785e5708e2/produtos/QE8TA8/bolsa-de-corrente-media-preta-com-metais-dourados-chanel-inspired-01-4510.jpg'
  },
  {
    id: '2',
    name: 'Bolsa Matelassê',
    price: 9000,
    deposit: 45,
    image: 'https://cdnv2.moovin.com.br/karitaideale/imagens/produtos/det/bolsa_transversal_media_matelasse__-62615ce774e1f53fcf326d0e5654d97e.jpg'
  },
  {
    id: '3',
    name: 'Tênis Preto Premium',
    price: 13500,
    deposit: 40,
    image: 'https://authenticfeet.vtexassets.com/arquivos/ids/474284/FQ733-1-001-1-AF-800x1000.jpg?v=638592654455130000'
  },
  {
    id: '5',
    name: 'Óculos de Sol Premium',
    price: 4200,
    deposit: 30,
    image: 'https://images.ray-ban.com/is/image/RayBan/805289005568__002.png?impolicy=RB_Product&width=1024&bgc=%23f2f2f2'
  },
  {
    id: '6',
    name: 'Relógio Luxo',
    price: 25000,
    deposit: 50,
    image: 'https://content.rolex.com/v7/dam/2023-06/upright-cc/m126900-0001.png?impolicy=v7-grid&imwidth=320'
  }
];

const QuotedItems: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-20 max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 uppercase">Peças já cotadas</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {QUOTED_PRODUCTS.map(product => (
            <div key={product.id} className="brutalist-border p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover mb-4"
              />
              <div className="text-center">
                <h3 className="font-bold mb-2">{product.name}</h3>
                <p className="text-xl font-bold">R$ {product.price.toLocaleString('pt-BR')}</p>
                <p className="mb-4">{product.deposit}% de sinal</p>
                <button 
                  onClick={() => navigate(`/products/${product.id}`)} 
                  className="brutalist-button w-full"
                >
                  RESERVAR COM SINAL
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default QuotedItems;
