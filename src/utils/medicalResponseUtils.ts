
/**
 * Get a response from the HealthAI based on the user's query
 */
export const getMedicalResponse = async (query: string): Promise<string> => {
  const queryLower = query.toLowerCase();
  
  // Check if this is a response to a cancer stage inquiry
  if (queryLower.match(/stage\s*[1-4]|[1-4]\s*stage|^[1-4]$/)) {
    const stage = queryLower.match(/[1-4]/)?.[0];
    const lastCancerType = sessionStorage.getItem('lastCancerType');
    
    if (lastCancerType && stage) {
      return getCancerStageInformation(lastCancerType, stage);
    }
  }
  
  // Comprehensive health problems database
  const healthProblems: {[key: string]: {keywords: string[], info: string, advice: string, treatment: string}} = {
    // 1. Infectious Diseases
    "common_cold": {
      keywords: ["common cold", "cold", "runny nose", "sniffles"],
      info: "The common cold is a viral infection of the upper respiratory tract, primarily affecting the nose and throat.",
      advice: "Wash hands frequently, avoid close contact with sick people, get adequate sleep, eat nutritious foods, and stay hydrated.",
      treatment: "Rest, drink plenty of fluids, use saline nasal drops, take over-the-counter pain relievers if needed, and use a humidifier."
    },
    "flu": {
      keywords: ["flu", "influenza", "body aches", "fever and chills"],
      info: "Influenza is a viral infection that attacks the respiratory system, causing fever, body aches, and fatigue.",
      advice: "Get annual flu vaccination, practice good hygiene, avoid crowded places during flu season.",
      treatment: "Rest, fluids, antiviral medications if prescribed early, fever reducers, and supportive care."
    },
    "covid19": {
      keywords: ["covid", "covid-19", "coronavirus", "loss of taste", "loss of smell"],
      info: "COVID-19 is a respiratory illness caused by the SARS-CoV-2 virus, with symptoms ranging from mild to severe.",
      advice: "Get vaccinated, wear masks in crowded areas, maintain social distancing, practice good hand hygiene.",
      treatment: "Isolation, rest, fluids, monitor oxygen levels, seek medical care if symptoms worsen."
    },
    "dengue": {
      keywords: ["dengue", "dengue fever", "mosquito fever"],
      info: "Dengue is a mosquito-borne viral infection causing high fever, headache, and muscle pain.",
      advice: "Eliminate standing water, use mosquito repellent, wear long sleeves in endemic areas.",
      treatment: "Rest, fluids, paracetamol for fever (avoid aspirin), monitor for complications, seek immediate medical care for severe symptoms."
    },
    "malaria": {
      keywords: ["malaria", "chills and fever", "sweats"],
      info: "Malaria is a life-threatening disease caused by parasites transmitted through infected mosquito bites.",
      advice: "Use insecticide-treated bed nets, take antimalarial medication when traveling to endemic areas, use repellent.",
      treatment: "Antimalarial medications as prescribed, supportive care, hospitalization for severe cases."
    },
    "tuberculosis": {
      keywords: ["tuberculosis", "tb", "persistent cough", "night sweats"],
      info: "Tuberculosis is a bacterial infection that primarily affects the lungs but can spread to other organs.",
      advice: "Avoid close contact with TB patients, ensure good ventilation, get tested if exposed, maintain good nutrition.",
      treatment: "Long-term antibiotic therapy (6-9 months), directly observed treatment, isolation during infectious period."
    },
    "hepatitis": {
      keywords: ["hepatitis", "liver infection", "jaundice", "yellow eyes", "hepatitis a", "hepatitis b", "hepatitis c"],
      info: "Hepatitis is inflammation of the liver, commonly caused by viral infections (A, B, C).",
      advice: "Get vaccinated (for A and B), practice safe sex, avoid sharing needles, practice good hygiene.",
      treatment: "Rest, avoid alcohol, antiviral medications for chronic cases, supportive care, regular monitoring."
    },
    "hiv": {
      keywords: ["hiv", "aids", "immune deficiency"],
      info: "HIV attacks the immune system, potentially leading to AIDS if untreated.",
      advice: "Practice safe sex, avoid sharing needles, get tested regularly, take PrEP if at high risk.",
      treatment: "Antiretroviral therapy (ART), regular monitoring, opportunistic infection prevention."
    },
    "typhoid": {
      keywords: ["typhoid", "typhoid fever", "prolonged fever"],
      info: "Typhoid is a bacterial infection caused by Salmonella typhi, spread through contaminated food and water.",
      advice: "Drink safe water, eat well-cooked food, practice good hygiene, get vaccinated if traveling.",
      treatment: "Antibiotics as prescribed, fluids, rest, hospitalization for severe cases."
    },
    "chickenpox": {
      keywords: ["chickenpox", "varicella", "itchy rash", "blisters"],
      info: "Chickenpox is a highly contagious viral infection causing an itchy rash with fluid-filled blisters.",
      advice: "Get vaccinated, avoid contact with infected individuals, maintain good hygiene.",
      treatment: "Rest, calamine lotion for itching, antiviral medication if prescribed, avoid scratching."
    },
    "measles": {
      keywords: ["measles", "red rash", "fever and rash"],
      info: "Measles is a highly contagious viral infection causing fever, cough, runny nose, and characteristic red rash.",
      advice: "Get vaccinated with MMR vaccine, avoid contact with infected individuals, maintain good hygiene.",
      treatment: "Rest, fluids, fever reducers, vitamin A supplements, isolation to prevent spread."
    },
    "mumps": {
      keywords: ["mumps", "swollen glands", "parotid glands"],
      info: "Mumps is a viral infection causing swelling of the parotid glands (salivary glands).",
      advice: "Get vaccinated with MMR vaccine, practice good hygiene, avoid sharing utensils.",
      treatment: "Rest, fluids, pain relievers, warm or cold compresses for swollen glands."
    },
    "stds": {
      keywords: ["std", "sexually transmitted", "gonorrhea", "syphilis", "chlamydia", "genital infection"],
      info: "Sexually transmitted diseases are infections spread through sexual contact, including gonorrhea, syphilis, and chlamydia.",
      advice: "Practice safe sex, use condoms, get regular testing, limit number of sexual partners.",
      treatment: "Antibiotics for bacterial STDs, antiviral medications for viral STDs, partner treatment."
    },
    "fungal_infections": {
      keywords: ["ringworm", "athlete's foot", "fungal infection", "itchy skin patches"],
      info: "Fungal infections affect the skin, nails, or hair, commonly including ringworm and athlete's foot.",
      advice: "Keep skin clean and dry, avoid sharing personal items, wear breathable shoes and socks.",
      treatment: "Antifungal creams, powders, or oral medications, keep affected area clean and dry."
    },

    // 2. Cardiovascular Problems
    "hypertension": {
      keywords: ["high blood pressure", "hypertension", "bp", "blood pressure"],
      info: "High blood pressure is a condition where blood pressure in arteries is persistently elevated.",
      advice: "Maintain healthy weight, exercise regularly, limit sodium intake, manage stress, avoid smoking.",
      treatment: "Lifestyle changes, blood pressure medications, regular monitoring, dietary modifications."
    },
    "heart_attack": {
      keywords: ["heart attack", "chest pain", "myocardial infarction", "heart pain"],
      info: "A heart attack occurs when blood flow to part of the heart is blocked, damaging heart muscle.",
      advice: "Know warning signs, maintain heart-healthy lifestyle, control risk factors like diabetes and cholesterol.",
      treatment: "Emergency medical care, medications to restore blood flow, cardiac rehabilitation, lifestyle changes."
    },
    "angina": {
      keywords: ["angina", "chest pain", "chest tightness"],
      info: "Angina is chest pain caused by reduced blood flow to the heart muscles.",
      advice: "Manage risk factors, avoid triggers, take prescribed medications, maintain healthy lifestyle.",
      treatment: "Medications to improve blood flow, lifestyle changes, avoid strenuous activities during episodes."
    },
    "palpitations": {
      keywords: ["palpitations", "heart racing", "irregular heartbeat", "heart fluttering"],
      info: "Palpitations are sensations of a fast, fluttering, or pounding heartbeat.",
      advice: "Avoid caffeine, alcohol, and stress, practice relaxation techniques, maintain regular sleep schedule.",
      treatment: "Identify and avoid triggers, medications if needed, stress management techniques."
    },
    "stroke": {
      keywords: ["stroke", "brain attack", "facial drooping", "speech problems"],
      info: "A stroke occurs when blood supply to brain is interrupted, causing brain cell death.",
      advice: "Control blood pressure, maintain healthy lifestyle, don't smoke, limit alcohol, manage diabetes.",
      treatment: "Emergency treatment to restore blood flow, rehabilitation therapy, medications to prevent recurrence."
    },
    "heart_failure": {
      keywords: ["heart failure", "congestive heart failure", "shortness of breath heart"],
      info: "Heart failure occurs when the heart cannot pump blood effectively to meet the body's needs.",
      advice: "Monitor fluid intake, take medications as prescribed, exercise as tolerated, maintain healthy weight.",
      treatment: "Medications, lifestyle changes, monitoring symptoms, possible surgical interventions."
    },
    "high_cholesterol": {
      keywords: ["high cholesterol", "cholesterol", "lipid profile"],
      info: "High cholesterol is excess cholesterol in blood, increasing risk of heart disease and stroke.",
      advice: "Eat heart-healthy diet, exercise regularly, maintain healthy weight, avoid trans fats.",
      treatment: "Dietary changes, regular exercise, cholesterol-lowering medications if needed."
    },
    "poor_circulation": {
      keywords: ["poor circulation", "cold hands", "cold feet", "circulation problems"],
      info: "Poor circulation is reduced blood flow to certain parts of the body, often hands and feet.",
      advice: "Exercise regularly, avoid smoking, wear warm clothing, elevate legs when sitting.",
      treatment: "Exercise, medications to improve circulation, compression stockings, lifestyle changes."
    },
    "varicose_veins": {
      keywords: ["varicose veins", "swollen veins", "leg veins"],
      info: "Varicose veins are enlarged, twisted veins, usually in the legs, caused by weak vein walls.",
      advice: "Exercise regularly, elevate legs, avoid prolonged standing, wear compression stockings.",
      treatment: "Compression stockings, sclerotherapy, laser treatment, surgical procedures for severe cases."
    },

    // 3. Respiratory Problems
    "asthma": {
      keywords: ["asthma", "wheezing", "breathing difficulty", "bronchial asthma"],
      info: "Asthma is a chronic condition where airways become inflamed and narrow, making breathing difficult.",
      advice: "Identify and avoid triggers, maintain clean environment, get vaccinated against flu and pneumonia.",
      treatment: "Inhaled bronchodilators, anti-inflammatory medications, asthma action plan, peak flow monitoring."
    },
    "cough": {
      keywords: ["cough", "persistent cough", "dry cough", "chronic cough"],
      info: "A cough is a reflex that helps clear the airways of mucus and irritants.",
      advice: "Stay hydrated, avoid irritants, use humidifier, practice good hygiene.",
      treatment: "Cough suppressants, expectorants, treat underlying cause, throat lozenges."
    },
    "wheezing": {
      keywords: ["wheezing", "whistling sound breathing"],
      info: "Wheezing is a high-pitched whistling sound when breathing, indicating narrowed airways.",
      advice: "Avoid triggers, use prescribed inhalers, maintain good air quality.",
      treatment: "Bronchodilators, anti-inflammatory medications, treat underlying condition."
    },
    "bronchitis": {
      keywords: ["bronchitis", "productive cough", "chest congestion"],
      info: "Bronchitis is inflammation of the bronchial tubes, causing cough and mucus production.",
      advice: "Avoid smoking, stay hydrated, avoid lung irritants, practice good hygiene.",
      treatment: "Rest, fluids, cough suppressants, bronchodilators if needed, antibiotics only for bacterial infections."
    },
    "copd": {
      keywords: ["copd", "chronic obstructive", "emphysema", "chronic bronchitis"],
      info: "COPD is a chronic lung disease that blocks airflow and makes breathing difficult.",
      advice: "Don't smoke, avoid secondhand smoke, get vaccinated, exercise regularly, eat healthy diet.",
      treatment: "Bronchodilators, inhaled steroids, oxygen therapy, pulmonary rehabilitation, smoking cessation."
    },
    "pneumonia": {
      keywords: ["pneumonia", "lung infection", "difficulty breathing", "chest pain breathing"],
      info: "Pneumonia is an infection that inflames air sacs in lungs, which may fill with fluid.",
      advice: "Get vaccinated, practice good hygiene, avoid smoking, maintain healthy immune system.",
      treatment: "Antibiotics for bacterial pneumonia, rest, fluids, oxygen therapy if needed, hospitalization for severe cases."
    },
    "shortness_of_breath": {
      keywords: ["shortness of breath", "breathlessness", "difficulty breathing"],
      info: "Shortness of breath is the feeling of not being able to get enough air into the lungs.",
      advice: "Exercise regularly, maintain healthy weight, avoid smoking, manage underlying conditions.",
      treatment: "Treat underlying cause, breathing exercises, oxygen therapy if needed, medications."
    },
    "sinusitis": {
      keywords: ["sinusitis", "sinus infection", "sinus pressure", "facial pain"],
      info: "Sinusitis is inflammation of the sinuses, causing facial pain, congestion, and thick nasal discharge.",
      advice: "Use humidifier, avoid allergens, practice good hygiene, stay hydrated.",
      treatment: "Decongestants, nasal irrigation, antibiotics if bacterial, pain relievers."
    },
    "allergic_rhinitis": {
      keywords: ["allergic rhinitis", "hay fever", "seasonal allergies", "runny nose allergies"],
      info: "Allergic rhinitis is an allergic reaction causing sneezing, congestion, runny nose, and itchy eyes.",
      advice: "Avoid allergens, keep windows closed during high pollen days, use air purifiers.",
      treatment: "Antihistamines, nasal corticosteroids, decongestants, allergen avoidance."
    },

    // 4. Digestive & Stomach Issues
    "vomiting": {
      keywords: ["vomiting", "throwing up", "nausea and vomiting"],
      info: "Vomiting is the forceful emptying of stomach contents through the mouth.",
      advice: "Stay hydrated, eat bland foods, avoid strong odors, rest.",
      treatment: "Clear fluids, anti-nausea medications, electrolyte replacement, treat underlying cause."
    },
    "nausea": {
      keywords: ["nausea", "feeling sick", "queasy", "stomach upset"],
      info: "Nausea is the sensation of feeling sick with an urge to vomit.",
      advice: "Eat small frequent meals, avoid strong odors, stay hydrated, get fresh air.",
      treatment: "Anti-nausea medications, ginger supplements, acupressure, treat underlying cause."
    },
    "diarrhea": {
      keywords: ["diarrhea", "loose stools", "watery stool", "frequent bowel movements"],
      info: "Diarrhea is loose, watery stools occurring more frequently than normal.",
      advice: "Practice good hygiene, drink safe water, eat well-cooked food, wash hands frequently.",
      treatment: "Stay hydrated with ORS, BRAT diet, probiotics, avoid dairy temporarily, seek care if severe."
    },
    "constipation": {
      keywords: ["constipation", "hard stools", "difficulty passing stool", "infrequent bowel movements"],
      info: "Constipation is infrequent bowel movements or difficulty passing stool.",
      advice: "Eat high-fiber diet, drink plenty of water, exercise regularly, establish regular toilet routine.",
      treatment: "Increase fiber intake, drink more fluids, exercise, laxatives if needed, stool softeners."
    },
    "bloating": {
      keywords: ["bloating", "abdominal bloating", "swollen belly", "distended stomach"],
      info: "Bloating is a feeling of fullness or swelling in the abdomen.",
      advice: "Eat slowly, avoid carbonated drinks, limit gas-producing foods, exercise regularly.",
      treatment: "Dietary changes, probiotics, simethicone, avoid trigger foods."
    },
    "gas": {
      keywords: ["gas", "flatulence", "intestinal gas", "stomach gas"],
      info: "Intestinal gas is air in the digestive tract that exits through the rectum.",
      advice: "Eat slowly, avoid gas-producing foods, limit carbonated drinks, exercise regularly.",
      treatment: "Dietary modifications, simethicone, probiotics, avoid trigger foods."
    },
    "gerd": {
      keywords: ["heartburn", "acid reflux", "gerd", "acidity", "burning chest"],
      info: "GERD is chronic acid reflux where stomach acid flows back into the esophagus.",
      advice: "Avoid trigger foods, eat smaller meals, don't lie down after eating, maintain healthy weight.",
      treatment: "Antacids, H2 blockers, proton pump inhibitors, lifestyle modifications, elevate head while sleeping."
    },
    "indigestion": {
      keywords: ["indigestion", "dyspepsia", "stomach discomfort", "upset stomach"],
      info: "Indigestion is discomfort in the upper abdomen, often after eating.",
      advice: "Eat smaller meals, chew food thoroughly, avoid spicy foods, manage stress.",
      treatment: "Antacids, dietary changes, avoid trigger foods, stress management."
    },
    "ibs": {
      keywords: ["ibs", "irritable bowel", "abdominal pain", "bloating gas"],
      info: "IBS is a chronic disorder affecting the large intestine, causing cramping and changes in bowel habits.",
      advice: "Identify trigger foods, manage stress, eat regular meals, exercise regularly.",
      treatment: "Dietary changes, stress management, fiber supplements, antispasmodics, probiotics."
    },
    "gastric_ulcers": {
      keywords: ["gastric ulcer", "stomach ulcer", "peptic ulcer", "ulcer pain"],
      info: "Gastric ulcers are open sores in the stomach lining, often caused by H. pylori bacteria.",
      advice: "Avoid NSAIDs, limit alcohol, don't smoke, manage stress, eat regular meals.",
      treatment: "Antibiotics for H. pylori, acid reducers, protective medications, lifestyle changes."
    },
    "food_poisoning": {
      keywords: ["food poisoning", "foodborne illness", "stomach bug"],
      info: "Food poisoning is illness caused by eating contaminated food.",
      advice: "Practice food safety, cook food thoroughly, refrigerate promptly, wash hands.",
      treatment: "Rest, fluids, electrolyte replacement, avoid solid foods initially, seek care if severe."
    },
    "loss_of_appetite": {
      keywords: ["loss of appetite", "no appetite", "not hungry"],
      info: "Loss of appetite is reduced desire to eat, which can have various causes.",
      advice: "Eat small frequent meals, stay hydrated, address underlying stress or illness.",
      treatment: "Treat underlying cause, appetite stimulants if prescribed, nutritional support."
    },

    // 5. Muscle, Bone & Joint Problems
    "knee_pain": {
      keywords: ["knee pain", "knee ache", "knee injury"],
      info: "Knee pain can result from injuries, arthritis, or mechanical problems in the knee joint.",
      advice: "Maintain healthy weight, strengthen leg muscles, wear proper footwear, avoid overuse.",
      treatment: "Rest, ice, compression, elevation (RICE), pain relievers, physical therapy."
    },
    "back_pain": {
      keywords: ["back pain", "lower back pain", "spine pain", "backache"],
      info: "Back pain is discomfort in the back, often caused by muscle strain, poor posture, or injury.",
      advice: "Maintain good posture, exercise regularly, lift properly, sleep on supportive mattress.",
      treatment: "Rest, ice/heat therapy, pain relievers, physical therapy, gentle stretching exercises."
    },
    "neck_pain": {
      keywords: ["neck pain", "stiff neck", "neck ache", "cervical pain"],
      info: "Neck pain can result from muscle strain, poor posture, or injury to the cervical spine.",
      advice: "Maintain good posture, use ergonomic workspace, sleep with proper pillow support.",
      treatment: "Rest, ice/heat therapy, pain relievers, gentle neck exercises, physical therapy."
    },
    "joint_pain": {
      keywords: ["joint pain", "aching joints", "stiff joints"],
      info: "Joint pain affects one or more joints and can be caused by arthritis, injury, or inflammation.",
      advice: "Stay active with low-impact exercises, maintain healthy weight, protect joints from injury.",
      treatment: "Pain relievers, anti-inflammatory medications, physical therapy, joint protection techniques."
    },
    "muscle_cramps": {
      keywords: ["muscle cramps", "muscle spasms", "charlie horse"],
      info: "Muscle cramps are sudden, involuntary contractions of one or more muscles.",
      advice: "Stay hydrated, stretch regularly, maintain electrolyte balance, warm up before exercise.",
      treatment: "Gentle stretching, massage, heat application, hydration, electrolyte replacement."
    },
    "arthritis": {
      keywords: ["arthritis", "joint pain", "stiff joints", "joint swelling"],
      info: "Arthritis is inflammation of joints causing pain, stiffness, and reduced range of motion.",
      advice: "Stay active, maintain healthy weight, protect joints, eat anti-inflammatory diet.",
      treatment: "Pain medications, anti-inflammatory drugs, physical therapy, joint protection techniques."
    },
    "osteoporosis": {
      keywords: ["osteoporosis", "bone density", "weak bones", "brittle bones"],
      info: "Osteoporosis is a condition where bones become weak and brittle, increasing fracture risk.",
      advice: "Get adequate calcium and vitamin D, exercise regularly, avoid smoking and excessive alcohol.",
      treatment: "Calcium and vitamin D supplements, bone-strengthening medications, weight-bearing exercises."
    },
    "frozen_shoulder": {
      keywords: ["frozen shoulder", "adhesive capsulitis", "stiff shoulder"],
      info: "Frozen shoulder is stiffness and pain in the shoulder joint that develops gradually.",
      advice: "Maintain shoulder mobility with gentle exercises, avoid prolonged immobilization.",
      treatment: "Physical therapy, pain medications, corticosteroid injections, gradual range of motion exercises."
    },
    "sciatica": {
      keywords: ["sciatica", "sciatic nerve pain", "leg pain from back"],
      info: "Sciatica is pain that radiates along the sciatic nerve from the lower back to the leg.",
      advice: "Maintain good posture, exercise regularly, avoid prolonged sitting, lift properly.",
      treatment: "Pain medications, physical therapy, stretching exercises, heat/ice therapy."
    },
    "sprains_strains": {
      keywords: ["sprain", "strain", "pulled muscle", "twisted ankle"],
      info: "Sprains affect ligaments while strains affect muscles or tendons, both causing pain and swelling.",
      advice: "Warm up before exercise, use proper technique, wear appropriate protective gear.",
      treatment: "RICE (Rest, Ice, Compression, Elevation), pain relievers, gradual return to activity."
    },
    "fractures": {
      keywords: ["fracture", "broken bone", "bone break"],
      info: "A fracture is a break in the bone, ranging from hairline cracks to complete breaks.",
      advice: "Prevent falls, ensure adequate calcium and vitamin D, exercise for bone strength.",
      treatment: "Immobilization, casting, surgery if needed, pain management, rehabilitation."
    },
    "carpal_tunnel": {
      keywords: ["carpal tunnel", "wrist pain", "hand numbness", "carpal tunnel syndrome"],
      info: "Carpal tunnel syndrome is compression of the median nerve in the wrist, causing pain and numbness.",
      advice: "Take breaks from repetitive activities, use ergonomic tools, maintain neutral wrist position.",
      treatment: "Wrist splints, anti-inflammatory medications, steroid injections, surgery for severe cases."
    },

    // 6. Genetic & Autoimmune Conditions
    "down_syndrome": {
      keywords: ["down syndrome", "trisomy 21"],
      info: "Down syndrome is a genetic condition caused by an extra copy of chromosome 21.",
      advice: "Early intervention, regular health monitoring, educational support, inclusive environment.",
      treatment: "Supportive care, early intervention programs, treatment of associated conditions, regular monitoring."
    },
    "sickle_cell": {
      keywords: ["sickle cell", "sickle cell anemia", "sickle cell disease"],
      info: "Sickle cell disease is a genetic blood disorder affecting red blood cells.",
      advice: "Stay hydrated, avoid extreme temperatures, get regular medical care, prevent infections.",
      treatment: "Pain management, hydroxyurea, blood transfusions, bone marrow transplant in severe cases."
    },
    "cystic_fibrosis": {
      keywords: ["cystic fibrosis", "cf"],
      info: "Cystic fibrosis is a genetic disorder affecting the lungs and digestive system.",
      advice: "Follow treatment regimen, maintain good nutrition, prevent infections, stay active.",
      treatment: "Airway clearance, enzyme supplements, antibiotics, nutritional support, lung transplant in severe cases."
    },
    "thalassemia": {
      keywords: ["thalassemia", "thalassemia major", "thalassemia minor"],
      info: "Thalassemia is an inherited blood disorder causing the body to make less hemoglobin.",
      advice: "Regular medical monitoring, avoid iron supplements unless prescribed, prevent infections.",
      treatment: "Blood transfusions, iron chelation therapy, folic acid supplements, bone marrow transplant."
    },
    "lupus": {
      keywords: ["lupus", "systemic lupus", "autoimmune disease", "butterfly rash"],
      info: "Lupus is an autoimmune disease where the immune system attacks healthy tissue.",
      advice: "Avoid sun exposure, manage stress, get adequate rest, follow treatment plan.",
      treatment: "Anti-inflammatory medications, immunosuppressants, antimalarials, corticosteroids."
    },
    "diabetes_type1": {
      keywords: ["type 1 diabetes", "juvenile diabetes", "insulin dependent"],
      info: "Type 1 diabetes is an autoimmune condition where the pancreas produces little or no insulin.",
      advice: "Monitor blood sugar regularly, follow meal plan, stay active, learn to manage condition.",
      treatment: "Insulin therapy, blood glucose monitoring, healthy diet, regular exercise, diabetes education."
    },
    "rheumatoid_arthritis": {
      keywords: ["rheumatoid arthritis", "ra", "autoimmune arthritis"],
      info: "Rheumatoid arthritis is an autoimmune condition causing joint inflammation and damage.",
      advice: "Stay active with appropriate exercises, manage stress, maintain healthy weight.",
      treatment: "Disease-modifying drugs, anti-inflammatory medications, physical therapy, joint protection."
    },
    "psoriasis": {
      keywords: ["psoriasis", "scaly skin", "skin plaques"],
      info: "Psoriasis is an autoimmune condition causing rapid skin cell growth and scaly patches.",
      advice: "Moisturize regularly, avoid triggers, manage stress, protect skin from injury.",
      treatment: "Topical treatments, phototherapy, systemic medications, biologics for severe cases."
    },
    "vitiligo": {
      keywords: ["vitiligo", "white patches skin", "depigmentation"],
      info: "Vitiligo is a condition where skin loses its pigment, creating white patches.",
      advice: "Protect skin from sun, use sunscreen, manage stress, avoid skin trauma.",
      treatment: "Topical corticosteroids, phototherapy, immunomodulators, camouflage makeup."
    },

    // 7. Eye & Vision Problems
    "eye_pain": {
      keywords: ["eye pain", "eye ache", "painful eyes"],
      info: "Eye pain can be caused by various conditions including dry eyes, infections, or injuries.",
      advice: "Avoid eye strain, take breaks from screens, protect eyes from injury, practice good hygiene.",
      treatment: "Eye drops, pain relievers, treat underlying cause, avoid rubbing eyes."
    },
    "blurred_vision": {
      keywords: ["blurred vision", "blurry vision", "vision problems"],
      info: "Blurred vision is loss of sharpness of vision, making objects appear out of focus.",
      advice: "Regular eye exams, control diabetes and blood pressure, protect eyes from UV rays.",
      treatment: "Corrective lenses, treat underlying conditions, eye drops, possible surgery."
    },
    "dry_eyes": {
      keywords: ["dry eyes", "eye dryness", "burning eyes", "gritty eyes"],
      info: "Dry eyes occur when eyes don't produce enough tears or tears evaporate too quickly.",
      advice: "Use humidifier, take breaks from screens, protect eyes from wind, stay hydrated.",
      treatment: "Artificial tears, prescription eye drops, punctal plugs, warm compresses."
    },
    "red_eyes": {
      keywords: ["red eyes", "bloodshot eyes", "eye redness"],
      info: "Red eyes are caused by dilated blood vessels on the eye's surface due to various factors.",
      advice: "Avoid eye irritants, don't rub eyes, practice good hygiene, get adequate sleep.",
      treatment: "Eye drops, cold compresses, avoid triggers, treat underlying cause."
    },
    "cataract": {
      keywords: ["cataract", "cloudy vision", "lens clouding"],
      info: "Cataracts are clouding of the eye's natural lens, causing blurred or dim vision.",
      advice: "Protect eyes from UV rays, don't smoke, control diabetes, eat antioxidant-rich foods.",
      treatment: "Stronger lighting initially, sunglasses, cataract surgery when vision significantly impaired."
    },
    "glaucoma": {
      keywords: ["glaucoma", "eye pressure", "optic nerve damage"],
      info: "Glaucoma is a group of eye conditions that damage the optic nerve, often due to high eye pressure.",
      advice: "Regular eye exams, exercise regularly, protect eyes from injury, control blood pressure.",
      treatment: "Eye drops to lower pressure, laser therapy, surgery, regular monitoring."
    },
    "conjunctivitis": {
      keywords: ["pink eye", "conjunctivitis", "red eyes", "eye infection"],
      info: "Conjunctivitis is inflammation of the conjunctiva, causing red, itchy, and watery eyes.",
      advice: "Practice good hygiene, avoid touching eyes, don't share eye makeup or towels.",
      treatment: "Antibiotic eye drops for bacterial cases, cool compresses, artificial tears, avoid contact lenses."
    },
    "night_blindness": {
      keywords: ["night blindness", "poor night vision", "difficulty seeing dark"],
      info: "Night blindness is difficulty seeing in low light or darkness.",
      advice: "Eat vitamin A-rich foods, protect eyes during day, avoid bright lights before dark.",
      treatment: "Vitamin A supplements if deficient, treat underlying conditions, corrective lenses."
    },

    // 8. Ear, Nose & Throat (ENT)
    "ear_pain": {
      keywords: ["ear pain", "earache", "ear infection"],
      info: "Ear pain can be caused by infections, earwax buildup, or pressure changes.",
      advice: "Keep ears dry, avoid inserting objects in ears, practice good hygiene.",
      treatment: "Pain relievers, warm compresses, antibiotics for infections, remove earwax if impacted."
    },
    "hearing_loss": {
      keywords: ["hearing loss", "deafness", "poor hearing"],
      info: "Hearing loss is partial or complete inability to hear sounds in one or both ears.",
      advice: "Protect ears from loud noises, avoid earwax buildup, get regular hearing tests.",
      treatment: "Hearing aids, cochlear implants, remove earwax, treat underlying conditions."
    },
    "sore_throat": {
      keywords: ["sore throat", "throat pain", "painful swallowing"],
      info: "Sore throat is pain or irritation in the throat, often caused by viral or bacterial infections.",
      advice: "Stay hydrated, avoid smoking, practice good hygiene, humidify air.",
      treatment: "Rest, fluids, throat lozenges, pain relievers, antibiotics if bacterial."
    },
    "tonsillitis": {
      keywords: ["tonsillitis", "swollen tonsils", "throat infection"],
      info: "Tonsillitis is inflammation of the tonsils, causing sore throat and difficulty swallowing.",
      advice: "Practice good hygiene, avoid close contact with infected individuals, stay hydrated.",
      treatment: "Rest, fluids, pain relievers, antibiotics if bacterial, possible tonsillectomy for recurrent cases."
    },
    "sinus_infection": {
      keywords: ["sinus infection", "sinusitis", "sinus pressure"],
      info: "Sinus infection is inflammation of the sinuses, causing facial pain and nasal congestion.",
      advice: "Use humidifier, avoid allergens, practice good hygiene, stay hydrated.",
      treatment: "Decongestants, nasal irrigation, antibiotics if bacterial, pain relievers."
    },
    "tinnitus": {
      keywords: ["tinnitus", "ringing ears", "ear ringing"],
      info: "Tinnitus is perception of ringing, buzzing, or other sounds in the ears when no external sound is present.",
      advice: "Protect hearing, avoid loud noises, manage stress, limit caffeine and alcohol.",
      treatment: "Treat underlying causes, hearing aids, sound therapy, tinnitus retraining therapy."
    },
    "nosebleeds": {
      keywords: ["nosebleed", "epistaxis", "nose bleeding"],
      info: "Nosebleeds are bleeding from the nose, usually from the front part of the nasal septum.",
      advice: "Keep nasal passages moist, avoid picking nose, humidify air, trim fingernails.",
      treatment: "Pinch nose firmly, lean forward, apply ice, use nasal decongestant spray if needed."
    },
    "cough_with_mucus": {
      keywords: ["productive cough", "cough with phlegm", "mucus cough"],
      info: "Productive cough brings up mucus from the lungs and airways.",
      advice: "Stay hydrated, use humidifier, avoid smoking, practice good hygiene.",
      treatment: "Expectorants, stay hydrated, avoid cough suppressants, treat underlying condition."
    },

    // 9. Dental & Oral Health
    "toothache": {
      keywords: ["toothache", "tooth pain", "dental pain"],
      info: "Toothache is pain in or around a tooth, usually caused by dental decay or infection.",
      advice: "Brush twice daily, floss regularly, limit sugary foods, regular dental checkups.",
      treatment: "Pain relievers, dental treatment, antibiotics if infected, good oral hygiene."
    },
    "bleeding_gums": {
      keywords: ["bleeding gums", "gum bleeding", "gums bleed"],
      info: "Bleeding gums are often a sign of gum disease or poor oral hygiene.",
      advice: "Brush gently twice daily, floss regularly, use antiseptic mouthwash, regular dental visits.",
      treatment: "Professional cleaning, antibiotics if needed, improved oral hygiene, treat gum disease."
    },
    "cavities": {
      keywords: ["cavities", "tooth decay", "dental caries"],
      info: "Cavities are holes in teeth caused by acid-producing bacteria that damage tooth enamel.",
      advice: "Brush with fluoride toothpaste, limit sugary snacks, regular dental checkups, drink water.",
      treatment: "Dental fillings, crowns for large cavities, root canal if nerve affected, good oral hygiene."
    },
    "bad_breath": {
      keywords: ["bad breath", "halitosis", "mouth odor"],
      info: "Bad breath is unpleasant odor from the mouth, often caused by poor oral hygiene or underlying conditions.",
      advice: "Brush teeth and tongue twice daily, floss regularly, stay hydrated, avoid tobacco.",
      treatment: "Improve oral hygiene, treat underlying conditions, antibacterial mouthwash, regular dental care."
    },
    "sensitive_teeth": {
      keywords: ["sensitive teeth", "tooth sensitivity", "teeth hurt cold"],
      info: "Tooth sensitivity is pain or discomfort when teeth are exposed to hot, cold, sweet, or acidic substances.",
      advice: "Use soft-bristled toothbrush, avoid acidic foods, don't brush immediately after eating acidic foods.",
      treatment: "Desensitizing toothpaste, fluoride treatments, dental bonding, treat underlying causes."
    },
    "mouth_ulcers": {
      keywords: ["mouth ulcers", "canker sores", "mouth sores"],
      info: "Mouth ulcers are small, painful sores inside the mouth that usually heal on their own.",
      advice: "Avoid spicy or acidic foods, manage stress, maintain good oral hygiene, avoid trauma to mouth.",
      treatment: "Topical gels, pain relievers, antimicrobial mouthwash, avoid irritants."
    },
    "jaw_pain": {
      keywords: ["jaw pain", "tmj", "jaw ache"],
      info: "Jaw pain can be caused by TMJ disorders, teeth grinding, or dental problems.",
      advice: "Avoid hard or chewy foods, manage stress, don't clench jaw, practice relaxation techniques.",
      treatment: "Pain relievers, muscle relaxants, mouth guards, physical therapy, stress management."
    },
    "tooth_decay": {
      keywords: ["tooth decay", "dental decay", "rotting teeth"],
      info: "Tooth decay is the destruction of tooth enamel caused by acids produced by bacteria.",
      advice: "Brush with fluoride toothpaste, limit sugary foods, regular dental visits, drink fluoridated water.",
      treatment: "Dental fillings, crowns, root canal therapy, tooth extraction if severely damaged."
    },

    // 10. Skin, Hair & Nail Problems
    "acne": {
      keywords: ["acne", "pimples", "blackheads", "whiteheads", "skin breakouts"],
      info: "Acne is a skin condition that occurs when hair follicles become clogged with oil and dead skin cells.",
      advice: "Wash face gently twice daily, avoid touching face, use non-comedogenic products, manage stress.",
      treatment: "Topical retinoids, benzoyl peroxide, salicylic acid, antibiotics for severe cases, good skincare routine."
    },
    "dandruff": {
      keywords: ["dandruff", "flaky scalp", "scalp flakes"],
      info: "Dandruff is a common scalp condition causing flaky, itchy skin on the scalp.",
      advice: "Wash hair regularly, manage stress, avoid harsh hair products, maintain scalp hygiene.",
      treatment: "Anti-dandruff shampoos with zinc pyrithione, selenium sulfide, or ketoconazole."
    },
    "hair_loss": {
      keywords: ["hair loss", "baldness", "thinning hair", "alopecia"],
      info: "Hair loss can be caused by genetics, hormones, medical conditions, or stress.",
      advice: "Eat nutritious diet, manage stress, avoid tight hairstyles, be gentle with hair.",
      treatment: "Minoxidil, finasteride, hair transplant, treat underlying conditions, lifestyle changes."
    },
    "itching": {
      keywords: ["itching", "itchy skin", "pruritus"],
      info: "Itching is an uncomfortable sensation that triggers the urge to scratch.",
      advice: "Moisturize regularly, avoid hot showers, wear soft fabrics, identify and avoid triggers.",
      treatment: "Moisturizers, antihistamines, topical corticosteroids, avoid scratching, treat underlying cause."
    },
    "eczema": {
      keywords: ["eczema", "atopic dermatitis", "itchy skin", "skin rash"],
      info: "Eczema is a chronic skin condition causing dry, itchy, and inflamed skin.",
      advice: "Moisturize regularly, avoid triggers, use gentle soaps, wear soft fabrics, manage stress.",
      treatment: "Moisturizers, topical corticosteroids, antihistamines, avoid scratching, identify and avoid triggers."
    },
    "rashes": {
      keywords: ["rash", "skin rash", "red patches skin"],
      info: "Rashes are changes in skin color and texture, often causing redness, itching, or bumps.",
      advice: "Avoid known allergens, keep skin clean and dry, wear breathable fabrics.",
      treatment: "Topical corticosteroids, antihistamines, cool compresses, identify and treat underlying cause."
    },
    "skin_infections": {
      keywords: ["skin infection", "bacterial skin infection", "cellulitis"],
      info: "Skin infections are caused by bacteria, viruses, fungi, or parasites entering through breaks in the skin.",
      advice: "Keep skin clean, treat cuts promptly, avoid sharing personal items, maintain good hygiene.",
      treatment: "Antibiotics, antifungal medications, topical treatments, proper wound care."
    },
    "scalp_irritation": {
      keywords: ["scalp irritation", "itchy scalp", "scalp problems"],
      info: "Scalp irritation can be caused by various factors including dry skin, allergies, or infections.",
      advice: "Use gentle hair products, avoid harsh chemicals, manage stress, maintain scalp hygiene.",
      treatment: "Medicated shampoos, topical treatments, avoid irritants, treat underlying conditions."
    },
    "boils": {
      keywords: ["boils", "skin abscess", "furuncle"],
      info: "Boils are painful, pus-filled bumps under the skin caused by bacterial infection of hair follicles.",
      advice: "Maintain good hygiene, avoid sharing personal items, keep skin clean and dry.",
      treatment: "Warm compresses, antibiotics, drainage by healthcare provider, pain management."
    },
    "nail_fungus": {
      keywords: ["nail fungus", "fungal nail infection", "onychomycosis"],
      info: "Nail fungus is a fungal infection that affects fingernails or toenails, causing thickening and discoloration.",
      advice: "Keep nails clean and dry, wear breathable shoes, avoid walking barefoot in public areas.",
      treatment: "Antifungal medications, topical treatments, nail removal in severe cases, good nail hygiene."
    },

    // 11. Reproductive & Sexual Health
    "menstrual_cramps": {
      keywords: ["menstrual cramps", "period pain", "dysmenorrhea"],
      info: "Menstrual cramps are painful uterine contractions during menstruation.",
      advice: "Exercise regularly, apply heat, maintain healthy diet, manage stress.",
      treatment: "Pain relievers, heat therapy, hormonal birth control, exercise, relaxation techniques."
    },
    "pcos": {
      keywords: ["pcos", "polycystic ovary syndrome", "irregular periods hormonal"],
      info: "PCOS is a hormonal disorder affecting women of reproductive age, causing irregular periods and other symptoms.",
      advice: "Maintain healthy weight, exercise regularly, eat balanced diet, manage stress.",
      treatment: "Hormonal birth control, metformin, lifestyle changes, fertility treatments if needed."
    },
    "irregular_periods": {
      keywords: ["irregular periods", "menstrual irregularities", "missed periods"],
      info: "Irregular periods are menstrual cycles that vary significantly in length, flow, or timing.",
      advice: "Maintain healthy weight, manage stress, exercise moderately, track menstrual cycle.",
      treatment: "Hormonal therapy, treat underlying conditions, lifestyle changes, nutritional support."
    },
    "vaginal_infections": {
      keywords: ["vaginal infection", "yeast infection", "bacterial vaginosis"],
      info: "Vaginal infections can be caused by bacteria, yeast, or other microorganisms.",
      advice: "Practice good hygiene, wear breathable underwear, avoid douching, wipe front to back.",
      treatment: "Antifungal medications, antibiotics, probiotics, avoid irritants."
    },
    "infertility": {
      keywords: ["infertility", "difficulty conceiving", "unable to get pregnant"],
      info: "Infertility is the inability to conceive after one year of trying or carry a pregnancy to term.",
      advice: "Maintain healthy lifestyle, avoid smoking and excessive alcohol, manage stress, track ovulation.",
      treatment: "Fertility medications, assisted reproductive technologies, treat underlying conditions, counseling."
    },
    "erectile_dysfunction": {
      keywords: ["erectile dysfunction", "ed", "impotence"],
      info: "Erectile dysfunction is the inability to achieve or maintain an erection sufficient for sexual intercourse.",
      advice: "Exercise regularly, maintain healthy weight, avoid smoking and excessive alcohol, manage stress.",
      treatment: "Medications, lifestyle changes, counseling, treat underlying conditions, vacuum devices."
    },
    "painful_sex": {
      keywords: ["painful sex", "dyspareunia", "pain during intercourse"],
      info: "Painful sex can have physical or psychological causes and affects both men and women.",
      advice: "Use adequate lubrication, communicate with partner, practice relaxation, address stress.",
      treatment: "Treat underlying conditions, counseling, lubricants, hormone therapy, physical therapy."
    },
    "pms": {
      keywords: ["pms", "premenstrual syndrome", "mood changes before period"],
      info: "PMS is a group of symptoms that occur before menstruation, including mood changes and physical discomfort.",
      advice: "Exercise regularly, eat balanced diet, manage stress, limit caffeine and alcohol.",
      treatment: "Pain relievers, hormonal birth control, antidepressants, lifestyle changes, supplements."
    },
    "pregnancy_nausea": {
      keywords: ["morning sickness", "pregnancy nausea", "nausea during pregnancy"],
      info: "Morning sickness is nausea and vomiting during pregnancy, usually in the first trimester.",
      advice: "Eat small frequent meals, avoid triggers, stay hydrated, get adequate rest.",
      treatment: "Ginger supplements, vitamin B6, anti-nausea medications if severe, dietary modifications."
    },

    // 12. Childhood Health Issues
    "colic": {
      keywords: ["colic", "baby crying", "infant crying"],
      info: "Colic is excessive crying in healthy babies, typically in the first few months of life.",
      advice: "Comfort techniques, maintain routine, ensure adequate nutrition, seek support.",
      treatment: "Soothing techniques, probiotics, dietary changes for breastfeeding mothers, patience and support."
    },
    "teething_pain": {
      keywords: ["teething", "teething pain", "baby teeth coming"],
      info: "Teething pain occurs when baby teeth break through the gums, causing discomfort and irritability.",
      advice: "Provide teething toys, massage gums gently, maintain good oral hygiene.",
      treatment: "Teething rings, cold washcloth, pain relievers if recommended by pediatrician, gentle gum massage."
    },
    "diaper_rash": {
      keywords: ["diaper rash", "baby rash", "nappy rash"],
      info: "Diaper rash is skin irritation in the diaper area, causing redness and discomfort.",
      advice: "Change diapers frequently, keep area clean and dry, use barrier cream.",
      treatment: "Barrier creams, frequent diaper changes, air dry when possible, avoid fragranced products."
    },
    "ear_infections_child": {
      keywords: ["ear infection child", "otitis media", "child ear pain"],
      info: "Ear infections are common in children, causing ear pain, fever, and sometimes hearing problems.",
      advice: "Avoid secondhand smoke, breastfeed if possible, keep up with vaccinations.",
      treatment: "Antibiotics if bacterial, pain relievers, warm compresses, follow-up care."
    },
    "worm_infestation": {
      keywords: ["worms", "intestinal worms", "parasitic worms"],
      info: "Intestinal worms are parasites that live in the digestive tract, common in children.",
      advice: "Wash hands frequently, keep fingernails short, avoid walking barefoot, cook meat thoroughly.",
      treatment: "Antiparasitic medications, good hygiene practices, treat all family members if needed."
    },
    "nutritional_deficiency": {
      keywords: ["nutritional deficiency", "vitamin deficiency", "malnutrition child"],
      info: "Nutritional deficiencies occur when the body doesn't get enough essential nutrients for proper growth and development.",
      advice: "Provide balanced diet, ensure adequate vitamins and minerals, regular growth monitoring.",
      treatment: "Nutritional supplements, dietary modifications, treat underlying causes, regular monitoring."
    },

    // 13. Geriatric Problems (Elderly)
    "joint_stiffness": {
      keywords: ["joint stiffness", "stiff joints elderly", "morning stiffness"],
      info: "Joint stiffness in elderly is often due to arthritis, reduced activity, or age-related changes.",
      advice: "Stay active with gentle exercises, maintain healthy weight, use heat therapy.",
      treatment: "Anti-inflammatory medications, physical therapy, heat application, appropriate exercise."
    },
    "memory_loss": {
      keywords: ["memory loss", "forgetfulness", "cognitive decline"],
      info: "Memory loss can be normal aging or a sign of more serious conditions like dementia.",
      advice: "Stay mentally active, exercise regularly, maintain social connections, eat healthy diet.",
      treatment: "Cognitive training, treat underlying conditions, medications for dementia, lifestyle modifications."
    },
    "alzheimers": {
      keywords: ["alzheimer's", "alzheimer", "dementia"],
      info: "Alzheimer's disease is a progressive brain disorder that affects memory, thinking, and behavior.",
      advice: "Maintain routine, ensure safe environment, provide emotional support, stay engaged.",
      treatment: "Medications to slow progression, behavioral interventions, support services, safety measures."
    },
    "parkinsons": {
      keywords: ["parkinson's", "parkinson", "tremor elderly"],
      info: "Parkinson's disease is a progressive nervous system disorder affecting movement.",
      advice: "Exercise regularly, maintain balance training, eat nutritious diet, stay socially active.",
      treatment: "Medications, physical therapy, occupational therapy, deep brain stimulation in some cases."
    },
    "balance_issues": {
      keywords: ["balance problems", "falls elderly", "dizziness elderly"],
      info: "Balance issues in elderly increase fall risk and can be caused by various factors.",
      advice: "Remove home hazards, use assistive devices, exercise for balance, review medications.",
      treatment: "Balance training, physical therapy, treat underlying causes, home safety modifications."
    },
    "incontinence": {
      keywords: ["incontinence", "bladder control", "urinary incontinence"],
      info: "Incontinence is loss of bladder or bowel control, common in elderly but treatable.",
      advice: "Pelvic floor exercises, scheduled toileting, maintain healthy weight, limit caffeine.",
      treatment: "Behavioral therapy, medications, medical devices, surgery in some cases."
    },
    "poor_immunity": {
      keywords: ["poor immunity", "frequent infections elderly", "weak immune system"],
      info: "Aging can weaken the immune system, making elderly more susceptible to infections.",
      advice: "Get recommended vaccinations, eat nutritious diet, exercise regularly, manage stress.",
      treatment: "Vaccinations, nutritional support, treat infections promptly, boost immunity naturally."
    },

    // 14. Lifestyle & Metabolic Conditions
    "obesity": {
      keywords: ["obesity", "overweight", "weight gain"],
      info: "Obesity is a condition where excess body fat accumulates to the extent that it may have negative health effects.",
      advice: "Eat balanced diet, exercise regularly, control portion sizes, avoid processed foods.",
      treatment: "Dietary changes, increased physical activity, behavioral therapy, medications or surgery in severe cases."
    },
    "diabetes_type2": {
      keywords: ["type 2 diabetes", "diabetes", "high blood sugar"],
      info: "Type 2 diabetes is a chronic condition affecting how the body processes blood sugar.",
      advice: "Maintain healthy weight, exercise regularly, eat balanced diet, monitor blood sugar.",
      treatment: "Lifestyle modifications, oral medications, insulin if needed, regular monitoring."
    },
    "fatty_liver": {
      keywords: ["fatty liver", "liver disease", "hepatic steatosis"],
      info: "Fatty liver disease is accumulation of fat in liver cells, often related to lifestyle factors.",
      advice: "Maintain healthy weight, limit alcohol, exercise regularly, eat healthy diet.",
      treatment: "Weight loss, dietary changes, exercise, treat underlying conditions, avoid alcohol."
    },
    "gout": {
      keywords: ["gout", "uric acid", "joint pain big toe"],
      info: "Gout is a type of arthritis caused by high levels of uric acid in the blood.",
      advice: "Limit purine-rich foods, stay hydrated, maintain healthy weight, limit alcohol.",
      treatment: "Anti-inflammatory medications, uric acid-lowering drugs, dietary modifications, lifestyle changes."
    },
    "thyroid_issues": {
      keywords: ["thyroid", "hypothyroid", "hyperthyroid", "thyroid problems"],
      info: "Thyroid disorders affect the thyroid gland's hormone production, affecting metabolism.",
      advice: "Regular monitoring, take medications as prescribed, maintain healthy lifestyle.",
      treatment: "Hormone replacement therapy, anti-thyroid medications, radioactive iodine, surgery in some cases."
    },
    "sleep_apnea": {
      keywords: ["sleep apnea", "snoring", "sleep disorder"],
      info: "Sleep apnea is a disorder where breathing repeatedly stops and starts during sleep.",
      advice: "Maintain healthy weight, avoid alcohol before bed, sleep on side, treat nasal congestion.",
      treatment: "CPAP machine, oral appliances, lifestyle changes, surgery in severe cases."
    },
    "dehydration": {
      keywords: ["dehydration", "lack of water", "fluid loss"],
      info: "Dehydration occurs when the body loses more fluids than it takes in.",
      advice: "Drink water regularly, eat water-rich foods, avoid excessive caffeine and alcohol.",
      treatment: "Oral rehydration, IV fluids for severe cases, electrolyte replacement, treat underlying cause."
    },
    "heat_stroke": {
      keywords: ["heat stroke", "heat exhaustion", "overheating"],
      info: "Heat stroke is a serious heat-related illness where body temperature rises dangerously high.",
      advice: "Stay hydrated, avoid prolonged sun exposure, wear light clothing, take breaks in shade.",
      treatment: "Immediate cooling, IV fluids, electrolyte replacement, emergency medical care."
    },

    // 15. Acute & Emergency Conditions
    "chest_pain_emergency": {
      keywords: ["chest pain emergency", "severe chest pain", "heart attack symptoms"],
      info: "Severe chest pain can be a sign of heart attack or other serious conditions requiring immediate medical attention.",
      advice: "Recognize warning signs, don't ignore symptoms, seek immediate medical care.",
      treatment: "Emergency medical care, aspirin if not allergic, oxygen, medications to restore blood flow."
    },
    "fainting": {
      keywords: ["fainting", "syncope", "loss of consciousness"],
      info: "Fainting is temporary loss of consciousness due to insufficient blood flow to the brain.",
      advice: "Stay hydrated, avoid standing too quickly, recognize warning signs, sit or lie down if dizzy.",
      treatment: "Ensure airway is clear, elevate legs, check for injuries, seek medical care if recurrent."
    },
    "head_injury": {
      keywords: ["head injury", "concussion", "head trauma"],
      info: "Head injuries can range from mild bumps to serious traumatic brain injuries.",
      advice: "Wear protective gear during activities, avoid falls, ensure safe environment.",
      treatment: "Ice for swelling, pain relievers, rest, seek immediate care for serious symptoms."
    },
    "seizures": {
      keywords: ["seizure", "convulsion", "epileptic fit"],
      info: "Seizures are sudden, uncontrolled electrical disturbances in the brain.",
      advice: "Take medications as prescribed, identify triggers, maintain regular sleep schedule.",
      treatment: "Anti-seizure medications, stay with person during seizure, clear area, seek emergency care if needed."
    },
    "burns": {
      keywords: ["burns", "burn injury", "thermal injury"],
      info: "Burns are tissue damage caused by heat, chemicals, electricity, or radiation.",
      advice: "Practice fire safety, use sunscreen, handle hot objects carefully, keep chemicals away from children.",
      treatment: "Cool running water, remove from heat source, cover with sterile gauze, seek medical care for severe burns."
    },
    "bleeding_wounds": {
      keywords: ["bleeding wound", "severe bleeding", "hemorrhage"],
      info: "Severe bleeding from wounds requires immediate first aid to control blood loss.",
      advice: "Keep first aid kit available, learn basic first aid, ensure safe environment.",
      treatment: "Apply direct pressure, elevate if possible, use pressure points, seek emergency care for severe bleeding."
    },
    "poisoning": {
      keywords: ["poisoning", "food poisoning", "chemical poisoning"],
      info: "Poisoning occurs when harmful substances are ingested, inhaled, or absorbed by the body.",
      advice: "Store chemicals safely, check food expiration dates, install carbon monoxide detectors.",
      treatment: "Contact poison control, don't induce vomiting unless instructed, remove from source, seek emergency care."
    },
    "allergic_reactions": {
      keywords: ["allergic reaction", "anaphylaxis", "severe allergy"],
      info: "Severe allergic reactions can be life-threatening and require immediate medical attention.",
      advice: "Know your allergens, carry epinephrine if prescribed, read food labels, inform others of allergies.",
      treatment: "Epinephrine injection, call emergency services, remove allergen, supportive care."
    },
    "dizziness": {
      keywords: ["dizziness", "vertigo", "lightheaded"],
      info: "Dizziness is a feeling of unsteadiness or spinning sensation that can have various causes.",
      advice: "Stay hydrated, avoid sudden movements, sit or lie down when dizzy, identify triggers.",
      treatment: "Rest, hydration, medications for underlying conditions, balance exercises."
    },
    "heat_exhaustion": {
      keywords: ["heat exhaustion", "heat illness", "overheating"],
      info: "Heat exhaustion is a heat-related illness caused by exposure to high temperatures and dehydration.",
      advice: "Stay hydrated, take breaks in shade, wear light clothing, avoid strenuous activity in heat.",
      treatment: "Move to cool area, loosen clothing, apply cool water, drink fluids, seek medical care if severe."
    }
  };

  // Check for cancer types first
  const cancerTypes = [
    "lung cancer", "breast cancer", "prostate cancer", "colorectal cancer", 
    "skin cancer", "melanoma", "leukemia", "lymphoma", "pancreatic cancer", 
    "ovarian cancer", "brain cancer", "liver cancer", "stomach cancer", 
    "cervical cancer", "kidney cancer", "thyroid cancer"
  ];
  
  for (const cancerType of cancerTypes) {
    if (queryLower.includes(cancerType)) {
      console.log(`Detected cancer type: ${cancerType}`);
      sessionStorage.setItem('lastCancerType', cancerType);
      
      return getCancerInformation(cancerType) + 
        "\n\nWhich stage of " + cancerType + " would you like to know more about? (Please respond with a stage number 1-4)";
    }
  }
  
  // Check for just the word "cancer"
  if (queryLower.includes("cancer")) {
    return "Cancer is a group of diseases involving abnormal cell growth with the potential to invade or spread to other parts of the body. There are many types of cancer, including lung, breast, prostate, colorectal, skin, melanoma, leukemia, lymphoma, pancreatic, ovarian, brain, liver, stomach, cervical, kidney, and thyroid cancer. Which specific type of cancer would you like to learn about?";
  }

  // Check health problems
  for (const [condition, data] of Object.entries(healthProblems)) {
    for (const keyword of data.keywords) {
      if (queryLower.includes(keyword)) {
        console.log(`Detected health condition: ${condition}`);
        return `**${keyword.toUpperCase()}**\n\n` +
          `**What it is:** ${data.info}\n\n` +
          `**Prevention & Advice:** ${data.advice}\n\n` +
          `**Treatment & Management:** ${data.treatment}\n\n` +
          `*Please consult a healthcare professional for proper diagnosis and treatment.*`;
      }
    }
  }

  // Fallback for general health queries
  if (queryLower.includes("health") || queryLower.includes("medical") || queryLower.includes("doctor")) {
    return "I can help you with information about various health conditions including infectious diseases, cardiovascular problems, respiratory issues, digestive problems, musculoskeletal conditions, and more. Please describe your specific health concern or mention a particular condition you'd like to know about.";
  }

  return "Thank you for your question. For specific medical concerns, it's best to consult with a healthcare professional. I can provide general information on common health topics, preventive care, and wellness practices. Please feel free to ask about specific health conditions, and I'll do my best to assist you.";
};

/**
 * Get general information about a specific type of cancer
 */
const getCancerInformation = (cancerType: string): string => {
  switch (cancerType) {
    case "lung cancer":
      return "Lung cancer is one of the most common types of cancer and begins in the lungs. It's often linked to smoking, though it can occur in people who have never smoked. There are two main types: small cell and non-small cell lung cancer. Symptoms may include a persistent cough, coughing up blood, chest pain, hoarseness, weight loss, and shortness of breath.";
    
    case "breast cancer":
      return "Breast cancer is cancer that forms in the cells of the breasts. It can occur in both women and men, but it's far more common in women. Symptoms may include a breast lump, change in breast size or shape, changes to the skin over the breast, a newly inverted nipple, or peeling, scaling, or flaking of skin on the breast or nipple.";
    
    case "prostate cancer":
      return "Prostate cancer is cancer that occurs in the prostate, a small walnut-shaped gland in men that produces seminal fluid. Most prostate cancers grow slowly and are confined to the prostate gland, where they may not cause serious harm. Some types, however, are more aggressive. Early prostate cancer may cause no symptoms, but more advanced cases may include trouble urinating, decreased force in the stream of urine, blood in the urine, and discomfort in the pelvic area.";
    
    case "colorectal cancer":
      return "Colorectal cancer is cancer that starts in the colon or rectum. It typically begins as small, noncancerous clumps of cells called polyps that form on the inner lining. Over time, some polyps can become cancerous. Symptoms may include a change in bowel habits, blood in stool, abdominal discomfort, fatigue, and unexplained weight loss.";
    
    case "skin cancer":
      return "Skin cancer is the abnormal growth of skin cells, most often developing on skin exposed to the sun. There are three major types: basal cell carcinoma, squamous cell carcinoma, and melanoma. Symptoms vary but can include a new growth, a spot that's changing in size, shape, or color, or a sore that doesn't heal.";
    
    case "melanoma":
      return "Melanoma is the most serious type of skin cancer and develops in the cells that produce melanin, the pigment that gives your skin its color. Melanoma can also form in the eyes and, rarely, in internal organs. Symptoms include a new, unusual growth or a change in an existing mole. Melanomas can occur anywhere on the body.";
    
    case "leukemia":
      return "Leukemia is cancer of the body's blood-forming tissues, including the bone marrow and lymphatic system. It usually involves the white blood cells, which fight infection. In people with leukemia, the bone marrow produces abnormal white blood cells that don't function properly. Symptoms include fever, fatigue, frequent infections, weight loss, swollen lymph nodes, enlarged spleen or liver, easy bleeding or bruising, and tiny red spots on the skin.";
    
    case "lymphoma":
      return "Lymphoma is a cancer of the lymphatic system, which is part of the body's germ-fighting network. It includes the lymph nodes, spleen, thymus gland, and bone marrow. The main types are Hodgkin's lymphoma and non-Hodgkin's lymphoma. Symptoms may include painless swelling of lymph nodes, persistent fatigue, fever, night sweats, and unexplained weight loss.";
    
    case "pancreatic cancer":
      return "Pancreatic cancer begins in the tissues of the pancreas, an organ in the abdomen that secretes enzymes to aid in digestion and hormones to help regulate metabolism. Symptoms often don't appear until the disease is advanced and may include pain in the upper abdomen that radiates to the back, loss of appetite, unexplained weight loss, fatigue, jaundice, and depression.";
    
    case "ovarian cancer":
      return "Ovarian cancer begins in the ovaries, which are the reproductive glands found only in women. Symptoms may include abdominal bloating, pelvic discomfort, quickly feeling full when eating, frequent urination, fatigue, upset stomach, back pain, pain during sex, constipation, and changes in the menstrual cycle.";
    
    case "brain cancer":
      return "Brain cancer can begin in the brain (primary brain cancer) or can begin in other parts of the body and spread to the brain (secondary brain cancer). Symptoms depend on the location and size of the tumor but may include headaches, seizures, vision or hearing problems, balance issues, confusion, and changes in personality, memory, or speech.";
    
    case "liver cancer":
      return "Liver cancer (hepatocellular carcinoma) begins in the liver. Risk factors include chronic infection with hepatitis B or C, cirrhosis, certain inherited liver diseases, diabetes, nonalcoholic fatty liver disease, exposure to aflatoxins, and excessive alcohol consumption. Symptoms can include unintentional weight loss, loss of appetite, upper abdominal pain, nausea and vomiting, general weakness and fatigue, abdominal swelling, and yellowing of the skin and whites of the eyes.";
    
    case "stomach cancer":
      return "Stomach cancer (gastric cancer) begins in the cells lining the stomach. Risk factors include a diet high in salty and smoked foods, a diet low in fruits and vegetables, family history, infection with Helicobacter pylori, long-term stomach inflammation, smoking, and stomach polyps. Early symptoms may include heartburn, indigestion, slight nausea, loss of appetite, and feeling full after eating a small amount of food.";
    
    case "cervical cancer":
      return "Cervical cancer occurs in the cells of the cervix, the lower part of the uterus that connects to the vagina. It's almost always caused by human papillomavirus (HPV) infection. Symptoms may not appear until the cancer is advanced and can include vaginal bleeding after intercourse, between periods, or after menopause; watery, bloody vaginal discharge that may be heavy and have a foul odor; and pelvic pain or pain during intercourse.";
    
    case "kidney cancer":
      return "Kidney cancer (renal cell carcinoma) begins in the kidneys. Risk factors include smoking, obesity, high blood pressure, treatment with certain medications, exposure to certain chemicals, family history, and chronic kidney failure. Symptoms may include blood in the urine, persistent back or side pain, loss of appetite, unexplained weight loss, fatigue, and fever.";
    
    case "thyroid cancer":
      return "Thyroid cancer begins in the thyroid gland, located at the base of your neck. It can cause a lump that can be felt through the skin, changes to your voice, difficulty swallowing, pain in your neck and throat, and swollen lymph nodes in your neck. Several types of thyroid cancer exist, including papillary, follicular, medullary, and anaplastic thyroid cancer.";
    
    default:
      return "Information about this specific type of cancer is currently not available. Please consult a healthcare professional for detailed information.";
  }
};

/**
 * Get information about a specific stage of cancer
 */
const getCancerStageInformation = (cancerType: string, stage: string): string => {
  console.log(`Getting information for ${cancerType} stage ${stage}`);
  
  const stageMap: {[key: string]: {[key: string]: string}} = {
    "lung cancer": {
      "1": "Stage 1 lung cancer is localized to the lung and has not spread to any lymph nodes. The tumor is generally small (less than 3 centimeters). The 5-year survival rate is around 60-80%. Treatment typically involves surgery to remove the affected portion of the lung. Radiation therapy might be used if surgery isn't an option.",
      
      "2": "In Stage 2 lung cancer, the tumor has grown larger than 3 centimeters or has spread to nearby lymph nodes or other nearby structures such as the chest wall. The 5-year survival rate is about 30-50%. Treatment usually involves surgery followed by chemotherapy, and sometimes radiation therapy.",
      
      "3": "Stage 3 lung cancer means the cancer has spread to lymph nodes on the same side of the chest as the tumor, or to nearby structures such as the chest wall, pleura, or main bronchus. The 5-year survival rate decreases to about 15-30%. Treatment typically involves a combination of surgery (if possible), chemotherapy, and radiation therapy.",
      
      "4": "Stage 4 lung cancer is the most advanced stage, where cancer has spread (metastasized) to distant parts of the body, such as the other lung, brain, bones, liver, or adrenal glands. The 5-year survival rate is generally less than 5%. Treatment focuses on extending life and relieving symptoms, usually through chemotherapy, targeted therapy, immunotherapy, and/or radiation therapy."
    },
    
    "breast cancer": {
      "1": "Stage 1 breast cancer means the cancer is small and only in the breast tissue or it might be found in lymph nodes close to the breast. The 5-year survival rate is around 98%. Treatment typically involves surgery (lumpectomy or mastectomy) often followed by radiation therapy. Chemotherapy, hormone therapy, or other treatments might be recommended based on specific characteristics of the cancer.",
      
      "2": "In Stage 2 breast cancer, the tumor is larger than in Stage 1 or has spread to a few nearby lymph nodes. The 5-year survival rate is about 90%. Treatment usually involves surgery, possibly followed by chemotherapy, radiation therapy, hormone therapy, or targeted therapy, depending on the specific characteristics of the cancer.",
      
      "3": "Stage 3 breast cancer means the tumor is larger or has invaded nearby tissue, and cancer cells are found in many nearby lymph nodes. The 5-year survival rate is about 70%. Treatment typically involves chemotherapy, followed by surgery, and then radiation therapy. Additional treatments like hormone therapy or targeted therapy might also be used.",
      
      "4": "Stage 4 breast cancer, also called metastatic breast cancer, has spread to other parts of the body, most commonly the bones, lungs, liver, or brain. The 5-year survival rate is around 20%, but many factors can influence this. Treatment focuses on extending life and relieving symptoms, usually through systemic therapies such as chemotherapy, hormone therapy, targeted therapy, or immunotherapy."
    },
    
    "prostate cancer": {
      "1": "Stage 1 prostate cancer is confined to a small area of the prostate and is typically slow-growing. The PSA level is low, and these cancers usually can't be felt during a digital rectal exam. The 5-year survival rate is nearly 100%. Active surveillance, radiation therapy, or surgery are common treatment options.",
      
      "2": "In Stage 2 prostate cancer, the tumor can be felt during a digital rectal exam or seen with imaging, but it's still confined to the prostate. The PSA level may be medium or low. The 5-year survival rate is still nearly 100%. Treatment options include active surveillance for low-risk cancers, or surgery, radiation therapy, and sometimes hormone therapy for higher-risk Stage 2 cancers.",
      
      "3": "Stage 3 prostate cancer has spread beyond the prostate to nearby tissues such as the seminal vesicles or other nearby structures. The PSA level is usually high. The 5-year survival rate is around 95%. Treatment usually involves radiation therapy combined with hormone therapy, or surgery followed by radiation and possibly hormone therapy.",
      
      "4": "Stage 4 prostate cancer has spread to distant parts of the body, commonly the bones, liver, or lungs. The 5-year survival rate decreases to about 30%, but many factors can influence this. Treatment focuses on slowing the cancer's growth and managing symptoms, usually through hormone therapy, chemotherapy, targeted therapy, immunotherapy, or a combination of these."
    },
    
    "colorectal cancer": {
      "1": "In Stage 1 colorectal cancer, the tumor has grown through the mucosa (inner lining) into the submucosa or into the muscle layer of the colon or rectum, but hasn't reached nearby lymph nodes. The 5-year survival rate is around 90%. Treatment typically involves surgery to remove the tumor and a small margin of surrounding healthy tissue, along with nearby lymph nodes.",
      
      "2": "In Stage 2 colorectal cancer, the tumor has grown through the wall of the colon or rectum but hasn't reached nearby lymph nodes. The 5-year survival rate is about 70-80%. Treatment usually involves surgery, possibly followed by chemotherapy, especially if the cancer has a higher risk of recurrence.",
      
      "3": "Stage 3 colorectal cancer has spread to nearby lymph nodes, but not to distant parts of the body. The 5-year survival rate is around 40-70%. Treatment typically involves surgery to remove the tumor and affected lymph nodes, followed by chemotherapy. Radiation therapy might also be used, especially for rectal cancer.",
      
      "4": "Stage 4 colorectal cancer has spread to distant parts of the body, such as the liver, lungs, or peritoneum. The 5-year survival rate decreases to about 10-15%. Treatment focuses on extending life and relieving symptoms, usually through a combination of surgery, chemotherapy, targeted therapy, and immunotherapy. In some cases of limited metastasis, surgery or other local treatments of metastases can be considered with curative intent."
    }
  };
  
  if (!stageMap[cancerType] || !stageMap[cancerType][stage]) {
    return `Information about Stage ${stage} of ${cancerType} is currently not available in detail. Generally, cancer staging follows this pattern:\n\n` +
      "Stage 1: Cancer is relatively small and contained within the organ where it started.\n\n" +
      "Stage 2: Cancer has grown larger but has not spread to nearby tissues. It may have spread to lymph nodes close to the tumor.\n\n" +
      "Stage 3: Cancer is larger and may have spread to surrounding tissues and/or lymph nodes.\n\n" +
      "Stage 4: Cancer has spread to distant parts of the body, also called metastatic cancer.\n\n" +
      "Please consult a healthcare professional for specific information about your condition.";
  }
  
  return stageMap[cancerType][stage];
};
