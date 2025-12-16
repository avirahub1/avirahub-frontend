
'use client';

import { useState, useTransition, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Loader2, MessageSquare, Send, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  sender: 'bot' | 'user';
  text: string;
};

type Step = 'asking_name' | 'asking_phone' | 'asking_details' | 'submitting' | 'completed';

const initialMessages: Record<Step, Message> = {
    asking_name: { sender: 'bot', text: "Hello! To start, what's your name?" },
    asking_phone: { sender: 'bot', text: "Thanks, {name}! What's your phone number?" },
    asking_details: { sender: 'bot', text: 'Great. Now, please tell me about your project idea.' },
    submitting: { sender: 'bot', text: 'Perfect! Sending your details to our team now...' },
    completed: { sender: 'bot', text: "All done! We've received your message and will get in touch shortly. Thanks for reaching out!" }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState<Step>('asking_name');
  const [messages, setMessages] = useState<Message[]>([initialMessages.asking_name]);
  const [userInput, setUserInput] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A bit of a timeout to allow the new message to render
        setTimeout(() => {
            const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }, 100);
    }
  }, [messages]);

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const proceedToNextStep = (nextStep: Step, botMessage: Message) => {
    setMessages(prev => [...prev, botMessage]);
    setCurrentStep(nextStep);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.trim() || isPending) return;

    const userMessage: Message = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    
    switch (currentStep) {
      case 'asking_name':
        setFormData(prev => ({ ...prev, name: userInput }));
        proceedToNextStep('asking_phone', { sender: 'bot', text: initialMessages.asking_phone.text.replace('{name}', userInput) });
        break;
        
      case 'asking_phone':
        setFormData(prev => ({ ...prev, phone: userInput }));
        proceedToNextStep('asking_details', initialMessages.asking_details);
        break;

      case 'asking_details':
        const finalData = { ...formData, message: userInput };
        setFormData(finalData);
        setCurrentStep('submitting');
        setMessages(prev => [...prev, initialMessages.submitting]);
        
        startTransition(async () => {
          try {
            await emailjs.send(
              'service_u2qiywb',
              'template_oy55g01',
              { ...finalData, details: finalData.message, email: "-" }, // Adapt to the template's variables
              'zoGKtfuMzJWjeS4k7'
            );
            proceedToNextStep('completed', initialMessages.completed);
          } catch (error) {
            console.error('EmailJS failed:', error);
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "Could not send the message. Please try again later.",
            });
            // Reset to allow retry
            setMessages(prev => [...prev, { sender: 'bot', text: 'Something went wrong. Please try sending your project details again.' }]);
            setCurrentStep('asking_details');
          }
        });
        break;
    }
    setUserInput('');
  };
  
  const restartChat = () => {
      setMessages([initialMessages.asking_name]);
      setCurrentStep('asking_name');
      setFormData({ name: '', phone: '', message: '' });
      setUserInput('');
  }

  const getInputPlaceholder = () => {
      switch (currentStep) {
          case 'asking_name': return 'Your full name...';
          case 'asking_phone': return 'Your phone number...';
          case 'asking_details': return 'Describe your project idea...';
          default: return 'Please wait...';
      }
  }


  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => {
              setIsOpen(!isOpen);
              if (isOpen && currentStep === 'completed') {
                  // Reset chat when closing after completion
                  setTimeout(restartChat, 300);
              }
          }}
          size="icon"
          className="rounded-full w-16 h-16 shadow-lg"
        >
          {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
        </Button>
      </div>

      <div
        className={cn(
          'fixed bottom-24 right-6 z-50 w-[90vw] max-w-sm flex flex-col bg-card border border-border rounded-xl shadow-2xl transition-all duration-300 origin-bottom-right',
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        )}
        style={{height: 'min(70vh, 500px)'}}
      >
        <header className="p-4 border-b border-border flex items-center gap-3">
          <Bot className="h-6 w-6 text-primary" />
          <h3 className="font-semibold text-lg">Avira Hub Assistant</h3>
        </header>

        <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={cn("flex items-end gap-2", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                        {msg.sender === 'bot' && (
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-5 w-5"/></AvatarFallback>
                            </Avatar>
                        )}
                        <div className={cn(
                            "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                            msg.sender === 'user' ? "bg-primary text-primary-foreground" : "bg-muted"
                        )}>
                           <p>{msg.text}</p>
                        </div>
                         {msg.sender === 'user' && (
                            <Avatar className="h-8 w-8">
                                <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
                {isPending && currentStep === 'submitting' && (
                    <div className="flex items-end gap-2 justify-start">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-5 w-5"/></AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-lg px-3 py-2 text-sm flex items-center">
                            <Loader2 className="h-4 w-4 animate-spin"/>
                        </div>
                    </div>
                )}
            </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          {currentStep === 'completed' ? (
              <Button onClick={restartChat} className="w-full">Start a New Conversation</Button>
          ) : (
             <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Input
                  value={userInput}
                  onChange={handleUserInput}
                  placeholder={getInputPlaceholder()}
                  disabled={isPending}
                  required
                />
                <Button type="submit" size="icon" disabled={isPending || !userInput.trim()}>
                  {isPending ? <Loader2 className="animate-spin" /> : <Send />}
                  <span className="sr-only">Send</span>
                </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
