/**
 * Get a response from the HealthAI based on the user's query
 */

const medicalConditions = {
  infectious_diseases: {
    keywords: ["flu", "influenza", "common cold", "covid", "coronavirus", "strep throat", "bronchitis", "pneumonia", "sinusitis", "urinary tract infection", "uti", "skin infection", "cellulitis", "conjunctivitis", "pinkeye", "gastroenteritis", "food poisoning", "malaria", "dengue"],
    info: "Infectious diseases are disorders caused by organisms — such as bacteria, viruses, fungi or parasites.",
    advice: "Wash your hands, get vaccinated, stay home if sick, cover coughs and sneezes, avoid sharing personal items.",
    treatment: "Rest, fluids, over-the-counter pain relievers, antibiotics for bacterial infections, antiviral medications for viral infections."
  },
  respiratory_conditions: {
    keywords: ["asthma", "copd", "chronic bronchitis", "emphysema", "allergies", "hay fever", "rhinitis", "laryngitis", "tonsillitis", "sleep apnea", "cystic fibrosis", "pleurisy"],
    info: "Respiratory conditions affect the lungs and breathing, ranging from mild allergies to chronic diseases.",
    advice: "Avoid allergens and pollutants, use air purifiers, quit smoking, manage weight, exercise regularly.",
    treatment: "Inhalers, bronchodilators, corticosteroids, oxygen therapy, pulmonary rehabilitation, antibiotics for infections."
  },
  cardiovascular_disorders: {
    keywords: ["high blood pressure", "hypertension", "high cholesterol", "atherosclerosis", "coronary artery disease", "angina", "heart attack", "myocardial infarction", "heart failure", "arrhythmia", "atrial fibrillation", "stroke"],
    info: "Cardiovascular disorders affect the heart and blood vessels, leading to reduced blood flow and potential organ damage.",
    advice: "Eat a healthy diet, exercise regularly, maintain a healthy weight, quit smoking, manage stress, limit alcohol.",
    treatment: "Medications to lower blood pressure and cholesterol, blood thinners, lifestyle changes, angioplasty, bypass surgery."
  },
  musculoskeletal_problems: {
    keywords: ["arthritis", "osteoarthritis", "rheumatoid arthritis", "back pain", "sciatica", "neck pain", "carpal tunnel syndrome", "tendinitis", "bursitis", "fibromyalgia", "osteoporosis", "gout", "knee pain"],
    info: "Musculoskeletal problems affect the bones, joints, muscles, and connective tissues, causing pain and limiting movement.",
    advice: "Maintain a healthy weight, exercise regularly, use proper lifting techniques, maintain good posture, stretch regularly.",
    treatment: "Pain relievers, anti-inflammatory medications, physical therapy, occupational therapy, joint injections, surgery."
  },

  mental_health_disorders: {
    keywords: ["depression", "anxiety", "bipolar disorder", "schizophrenia", "ocd", "ptsd", "eating disorders", "adhd", "autism", "borderline personality disorder", "panic disorder", "social anxiety disorder"],
    info: "Mental health disorders affect mood, thinking, and behavior, impacting daily life and relationships.",
    advice: "Seek therapy, practice mindfulness, maintain a healthy lifestyle, connect with others, manage stress, get enough sleep.",
    treatment: "Therapy, medication, support groups, lifestyle changes, hospitalization if needed."
  },
  neurological_conditions: {
    keywords: ["alzheimer's disease", "parkinson's disease", "multiple sclerosis", "epilepsy", "migraine", "headache", "stroke", "traumatic brain injury", "spinal cord injury", "neuropathy", "bell's palsy", "meningitis"],
    info: "Neurological conditions affect the brain, spinal cord, and nerves, leading to impaired function and sensation.",
    advice: "Follow medical advice, manage symptoms, maintain a healthy lifestyle, seek support, use assistive devices.",
    treatment: "Medications, physical therapy, occupational therapy, speech therapy, surgery, assistive devices."
  },
  endocrine_disorders: {
    keywords: ["diabetes", "hypothyroidism", "hyperthyroidism", "cushing's syndrome", "addison's disease", "pcos", "menopause", "osteoporosis", "growth disorders", "hormone imbalance", "thyroid nodules", "hyperparathyroidism"],
    info: "Endocrine disorders affect the glands that produce hormones, leading to imbalances and various health problems.",
    advice: "Follow medical advice, monitor hormone levels, maintain a healthy lifestyle, manage stress, get enough sleep.",
    treatment: "Hormone replacement therapy, medications, lifestyle changes, surgery."
  },
  gastrointestinal_disorders: {
    keywords: ["gerd", "acid reflux", "ulcer", "ibs", "crohn's disease", "ulcerative colitis", "celiac disease", "diverticulitis", "hemorrhoids", "gallstones", "pancreatitis", "cirrhosis"],
    info: "Gastrointestinal disorders affect the digestive system, causing discomfort and disrupting normal digestion.",
    advice: "Eat a healthy diet, avoid trigger foods, manage stress, stay hydrated, exercise regularly, maintain good hygiene.",
    treatment: "Medications, lifestyle changes, dietary modifications, surgery."
  },
  kidney_and_urinary_problems: {
    keywords: ["kidney stones", "uti", "kidney infection", "ckd", "kidney failure", "bladder infection", "incontinence", "prostatitis", "enlarged prostate", "erectile dysfunction", "hematuria", "proteinuria"],
    info: "Kidney and urinary problems affect the kidneys, bladder, and urinary tract, leading to impaired function and potential complications.",
    advice: "Stay hydrated, maintain good hygiene, avoid bladder irritants, manage underlying conditions, exercise regularly.",
    treatment: "Medications, lifestyle changes, dietary modifications, surgery, dialysis, kidney transplant."
  },
  skin_conditions: {
    keywords: ["acne", "eczema", "psoriasis", "rosacea", "hives", "skin infection", "cellulitis", "warts", "athlete's foot", "ringworm", "melanoma", "skin cancer"],
    info: "Skin conditions affect the skin, causing discomfort, irritation, and potential complications.",
    advice: "Maintain good hygiene, avoid irritants, protect skin from sun, moisturize regularly, manage stress.",
    treatment: "Topical medications, oral medications, light therapy, surgery."
  },
  eye_problems: {
    keywords: ["cataracts", "glaucoma", "macular degeneration", "dry eye", "conjunctivitis", "stye", "blepharitis", "diabetic retinopathy", "nearsightedness", "farsightedness", "astigmatism", "floaters"],
    info: "Eye problems affect vision and eye health, leading to impaired function and potential complications.",
    advice: "Get regular eye exams, protect eyes from sun, maintain a healthy lifestyle, manage underlying conditions.",
    treatment: "Eyeglasses, contact lenses, medications, surgery."
  },
  ear_nose_throat_conditions: {
    keywords: ["ear infection", "otitis media", "hearing loss", "tinnitus", "vertigo", "sinusitis", "rhinitis", "sore throat", "tonsillitis", "laryngitis", "sleep apnea", "deviated septum", "nasal polyps"],
    info: "Ear, nose, and throat conditions affect hearing, balance, breathing, and voice, leading to impaired function and potential complications.",
    advice: "Maintain good hygiene, avoid irritants, protect ears from loud noise, manage allergies, quit smoking.",
    treatment: "Medications, ear tubes, hearing aids, surgery."
  },
  blood_disorders: {
    keywords: ["anemia", "leukemia", "lymphoma", "thrombocytopenia", "hemophilia", "sickle cell anemia", "polycythemia vera", "myelodysplastic syndrome", "blood clots", "dvt", "pulmonary embolism"],
    info: "Blood disorders affect the blood cells, bone marrow, and blood clotting, leading to impaired function and potential complications.",
    advice: "Follow medical advice, manage symptoms, maintain a healthy lifestyle, avoid infections, get regular checkups.",
    treatment: "Medications, blood transfusions, bone marrow transplant, chemotherapy."
  },
  immune_system_disorders: {
    keywords: ["allergies", "asthma", "autoimmune disease", "lupus", "rheumatoid arthritis", "multiple sclerosis", "hiv", "aids", "immunodeficiency", "scleroderma", "psoriasis", "hashimoto's disease"],
    info: "Immune system disorders affect the body's ability to fight off infections and diseases, leading to impaired function and potential complications.",
    advice: "Follow medical advice, manage symptoms, maintain a healthy lifestyle, avoid infections, get vaccinated.",
    treatment: "Medications, lifestyle changes, immunotherapy."
  },
  pregnancy_and_childbirth: {
    keywords: ["pregnancy", "labor", "delivery", "postpartum", "miscarriage", "ectopic pregnancy", "preeclampsia", "gestational diabetes", "infertility", "menstruation", "menopause", "breastfeeding"],
    info: "Pregnancy and childbirth involve the reproductive system and hormonal changes, leading to various health considerations for both mother and child.",
    advice: "Follow medical advice, maintain a healthy lifestyle, get prenatal care, manage stress, prepare for labor and delivery.",
    treatment: "Prenatal care, labor and delivery management, postpartum care, medications, surgery."
  },
  genetic_disorders: {
    keywords: ["cystic fibrosis", "down syndrome", "sickle cell anemia", "hemophilia", "muscular dystrophy", "tay-sachs disease", "turner syndrome", "klinefelter syndrome", "fragile x syndrome", "huntington's disease", "phenylketonuria", "neurofibromatosis"],
    info: "Genetic disorders are caused by abnormalities in genes or chromosomes, leading to various health problems and developmental issues.",
    advice: "Follow medical advice, manage symptoms, seek genetic counseling, get regular checkups, participate in support groups.",
    treatment: "Medications, therapies, surgery, assistive devices."
  },
  cancer_related_queries: {
    keywords: ["cancer", "tumor", "oncology", "chemotherapy", "radiation therapy", "surgery", "metastasis", "remission", "carcinoma", "sarcoma", "lymphoma", "leukemia"],
    info: "Cancer is a group of diseases involving abnormal cell growth with the potential to invade or spread to other parts of the body.",
    advice: "Follow medical advice, maintain a healthy lifestyle, get regular screenings, manage stress, participate in support groups.",
    treatment: "Surgery, chemotherapy, radiation therapy, immunotherapy, targeted therapy, hormone therapy."
  },
  acute_emergency_conditions: {
    keywords: ["chest pain", "stroke", "severe bleeding", "head trauma", "spinal cord injury", "burns", "seizures", "allergic reaction", "anaphylaxis", "poisoning", "overdose", "cardiac arrest", "respiratory arrest"],
    info: "Acute emergency conditions require immediate medical attention to prevent serious complications or death.",
    advice: "Call emergency services, provide first aid, follow instructions from emergency responders, stay calm.",
    treatment: "Emergency medical care, medications, surgery, life support."
  },
  digestive_stomach_issues: {
    keywords: ["vomiting", "nausea", "diarrhea", "constipation", "bloating", "gas", "acidity", "heartburn", "gerd", "indigestion", "ibs", "irritable bowel syndrome", "gastric ulcers", "food poisoning", "loss of appetite"],
    info: "Digestive issues affect the stomach and intestinal tract, causing discomfort and disrupting normal digestion.",
    advice: "Eat small frequent meals, stay hydrated, avoid trigger foods, maintain good hygiene, manage stress.",
    treatment: "Rest, clear fluids, bland diet (BRAT), probiotics, medication as needed, medical care if severe."
  },

  vomiting_specific: {
    keywords: ["vomiting", "vomit"],
    info: "Vomiting is the forceful expulsion of stomach contents through the mouth, often caused by infections, food poisoning, motion sickness, or other underlying conditions.",
    advice: "I understand how uncomfortable and distressing vomiting can be. Stay hydrated with small sips of clear fluids, rest in a comfortable position, avoid solid foods initially, and try ginger or peppermint for nausea relief.",
    treatment: "Start with clear fluids (water, broth, electrolyte solutions) in small amounts every 15 minutes. Gradually introduce bland foods like crackers or toast. Seek immediate medical attention if vomiting persists over 24 hours, shows blood, or is accompanied by severe dehydration, high fever, or severe abdominal pain."
  },

  malaria_specific: {
    keywords: ["malaria"],
    info: "Malaria is a life-threatening disease caused by parasites transmitted through the bites of infected female Anopheles mosquitoes. It's most common in tropical and subtropical regions.",
    advice: "Prevention is key - use insect repellent, sleep under insecticide-treated bed nets, wear long-sleeved clothing, and take antimalarial medication when traveling to endemic areas. Seek immediate medical attention if you develop fever, chills, or flu-like symptoms after visiting malaria-endemic areas.",
    treatment: "Malaria requires immediate medical treatment with antimalarial medications. The specific treatment depends on the type of malaria parasite, severity of symptoms, and local resistance patterns. Early diagnosis and treatment are crucial to prevent complications."
  },

  dengue_specific: {
    keywords: ["dengue"],
    info: "Dengue is a viral infection transmitted by Aedes mosquitoes, common in tropical and subtropical climates. It can range from mild fever to severe dengue hemorrhagic fever.",
    advice: "Prevent mosquito bites by eliminating standing water around your home, using mosquito repellent, wearing long-sleeved clothes, and using bed nets. Seek medical attention immediately if you develop high fever, severe headache, eye pain, muscle aches, or skin rash.",
    treatment: "There's no specific antiviral treatment for dengue. Management focuses on maintaining proper fluid balance and monitoring for complications. Avoid aspirin and NSAIDs as they can increase bleeding risk. Seek immediate medical care for severe symptoms like persistent vomiting, severe abdominal pain, or difficulty breathing."
  },

  knee_pain_specific: {
    keywords: ["knee pain"],
    info: "Knee pain can result from injuries, arthritis, mechanical problems, or underlying medical conditions. It's one of the most common musculoskeletal complaints affecting people of all ages.",
    advice: "Rest the affected knee, apply ice for 15-20 minutes several times daily, compress with an elastic bandage, and elevate when possible (R.I.C.E. method). Maintain a healthy weight to reduce stress on knee joints, and strengthen surrounding muscles through appropriate exercises.",
    treatment: "Treatment depends on the cause but may include rest, ice, compression, elevation, over-the-counter pain relievers, physical therapy, and in some cases, corticosteroid injections or surgery. Seek medical attention if pain is severe, you can't bear weight, or if there's significant swelling or instability."
  }
};

const getCancerStageInfo = (cancerType: string, cancerStage: string): string => {
  // Mock cancer stage information (replace with actual data)
  const stageInfo = {
    "breast": {
      "stage 1": "Stage 1 breast cancer is typically a small, localized tumor.",
      "stage 2": "Stage 2 breast cancer indicates a larger tumor or spread to nearby lymph nodes.",
      "stage 3": "Stage 3 breast cancer means the cancer has spread to several lymph nodes or tissues around the breast.",
      "stage 4": "Stage 4 breast cancer indicates that the cancer has spread to distant organs."
    },
    "lung": {
      "stage 1": "Stage 1 lung cancer is a small tumor that has not spread to lymph nodes.",
      "stage 2": "Stage 2 lung cancer indicates a larger tumor or spread to nearby lymph nodes.",
      "stage 3": "Stage 3 lung cancer means the cancer has spread to lymph nodes in the middle of the chest.",
      "stage 4": "Stage 4 lung cancer indicates that the cancer has spread to distant organs."
    },
    "prostate": {
      "stage 1": "Stage 1 prostate cancer is a small, localized tumor.",
      "stage 2": "Stage 2 prostate cancer indicates a larger tumor that may be growing outside the prostate.",
      "stage 3": "Stage 3 prostate cancer means the cancer has spread to the seminal vesicles.",
      "stage 4": "Stage 4 prostate cancer indicates that the cancer has spread to distant organs."
    },
    "colorectal": {
      "stage 1": "Stage 1 colorectal cancer is a tumor that has grown into the muscle layer of the colon or rectum.",
      "stage 2": "Stage 2 colorectal cancer indicates that the cancer has grown through the wall of the colon or rectum.",
      "stage 3": "Stage 3 colorectal cancer means the cancer has spread to nearby lymph nodes.",
      "stage 4": "Stage 4 colorectal cancer indicates that the cancer has spread to distant organs."
    },
    "skin": {
      "stage 1": "Stage 1 skin cancer is a small, localized tumor.",
      "stage 2": "Stage 2 skin cancer indicates a larger tumor that may have spread to nearby lymph nodes.",
      "stage 3": "Stage 3 skin cancer means the cancer has spread to deeper tissues or lymph nodes.",
      "stage 4": "Stage 4 skin cancer indicates that the cancer has spread to distant organs."
    },
    "ovarian": {
      "stage 1": "Stage 1 ovarian cancer is confined to the ovaries.",
      "stage 2": "Stage 2 ovarian cancer indicates that the cancer has spread to other pelvic organs.",
      "stage 3": "Stage 3 ovarian cancer means the cancer has spread to the lining of the abdomen or lymph nodes.",
      "stage 4": "Stage 4 ovarian cancer indicates that the cancer has spread to distant organs."
    },
    "pancreatic": {
      "stage 1": "Stage 1 pancreatic cancer is confined to the pancreas.",
      "stage 2": "Stage 2 pancreatic cancer indicates that the cancer has spread to nearby tissues or lymph nodes.",
      "stage 3": "Stage 3 pancreatic cancer means the cancer has spread to major blood vessels.",
      "stage 4": "Stage 4 pancreatic cancer indicates that the cancer has spread to distant organs."
    },
    "liver": {
      "stage 1": "Stage 1 liver cancer is a single small tumor.",
      "stage 2": "Stage 2 liver cancer indicates multiple tumors or a larger tumor that has spread to blood vessels.",
      "stage 3": "Stage 3 liver cancer means the cancer has spread to nearby organs or lymph nodes.",
      "stage 4": "Stage 4 liver cancer indicates that the cancer has spread to distant organs."
    },
    "kidney": {
      "stage 1": "Stage 1 kidney cancer is a small tumor confined to the kidney.",
      "stage 2": "Stage 2 kidney cancer indicates a larger tumor that has spread to surrounding fat.",
      "stage 3": "Stage 3 kidney cancer means the cancer has spread to major blood vessels or lymph nodes.",
      "stage 4": "Stage 4 kidney cancer indicates that the cancer has spread to distant organs."
    },
    "bladder": {
      "stage 1": "Stage 1 bladder cancer is confined to the inner lining of the bladder.",
      "stage 2": "Stage 2 bladder cancer indicates that the cancer has spread to the muscle layer of the bladder.",
      "stage 3": "Stage 3 bladder cancer means the cancer has spread to tissues outside the bladder.",
      "stage 4": "Stage 4 bladder cancer indicates that the cancer has spread to distant organs."
    }
  };

  if (stageInfo[cancerType] && stageInfo[cancerType][cancerStage]) {
    const cancerTypeDisplay = cancerType.charAt(0).toUpperCase() + cancerType.slice(1);
    const stageDisplay = cancerStage.charAt(0).toUpperCase() + cancerStage.slice(1);

    return `<div class="font-bold text-xl mb-4 text-blue-600">${cancerTypeDisplay} Cancer - ${stageDisplay}</div>
            <div>${stageInfo[cancerType][cancerStage]}</div>
            <div class="text-xs font-bold text-gray-600 mt-6 p-2 bg-gray-50 rounded">*Please consult a healthcare professional for proper diagnosis and treatment.*</div>`;
  } else {
    return "I'm sorry, I don't have specific information about that type and stage of cancer.";
  }
};

const formatMedicalResponse = (condition: {keywords: string[], info: string, advice: string, treatment: string}, detectedKeyword: string): string => {
  const problemName = detectedKeyword.charAt(0).toUpperCase() + detectedKeyword.slice(1);
  
  return `<div class="font-bold text-xl mb-4 text-blue-600">${problemName}</div>

  <div class="font-bold text-lg mb-2">What it is:</div>
  ${condition.info}

  <div class="font-bold text-lg mb-2 mt-4">Prevention & Advice:</div>
  ${condition.advice}

  <div class="font-bold text-lg mb-2 mt-4">Treatment & Management:</div>
  ${condition.treatment}

  <div class="text-xs font-bold text-gray-600 mt-6 p-2 bg-gray-50 rounded">*Please consult a healthcare professional for proper diagnosis and treatment.*</div>`;
};

export const getMedicalResponse = async (userInput: string): Promise<string> => {
  const queryLower = userInput.toLowerCase();
  
  // Check for cancer staging first
  if (queryLower.includes("cancer") && (queryLower.includes("stage") || /stage\s*[1-4ivx]/i.test(queryLower))) {
    const cancerTypes = ["breast", "lung", "prostate", "colorectal", "skin", "ovarian", "pancreatic", "liver", "kidney", "bladder"];
    const stages = ["stage 1", "stage 2", "stage 3", "stage 4", "stage i", "stage ii", "stage iii", "stage iv"];
    
    let detectedCancer = null;
    let detectedStage = null;
    
    for (const cancer of cancerTypes) {
      if (queryLower.includes(cancer)) {
        detectedCancer = cancer;
        break;
      }
    }
    
    for (const stage of stages) {
      if (queryLower.includes(stage)) {
        detectedStage = stage;
        break;
      }
    }
    
    if (detectedCancer && detectedStage) {
      return getCancerStageInfo(detectedCancer, detectedStage);
    }
  }
  
  // Check for specific conditions first
  if (queryLower.includes("malaria")) {
    const condition = medicalConditions.malaria_specific;
    console.log("Detected health condition: malaria");
    return formatMedicalResponse(condition, "malaria");
  }
  
  if (queryLower.includes("dengue")) {
    const condition = medicalConditions.dengue_specific;
    console.log("Detected health condition: dengue");
    return formatMedicalResponse(condition, "dengue");
  }
  
  if (queryLower.includes("knee pain")) {
    const condition = medicalConditions.knee_pain_specific;
    console.log("Detected health condition: knee pain");
    return formatMedicalResponse(condition, "knee pain");
  }
  
  // Check for vomiting first (specific sympathy response)
  if (queryLower.includes("vomiting") || queryLower.includes("vomit")) {
    const condition = medicalConditions.vomiting_specific;
    console.log("Detected health condition: vomiting");
    return formatMedicalResponse(condition, "vomiting");
  }
  
  // Check for other medical conditions
  for (const [condition, data] of Object.entries(medicalConditions)) {
    for (const keyword of data.keywords) {
      if (queryLower.includes(keyword)) {
        console.log(`Detected health condition: ${condition}`);
        return formatMedicalResponse(data, keyword);
      }
    }
  }
  
  // Default response for unrecognized medical queries
  return "I understand you're looking for health information. While I can provide general information about many health conditions, I'd recommend being more specific about your symptoms or condition. For immediate medical concerns, please consult with a healthcare professional or contact emergency services if it's urgent.";
};
