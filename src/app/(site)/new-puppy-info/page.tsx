import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import { client } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'
import type { SiteSettings } from '@/lib/types'

export const metadata: Metadata = {
  title: 'New Puppy Information',
  description:
    'Vaccination schedules, parasite prevention, diet, spay and neuter timing, and training guidance for new puppies.',
  openGraph: {
    images: [
      {
        url: '/images/new-puppy-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'A cream-colored Labrador puppy sitting on green grass with an open-mouthed smile',
      },
    ],
  },
}

export const revalidate = 3600

type Item = { heading: string; body: string | string[] }
type Section = { title: string; intro?: string; items: Item[] }

const SECTIONS: Section[] = [
  {
    title: "Puppy's health journey: vaccination schedule",
    intro:
      'Ensuring your new puppy stays healthy and protected is one of the most important aspects of pet ownership. Vaccinations safeguard puppies from various contagious diseases. Your puppy is not considered immune until 7–10 days after the vaccine series is complete, so avoid taking them to public areas during this period.',
    items: [
      {
        heading: 'DHPPV / DAPPV vaccination',
        body: 'The parvovirus vaccine is a 4-in-1 vaccination covering Distemper, Hepatitis (Adenovirus), Parainfluenza, and Parvovirus. The first dose is administered as early as six weeks old, then given at 2–4 week intervals until at least 16 weeks old (totaling 3–4 doses). A booster is given one year after the final dose, then every three years.',
      },
      {
        heading: 'Canine distemper',
        body: 'An extremely contagious viral disease closely related to measles that spreads through the air. It attacks the gastrointestinal, respiratory, urogenital, and nervous systems. There is no cure, though some dogs recover with supportive treatment. Symptoms include high fever, runny nose, eye discharge, lethargy, loss of appetite, coughing, vomiting, diarrhea, seizures, and paralysis. Some dogs experience thickened or enlarged footpads.',
      },
      {
        heading: 'Adenovirus & hepatitis',
        body: 'Canine adenovirus type 1 causes hepatitis — swelling and cell damage in the liver — potentially causing hemorrhage and death. It spreads through feces and urine of infected dogs. Symptoms include abdominal pain and distension, loss of appetite, pale color, lethargy, fever, and tonsillitis. Fluid swelling in corneas often causes a "blue eye" appearance. Canine adenovirus type 2 is related and causes kennel cough; once vaccinated, severity is limited and death is unlikely.',
      },
      {
        heading: 'Parainfluenza',
        body: 'Highly contagious, with symptoms including dry cough, fever, wheezing, difficulty breathing, runny nose, sneezing, pneumonia, reduced appetite, lethargy, and eye inflammation. Most dogs recover independently, but immediate antibiotic and antiviral treatment is recommended due to contagiousness.',
      },
      {
        heading: 'Parvovirus',
        body: 'Extremely contagious, contracted through feces of infected dogs and living in the environment for up to 3 days. Parvo often kills young puppies; around 91% of untreated cases result in death. The vaccine is the only prevention. Dogs show symptoms within three to ten days: secondary infections, dehydration, lethargy, diarrhea, vomiting, endotoxemia, shock, and death. The vaccine takes up to two weeks to take full effect.',
      },
      {
        heading: 'Rabies vaccination',
        body: 'Given at 16 weeks of age. Rabies is a viral disease carried by many mammals and one of the few zoonotic diseases humans can catch from dogs. It spreads through bites from infected mammals and causes acute encephalitis, eventually infecting the entire nervous system and causing death. If treated before symptoms appear, rabies can be stopped; once symptoms appear, it becomes fatal. It can take 2–12 weeks or longer to present.',
      },
    ],
  },
  {
    title: 'Non-core vaccinations',
    items: [
      {
        heading: 'Bordetella (kennel cough)',
        body: 'Caused by bacteria and spread through airborne contaminants — exposure to infected dogs, contaminated bowls, and cages. Symptoms include fever, sneezing, nasal discharge, loss of appetite, and depression. Treatment is antibiotics and a cough suppressant. Untreated bordetella can lead to pneumonia and secondary bacterial infection.',
      },
      {
        heading: 'Canine influenza',
        body: 'Highly contagious — spreads through direct contact, nasal secretions, contaminated objects, and by people moving between infected and uninfected dogs. Year-round. Presents as lethargy, discharge, fever, dehydration, inappetence, vomiting, or diarrhea, potentially progressing to pneumonia. Can be life-threatening in immunocompromised, very young, and very old dogs.',
      },
      {
        heading: 'Leptospirosis',
        body: 'A bacterial infection that affects canines and humans and can result in death. Dogs become infected by consuming urine-contaminated water or contacting infected urine. Early symptoms: fever, vomiting, depression, loss of appetite, generalized pain, conjunctivitis. Later: temperature drop, increased thirst, urine color change, jaundice, frequent urination, dehydration, difficulty breathing, muscular tremors, vomiting, bloody feces. Antibiotics can shorten disease length and reduce organ damage if caught early. About 10% of cases result in death.',
      },
      {
        heading: 'Lyme disease',
        body: "Spreads through tick bites. Symptoms don't always appear; some dogs show swollen lymph nodes or lameness. Untreated Lyme disease can cause extreme inflammation in the nervous system, heart, and kidneys, potentially leading to death. We test via blood samples and treat positive dogs with Doxycycline. Advanced stages may require longer antibiotic treatment and nonsteroidal anti-inflammatory drugs.",
      },
      {
        heading: 'Side effects and risks',
        body: [
          'The benefits of vaccinations far outweigh any risks. Adverse reactions are rare, but vaccinations can cause some side effects, and monitoring your puppy after vaccination is recommended.',
          'Potential symptoms: fever, sluggishness, loss of appetite, facial or paw swelling and/or hives, vomiting, diarrhea, pain or swelling around the injection site. In rare cases: collapse, difficulty breathing, and seizures (anaphylactic shock). If your dog shows any symptoms after vaccination, contact our office or an emergency clinic.',
        ],
      },
    ],
  },
  {
    title: 'Parasite prevention, diet, and surgery',
    items: [
      {
        heading: 'Heartworm prevention',
        body: 'Heartworms are parasites lodging in the heart and lung vessels, spread by mosquitoes. Start preventative tablets at 8 weeks and continue for the dog\'s lifetime. Annual testing is recommended.',
      },
      {
        heading: 'Flea and tick prevention',
        body: [
          'Products we carry:',
          '• Revolution Plus Puppy — topical insecticide applied monthly; kills fleas, ticks, and heartworms.',
          '• Simparica — oral insecticide given monthly; kills fleas and ticks within 12 hours.',
          '• Bravecto — oral insecticide given every 3 months; kills fleas and ticks within 12 hours (only for dogs >6 months).',
        ],
      },
      {
        heading: 'The fecal exam',
        body: 'Many intestinal parasites puppies can carry exist. Bring a fecal sample for special testing. Some parasites are zoonotic (transmissible to humans), making this important for your pet\'s health and your family\'s.',
      },
      {
        heading: 'Diet',
        body: [
          'From weaning until 1 year of age, feed a main-brand puppy food such as Royal Canin, Science Diet, Iams, Eukanuba, Nutro, Pedigree, or Purina. Train puppies to be meal-fed rather than free-fed to prevent problems later in life.',
          'Small breed puppies: feed frequent small meals until about 16 weeks old to prevent low blood sugar problems.',
          'Large breed puppies (Great Danes, Dobermans, Golden Retrievers, Rottweilers, Labradors, etc.): feed large-breed designated puppy food. It has fewer calories per cup than regular puppy food and scientifically reduces orthopedic illness chances.',
        ],
      },
      {
        heading: 'Spay & neuter',
        body: 'Spay female puppies at 6–8 months old; neuter males around 1 year of age. Spaying before the first heat critically reduces mammary cancer development chances in adult females. Neutering reduces prostate inflammation and testicular cancer problems in adult males. Multiple studies are evaluating optimal spay/neuter timing — discuss timing with our veterinarians.',
      },
      {
        heading: 'Puppy training',
        body: 'Training courses are recommended for every puppy and owner, typically starting after 12 weeks of age, once two vaccination sets have been given.',
      },
    ],
  },
]

function renderBody(body: string | string[]) {
  if (Array.isArray(body)) {
    return body.map((line, i) => (
      <p key={i} className={i === 0 ? 'leading-relaxed text-[var(--color-ink)]/85' : 'mt-3 leading-relaxed text-[var(--color-ink)]/85'}>
        {line}
      </p>
    ))
  }
  return <p className="leading-relaxed text-[var(--color-ink)]/85">{body}</p>
}

export default async function NewPuppyInfoPage() {
  const settings = await client.fetch<SiteSettings | null>(siteSettingsQuery)
  const bookingUrl = settings?.bookingUrl || '#'

  return (
    <>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Container width="narrow">
          <Reveal>
            <p className="text-xs font-medium tracking-widest text-[var(--color-brand-500)] uppercase">
              Patient center
            </p>
            <h1 className="mt-3 text-4xl md:text-6xl">Start off on the right paw.</h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
              Bringing home a new puppy is an exciting adventure. Here&rsquo;s essential
              information on vaccinations, nutrition, parasite prevention, and care &mdash; so your
              pup grows up happy and healthy.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-4">
        <Container>
          <Reveal>
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-[var(--color-surface)] md:aspect-[16/9]">
              <Image
                src="/images/new-puppy-hero.jpg"
                alt="A cream-colored Labrador puppy sitting on green grass with a wide open-mouthed smile"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-12">
        <Container width="narrow">
          <div className="space-y-16">
            {SECTIONS.map((section, si) => (
              <Reveal key={section.title} delay={si * 0.05}>
                <div>
                  <h2 className="mb-6 text-3xl md:text-4xl">{section.title}</h2>
                  {section.intro && (
                    <p className="mb-8 leading-relaxed text-[var(--color-ink)]/85">
                      {section.intro}
                    </p>
                  )}
                  <div className="space-y-6">
                    {section.items.map((item) => (
                      <div
                        key={item.heading}
                        className="border-l-2 border-[var(--color-brand-500)] pl-6"
                      >
                        <p className="font-semibold text-lg text-[var(--color-brand-700)]">
                          {item.heading}
                        </p>
                        <div className="mt-3">{renderBody(item.body)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-surface)] py-16">
        <Container width="narrow">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">Questions about your puppy?</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-ink)]/85">
              Every puppy is different. Our veterinarians can build a vaccination, nutrition, and
              training plan tailored to your dog&rsquo;s breed, lifestyle, and history.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {settings?.phone && (
                <Button
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  variant="secondary"
                >
                  Call {settings.phone}
                </Button>
              )}
              <Link
                href="/patient-center"
                className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium text-[var(--color-brand-500)] hover:text-[var(--color-brand-700)]"
              >
                Back to patient center &rarr;
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Reveal>
            <div className="rounded-3xl bg-[var(--color-brand-500)] p-10 text-center md:p-16">
              <h2 className="mx-auto max-w-2xl text-3xl text-white md:text-4xl">
                Book your puppy&rsquo;s first visit.
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[var(--color-brand-100)]">
                New clients save 50% on first exams on weekdays.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href={bookingUrl} variant="onDark" openInNewTab>
                  Book an appointment
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
