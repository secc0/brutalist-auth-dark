
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { toast } from '../components/ui/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  deposit: number | null;
  image: string;
  description: string;
  isReadyToShip: boolean;
}

const PRODUCTS: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Bolsa Preta com Corrente',
    price: 18000,
    deposit: 40,
    image: 'https://cdn.sistemawbuy.com.br/arquivos/4b696c75bb15f9312d4927785e5708e2/produtos/QE8TA8/bolsa-de-corrente-media-preta-com-metais-dourados-chanel-inspired-01-4510.jpg',
    description: 'Bolsa preta de alta qualidade com corrente dourada. Couro legítimo e acabamento premium. Produto importado com garantia de autenticidade.',
    isReadyToShip: false
  },
  '2': {
    id: '2',
    name: 'Bolsa Matelassê',
    price: 9000,
    deposit: 45,
    image: 'https://cdnv2.moovin.com.br/karitaideale/imagens/produtos/det/bolsa_transversal_media_matelasse__-62615ce774e1f53fcf326d0e5654d97e.jpg',
    description: 'Bolsa matelassê transversal média. Material premium com detalhes refinados. Produto importado com garantia de autenticidade.',
    isReadyToShip: false
  },
  '3': {
    id: '3',
    name: 'Tênis Preto Premium',
    price: 13500,
    deposit: 40,
    image: 'https://authenticfeet.vtexassets.com/arquivos/ids/474284/FQ733-1-001-1-AF-800x1000.jpg?v=638592654455130000',
    description: 'Tênis preto premium de marca renomada. Conforto e estilo garantidos. Produto importado com garantia de autenticidade.',
    isReadyToShip: false
  },
  '4': {
    id: '4',
    name: 'Bolsa Marrom Pequena',
    price: 6500,
    deposit: null,
    image: 'https://meiasola.vtexassets.com/arquivos/ids/719737/bolsa-marrom-eco-big-floater-pequena-arezzo-1.jpg?v=637971444133930000',
    description: 'Bolsa marrom pequena com design elegante e prático. Perfeita para ocasiões casuais. Disponível para entrega imediata.',
    isReadyToShip: true
  }
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (id && PRODUCTS[id]) {
      setProduct(PRODUCTS[id]);
    } else {
      navigate('/dashboard');
    }
  }, [id, navigate]);

  const handlePurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      toast({
        title: product?.isReadyToShip ? "Compra finalizada!" : "Reserva confirmada!",
        description: product?.isReadyToShip 
          ? "Seu pedido foi confirmado e está em processamento." 
          : `Sua reserva foi confirmada com um sinal de ${product?.deposit}%.`,
      });
      setIsProcessing(false);
      navigate('/my-orders');
    }, 1500);
  };

  if (!product) return null;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-20 max-w-5xl mx-auto px-4 py-8">
        <div className="brutalist-border p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full aspect-square object-cover border-2 border-black"
            />
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl font-bold">R$ {product.price.toLocaleString('pt-BR')}</p>
            
            {product.deposit && (
              <p className="mb-4 text-lg">{product.deposit}% de sinal necessário</p>
            )}
            
            <div className="border-t-2 border-b-2 border-black py-4 my-4">
              <h2 className="font-bold mb-2 text-lg uppercase">Descrição</h2>
              <p>{product.description}</p>
            </div>
            
            <button
              onClick={handlePurchase}
              disabled={isProcessing}
              className="brutalist-button mt-auto"
            >
              {isProcessing ? 'PROCESSANDO...' : product.isReadyToShip ? 'COMPRAR AGORA' : 'RESERVAR COM SINAL'}
            </button>
            
            <button
              onClick={() => navigate(-1)}
              className="mt-4 font-bold underline hover:no-underline text-center"
            >
              VOLTAR
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
