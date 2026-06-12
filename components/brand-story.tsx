import Image from 'next/image'

export function BrandStory() {
  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative h-96 md:h-full min-h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder-brand-story.jpg"
              alt="Vellora Brand Story"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-semibold mb-4">
              Our Heritage
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-6">
              Crafted with Purpose
            </h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              Vellora was born from a vision to celebrate Ethiopian craftsmanship while addressing global sustainability challenges. We believe that luxury and responsibility can coexist beautifully.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Every piece in our collection is thoughtfully designed and ethically produced by skilled artisans who take pride in their craft. We partner with local communities, ensuring fair wages and sustainable practices throughout our supply chain.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
              <div>
                <p className="font-serif text-3xl font-bold text-primary mb-2">2018</p>
                <p className="text-sm text-muted-foreground">Founded with a mission</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-primary mb-2">15+</p>
                <p className="text-sm text-muted-foreground">Artisan communities partnered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
