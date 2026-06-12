'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { Button } from '@/components/ui/button'
import { Mail, MapPin, Phone, Check } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsLoading(false)
      setTimeout(() => setIsSubmitted(false), 3000)
    }, 1000)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-5xl sm:text-6xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions? We&apos;d love to hear from you. Contact us through any of the channels below.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-3xl font-bold mb-8">Contact Information</h2>
                  <p className="text-muted-foreground mb-8">
                    Reach out to us via any of the following channels. We&apos;re here to help!
                  </p>
                </div>

                {/* Location */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                      <MapPin className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      Addis Ababa, Ethiopia
                      <br />
                      Bole District
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                      <Phone className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Phone</h3>
                    <a
                      href="tel:+251912345678"
                      className="text-primary hover:underline"
                    >
                      +251 912 345 678
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                      <Mail className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:hello@vellora.com"
                      className="text-primary hover:underline"
                    >
                      hello@vellora.com
                    </a>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="pt-8 border-t border-border">
                  <h3 className="text-lg font-semibold mb-4">Quick Response</h3>
                  <p className="text-muted-foreground mb-4">
                    For the fastest response, chat with us on WhatsApp
                  </p>
                  <WhatsAppButton
                    message="Hi Vellora! I have a question about your products."
                    variant="secondary"
                  />
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card rounded-lg p-8 border border-border">
                <h2 className="font-serif text-3xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject || ''}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message || ''}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 text-lg transition-all ${
                      isSubmitted
                        ? 'bg-green-600 hover:bg-green-600'
                        : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    }`}
                  >
                    {isSubmitted ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Message Sent!
                      </>
                    ) : isLoading ? (
                      'Sending...'
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 sm:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg overflow-hidden h-96 bg-muted">
              <Image
                src="/placeholder-map.jpg"
                alt="Vellora Location"
                width={1200}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
