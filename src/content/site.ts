export const navItems = [
  ['Home', 'home'], ['About Us', 'about'], ['Our Services', 'services'],
  ['Destinations', 'destinations'], ['For Travel Partners', 'travel-partners'], ['Contact', 'contact'],
] as const;

export const inquiryTypes = ['FIT & Tailor-Made Travel', 'Group Tours', 'Hotels & Accommodation', 'Transportation', 'Guided Tours & Excursions', 'MICE & Corporate Travel', 'Customized Itinerary', 'Other'] as const;

export const services = [
  { icon:'route', title:'FIT & Tailor-Made Travel', text:'Personalized travel arrangements for independent travelers, couples, families, and private clients. Programs can be shaped around individual interests, travel dates, accommodation preferences, and budgets.', cta:'Request FIT Services', formValue:'FIT & Tailor-Made Travel' },
  { icon:'people', title:'Group Travel & Tours', text:'Destination planning and coordination for leisure groups, special-interest groups, and organized tours. Services can be combined to match group size, itinerary, schedule, and operational requirements.', cta:'Plan a Group Tour', formValue:'Group Tours' },
  { icon:'hotel', title:'Hotel Accommodation', text:'Hotel sourcing and accommodation coordination based on destination, category, room requirements, travel dates, and budget, subject to availability and supplier confirmation.', cta:'Request Hotel Options', formValue:'Hotels & Accommodation' },
  { icon:'car', title:'Private Transfers & Transportation', text:'Transportation arrangements for airport arrivals, departures, city transfers, sightseeing, and multi-day itineraries, subject to vehicle and supplier availability.', cta:'Request Transportation', formValue:'Transportation' },
  { icon:'guide', title:'Guided Tours & Excursions', text:'Guided sightseeing, cultural experiences, city tours, and excursions designed to introduce travelers to Azerbaijan’s history, cuisine, traditions, architecture, and landscapes.', cta:'Explore Tour Options', formValue:'Guided Tours & Excursions' },
  { icon:'briefcase', title:'MICE & Corporate Travel', text:'Destination arrangements for meetings, incentive travel, corporate groups, and business events. Programs are developed according to the event brief, group requirements, and operational scope.', cta:'Discuss Your Event', formValue:'MICE & Corporate Travel' },
  { icon:'star', title:'Customized Itinerary Design', text:'Travel programs developed around your clients’ interests, available travel dates, preferred pace, accommodation level, and budget. We can help coordinate the components required for a complete itinerary.', cta:'Create an Itinerary', formValue:'Customized Itinerary' },
  { icon:'mountain', title:'On-Ground Coordination', text:'Coordinated destination support for agreed travel arrangements, including communication with relevant local suppliers and assistance with itinerary logistics.', cta:'Discuss Your Requirements', formValue:'Other' },
] as const;

export const destinations = [
  { name:'Baku', image:'/images/updatedD/baku.jpg', alt:'Baku city and the Flame Towers at sunset', text:'The capital’s blend of contemporary architecture, the Caspian waterfront, historic streets, local cuisine, and vibrant city life.' },
  { name:'Gobustan', image:'/images/updatedD/gobustan.jpg', alt:'Rock formations and the Gobustan visitor landmark in Azerbaijan', text:'A compelling excursion for travelers interested in ancient rock art, archaeology, and Azerbaijan’s natural heritage.' },
  { name:'Gabala', image:'/images/updatedD/gabala.jpg', alt:'Snow-covered mountain resort in Gabala, Azerbaijan', text:'A getaway known for mountain scenery, nature, and outdoor experiences.' },
  { name:'Sheki', image:'/images/updatedD/sheki.jpg', alt:'Historic stone tower among the greenery and mountains of the Sheki region', text:'A historic destination offering traditional architecture, local culture, and a distinctive atmosphere.' },
  { name:'Guba & Khinalug', image:'/images/updatedD/quba.jpg', alt:'Mountain resort and Caucasus scenery in the Guba region', text:'Mountain landscapes, cultural heritage, and opportunities to explore Azerbaijan beyond its main city.' },
  { name:'Ganja', image:'/images/destinations/ganja.jpg', alt:'Imamzadeh religious complex in Ganja, Azerbaijan', text:'A city with a rich history, cultural attractions, and access to nearby regional experiences.' },
  { name:'Lankaran', image:'/images/updatedD/lankaran.jpg', alt:'Wooded lake and mountain landscape in southern Azerbaijan', text:'Southern landscapes, nature, and local cultural experiences offer a different perspective on Azerbaijan.' },
  { name:'Nakhchivan', image:'/images/destinations/nakhchivan.jpg', alt:'Momine Khatun Mausoleum in Nakhchivan, Azerbaijan', text:'A distinct region of heritage, architecture, and dramatic landscapes, with programs dependent on current transport and operational availability.' },
  { name:'Karabakh', image:'/images/updatedD/karabak.jpg', alt:'Historic church in Shusha surrounded by the Karabakh mountains', text:'A region of significant cultural and natural interest. Any program is considered subject to current accessibility, permits, route restrictions, and operational availability.' },
] as const;

export const partnerTypes = [
  ['Travel Agencies','Local destination support for agencies expanding their Azerbaijan offerings.'], ['Tour Operators','Tailor-made itineraries and coordinated ground arrangements for individual and group programs.'], ['International DMCs','Local supplier coordination for partners seeking destination support in Azerbaijan.'], ['Corporate & MICE Planners','Destination arrangements for corporate travel, meetings, incentives, and selected business events.'], ['Special-Interest Travel Organizers','Programs built around culture, heritage, gastronomy, nature, and other client interests.'],
] as const;

export const advantages = [
  ['Tailor-Made Solutions','We shape proposals around your itinerary, target audience, schedule, and budget rather than assuming one program fits every client.'], ['Local Coordination','We help coordinate the destination services agreed for your program through relevant local suppliers.'], ['One Point of Contact','A clear communication channel for discussing requests, changes, and arrangements.'], ['Flexible Program Planning','From individual travelers to group requirements, each inquiry is reviewed according to its specific needs.'], ['B2B-Focused Collaboration','We aim to understand your business requirements and support the delivery of an experience suited to your clients.'], ['Attention to Detail','We consider the practical elements of an itinerary, including timing, transfers, accommodation preferences, and coordination between services.'],
] as const;

export const workflow = [
  ['Share Your Requirements','Tell us about your clients, travel dates, group size, preferred destinations, and requested services.'], ['Receive a Tailored Proposal','We review your brief and prepare a proposal based on your requirements, supplier availability, and requested scope.'], ['Confirm the Arrangements','Once the proposal is agreed, the included services, prices, payment conditions, and booking details are confirmed.'], ['Coordinate the Program','We coordinate the agreed arrangements with the relevant suppliers and provide the agreed level of destination support.'],
] as const;

export const travelConcepts = [
  { title:'Baku City Escape', duration:'3 days', summary:'A short-break concept combining Baku’s historic centre, modern city landmarks, Caspian views, local cuisine, and selected nearby attractions.', days:[['Day 1','Arrival and Caspian welcome'],['Day 2','Historic Baku and contemporary architecture'],['Day 3','Selected nearby attractions and departure']] },
  { title:'Azerbaijan Highlights', duration:'5 days', summary:'A multi-day concept combining Baku with selected cultural and regional destinations, subject to travel time and availability.', days:[['Days 1–2','Baku introduction'],['Day 3','Gobustan and regional landscapes'],['Days 4–5','Selected cultural destination and return']] },
  { title:'Culture & Heritage Journey', duration:'6–7 days', summary:'A program concept for travelers interested in historic towns, architecture, traditions, regional cuisine, and Azerbaijan’s cultural diversity.', days:[['Days 1–2','Baku heritage'],['Days 3–4','Regional culture and cuisine'],['Days 5–7','Historic towns and onward arrangements']] },
  { title:'Mountain & Nature Escape', duration:'4–5 days', summary:'A regional program concept combining selected mountain destinations, scenic landscapes, outdoor activities, and relaxation.', days:[['Day 1','Baku departure'],['Days 2–4','Selected mountain region'],['Day 5','Return arrangements']] },
  { title:'Corporate & MICE Program', duration:'Designed around your brief', summary:'A customized destination program for corporate groups, incentive travel, and business events, based on the event objectives and operational requirements.', days:[['Stage 1','Brief and venue requirements'],['Stage 2','Program and logistics design'],['Stage 3','Confirmed on-ground coordination']] },
] as const;

export const faqs = [
  ['Do you work with international travel agencies and tour operators?','Yes. KHAZRI DMC is positioned primarily for B2B collaboration with international travel agencies, tour operators, DMCs, and corporate travel planners interested in Azerbaijan.'], ['Can you create a customized Azerbaijan itinerary?','Yes. Itinerary concepts can be developed around your clients’ interests, travel dates, group size, preferred accommodation level, and budget.'], ['Can you arrange accommodation and transportation?','We can include hotel and transportation arrangements in a proposal, subject to supplier availability, confirmation, and the agreed service scope.'], ['Do you work with both FIT and group travel?','We can review requests for individual travel arrangements and group programs and propose suitable options based on the requirements.'], ['Can you support MICE and corporate programs?','Corporate and MICE inquiries can be assessed according to the event objectives, dates, group size, requested services, and operational requirements.'], ['How can I request a proposal?','Complete the inquiry form with your contact details, travel dates, group size, preferred destinations, and service requirements. You can also contact our team directly using the contact details on this page.'], ['Are your itineraries and prices fixed?','The sample travel concepts shown on the website are illustrative. The final itinerary, inclusions, availability, and pricing are confirmed individually for each inquiry.'], ['Do you operate outside Azerbaijan?','Our website focuses on inbound destination services in Azerbaijan. Requests involving other countries can be discussed separately, but availability should not be assumed.'],
] as const;

export const contactConfig = { email:'', phone:'', website:'', location:'Baku, Azerbaijan' };
