export interface Campaign {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  goalAmount: number;
  currentRaised: number;
  walletAddress: string;
}

export const campaigns: Campaign[] = [
  { 
    id: "clean-water", 
    title: "Clean Water Initiative", 
    description: "Sustainable water wells in rural communities.", 
    longDescription: "Access to safe, clean drinking water is a fundamental human right, yet millions across rural communities still face daily struggles to secure this vital resource. The Clean Water Initiative is dedicated to eradicating water scarcity by funding, building, and maintaining sustainable deep-water wells in regions suffering from severe drought and lack of infrastructure.\n\nWhen a community gains access to clean water, the ripple effect is profound. Health outcomes improve dramatically as waterborne diseases—often the leading cause of illness in these areas—are drastically reduced. Furthermore, children, particularly young girls who are traditionally tasked with walking miles each day to fetch water, are freed to attend school and pursue their education.\n\nBy leveraging the transparency and speed of the blockchain, your donation goes directly toward funding the drilling equipment, local labor, and long-term maintenance training required to keep these wells operational for decades. Our goal is to empower these communities from within, turning barren landscapes into thriving hubs of health and opportunity. Every drop counts, and your contribution provides the foundation for a healthier, more prosperous future for thousands of families.",
    imageUrl: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?auto=format&fit=crop&w=1200&q=80",
    goalAmount: 5.0, 
    currentRaised: 2.1, 
    walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" 
  },
  { 
    id: "tech-for-kids", 
    title: "Tech For Kids", 
    description: "Laptops and internet for students.", 
    longDescription: "In an increasingly digital world, the educational divide is no longer just about access to books—it is about access to technology. The Tech For Kids campaign was established to bridge the digital divide by providing high-quality laptops, stable internet access, and digital literacy training to underprivileged students in underserved school districts.\n\nWithout reliable access to a computer, students are severely disadvantaged. They struggle to complete homework, lack the tools to research complex topics, and miss out on crucial early exposure to coding and digital problem-solving skills that are essential for the modern workforce. This initiative doesn't just hand out hardware; we partner with local educators to ensure that the technology is integrated into their curriculum, providing a robust support system for both teachers and students.\n\nYour on-chain contribution allows us to purchase refurbished, enterprise-grade laptops in bulk, set up community Wi-Fi hotspots, and fund after-school IT support programs. By investing in a child's digital infrastructure today, you are unlocking their potential to become the innovators, developers, and leaders of tomorrow. Help us ensure that no child's potential is limited by their zip code.",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    goalAmount: 10.0, 
    currentRaised: 8.5, 
    walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" 
  },
  { 
    id: "emergency-relief", 
    title: "Emergency Relief Fund", 
    description: "Disaster response and supply distribution.", 
    longDescription: "When natural disasters strike be it devastating earthquakes, unprecedented floods, or severe wildfires every single second matters. The Emergency Relief Fund is a rapid-response decentralized treasury designed to bypass traditional bureaucratic delays and deploy immediate, life-saving capital to the front lines of global crises.\n\nTraditional aid organizations often face days or weeks of logistical hurdles before funds reach the ground. By utilizing blockchain infrastructure, our fund guarantees instantaneous, borderless transfers to vetted local NGOs and relief workers actively operating in disaster zones. These funds are immediately converted into critical supplies: temporary shelter, emergency medical kits, non-perishable food, and thermal blankets for families who have lost everything in a matter of minutes.\n\nBeyond immediate triage, this fund also supports the secondary phase of disaster recovery, ensuring communities have the resources to clear debris and begin the arduous process of rebuilding their lives. Your donation serves as an immediate lifeline to those facing the darkest moments of their lives, proving that a decentralized community can provide unparalleled speed and compassion when the world needs it most.",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80",
    goalAmount: 2.0, 
    currentRaised: 0.5, 
    walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" 
  },
  { 
    id: "ocean-cleanup", 
    title: "Ocean Cleanup Project", 
    description: "Removing plastic waste from coastal areas.", 
    longDescription: "Our oceans are choking on plastic, facing an existential threat that impacts marine ecosystems, global weather patterns, and human health. The Ocean Cleanup Project is a relentless, decentralized effort dedicated to removing millions of pounds of plastic waste from the most vulnerable coastal areas and deep-sea currents.\n\nEvery year, millions of tons of plastic enter our oceans, breaking down into toxic microplastics that devastate marine life and eventually enter the global food chain. By utilizing transparent, on-chain funding, we are deploying a fleet of specialized cleanup vessels equipped with advanced filtration systems to actively sweep the oceans. Furthermore, a significant portion of the raised capital is directed toward local coastal communities, paying local workers living wages to clean their own beaches and shorelines. \n\nThis dual-pronged approach not only remediates the immediate environmental crisis but also provides vital economic stimulus to developing coastal regions. We also invest heavily in upcycling facilities, ensuring that the recovered plastic is permanently removed from the ecosystem and repurposed into durable goods. Every single Ethereum contribution directly fuels the crews and the technology required to turn the tide against plastic pollution, preserving our blue planet for generations to come.",
    imageUrl: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?auto=format&fit=crop&w=1200&q=80",
    goalAmount: 8.0, 
    currentRaised: 3.2, 
    walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" 
  },
  { 
    id: "urban-gardens", 
    title: "Urban Green Gardens", 
    description: "Transforming empty lots into community food sources.", 
    longDescription: "Food insecurity and the prevalence of urban food deserts are critical issues facing modern metropolitan areas. The Urban Green Gardens initiative seeks to reclaim abandoned lots, decaying concrete spaces, and unused rooftops, transforming them into vibrant, community-operated agricultural hubs.\n\nIn many low-income urban neighborhoods, residents lack access to fresh, affordable, and organic produce, relying instead on heavily processed, nutrient-deficient alternatives. We are changing that narrative from the ground up. By directing your crypto donations straight to community leaders, we bypass municipal red tape and immediately fund the acquisition of nutrient-rich soil, heirloom seeds, hydroponic systems, and essential gardening tools.\n\nThese gardens do much more than just provide healthy food; they serve as dynamic educational centers where youth and adults alike learn the science of sustainable agriculture, the importance of biodiversity, and the mechanics of local food economies. Furthermore, the harvest is distributed directly back into the community, significantly lowering grocery bills for struggling families. Through the transparency of the blockchain, you can track exactly how your funds are converted into tangible, growing assets. Join us in planting the seeds of change, restoring food sovereignty to neighborhoods that have been systemically left behind for decades. Your support literally brings life back to the concrete jungle.",
    imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80",
    goalAmount: 3.5, 
    currentRaised: 1.8, 
    walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" 
  },
  { 
    id: "animal-shelter", 
    title: "No-Kill Animal Shelter", 
    description: "Medical care and rehoming for stray pets.", 
    longDescription: "The crisis of stray and abandoned animals is a heartbreaking reality in communities across the globe. Overcrowded municipal shelters frequently resort to euthanasia due to severe shortages in funding, space, and medical resources. The No-Kill Animal Shelter initiative is a blockchain-powered lifeline designed to completely eradicate this tragic practice by providing robust financial support to independent, no-kill sanctuaries.\n\nEvery donation securely processed on our platform goes directly toward the exorbitant costs of emergency veterinary care, including life-saving surgeries, routine vaccinations, and vital spay/neuter programs that address the root cause of animal overpopulation. We also fund the construction of expanded, climate-controlled living quarters, ensuring that every rescued dog, cat, and companion animal experiences a safe, stress-free environment while awaiting their forever home.\n\nBeyond immediate medical and physical needs, your contributions support comprehensive behavioral rehabilitation programs, helping traumatized animals regain trust in humans and vastly increasing their chances of a successful adoption. By leveraging decentralized finance, we ensure that 100% of the funds bypass administrative bloat and go directly into the bowls, beds, and medical charts of these innocent creatures. Stand with us to give the voiceless the second chance they so deeply deserve. Together, we can guarantee that every wagging tail and quiet purr finds a loving, permanent family.",
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
    goalAmount: 4.0, 
    currentRaised: 2.9, 
    walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" 
  },
  { 
    id: "senior-companions", 
    title: "Senior Companionship", 
    description: "Bridging the gap of loneliness for the elderly.", 
    longDescription: "Loneliness and social isolation among the elderly have reached epidemic proportions, carrying severe consequences for both mental and physical health. Studies have shown that prolonged isolation in senior populations can be as damaging to their health as smoking fifteen cigarettes a day, leading to accelerated cognitive decline, depression, and increased mortality.\n\nThe Senior Companionship initiative is dedicated to bridging this tragic gap by establishing and funding a network of dedicated caregivers, empathetic volunteers, and interactive community programs. Through your decentralized contributions, we are able to organize weekly social gatherings, comprehensive digital literacy workshops that help seniors connect with distant families, and regular home visits for those with limited mobility. \n\nWe also fund accessible transportation services, allowing seniors to attend medical appointments, community events, and cultural outings without fear or difficulty. The blockchain ensures that our funding is deployed efficiently to local chapters that vet and train volunteers to provide the highest quality of companionship. Your donation does more than just fund a program; it restores dignity, joy, and a vital sense of belonging to a generation that has given so much to our society. Let us ensure that no one has to face their twilight years in silence and isolation.",
    imageUrl: "https://images.unsplash.com/photo-1538356111053-748a48e1acb8?auto=format&fit=crop&w=1200&q=80",
    goalAmount: 1.5, 
    currentRaised: 0.9, 
    walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" 
  },
  { 
    id: "literacy-boost", 
    title: "Literacy for All", 
    description: "Providing free books and reading programs.", 
    longDescription: "Literacy is the foundational cornerstone of all modern education and personal empowerment, yet millions of children and adults worldwide still lack fundamental reading and writing skills. The Literacy for All campaign is an ambitious, globally focused initiative committed to eradicating illiteracy by providing unlimited access to books, educational materials, and structured reading programs.\n\nWithout the ability to read, individuals are effectively locked out of the global economy, unable to access essential services, understand legal documents, or pursue higher education. Your on-chain donations are aggressively deployed to build dynamic mobile libraries that travel to remote, underserved villages, as well as to fully stock the shelves of underfunded inner-city public schools. \n\nFurthermore, we invest heavily in hiring trained reading specialists and multilingual educators who provide targeted, one-on-one tutoring for those struggling with learning disabilities or language barriers. By utilizing smart contracts, we can track the delivery of these resources in real-time, ensuring maximum accountability. When you teach a child to read, you unlock a universe of imagination, critical thinking, and boundless potential. Join our decentralized movement to rewrite the future, one page, one child, and one transformed community at a time. Your contribution is the key that unlocks the door to lifelong learning and opportunity.",
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
    goalAmount: 2.5, 
    currentRaised: 1.1, 
    walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" 
  },
  { 
    id: "renewable-energy", 
    title: "Solar Power Village", 
    description: "Installing solar panels in off-grid homes.", 
    longDescription: "Energy poverty remains one of the most crippling barriers to economic development and human flourishing in the twenty-first century. Countless rural communities across the developing world still live completely off the grid, relying on toxic, expensive, and environmentally destructive kerosene lamps or diesel generators for basic illumination.\n\nThe Solar Power Village initiative leverages the speed and borderless nature of cryptocurrency to fund the immediate installation of state-of-the-art, off-grid solar panel systems in these marginalized regions. Bringing clean, renewable electricity to a village fundamentally transforms its daily reality. It allows medical clinics to refrigerate life-saving vaccines and operate essential machinery after dark. It enables children to study and complete their homework safely into the night, drastically improving educational outcomes.\n\nFurthermore, it empowers local entrepreneurs to establish small businesses, charging stations, and communication hubs that connect the village to the broader global economy. Your donation directly covers the procurement of high-efficiency photovoltaic panels, heavy-duty battery storage units, and the specialized training required for local technicians to maintain the grid indefinitely. By replacing fossil fuels with the limitless power of the sun, we are simultaneously combating global climate change and illuminating a path toward true economic independence. Give the gift of light, and watch an entire community awaken to new possibilities.",
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
    goalAmount: 12.0, 
    currentRaised: 4.5, 
    walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" 
  },
  { 
    id: "mental-health", 
    title: "Mind Matters", 
    description: "Free mental health workshops and counseling.", 
    longDescription: "The global mental health crisis is quietly devastating communities, yet access to professional psychiatric care and psychological counseling remains prohibitively expensive or entirely unavailable for the vast majority of the population. The Mind Matters campaign is fundamentally dedicated to shattering the systemic stigma surrounding mental illness and democratizing access to critical mental health resources.\n\nThrough the power of decentralized funding, we are establishing free, accessible clinics, deploying secure digital telehealth platforms, and organizing comprehensive community workshops led by licensed clinical professionals. These services provide an absolute lifeline for individuals battling severe depression, crippling anxiety, post-traumatic stress disorder, and other debilitating psychological conditions. Our initiative specifically targets historically underserved populations, including marginalized youth, struggling veterans, and low-income families who have traditionally been priced out of the mental health care system.\n\nYour cryptocurrency donation goes directly toward paying the hourly rates of professional therapists, ensuring that care is completely free at the point of service for those who need it most. By treating mental health with the same urgency and financial commitment as physical health, we can prevent tragedies, rebuild broken families, and foster a society rooted in profound empathy, resilience, and emotional well-being. Stand with us to prove that healing is possible and that no one has to fight their battles alone.",
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
    goalAmount: 5.0, 
    currentRaised: 2.0, 
    walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" 
  },
  { 
    id: "tree-planting", 
    title: "Global Reforestation", 
    description: "Planting native trees to combat climate change.", 
    longDescription: "Deforestation is accelerating at an alarming, unsustainable rate, stripping the planet of its vital lungs, destroying irreplaceable biodiversity, and drastically accelerating the devastating impacts of global climate change. The Global Reforestation project is a massive, coordinated counter-offensive designed to restore balance to our fragile ecosystems through aggressive, scientifically-backed tree planting initiatives.\n\nWe do not just scatter seeds; we partner directly with indigenous communities, expert botanists, and local forestry collectives to ensure the strategic planting of native, climate-resilient tree species that will genuinely thrive and permanently restore barren landscapes. These newly planted forests serve as massive carbon sinks, pulling toxic greenhouse gases directly out of the atmosphere while simultaneously preventing catastrophic soil erosion and providing critical habitats for endangered wildlife.\n\nUtilizing the transparency of blockchain technology, we are able to geographically track and verify the survival rate of the planted forests, ensuring that your donation yields a permanent, growing legacy. Your funds provide the essential capital needed for massive seed procurement, nursery maintenance, and fair wages for the local laborers executing the planting. Join us in rebuilding the earth’s natural defenses, one vital sapling at a time, to secure a breathable, vibrant future for all living creatures. Together, we are planting the roots of a greener tomorrow.",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    goalAmount: 6.0, 
    currentRaised: 3.8, 
    walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" 
  },
  { 
    id: "youth-sports", 
    title: "Community Sports Arena", 
    description: "Equipment and training for local youth teams.", 
    longDescription: "Access to organized sports is a fundamental driver of positive youth development, teaching irreplaceable lessons in teamwork, discipline, leadership, and physical health. Unfortunately, chronic budget cuts in public education and municipal services have systematically decimated community sports programs, leaving children in low-income neighborhoods without safe, structured extracurricular activities.\n\nThe Community Sports Arena initiative is designed to aggressively combat this inequality by fully funding local youth leagues, repairing dangerous and dilapidated public facilities, and providing high-quality athletic equipment to teams that desperately need it. When children are engaged in organized sports, they are significantly less likely to fall victim to gang violence, substance abuse, and the pervasive dangers of the streets. Instead, they are mentored by dedicated coaches who provide positive role models and foster a deep sense of community pride.\n\nYour transparent, on-chain donation is used to purchase uniforms, secure safe transportation to regional tournaments, and heavily subsidize participation fees so that no child is ever turned away due to financial constraints. By investing in the physical and emotional well-being of our youth through the universal language of sports, we are actively building a stronger, healthier, and more unified generation. Let us level the playing field and give every child the chance to experience the thrill of the game.",
    imageUrl: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80",
    goalAmount: 4.5, 
    currentRaised: 1.2, 
    walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" 
  },
  { 
    id: "refugee-support", 
    title: "Refugee Relief", 
    description: "Housing and food security for displaced families.", 
    longDescription: "We are currently witnessing one of the most severe displacement crises in modern human history, with millions of innocent families violently uprooted from their homes due to relentless conflict, political persecution, and climate catastrophes. The Refugee Relief initiative is a decentralized, rapid-response network committed to providing immediate, life-sustaining aid and long-term integration support to displaced populations across the globe.\n\nTraditional banking systems frequently fail refugees, leaving them stranded without financial identity or access to capital. By leveraging the borderless, permissionless nature of cryptocurrency, we can deploy emergency funds instantly to the front lines. Your donations directly secure emergency transitional housing, highly nutritious food supplies, clean water, and critical medical care for families arriving in unfamiliar territories with nothing but the clothes on their backs.\n\nBeyond sheer survival, our campaign heavily funds crucial integration programs, including comprehensive language classes, vocational training, and trauma-informed psychological counseling to help these resilient individuals rebuild their shattered lives. Through transparent, on-chain accountability, you can be absolutely certain that your contribution is serving as a direct lifeline, offering dignity, profound hope, and a tangible pathway to a safe, stable future for those who have lost everything. Stand in solidarity with the displaced and help us welcome them into a community of boundless compassion.",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    goalAmount: 15.0, 
    currentRaised: 9.0, 
    walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" 
  },
  { 
    id: "disability-advocacy", 
    title: "Accessible Pathways", 
    description: "Installing ramps and accessibility tools.", 
    longDescription: "The physical world remains deeply inaccessible for millions of individuals living with disabilities, presenting daily, exhausting barriers to essential independence, equitable employment, and basic social participation. The Accessible Pathways initiative is a targeted, action-oriented campaign dedicated to physically dismantling these barriers by funding critical infrastructure modifications and advocating for universal design principles in public spaces.\n\nIn too many communities, a single flight of stairs or a lack of proper tactile paving can completely isolate a disabled individual from their own neighborhood. Your decentralized donations are aggressively deployed to fund the immediate installation of heavy-duty wheelchair ramps, reliable automated door systems, specialized sensory equipment, and adaptive technologies in local businesses, public schools, and community centers. \n\nFurthermore, we provide direct financial grants to low-income families who urgently require expensive home modifications to safely care for disabled relatives. By utilizing the unparalleled transparency of the blockchain, we ensure that every single Ethereum contributed is rapidly converted into concrete, steel, and technology that tangibly improves daily lives. Join us in forging a society where physical limitations never equate to social exclusion, ensuring that every pathway is open, welcoming, and equally accessible to absolutely everyone. Your support builds the bridges necessary for a truly inclusive world where mobility is a right, not a privilege.",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80",
    goalAmount: 3.0, 
    currentRaised: 0.7, 
    walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" 
  },
  { 
    id: "music-arts", 
    title: "Arts in Schools", 
    description: "Funding instruments for underprivileged schools.", 
    longDescription: "The arts are the vibrant soul of human culture, driving unparalleled cognitive development, profound emotional expression, and creative problem-solving skills in young minds. Tragically, in the face of ongoing public school budget crises, music and arts programs are almost always the very first to face the chopping block, entirely depriving underprivileged students of the chance to explore their creative potential.\n\nThe Arts in Schools campaign is fiercely dedicated to reviving these essential programs by injecting direct, decentralized capital into underfunded educational districts. Your donations are used to purchase high-quality musical instruments, premium art supplies, theater equipment, and digital design software, placing these vital tools directly into the eager hands of students. \n\nFurthermore, we fund the salaries of passionate, specialized arts educators who inspire the next generation of creators, thinkers, and innovators. Research overwhelmingly proves that students involved in the arts exhibit higher academic achievement, vastly improved mental health, and stronger community engagement. By routing your contributions through our transparent blockchain infrastructure, we bypass bureaucratic bottlenecks and ensure that creativity continues to echo through the hallways. Help us fund the future symphony of society and guarantee that no child's artistic voice is ever silenced by poverty. Together, we can paint a brighter, more vibrant future for every aspiring student artist.",
    imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
    goalAmount: 2.0, 
    currentRaised: 1.5, 
    walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" 
  }
];