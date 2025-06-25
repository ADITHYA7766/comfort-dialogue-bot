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
  
  // Health problems database
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
      keywords: ["hepatitis", "liver infection", "jaundice", "yellow eyes"],
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
    "stroke": {
      keywords: ["stroke", "brain attack", "facial drooping", "speech problems"],
      info: "A stroke occurs when blood supply to brain is interrupted, causing brain cell death.",
      advice: "Control blood pressure, maintain healthy lifestyle, don't smoke, limit alcohol, manage diabetes.",
      treatment: "Emergency treatment to restore blood flow, rehabilitation therapy, medications to prevent recurrence."
    },
    "high_cholesterol": {
      keywords: ["high cholesterol", "cholesterol", "lipid profile"],
      info: "High cholesterol is excess cholesterol in blood, increasing risk of heart disease and stroke.",
      advice: "Eat heart-healthy diet, exercise regularly, maintain healthy weight, avoid trans fats.",
      treatment: "Dietary changes, regular exercise, cholesterol-lowering medications if needed."
    },

    // 3. Respiratory Problems
    "asthma": {
      keywords: ["asthma", "wheezing", "breathing difficulty", "bronchial asthma"],
      info: "Asthma is a chronic condition where airways become inflamed and narrow, making breathing difficult.",
      advice: "Identify and avoid triggers, maintain clean environment, get vaccinated against flu and pneumonia.",
      treatment: "Inhaled bronchodilators, anti-inflammatory medications, asthma action plan, peak flow monitoring."
    },
    "bronchitis": {
      keywords: ["bronchitis", "productive cough", "chest congestion"],
      info: "Bronchitis is inflammation of the bronchial tubes, causing cough and mucus production.",
      advice: "Avoid smoking, stay hydrated, avoid lung irritants, practice good hygiene.",
      treatment: "Rest, fluids, cough suppressants, bronchodilators if needed, antibiotics only for bacterial infections."
    },
    "pneumonia": {
      keywords: ["pneumonia", "lung infection", "difficulty breathing", "chest pain breathing"],
      info: "Pneumonia is an infection that inflames air sacs in lungs, which may fill with fluid.",
      advice: "Get vaccinated, practice good hygiene, avoid smoking, maintain healthy immune system.",
      treatment: "Antibiotics for bacterial pneumonia, rest, fluids, oxygen therapy if needed, hospitalization for severe cases."
    },
    "copd": {
      keywords: ["copd", "chronic obstructive", "emphysema", "chronic bronchitis"],
      info: "COPD is a chronic lung disease that blocks airflow and makes breathing difficult.",
      advice: "Don't smoke, avoid secondhand smoke, get vaccinated, exercise regularly, eat healthy diet.",
      treatment: "Bronchodilators, inhaled steroids, oxygen therapy, pulmonary rehabilitation, smoking cessation."
    },

    // 4. Digestive & Stomach Issues
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
    "gerd": {
      keywords: ["heartburn", "acid reflux", "gerd", "acidity", "burning chest"],
      info: "GERD is chronic acid reflux where stomach acid flows back into the esophagus.",
      advice: "Avoid trigger foods, eat smaller meals, don't lie down after eating, maintain healthy weight.",
      treatment: "Antacids, H2 blockers, proton pump inhibitors, lifestyle modifications, elevate head while sleeping."
    },
    "ibs": {
      keywords: ["ibs", "irritable bowel", "abdominal pain", "bloating gas"],
      info: "IBS is a chronic disorder affecting the large intestine, causing cramping and changes in bowel habits.",
      advice: "Identify trigger foods, manage stress, eat regular meals, exercise regularly.",
      treatment: "Dietary changes, stress management, fiber supplements, antispasmodics, probiotics."
    },

    // 5. Muscle, Bone & Joint Problems
    "back_pain": {
      keywords: ["back pain", "lower back pain", "spine pain", "backache"],
      info: "Back pain is discomfort in the back, often caused by muscle strain, poor posture, or injury.",
      advice: "Maintain good posture, exercise regularly, lift properly, sleep on supportive mattress.",
      treatment: "Rest, ice/heat therapy, pain relievers, physical therapy, gentle stretching exercises."
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

    // 6. Genetic & Autoimmune Conditions
    "diabetes_type1": {
      keywords: ["type 1 diabetes", "juvenile diabetes", "insulin dependent"],
      info: "Type 1 diabetes is an autoimmune condition where the pancreas produces little or no insulin.",
      advice: "Monitor blood sugar regularly, follow meal plan, stay active, learn to manage condition.",
      treatment: "Insulin therapy, blood glucose monitoring, healthy diet, regular exercise, diabetes education."
    },
    "lupus": {
      keywords: ["lupus", "systemic lupus", "autoimmune disease", "butterfly rash"],
      info: "Lupus is an autoimmune disease where the immune system attacks healthy tissue.",
      advice: "Avoid sun exposure, manage stress, get adequate rest, follow treatment plan.",
      treatment: "Anti-inflammatory medications, immunosuppressants, antimalarials, corticosteroids."
    },

    // 7. Eye & Vision Problems
    "conjunctivitis": {
      keywords: ["pink eye", "conjunctivitis", "red eyes", "eye infection"],
      info: "Conjunctivitis is inflammation of the conjunctiva, causing red, itchy, and watery eyes.",
      advice: "Practice good hygiene, avoid touching eyes, don't share eye makeup or towels.",
      treatment: "Antibiotic eye drops for bacterial cases, cool compresses, artificial tears, avoid contact lenses."
    },
    "dry_eyes": {
      keywords: ["dry eyes", "eye dryness", "burning eyes", "gritty eyes"],
      info: "Dry eyes occur when eyes don't produce enough tears or tears evaporate too quickly.",
      advice: "Use humidifier, take breaks from screens, protect eyes from wind, stay hydrated.",
      treatment: "Artificial tears, prescription eye drops, punctal plugs, warm compresses."
    },

    // 8. Skin Problems
    "acne": {
      keywords: ["acne", "pimples", "blackheads", "whiteheads", "skin breakouts"],
      info: "Acne is a skin condition that occurs when hair follicles become clogged with oil and dead skin cells.",
      advice: "Wash face gently twice daily, avoid touching face, use non-comedogenic products, manage stress.",
      treatment: "Topical retinoids, benzoyl peroxide, salicylic acid, antibiotics for severe cases, good skincare routine."
    },
    "eczema": {
      keywords: ["eczema", "atopic dermatitis", "itchy skin", "skin rash"],
      info: "Eczema is a chronic skin condition causing dry, itchy, and inflamed skin.",
      advice: "Moisturize regularly, avoid triggers, use gentle soaps, wear soft fabrics, manage stress.",
      treatment: "Moisturizers, topical corticosteroids, antihistamines, avoid scratching, identify and avoid triggers."
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
