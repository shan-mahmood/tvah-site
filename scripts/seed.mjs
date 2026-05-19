/**
 * Seed script for Tustin Village Animal Hospital.
 * Creates 9 services with full content, 3 doctors, uploads stock photos
 * + doctor headshots, and builds the homepage with promo banner + sections.
 *
 * Idempotent — safe to re-run.
 * Usage: node --env-file=.env.local scripts/seed.mjs
 */
import { createClient } from '@sanity/client'
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '..')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local')
  process.exit(1)
}
if (!token) {
  console.error('Missing SANITY_API_WRITE_TOKEN in .env.local (needs Editor or higher role)')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-12-01',
  useCdn: false,
})

const BOOKING_URL = 'https://tvill.usw2.ezyvet.com/external/portal/main/login?id=2'
const PHONE_TEL = 'tel:7146607710'

// ---- Image upload helpers ----
async function uploadImage(url, filename) {
  try {
    console.log(`  ↓ Fetching ${filename}...`)
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const buffer = Buffer.from(await response.arrayBuffer())
    const asset = await client.assets.upload('image', buffer, { filename })
    return asset._id
  } catch (err) {
    console.warn(`  ! Could not upload ${filename}: ${err.message} — skipping`)
    return null
  }
}

async function uploadLocalImage(filePath) {
  try {
    const buffer = await readFile(filePath)
    const filename = path.basename(filePath)
    const asset = await client.assets.upload('image', buffer, { filename })
    return asset._id
  } catch (err) {
    console.warn(`  ! Could not upload ${filePath}: ${err.message} — skipping`)
    return null
  }
}

// Scan project root + a few common locations for an image whose filename
// (case-insensitive) contains the given keyword.
function findLocalImage(keyword) {
  const exts = ['jpg', 'jpeg', 'png', 'webp']
  const searchDirs = [PROJECT_ROOT, path.join(PROJECT_ROOT, 'public'), path.join(PROJECT_ROOT, 'images')]
  const kw = keyword.toLowerCase()
  for (const dir of searchDirs) {
    if (!existsSync(dir)) continue
    for (const ext of exts) {
      for (const variant of [kw, `dr-${kw}`, `dr_${kw}`]) {
        const candidate = path.join(dir, `${variant}.${ext}`)
        if (existsSync(candidate)) return candidate
      }
    }
  }
  return null
}

const STOCK_PHOTOS = {
  hero: {
    url: 'https://images.unsplash.com/photo-1546377791-2e01b4449bf0?w=2000&q=80&auto=format',
    filename: 'hero-cat-corgi.jpg',
    alt: 'An orange tabby cat and a corgi cuddled together on warm brown bedding',
  },
  about: {
    url: 'https://images.unsplash.com/photo-1509205477838-a534e43a849f?w=2000&q=80&auto=format',
    filename: 'about-cat-dog.jpg',
    alt: 'A small calico cat sitting beside a black-and-white dog outdoors, the cat looking up at the dog',
  },
}

const SERVICE_HERO_PHOTOS = {
  'service-wellness-exams': {
    url: 'https://images.unsplash.com/photo-1774440865596-7b6e81f6ae2e?w=2000&q=80&auto=format',
    filename: 'service-wellness.jpg',
    alt: 'A beagle puppy held gently in caring hands during a checkup',
  },
  'service-internal-medicine': {
    url: 'https://images.unsplash.com/photo-1535078839213-289087d2e09d?w=2000&q=80&auto=format',
    filename: 'service-internal-medicine.jpg',
    alt: 'A calm orange tabby cat being held in warm light by a person',
  },
  'service-veterinary-surgery': {
    url: 'https://images.unsplash.com/photo-1759164955427-14ca448a839d?w=2000&q=80&auto=format',
    filename: 'service-surgery.jpg',
    alt: 'A gray cat wearing a recovery cone, resting on a wooden stool outdoors among plants',
  },
  'service-diagnostics': {
    url: 'https://images.unsplash.com/photo-1610389199153-014d59881b1e?w=2000&q=80&auto=format',
    filename: 'service-diagnostics.jpg',
    alt: 'An attentive brown tabby cat with bright yellow eyes sitting in green grass',
  },
  'service-dental-care': {
    url: 'https://images.unsplash.com/photo-1668158694703-ef328c78d3da?w=2000&q=80&auto=format',
    filename: 'service-dental.jpg',
    alt: "A long-haired brown and black dog in profile with its mouth open, showing healthy teeth",
  },
  'service-palliative-care': {
    url: 'https://images.unsplash.com/photo-1584701313403-5da1c2ce8e0f?w=2000&q=80&auto=format',
    filename: 'service-palliative.jpg',
    alt: 'An older woman sitting at a window with her cocker spaniel, gently stroking the dog',
  },
  'service-pet-travel': {
    url: 'https://images.unsplash.com/photo-1774790479490-dbf0f3a7fb60?w=2000&q=80&auto=format',
    filename: 'service-pet-travel.jpg',
    alt: 'A small Yorkshire terrier peeking out of a soft fabric sling carrier worn by an owner',
  },
  'service-emergency-care': {
    url: 'https://images.unsplash.com/photo-1728013274420-ed02b1f58887?w=2000&q=80&auto=format',
    filename: 'service-emergency.jpg',
    alt: 'A small white kitten being gently held in two hands',
  },
  'service-telemedicine': {
    url: 'https://images.unsplash.com/photo-1713764054243-ad6d1af5723d?w=2000&q=80&auto=format',
    filename: 'service-telemedicine.jpg',
    alt: 'A red-haired woman lying on a bed with her shiba inu, both looking at her phone',
  },
}

// ---- Portable Text helpers ----
function pt(paragraphs) {
  return paragraphs.map((text, i) => ({
    _type: 'block',
    _key: `b${i}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `s${i}`, text, marks: [] }],
  }))
}

function ans(text) {
  return [
    {
      _type: 'block',
      _key: 'a',
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: 's', text, marks: [] }],
    },
  ]
}

// ---- 9 Services with full content ----
// Copy sourced from tustinvillageah.com (see _content-from-old-site/*.md).
// Tightened to project voice; doctor names intentionally omitted per CLAUDE.md.
const SERVICES = [
  {
    _id: 'service-wellness-exams',
    title: 'Wellness Exams',
    slug: 'wellness-exams',
    order: 1,
    shortDescription:
      "Comprehensive checkups that go beyond a basic exam — tailored to your pet's age, lifestyle, and health history.",
    body: pt([
      "At Tustin Village Animal Hospital, our thorough wellness examinations go beyond just a basic checkup. Our experienced veterinary team performs detailed assessments covering all aspects of pet health.",
      "We recognize each pet is unique, and we create personalized health plans tailored to your companion's specific needs, age, lifestyle, and health history. From energetic puppies needing vaccination support to specialized preventative care for senior cats, we provide care across every life stage.",
      "First exams for new clients are 50% off on weekdays. Walk in or schedule online.",
    ]),
    whatToExpect: [
      { heading: 'Complete physical examination', description: "Head-to-tail assessment of your pet's health — heart, lungs, joints, eyes, ears, skin, and teeth." },
      { heading: 'Parasite prevention and control', description: 'Comprehensive protection against internal and external parasites, based on your pet\'s lifestyle.' },
      { heading: 'Nutrition and weight management', description: 'Tailored dietary recommendations and weight tracking to spot early signs of metabolic or musculoskeletal issues.' },
      { heading: 'Vaccination assessment and updates', description: 'Customized vaccination schedules based on lifestyle and risk factors — not a one-size-fits-all panel.' },
      { heading: 'Senior pet wellness screening', description: 'Advanced monitoring for age-related conditions, so we catch changes early.' },
      { heading: 'Behavioral consultation', description: 'Expert guidance on training, behavior modification, and what\'s normal at each life stage.' },
    ],
    faqs: [
      { question: 'How often should my pet have a wellness exam?', answer: ans('Pets should have a wellness exam at least once a year. Older pets, or those with chronic conditions, often benefit from twice-yearly visits.') },
      { question: 'What can I expect during a wellness exam?', answer: ans("During the exam, your pet receives a full physical checkup. We'll discuss any concerns, implement preventative measures, and offer guidance on nutrition, exercise, dental care, and behavior.") },
      { question: 'Do I need to prepare my pet for the exam?', answer: ans('No special preparation is needed. Bring your pet on their regular schedule and be ready to share any behavioral or health changes you\'ve noticed at home.') },
      { question: 'What if my pet seems perfectly healthy?', answer: ans("Many serious conditions develop silently. By the time symptoms appear at home, the disease is often advanced. Annual screening is one of the best investments in your pet's longevity.") },
    ],
  },
  {
    _id: 'service-internal-medicine',
    title: 'Internal Medicine',
    slug: 'internal-medicine',
    order: 2,
    shortDescription:
      'Diagnosis and management of complex medical conditions — endocrine, gastrointestinal, respiratory, kidney, liver, infectious, and immune-mediated.',
    body: pt([
      "Internal medicine encompasses a wide range of medical conditions affecting your pet's organs and bodily functions. Our veterinarians use advanced diagnostic tools and personalized treatment plans to manage and treat illnesses effectively.",
      "Whether your pet is experiencing digestive issues, respiratory problems, or a chronic disease, expert medical support is available. We combine modern technology with compassionate care to help pets achieve optimal health, and we take time to educate owners so you understand the condition and the options.",
    ]),
    whatToExpect: [
      { heading: 'Endocrine disorders', description: 'Diagnosis and treatment of diabetes, thyroid disorders, and adrenal gland diseases.' },
      { heading: 'Gastrointestinal disorders', description: 'Management of chronic vomiting, diarrhea, and inflammatory bowel disease (IBD).' },
      { heading: 'Respiratory disease', description: 'Care for asthma, pneumonia, and breathing difficulties.' },
      { heading: 'Kidney & liver disease', description: 'Specialized treatments to improve organ function and quality of life.' },
      { heading: 'Infectious disease', description: 'Diagnosis and treatment of bacterial, viral, and fungal infections.' },
      { heading: 'Autoimmune & immune-mediated conditions', description: 'Advanced therapies for conditions like lupus and immune-mediated anemia.' },
    ],
    faqs: [
      { question: 'What are the signs my pet may have an internal health issue?', answer: ans('Common symptoms include weight loss, lethargy, vomiting, diarrhea, excessive drinking or urination, and difficulty breathing. Schedule an exam promptly if you notice any of these.') },
      { question: 'How are internal medical conditions diagnosed?', answer: ans('We use a combination of blood tests, imaging (X-rays, ultrasound), urinalysis, and other diagnostic tools to assess your pet\'s condition accurately.') },
      { question: 'Can internal diseases be cured?', answer: ans('Some conditions can be managed effectively with medication and lifestyle changes; others require ongoing treatment. We build personalized plans that optimize quality of life over the long term.') },
    ],
  },
  {
    _id: 'service-veterinary-surgery',
    title: 'Veterinary Surgery',
    slug: 'veterinary-surgery',
    order: 3,
    shortDescription:
      'A full range of surgical services — from spay and neuter to soft tissue, orthopedic, dental, and emergency procedures.',
    body: pt([
      "At Tustin Village Animal Hospital, we offer a full range of veterinary surgical services to meet your pet's needs. Our skilled team is trained in advanced surgical techniques and equipped with modern technology to provide the best possible care.",
      "From preventative surgeries to emergency procedures, we are here to help your pet recover and thrive. Every procedure is discussed with you in advance — the goal, the risks, what to expect on the day, and what recovery will look like. No surprises, no pressure.",
    ]),
    whatToExpect: [
      { heading: 'Spay & neuter surgery', description: 'Prevents unwanted pregnancies and reduces risk of certain cancers and behavioral issues — contributing to a longer, healthier life.' },
      { heading: 'Soft tissue surgery', description: 'Mass removals, foreign body extractions, and reconstructive procedures for a wide range of medical conditions.' },
      { heading: 'Orthopedic surgery', description: 'Advanced procedures including TPLO knee stabilization and limb amputations to restore mobility and reduce pain.' },
      { heading: 'Dental surgery', description: 'Removal of infected, fractured, or diseased teeth to prevent pain, infections, and long-term complications.' },
      { heading: 'Emergency surgery', description: 'Critical situations requiring immediate intervention — from Cesarean sections to trauma repair.' },
    ],
    faqs: [
      { question: 'How do I know if my pet needs surgery?', answer: ans('Our veterinarians conduct thorough examinations and discuss all available treatment options. We recommend surgery only when it\'s genuinely the best option for your pet\'s health and well-being.') },
      { question: 'How should I prepare my pet for surgery?', answer: ans('Schedule the pre-surgery checkup, follow fasting instructions (no food for 12 hours, no water for 6 hours), tell us about any medications, keep your pet calm, arrive on time, and review post-surgery care with us beforehand.') },
      { question: 'Is anesthesia safe for my pet?', answer: ans('We use the latest anesthesia protocols and monitoring equipment, with careful pre-anesthesia evaluation tailored to your pet\'s age and health. Bloodwork before anesthesia is standard.') },
      { question: 'What is recovery like?', answer: ans('Recovery times vary by procedure. Most involve rest, limited activity, and pain management. We give detailed at-home instructions and schedule a recheck to make sure healing is on track.') },
      { question: 'How can I help my pet heal after surgery?', answer: ans('Follow post-operative instructions, administer prescribed medications on schedule, and maintain a calm, comfortable environment. Call us if anything seems off.') },
    ],
  },
  {
    _id: 'service-diagnostics',
    title: 'Diagnostics',
    slug: 'diagnostics',
    order: 4,
    shortDescription:
      'Digital X-ray, ultrasound, in-house bloodwork, urinalysis, and ECG. Fast, accurate answers so we can start treatment quickly.',
    body: pt([
      "At Tustin Village Animal Hospital, our skilled veterinary team uses cutting-edge diagnostic tools — digital imaging, laboratory testing, and ultrasound — to assess pet conditions with accuracy and efficiency. Whether your pet is experiencing unexplained symptoms or due for a routine health screening, we provide thorough evaluations.",
      "Early detection is key to maintaining your pet's long-term health. Our in-house lab lets us run many tests during the visit so we can start treatment immediately, instead of waiting days for results.",
    ]),
    whatToExpect: [
      { heading: 'Digital X-rays', description: 'High-resolution imaging for accurate internal assessments, with low radiation exposure.' },
      { heading: 'Ultrasound imaging', description: 'Non-invasive scans to evaluate soft tissues and organ function — well-tolerated and informative.' },
      { heading: 'Comprehensive bloodwork', description: 'Early detection of infections, organ diseases, and metabolic disorders. Most routine panels run in-house.' },
      { heading: 'Urinalysis & fecal testing', description: 'Identifies infections, parasites, and digestive conditions.' },
      { heading: 'Electrocardiograms (ECG)', description: 'Monitors heart health and detects rhythm irregularities.' },
    ],
    faqs: [
      { question: 'When does my pet need diagnostic testing?', answer: ans('Diagnostics are recommended for pets showing signs of illness, during annual checkups, and before surgery to confirm your pet is healthy enough for anesthesia.') },
      { question: 'Are X-rays and ultrasounds safe for pets?', answer: ans('Both procedures are non-invasive and completely safe. Modern equipment minimizes exposure while maximizing accuracy.') },
      { question: 'How quickly will I get results?', answer: ans('Many results are available the same day. Complex diagnostics or send-outs may take several days — we communicate results promptly either way.') },
    ],
  },
  {
    _id: 'service-dental-care',
    title: 'Dental Care',
    slug: 'dental-care',
    order: 5,
    shortDescription:
      'Cleanings, extractions, gum disease treatment, and at-home care guidance. Bad breath is rarely just bad breath.',
    body: pt([
      "At Tustin Village Animal Hospital, we believe in proactive dental care to prevent issues before they develop. Poor oral hygiene can lead to infections, tooth loss, and even damage to internal organs.",
      "Our veterinary team provides professional cleanings, advanced procedures, and customized at-home care plans. Whether your pet needs a routine cleaning or treatment for active dental disease, we provide safe, effective care for long-term oral and overall health.",
    ]),
    whatToExpect: [
      { heading: 'Oral health exams', description: 'Early detection of dental disease, infections, and oral concerns at every wellness visit.' },
      { heading: 'Professional dental cleanings', description: 'Thorough cleaning under anesthesia to remove plaque and tartar buildup, including below the gumline.' },
      { heading: 'Tooth extractions', description: 'Safe, painless removal of damaged or infected teeth to prevent further complications. We discuss every extraction with you beforehand.' },
      { heading: 'Gum disease treatment', description: 'Diagnosis and treatment of gingivitis and periodontal disease before it leads to systemic problems.' },
      { heading: 'Preventative care guidance', description: 'At-home hygiene techniques, brushing, and dental-friendly diets that extend the time between professional cleanings.' },
    ],
    faqs: [
      { question: 'How often should my pet have a dental exam?', answer: ans('Pets should have a wellness exam — which includes an oral check — at least yearly. Older pets or those with health concerns may need more frequent visits.') },
      { question: 'How can I tell if my pet has dental disease?', answer: ans('Signs include bad breath, excessive drooling, difficulty eating, inflamed gums, and loose teeth. Schedule a dental exam promptly if you notice any of these.') },
      { question: 'How can I maintain dental health at home?', answer: ans('Regular tooth brushing, dental treats, and vet-approved dental products support oral health between professional cleanings.') },
      { question: 'Why does professional cleaning require anesthesia?', answer: ans('Safe, thorough cleaning means going below the gumline and taking X-rays — neither is possible on an awake pet. Anesthesia-free cleanings only address surface tartar and miss the disease that matters.') },
    ],
  },
  {
    _id: 'service-palliative-care',
    title: 'Palliative Care',
    slug: 'palliative-care',
    order: 6,
    shortDescription:
      'Compassionate, comfort-focused care for pets with chronic illness or advanced age. Quality of life is the priority.',
    body: pt([
      "At Tustin Village Animal Hospital, we provide compassionate palliative care to ensure your pet's comfort and dignity during chronic illness or advanced age. Our goal is to improve their quality of life while offering support and guidance for you and your family.",
      "Pets facing long-term medical conditions receive personalized care plans developed collaboratively with our veterinary team. Services range from pain relief to mobility support, with the focus always on maintaining quality of life and keeping you informed throughout.",
    ]),
    whatToExpect: [
      { heading: 'Pain management', description: 'Medication and therapies to ease discomfort from arthritis, cancer, or other chronic illnesses.' },
      { heading: 'Nutritional support', description: 'Tailored diets, supplements, and feeding techniques to maintain weight and overall health.' },
      { heading: 'Mobility assistance', description: 'Adaptive equipment and physical therapy to help pets move comfortably at home.' },
      { heading: 'Emotional & behavioral support', description: 'Guidance on stress relief and lifestyle enrichment as your pet\'s needs change.' },
      { heading: 'Hospice & end-of-life planning', description: 'Compassionate, unhurried discussions to help families make informed decisions when the time comes.' },
    ],
    faqs: [
      { question: 'How do I know if my pet needs palliative care?', answer: ans('Pets experiencing chronic pain, mobility issues, or difficulty eating often benefit from palliative treatments. We can help you evaluate where your pet is and what options make sense.') },
      { question: 'Can palliative care improve my pet\'s quality of life?', answer: ans('Yes — it focuses on maintaining comfort and well-being, allowing pets to enjoy their remaining time with reduced pain.') },
      { question: 'When should I consider hospice care?', answer: ans('Hospice is recommended when a pet\'s condition is no longer treatable and the focus shifts entirely to comfort and emotional support. We use quality-of-life tracking to help you recognize that point.') },
    ],
  },
  {
    _id: 'service-pet-travel',
    title: 'Pet Travel',
    slug: 'pet-travel',
    order: 7,
    shortDescription:
      'Health certificates, vaccinations, microchipping, and guidance for safe domestic and international pet travel.',
    body: pt([
      "Traveling with a pet requires careful planning and regulatory compliance. Our veterinary team offers complete pet travel consultations to help you meet airline, domestic, and international travel requirements — so your pet is healthy, comfortable, and fully prepared for the journey.",
      "Different destinations have different rules, and the timing matters. Some countries require titers or vaccinations weeks or months in advance, so it's best to start planning early.",
    ]),
    whatToExpect: [
      { heading: 'International & domestic health certificates', description: 'USDA-approved health certificates for hassle-free travel.' },
      { heading: 'Required vaccinations', description: 'Rabies and other vaccines updated to match your destination\'s requirements.' },
      { heading: 'Microchipping for identification', description: 'Secure identification to prevent lost pets during travel.' },
      { heading: 'Sedation & anxiety management', description: 'Safe options for pets who experience travel stress.' },
      { heading: 'Airline & destination-specific guidance', description: 'Help navigating pet-friendly travel policies, documentation, and timelines.' },
    ],
    faqs: [
      { question: 'What documents do I need for my pet to travel?', answer: ans('Most airlines and countries require a health certificate from a licensed veterinarian, proof of vaccinations, and microchip information.') },
      { question: 'How soon before my trip should I schedule a pet travel exam?', answer: ans('We recommend scheduling at least 30 days in advance to meet domestic requirements. International travel often requires more lead time — sometimes several months for certain destinations.') },
      { question: 'Can my pet travel in the cabin with me?', answer: ans('That depends on airline policies and your pet\'s size. We can help with documentation, but the airline\'s rules govern cabin vs. cargo.') },
      { question: 'What if my pet experiences travel anxiety?', answer: ans('We offer safe sedation options and travel-friendly solutions to help keep pets calm and comfortable during transit.') },
    ],
  },
  {
    _id: 'service-emergency-care',
    title: 'Emergency Care',
    slug: 'emergency-care',
    order: 8,
    shortDescription:
      'Urgent care for trauma, severe illness, poisoning, seizures, and other life-threatening situations. Walk in — emergencies are prioritized.',
    body: pt([
      "In a pet emergency, every second counts. At Tustin Village Animal Hospital, our experienced team is ready to provide fast, life-saving care for your pet when they need it most.",
      "Accidents and sudden illnesses can happen at any time. Our emergency services are designed for pets experiencing severe health issues, trauma, or distress. We're equipped with advanced emergency equipment and staffed by veterinarians trained to handle critical cases with speed and expertise.",
    ]),
    whatToExpect: [
      { heading: 'Trauma & injury treatment', description: 'Immediate care for accidents, fractures, and wounds.' },
      { heading: 'Severe illness management', description: 'Urgent treatment for seizures, poisoning, and difficulty breathing.' },
      { heading: 'Emergency surgery', description: 'Life-saving surgical procedures for critical conditions.' },
      { heading: 'Shock & cardiac response', description: 'Rapid intervention for heart-related emergencies and circulatory shock.' },
      { heading: 'Heatstroke & dehydration treatment', description: 'Care for pets affected by extreme weather or fluid loss.' },
    ],
    faqs: [
      { question: 'How do I know if my pet needs emergency care?', answer: ans('Seek immediate care for severe breathing difficulties, excessive bleeding, sudden collapse, seizures, suspected poisoning, repeated vomiting, inability to urinate, or any sudden major change in behavior. When in doubt, call us.') },
      { question: 'Can I bring my pet in without an appointment?', answer: ans('Yes — emergencies are prioritized. A quick call ahead lets us prepare for your arrival, but if it\'s immediately life-threatening, just come in.') },
      { question: 'What should I do before coming in?', answer: ans('Stay calm, transport your pet safely, and contact us for first-aid guidance on the way. For suspected poisoning, call us or ASPCA Animal Poison Control at (888) 426-4435 before inducing vomiting — some substances cause more damage coming back up.') },
    ],
  },
  {
    _id: 'service-telemedicine',
    title: 'Telemedicine',
    slug: 'telemedicine',
    order: 9,
    shortDescription:
      'Virtual veterinary consultations for non-emergency concerns, follow-ups, and prescription refills. Existing patients only.',
    body: pt([
      "At Tustin Village Animal Hospital, we understand that busy schedules and pet anxiety can make in-person visits challenging. Our telemedicine services provide expert veterinary advice and support without the stress of travel.",
      "Whether you need guidance on a health concern or a follow-up consultation, we're here to offer quality care — anytime, anywhere. Some conditions still need hands-on evaluation; we'll let you know if that's the case and help you book a visit.",
    ]),
    whatToExpect: [
      { heading: 'Virtual consultations', description: 'Discuss minor illnesses, skin conditions, or behavioral concerns directly with a veterinarian over video.' },
      { heading: 'Medication & prescription refills', description: 'Renew prescriptions and adjust dosages without a clinic trip.' },
      { heading: 'Post-surgical & follow-up care', description: 'Monitor recovery progress without the stress of unnecessary travel.' },
      { heading: 'Nutritional & wellness advice', description: 'Personalized guidance on diet, supplements, and preventive care.' },
    ],
    faqs: [
      { question: 'How do I schedule a telemedicine appointment?', answer: ans('Call our office to schedule — online booking is not available for telemedicine. Our team will verify eligibility and answer initial questions before the visit.') },
      { question: 'What is the cost?', answer: ans('Thirty-minute consultations are $60.') },
      { question: 'Who is eligible?', answer: ans('Existing patients seen within the last 12 months qualify. Pets not visited in the past year require an in-person appointment first.') },
      { question: 'Are emergency cases covered?', answer: ans('No — telemedicine is for non-emergency concerns only. Medical emergencies require immediate in-person care.') },
    ],
  },
]

const DOCTORS = [
  {
    _id: 'doctor-nguyen',
    name: 'Dr. My Nguyen',
    credentials: 'DVM',
    slug: 'dr-nguyen',
    order: 1,
    photoKeyword: 'nguyen',
    title: 'Owner and Chief Medical Director',
    bio: pt([
      'Dr. Nguyen was born and raised in Orange County, California. She completed her undergraduate degree in Psychology and Social Behavior at the University of California, Irvine, and received her veterinary degree at Tuskegee University in Alabama. She has been practicing small animal medicine in Orange County for nine years.',
      'The areas that most interest her are soft tissue surgery and ophthalmology. Although all dog breeds are wonderful, Pomeranians are her favorite — she has two of her own named Chewie and Ahsoka.',
      'In her free time, she enjoys traveling with her family, watching TV, and reading thriller novels.',
    ]),
  },
  {
    _id: 'doctor-larkin',
    name: 'Dr. Katrina Larkin',
    credentials: 'DVM',
    slug: 'dr-larkin',
    order: 2,
    photoKeyword: 'larkin',
    title: 'Associate Veterinarian',
    bio: pt([
      'Dr. Larkin was born and raised in Saint Paul, Minnesota and completed her undergraduate degree at the University of Wisconsin, Madison. She then moved to sunny California, graduating from the University of California, Davis School of Veterinary Medicine.',
      'She has special interests in dermatology, internal medicine, and preventative care. She prioritizes both her patients’ physical and emotional wellbeing, with the goal of empowering clients to make informed decisions that align with their individual circumstances and goals.',
      'Outside of work, Dr. Larkin loves hiking, trying new recipes, keeping up with Formula 1, and spending time with her two mischievous cats, Bodhi and Hazel.',
    ]),
  },
  {
    _id: 'doctor-madan',
    name: 'Dr. Tina Madan',
    credentials: 'DVM',
    slug: 'dr-madan',
    order: 3,
    photoKeyword: 'madan',
    title: 'Associate Veterinarian',
    bio: pt([
      'Dr. Madan brings over a decade of veterinary experience to her patients, with a special passion for compassionate, high-quality care. She earned her Doctor of Veterinary Medicine degree from St. George’s University, completing her clinical training at the University of Illinois.',
      'Dr. Madan has served as both an Associate Veterinarian and Medical Director in Orange County. Her background also includes a Bachelor of Science in Animal Science from UC Davis and unique experience studying animal behavior through the UC Davis Animal Behavior Graduate Group.',
      'Dedicated to supporting pets and their families through every stage of life, Dr. Madan is committed to advancing animal health and strengthening the bond between people and their pets.',
    ]),
  },
]

async function buildHomeSections(heroImageId, aboutImageId) {
  const heroImage = heroImageId
    ? { _type: 'image', asset: { _type: 'reference', _ref: heroImageId }, alt: STOCK_PHOTOS.hero.alt }
    : undefined
  const aboutImage = aboutImageId
    ? { _type: 'image', asset: { _type: 'reference', _ref: aboutImageId }, alt: STOCK_PHOTOS.about.alt }
    : undefined

  return [
    {
      _key: 'promo-1',
      _type: 'promoBanner',
      message: '50% off first exams on weekdays — new clients welcome.',
      cta: { _type: 'cta', label: 'Call (714) 660-7710', href: PHONE_TEL },
      tone: 'promo',
    },
    {
      _key: 'hero-1',
      _type: 'heroSection',
      headline: 'Tustin Village Animal Hospital — Walk-Ins & Appointments',
      subheadline:
        'No appointment needed. Walk in anytime or schedule ahead for modern veterinary care. HALF OFF First Exams on weekdays.',
      primaryCta: { _type: 'cta', label: 'Book an appointment', href: BOOKING_URL, openInNewTab: true },
      secondaryCta: { _type: 'cta', label: 'Call (714) 660-7710', href: PHONE_TEL },
      ...(heroImage && { backgroundImage: heroImage }),
    },
    {
      _key: 'featured-1',
      _type: 'featuredServicesSection',
      eyebrow: 'Services',
      heading: 'Comprehensive care at every life stage',
      description:
        'From wellness exams to emergency surgery, we provide a full spectrum of veterinary care for dogs and cats.',
      services: [
        { _type: 'reference', _ref: 'service-wellness-exams', _key: 'fs1' },
        { _type: 'reference', _ref: 'service-emergency-care', _key: 'fs2' },
        { _type: 'reference', _ref: 'service-dental-care', _key: 'fs3' },
      ],
      viewAllCta: { _type: 'cta', label: 'See all services', href: '/our-services' },
    },
    {
      _key: 'about-1',
      _type: 'aboutSection',
      eyebrow: 'About',
      heading: 'Why Orange County families choose us',
      body: pt([
        'Tustin Village Animal Hospital is a doctor owned and operated walk-in veterinary clinic. Our team brings decades of combined experience to every visit, combining modern diagnostic technology with cost-effective, individualized care — six days a week, with or without an appointment.',
        'Rather than default to the most expensive solution, our veterinarians seek the most effective and appropriate one for your pet and your family.',
      ]),
      cta: { _type: 'cta', label: 'Meet our doctors', href: '/our-doctors' },
      imagePosition: 'right',
      ...(aboutImage && { image: aboutImage }),
    },
    {
      _key: 'doctors-1',
      _type: 'doctorsSection',
      eyebrow: 'Our team',
      heading: 'Veterinarians who take the time',
      description:
        'Same caring doctors every visit. We build long-term relationships with our patients and their families.',
      cta: { _type: 'cta', label: 'Meet the full team', href: '/our-doctors' },
    },
    {
      _key: 'cta-1',
      _type: 'ctaSection',
      eyebrow: 'Ready when you are',
      heading: "Your pet's health is our priority.",
      description: 'Walk in, call, or book online. We see same-day appointments for routine and urgent care.',
      primaryCta: { _type: 'cta', label: 'Book an appointment', href: BOOKING_URL, openInNewTab: true },
      secondaryCta: { _type: 'cta', label: 'Call (714) 660-7710', href: PHONE_TEL },
    },
  ]
}

function withFaqKeys(faqs) {
  return faqs.map((f, i) => ({ ...f, _key: `faq-${i}` }))
}
function withExpectKeys(items) {
  return items.map((item, i) => ({ ...item, _key: `exp-${i}` }))
}

async function seed() {
  console.log('\n🌱 Seeding TVAH content...\n')

  console.log('  Uploading service hero photos...')
  const serviceHeroAssets = {}
  for (const [serviceId, photo] of Object.entries(SERVICE_HERO_PHOTOS)) {
    const assetId = await uploadImage(photo.url, photo.filename)
    if (assetId) {
      serviceHeroAssets[serviceId] = { assetId, alt: photo.alt }
      console.log(`  ✓ Hero uploaded for ${serviceId}`)
    }
  }

  for (const s of SERVICES) {
    const heroAsset = serviceHeroAssets[s._id]
    const heroImage = heroAsset
      ? {
          _type: 'image',
          asset: { _type: 'reference', _ref: heroAsset.assetId },
          alt: heroAsset.alt,
        }
      : undefined
    await client.createOrReplace({
      _id: s._id,
      _type: 'service',
      title: s.title,
      slug: { _type: 'slug', current: s.slug },
      shortDescription: s.shortDescription,
      body: s.body,
      whatToExpect: withExpectKeys(s.whatToExpect),
      faqs: withFaqKeys(s.faqs),
      order: s.order,
      ...(heroImage && { heroImage }),
    })
    console.log(`  ✓ Service: ${s.title}${heroImage ? ' (with hero)' : ''}`)
  }

  for (const d of DOCTORS) {
    let photo
    const localPath = findLocalImage(d.photoKeyword)
    if (localPath) {
      console.log(`  ↑ Uploading photo for ${d.name} (${path.basename(localPath)})...`)
      const assetId = await uploadLocalImage(localPath)
      if (assetId) {
        photo = {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId },
          alt: `${d.name}, ${d.credentials}`,
        }
      }
    } else {
      console.log(`  · No photo found for ${d.name} — skipping image`)
    }

    await client.createOrReplace({
      _id: d._id,
      _type: 'doctor',
      name: d.name,
      slug: { _type: 'slug', current: d.slug },
      credentials: d.credentials,
      order: d.order,
      ...(d.title && { title: d.title }),
      ...(d.bio && { bio: d.bio }),
      ...(photo && { photo }),
    })
    console.log(`  ✓ Doctor: ${d.name}${photo ? ' (with photo)' : ''}`)
  }

  console.log('\n  Uploading stock photos to Sanity...')
  const heroImageId = await uploadImage(STOCK_PHOTOS.hero.url, STOCK_PHOTOS.hero.filename)
  const aboutImageId = await uploadImage(STOCK_PHOTOS.about.url, STOCK_PHOTOS.about.filename)
  if (heroImageId) console.log('  ✓ Hero image uploaded')
  if (aboutImageId) console.log('  ✓ About image uploaded')

  const sections = await buildHomeSections(heroImageId, aboutImageId)
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    title: 'Home',
    sections,
  })
  console.log(`\n  ✓ Home page with ${sections.length} sections`)

  console.log('\n✅ Done. Refresh http://localhost:3000 — service pages now live at /wellness-exams, /emergency-care, etc.\n')
}

seed().catch((err) => {
  console.error('\n❌ Seed failed:', err.message)
  if (err.statusCode === 401) {
    console.error('   → SANITY_API_WRITE_TOKEN invalid or lacks write permissions.\n')
  }
  process.exit(1)
})
