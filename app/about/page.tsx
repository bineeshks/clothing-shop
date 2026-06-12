import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'

export const metadata = {
  title: 'About Vellora | Ethical Fashion',
  description: 'Learn about Vellora\'s mission to create sustainable, ethical fashion while supporting artisan communities.',
}

const values = [
  {
    title: 'Ethical Sourcing',
    description: 'We partner directly with artisans and communities, ensuring fair wages and sustainable practices.',
    icon: '🌿',
  },
  {
    title: 'Quality Craftsmanship',
    description: 'Each piece is carefully crafted using traditional techniques combined with modern design.',
    icon: '✨',
  },
  {
    title: 'Sustainability',
    description: 'Our materials are eco-friendly and our production methods minimize environmental impact.',
    icon: '♻️',
  },
  {
    title: 'Community Support',
    description: 'We invest in the communities we work with, supporting education and economic development.',
    icon: '🤝',
  },
]

const team = [
  {
    name: 'Almaz Tekle',
    role: 'Founder & Creative Director',
    image: '/placeholder-team-1.jpg',
  },
  {
    name: 'Daniel Abebe',
    role: 'Operations Manager',
    image: '/placeholder-team-2.jpg',
  },
  {
    name: 'Sara Mohammed',
    role: 'Community Liaison',
    image: '/placeholder-team-3.jpg',
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-5xl sm:text-6xl font-bold mb-6">
              Our Story
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Vellora began as a vision to bridge the gap between luxury fashion and ethical responsibility. We believe that every piece of clothing tells a story, and we're committed to making sure it's a story worth telling.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
              <div className="relative h-96 md:h-full min-h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder-about-story.jpg"
                  alt="Vellora Artisans"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-serif text-4xl font-bold mb-6">
                  Founded with Purpose
                </h2>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  In 2018, founder Almaz Tekle returned to Ethiopia after years working in the international fashion industry. She witnessed firsthand the disconnect between luxury brands and the artisans creating exceptional pieces.
                </p>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  This sparked the creation of Vellora—a brand dedicated to celebrating Ethiopian craftsmanship while ensuring every artisan is valued, paid fairly, and recognized for their contribution.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Today, we partner with over 15 artisan communities, supporting thousands of families while creating pieces that reflect both tradition and contemporary elegance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 sm:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These principles guide every decision we make, from sourcing materials to engaging with our community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="p-6">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="font-serif text-2xl font-semibold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 sm:py-24 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-5xl font-bold mb-2">5,000+</p>
                <p className="text-lg opacity-90">Artisans Supported</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold mb-2">15+</p>
                <p className="text-lg opacity-90">Communities</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold mb-2">100%</p>
                <p className="text-lg opacity-90">Fair Trade</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-muted-foreground">
                Dedicated to bringing ethical fashion to the world
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
