
import React, { useState } from 'react';
import Navigation from '../components/Navigation';

interface Order {
  id: string;
  productName: string;
  price: number;
  date: string;
  status: 'processing' | 'paid' | 'shipping' | 'delivered';
  image: string;
  isDeposit: boolean;
  depositPercentage?: number;
  estimatedDelivery?: string;
}

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ord1',
      productName: 'Bolsa Matelassê',
      price: 9000,
      date: '2025-05-01',
      status: 'processing',
      image: 'https://cdnv2.moovin.com.br/karitaideale/imagens/produtos/det/bolsa_transversal_media_matelasse__-62615ce774e1f53fcf326d0e5654d97e.jpg',
      isDeposit: true,
      depositPercentage: 45,
      estimatedDelivery: '2025-06-15'
    },
    {
      id: 'ord2',
      productName: 'Carteira Premium',
      price: 2800,
      date: '2025-04-25',
      status: 'paid',
      image: 'https://cdn.anscommerce.com/image/tr:h-1000,w-1000,cm-pad_resize/data/tom_ford/17-Apr-2023/760836303157_0.jpg',
      isDeposit: false,
      estimatedDelivery: '2025-05-10'
    },
    {
      id: 'ord3',
      productName: 'Lenço de Seda',
      price: 1500,
      date: '2025-04-15',
      status: 'shipping',
      image: 'https://images.tcdn.com.br/img/img_prod/1044001/lenco_hermes_seda_rosa_1903_1_20221004103455.jpg',
      isDeposit: false,
      estimatedDelivery: '2025-05-05'
    },
    {
      id: 'ord4',
      productName: 'Tênis Nike Air Force 1',
      price: 4500,
      date: '2025-04-01',
      status: 'delivered',
      image: 'https://www.creativosonline.org/wp-content/uploads/2022/08/Placeholder.jpg',
      isDeposit: false
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 font-bold text-xs">PROCESSANDO</span>;
      case 'paid':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 font-bold text-xs">PAGO</span>;
      case 'shipping':
        return <span className="bg-purple-100 text-purple-800 px-2 py-1 font-bold text-xs">ENVIADO</span>;
      case 'delivered':
        return <span className="bg-green-100 text-green-800 px-2 py-1 font-bold text-xs">ENTREGUE</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-20 max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 uppercase">Meus Pedidos</h1>
        
        {orders.length === 0 ? (
          <div className="brutalist-border p-8 text-center">
            <p className="text-xl">Você ainda não realizou nenhum pedido.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="brutalist-border p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="md:col-span-1">
                  <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
                    <img src={order.image} alt={order.productName} className="max-w-full max-h-full object-cover" />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h2 className="font-bold text-lg">{order.productName}</h2>
                  <p className="text-sm">Pedido em: {new Date(order.date).toLocaleDateString('pt-BR')}</p>
                  <p className="font-bold mt-1">R$ {order.price.toLocaleString('pt-BR')}</p>
                  
                  {order.isDeposit && order.depositPercentage && (
                    <p className="text-sm">
                      Sinal de {order.depositPercentage}% pago: 
                      R$ {((order.price * order.depositPercentage) / 100).toLocaleString('pt-BR')}
                    </p>
                  )}
                  
                  {order.estimatedDelivery && (
                    <p className="text-sm mt-1">
                      Entrega estimada: {new Date(order.estimatedDelivery).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                  
                  <div className="mt-2">{getStatusBadge(order.status)}</div>
                </div>
                
                <div className="md:col-span-1">
                  <div className="space-y-2">
                    <button className="brutalist-button w-full">DETALHES</button>
                    
                    {order.status === 'delivered' && (
                      <button className="bg-white text-black px-6 py-3 border-2 border-black hover:bg-black hover:text-white transition-colors uppercase font-bold w-full">
                        AVALIAR
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyOrders;
