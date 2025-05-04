
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { toast } from '../components/ui/use-toast';

interface QuoteItem {
  id: string;
  productName: string;
  image: string;
  requestDate: string;
  status: 'pending' | 'completed' | 'rejected';
  price?: number;
}

const MyQuotes: React.FC = () => {
  const [quotes, setQuotes] = useState<QuoteItem[]>([
    {
      id: 'q1',
      productName: 'Bolsa Louis Vuitton Neverfull',
      image: 'https://www.creativosonline.org/wp-content/uploads/2022/08/Placeholder.jpg',
      requestDate: '2025-04-28',
      status: 'pending'
    },
    {
      id: 'q2',
      productName: 'Tênis Nike Air Force 1',
      image: 'https://www.creativosonline.org/wp-content/uploads/2022/08/Placeholder.jpg',
      requestDate: '2025-04-27',
      status: 'completed',
      price: 4500
    },
    {
      id: 'q3',
      productName: 'Relógio Rolex Submariner',
      image: 'https://www.creativosonline.org/wp-content/uploads/2022/08/Placeholder.jpg',
      requestDate: '2025-04-25',
      status: 'rejected'
    }
  ]);

  const handleAcceptPrice = (id: string, price: number) => {
    toast({
      title: "Cotação aceita",
      description: `Você aceitou o valor de R$ ${price.toLocaleString('pt-BR')}. Você será redirecionado para o pagamento.`,
    });
  };

  const handleReject = (id: string) => {
    setQuotes(quotes.filter(quote => quote.id !== id));
    toast({
      title: "Cotação rejeitada",
      description: "A cotação foi removida da sua lista.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 font-bold text-xs">AGUARDANDO</span>;
      case 'completed':
        return <span className="bg-green-100 text-green-800 px-2 py-1 font-bold text-xs">COTADO</span>;
      case 'rejected':
        return <span className="bg-red-100 text-red-800 px-2 py-1 font-bold text-xs">REJEITADO</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-20 max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 uppercase">Minhas Cotações</h1>
        
        {quotes.length === 0 ? (
          <div className="brutalist-border p-8 text-center">
            <p className="text-xl">Você não possui nenhuma cotação no momento.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {quotes.map(quote => (
              <div key={quote.id} className="brutalist-border p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="md:col-span-1">
                  <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
                    <img src={quote.image} alt={quote.productName} className="max-w-full max-h-full" />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h2 className="font-bold text-lg">{quote.productName}</h2>
                  <p className="text-sm">Solicitado em: {new Date(quote.requestDate).toLocaleDateString('pt-BR')}</p>
                  <div className="mt-2">{getStatusBadge(quote.status)}</div>
                  
                  {quote.status === 'completed' && quote.price && (
                    <p className="mt-2 text-xl font-bold">R$ {quote.price.toLocaleString('pt-BR')}</p>
                  )}
                </div>
                
                <div className="md:col-span-1 flex flex-col space-y-2">
                  {quote.status === 'completed' && quote.price && (
                    <>
                      <button 
                        onClick={() => handleAcceptPrice(quote.id, quote.price!)}
                        className="brutalist-button"
                      >
                        ACEITAR
                      </button>
                      <button 
                        onClick={() => handleReject(quote.id)}
                        className="bg-white text-black px-6 py-3 border-2 border-black hover:bg-black hover:text-white transition-colors uppercase font-bold"
                      >
                        RECUSAR
                      </button>
                    </>
                  )}
                  
                  {quote.status === 'pending' && (
                    <p className="text-sm text-center italic">Aguardando análise</p>
                  )}
                  
                  {quote.status === 'rejected' && (
                    <p className="text-sm text-center italic">Não foi possível cotar este item</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyQuotes;
