/**
 * Get a response from the MedKitAI based on the user's query
 */
export const getMedicalResponse = async (query: string): Promise<string> => {
  // This is a simplified implementation. In a real application, this might
  // call an API or use a more sophisticated mechanism to generate responses.
  
  const queryLower = query.toLowerCase();
  
  // Check if this is a response to a cancer stage inquiry
  if (queryLower.match(/stage\s*[1-4]|[1-4]\s*stage|^[1-4]$/)) {
    const stage = queryLower.match(/[1-4]/)?.[0];
    const lastCancerType = sessionStorage.getItem('lastCancerType');
    
    if (lastCancerType && stage) {
      return getCancerStageInformation(lastCancerType, stage);
    }
  }
  
  // Check for cancer types
  const cancerTypes = [
    "lung cancer", "breast cancer", "prostate cancer", "colorectal cancer", 
    "skin cancer", "melanoma", "leukemia", "lymphoma", "pancreatic cancer", 
    "ovarian cancer", "brain cancer", "liver cancer", "stomach cancer", 
    "cervical cancer", "kidney cancer", "thyroid cancer"
  ];
  
  // More explicit cancer type detection
  for (const cancerType of cancerTypes) {
    if (queryLower.includes(cancerType)) {
      console.log(`Detected cancer type: ${cancerType}`);
      // Store the cancer type for follow-up questions about stages
      sessionStorage.setItem('lastCancerType', cancerType);
      
      return getCancerInformation(cancerType) + 
        "\n\nWhich stage of " + cancerType + " would you like to know more about? (Please respond with a stage number 1-4)";
    }
  }
  
  // Check for just the word "cancer"
  if (queryLower.includes("cancer")) {
    return "Cancer is a group of diseases involving abnormal cell growth with the potential to invade or spread to other parts of the body. There are many types of cancer, including lung, breast, prostate, colorectal, skin, melanoma, leukemia, lymphoma, pancreatic, ovarian, brain, liver, stomach, cervical, kidney, and thyroid cancer. Which specific type of cancer would you like to learn about?";
  }
  
  // Basic medical knowledge responses
  if (queryLower.includes("headache")) {
    return "Headaches can be caused by various factors, including stress, dehydration, lack of sleep, or eye strain. For occasional headaches, rest, hydration, and over-the-counter pain relievers may help. If headaches are severe, persistent, or accompanied by other symptoms, please consult a healthcare professional.";
  } 
  else if (queryLower.includes("cold") || queryLower.includes("flu")) {
    return "Common colds and flu are viral infections. Rest, staying hydrated, and taking over-the-counter medication for symptoms can help. Most people recover within 7-10 days. If symptoms persist or worsen, especially with high fever, chest pain, or difficulty breathing, please seek medical attention.";
  } 
  else if (queryLower.includes("diet") || queryLower.includes("nutrition")) {
    return "A balanced diet typically includes a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats. The specific dietary needs vary based on age, sex, weight, activity level, and health conditions. Consider consulting a registered dietitian for personalized nutrition advice.";
  } 
  else if (queryLower.includes("exercise") || queryLower.includes("workout")) {
    return "Regular physical activity is essential for good health. Adults should aim for at least 150 minutes of moderate-intensity or 75 minutes of vigorous-intensity exercise per week, along with muscle-strengthening activities. Always start new exercise routines gradually and consult a healthcare provider if you have existing health conditions.";
  } 
  else if (queryLower.includes("sleep")) {
    return "Most adults need 7-9 hours of sleep per night. Good sleep hygiene includes maintaining a regular sleep schedule, creating a restful environment, limiting screen time before bed, and avoiding caffeine and large meals close to bedtime. If you consistently have trouble sleeping, consider speaking with a healthcare provider.";
  } 
  else if (queryLower.includes("blood pressure")) {
    return "Normal blood pressure is typically around 120/80 mmHg. High blood pressure (hypertension) is generally considered to be 130/80 mmHg or higher. Low blood pressure might be below 90/60 mmHg. Regular monitoring is important, especially if you have risk factors. Lifestyle changes like reducing sodium, maintaining a healthy weight, and regular exercise can help manage blood pressure.";
  }
  else if (queryLower.includes("diabetes")) {
    return "Diabetes is a condition where the body either doesn't produce enough insulin or can't effectively use the insulin it produces. Type 1 diabetes is an autoimmune condition, while Type 2 is often related to lifestyle factors. Symptoms may include increased thirst, frequent urination, unexplained weight loss, and fatigue. Management typically involves monitoring blood sugar levels, medication or insulin therapy, healthy eating, and regular physical activity.";
  }
  else if (queryLower.includes("vitamins") || queryLower.includes("supplements")) {
    return "Vitamins and minerals are essential nutrients that your body needs in small amounts for normal function. While a balanced diet is the best way to get nutrients, supplements may be beneficial for certain people with specific deficiencies or health conditions. Always consult with a healthcare provider before starting any supplement regimen, as some can interact with medications or cause side effects.";
  }
  else if (queryLower.includes("heart") || queryLower.includes("cardiovascular")) {
    return "Heart health is influenced by many factors including diet, exercise, stress levels, and genetics. Recommendations for maintaining cardiovascular health include regular physical activity, a diet low in saturated fats and sodium, maintaining a healthy weight, not smoking, and controlling conditions like high blood pressure and diabetes. Regular check-ups can help detect early signs of heart disease.";
  }
  else if (queryLower.includes("cancer")) {
    return "Cancer is a group of diseases involving abnormal cell growth with the potential to invade or spread to other parts of the body. There are many types of cancer, including lung, breast, prostate, colorectal, skin, and blood cancers. Would you like information on a specific type of cancer? If so, please specify which type.";
  }
  else {
    return "Thank you for your question. For specific medical concerns, it's best to consult with a healthcare professional. I can provide general information on common health topics, preventive care, and wellness practices. Please feel free to ask about these areas, and I'll do my best to assist you.";
  }
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
    },
    
    // Add more cancer types and their stages here in a similar format
    
  };
  
  // For other cancer types not explicitly detailed above
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
