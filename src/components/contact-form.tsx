
'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';
import { createContact } from '@/services/api';

export function ContactForm() {
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSuccessMessage(null);
    setErrorMessage(null);
    setSubmitting(true);

    try {
      const data = await createContact({ name, email, phone, message });
      console.log('Contact form response:', data);

      if (!data?.success) {
        const errorText = data?.error || 'Something went wrong. Please try again.';
        setErrorMessage(errorText);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: errorText,
        });
        return;
      }

      // Meta (Facebook) Pixel - Lead event on successful form submission
      if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
        (window as any).fbq('track', 'Lead', {
          name,
          email,
          phone,
        });
      }

      setSuccessMessage("Thanks for reaching out. We'll get back to you shortly.");
      toast({
        title: 'Message Sent!',
        description: "Thanks for reaching out. We'll get back to you shortly.",
      });

      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error('Contact form error:', error);
      const errorText = 'Could not send the message. Please try again later.';
      setErrorMessage(errorText);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: errorText,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            {'> Your Name'}
          </label>
          <Input
            placeholder="name: 'John Doe'"
            className="font-code"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            {'> Your Email'}
          </label>
          <Input
            type="email"
            placeholder="email: 'user@example.com'"
            className="font-code"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">
          {'> Mobile Number'}
        </label>
        <Input
          placeholder="phone: '+91 12345 67890'"
          className="font-code"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">
          {'> Message / Project Details'}
        </label>
        <Textarea
          placeholder="details: 'The app should allow users to...'"
          className="font-code min-h-[120px] sm:min-h-[150px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      {successMessage && (
        <p className="text-sm text-emerald-600">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <div className="flex justify-end">
        <Button type="submit" className="w-full sm:w-auto" disabled={submitting}>
          {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send />}
          <span className="ml-2">
            {submitting ? 'Sending...' : '$ send-message'}
          </span>
        </Button>
      </div>
    </form>
  );
}
