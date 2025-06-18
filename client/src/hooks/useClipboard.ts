import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useClipboard() {
  const [isCopying, setIsCopying] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    if (!text) return;
    
    setIsCopying(true);
    
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copiado!",
        description: "Texto copiado para a área de transferência",
      });
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      toast({
        title: "Copiado!",
        description: "Texto copiado para a área de transferência",
      });
    } finally {
      setIsCopying(false);
    }
  };

  return { copyToClipboard, isCopying };
}
