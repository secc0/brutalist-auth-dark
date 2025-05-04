
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { toast } from '../components/ui/use-toast';
import { Button } from '../components/ui/button';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('user');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [itemName, setItemName] = useState('');
  const [itemState, setItemState] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAuthenticated) return;
    
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isAuthenticated) return;
    
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleSubmitQuote = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isAuthenticated) return;
    
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Cotação enviada com sucesso!",
        description: "Entraremos em contato em breve.",
      });
      setUploadedImage(null);
      setItemName('');
      setItemState('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navigation />
      
      {/* Main Content */}
      <main className="pt-20">
        <header className="text-center p-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Importação de Peças de Luxo</h1>
          <p className="max-w-2xl mx-auto text-lg">
            Realizamos importações de peças de luxo com valor justo e entrega
            rápida. Escolha uma das três modalidades: Solicitar cotação, Peças já
            cotadas ou Pronta entrega. Peças com sinal são aquelas que ainda não
            estão no Brasil.
          </p>
        </header>

        <section id="cotacao" className="max-w-5xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-center mb-6 uppercase">Solicite uma cotação</h2>
          <div className="brutalist-border bg-white p-8 flex flex-col md:flex-row gap-8">
            {!isAuthenticated ? (
              <div className="w-full flex flex-col items-center justify-center p-8">
                <p className="text-lg mb-6 text-center">Para solicitar uma cotação, você precisa estar logado.</p>
                <Button 
                  onClick={() => navigate('/login')} 
                  className="brutalist-button"
                >
                  FAZER LOGIN
                </Button>
              </div>
            ) : (
              <>
                <div
                  className={`w-full md:w-1/2 h-48 border-2 border-dashed ${uploadedImage ? 'border-black' : 'border-gray-400'} flex items-center justify-center cursor-pointer`}
                  onClick={() => document.getElementById('fileInput')?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {uploadedImage ? (
                    <img src={uploadedImage} alt="Product preview" className="max-h-full max-w-full" />
                  ) : (
                    <div className="text-center p-4 text-gray-500">
                      <p>Arraste uma foto ou clique para enviar</p>
                    </div>
                  )}
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </div>
                
                <form onSubmit={handleSubmitQuote} className="w-full md:w-1/2 space-y-4">
                  <div>
                    <label className="block font-bold text-sm mb-1">NOME DA PEÇA</label>
                    <input
                      type="text"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      required
                      className="brutalist-input w-full"
                      placeholder="Ex: Bolsa Chanel Classic Flap"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-bold text-sm mb-1">ESTADO DA PEÇA</label>
                    <select
                      value={itemState}
                      onChange={(e) => setItemState(e.target.value)}
                      required
                      className="brutalist-input w-full"
                    >
                      <option value="">Selecione o estado</option>
                      <option value="novo">Novo</option>
                      <option value=">9.5">Acima de 9.5</option>
                      <option value=">9">Acima de 9</option>
                      <option value=">8.5">Acima de 8.5</option>
                      <option value="8.5">8.5 para baixo</option>
                    </select>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="brutalist-button w-full"
                  >
                    {isSubmitting ? 'ENVIANDO...' : 'SOLICITAR COTAÇÃO'}
                  </button>
                </form>
              </>
            )}
          </div>
        </section>

        <section id="cotadas" className="max-w-5xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-center mb-6 uppercase">Peças já cotadas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="brutalist-border p-4">
              <img
                src="https://cdn.sistemawbuy.com.br/arquivos/4b696c75bb15f9312d4927785e5708e2/produtos/QE8TA8/bolsa-de-corrente-media-preta-com-metais-dourados-chanel-inspired-01-4510.jpg"
                alt="Bolsa preta"
                className="w-full h-64 object-cover mb-4"
              />
              <div className="text-center">
                <p className="text-xl font-bold">R$ 18.000</p>
                <p className="mb-4">40% de sinal</p>
                <button 
                  onClick={() => isAuthenticated ? navigate('/products/1') : navigate('/login')} 
                  className="brutalist-button w-full"
                >
                  {isAuthenticated ? 'RESERVAR COM SINAL' : 'FAZER LOGIN PARA RESERVAR'}
                </button>
              </div>
            </div>
            
            <div className="brutalist-border p-4">
              <img
                src="https://cdnv2.moovin.com.br/karitaideale/imagens/produtos/det/bolsa_transversal_media_matelasse__-62615ce774e1f53fcf326d0e5654d97e.jpg"
                alt="Bolsa matelassê"
                className="w-full h-64 object-cover mb-4"
              />
              <div className="text-center">
                <p className="text-xl font-bold">R$ 9.000</p>
                <p className="mb-4">45% de sinal</p>
                <button 
                  onClick={() => isAuthenticated ? navigate('/products/2') : navigate('/login')} 
                  className="brutalist-button w-full"
                >
                  {isAuthenticated ? 'RESERVAR COM SINAL' : 'FAZER LOGIN PARA RESERVAR'}
                </button>
              </div>
            </div>
            
            <div className="brutalist-border p-4">
              <img
                src="https://authenticfeet.vtexassets.com/arquivos/ids/474284/FQ733-1-001-1-AF-800x1000.jpg?v=638592654455130000"
                alt="Tênis preto"
                className="w-full h-64 object-cover mb-4"
              />
              <div className="text-center">
                <p className="text-xl font-bold">R$ 13.500</p>
                <p className="mb-4">40% de sinal</p>
                <button 
                  onClick={() => isAuthenticated ? navigate('/products/3') : navigate('/login')} 
                  className="brutalist-button w-full"
                >
                  {isAuthenticated ? 'RESERVAR COM SINAL' : 'FAZER LOGIN PARA RESERVAR'}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="pronta" className="max-w-5xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-center mb-6 uppercase">Peças à pronta entrega</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="brutalist-border p-4">
              <img
                src="https://meiasola.vtexassets.com/arquivos/ids/719737/bolsa-marrom-eco-big-floater-pequena-arezzo-1.jpg?v=637971444133930000"
                alt="Bolsa marrom pequena"
                className="w-full h-64 object-cover mb-4"
              />
              <div className="text-center">
                <p className="text-xl font-bold">R$ 6.500</p>
                <button 
                  onClick={() => isAuthenticated ? navigate('/products/4') : navigate('/login')} 
                  className="brutalist-button w-full"
                >
                  {isAuthenticated ? 'COMPRAR AGORA' : 'FAZER LOGIN PARA COMPRAR'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t-2 border-black py-8 text-center">
        <p className="font-bold">© 2025 IMPORTA LUXO. TODOS OS DIREITOS RESERVADOS.</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
