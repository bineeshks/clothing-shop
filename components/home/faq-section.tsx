'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What materials do you use?',
    answer:
      'We use premium sustainable materials including organic linen, sustainable silk, recycled cotton, and ethically sourced cashmere. Every fabric is chosen for both quality and environmental impact.',
  },
  {
    question: 'How do I find my size?',
    answer:
      'Each product page has a detailed size guide. We recommend measuring your bust, waist, and hips and comparing with our size chart. If you are between sizes, we generally recommend sizing up for a more comfortable fit.',
  },
  {
    question: 'How can I place an order?',
    answer:
      'You can place orders directly through WhatsApp by clicking the "Order on WhatsApp" button on any product page, or send us an inquiry using the "Send Inquiry" form. We will confirm availability and provide payment details.',
  },
  {
    question: 'Do you offer custom sizing?',
    answer:
      'Yes! Many of our pieces can be customized. Please reach out via WhatsApp or send an inquiry with your measurements and our team will get back to you with options.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day return policy on all items in their original condition with tags attached. Items must be unworn, unwashed, and in original packaging. Contact us to initiate a return.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Local delivery in Addis Ababa takes 1–3 business days. Nationwide delivery takes 3–7 business days. International orders are handled case by case — please contact us for details.',
  },
  {
    question: 'Are your products ethically made?',
    answer:
      'Absolutely. We partner exclusively with artisans and manufacturers who uphold fair wages, safe working conditions, and sustainable practices. Ethical production is at the heart of everything we do at Vellora.',
  },
  {
    question: 'Can I see products before purchasing?',
    answer:
      'Yes! We welcome in-store visits at our Addis Ababa showroom. Please contact us via WhatsApp to schedule an appointment.',
  },
]

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-5 text-left gap-4"
      >
        <span className="font-semibold text-foreground">{faq.question}</span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted-foreground leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about Vellora and our products.
          </p>
        </div>

        <div className="bg-background rounded-xl border border-border shadow-sm divide-y divide-border overflow-hidden">
          {faqs.map((faq, idx) => (
            <div key={idx} className="px-6">
              <FAQItem
                faq={faq}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
