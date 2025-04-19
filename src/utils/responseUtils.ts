// This file contains predefined responses and logic for generating appropriate AI responses
// In a production application, this would likely connect to a more sophisticated AI system

interface ResponseCategory {
  keywords: string[];
  responses: string[];
}

const responseCategories: ResponseCategory[] = [
  {
    keywords: ["anxious", "anxiety", "worried", "nervous", "stress", "stressed", "I am feeling anxious", "I am feeling anxiety", "I am feeling worried", "I am feeling nervous", "I am feeling stress", "I am feeling stressed"],
    responses: string="Hey, I just want you to know — I see you're going through a tough time right now. Anxiety can feel so heavy and overwhelming, and it's okay to feel the way you do. You're not alone, and you don't have to carry it all by yourself. I'm here for you, and I believe in your strength, even on the days when you feel weak.\n\nSometimes the mind races, the heart feels restless, and stress builds up — but there are gentle ways to ease the pressure and calm the storm. Here are a few simple things you can try when anxiety starts to take over:\n\n✅ Breathe Deeply and Slowly\n\nFocus on your breathing: inhale for 4 seconds, hold for 4, exhale for 6.\n\nDeep, slow breaths signal your body that you are safe and help calm the nervous system.\n\n✅ Ground Yourself (The 5-4-3-2-1 Method)\n\nLook around and name:\n\n5 things you can see,\n\n4 things you can touch,\n\n3 things you can hear,\n\n2 things you can smell,\n\n1 thing you can taste.\n\nThis brings your mind back to the present moment and away from anxious thoughts.\n\n✅ Positive Self-Talk\n\nSpeak to yourself like you would to a friend. Replace thoughts like \"I can't handle this\" with \"I'm doing my best, and this feeling will pass.\"\n\n✅ Physical Movement\n\nA short walk, stretching, light exercise, or even dancing can release tension from the body and improve your mood.\n\n✅ Limit Stimulants\n\nReduce caffeine, sugar, and energy drinks when you're feeling anxious — these can spike your nervous system.\n\n✅ Create a Relaxation Routine\n\nListen to calming music or nature sounds.\n\nPractice mindfulness or meditation (there are great apps for beginners).\n\nTake warm showers or baths to relax your body.\n\n✅ Talk to Someone You Trust\n\nDon't keep everything bottled up. Sharing your worries can ease the weight, and sometimes just saying things out loud can help.\n\n💛 Most of all — be kind to yourself.\nIt's okay to have hard days. Anxiety does not define you, and you don't have to face it alone. One small step at a time is more than enough. I'm proud of you for fighting through it, even when it feels invisible to the world."
    
  },
  {
    keywords: ["sad", "depressed", "depression", "unhappy", "miserable", "hopeless", "I am feeling sad", "I am feeling depressed", "I am feeling depression", "I am feeling unhappy", "I am feeling miserable", "I am feeling hopeless"],
    responses: [
      "I'm sorry you're feeling down. Depression can make even simple tasks feel difficult. Be gentle with yourself and recognize that small steps forward are significant achievements. Could you share one small thing you might be able to do today to care for yourself?",
      "When feelings of sadness persist, it's important to reach out. Connecting with supportive friends, family, or professionals can make a big difference. Is there someone in your life you might feel comfortable talking to about how you're feeling?",
      "Sometimes depression can cloud our view of the future. Try to remember that feelings, even intense ones, aren't permanent. Would it help to talk about some strategies for managing these difficult emotions?"
    ]
  },
  {
    keywords: ["lonely", "alone", "isolated", "no friends", "no one understands", "I am feeling lonely", "I am feeling alone", "I am feeling isolated","I have no friends"],
    responses: [
      "Feeling lonely can be really difficult. Even in a crowded room, we can feel isolated when we don't feel understood. Would you like to explore ways to connect more deeply with others or find communities where you might feel more belonging?",
      "I hear that you're feeling alone right now. Many people experience loneliness at different points in their lives. What kinds of connections or relationships would feel meaningful to you?",
      "Social connections are important for our wellbeing. Even small interactions can help reduce feelings of loneliness. Could you think of a small way to reach out to someone today, even if it's just a brief message?"
    ]
  },
  {
    keywords: ["angry", "anger", "mad", "furious", "frustrated", "rage", "I am feeling angry", "I am feeling anger", "I am feeling mad", "I am feeling furious", "I am feeling frustrated", "I am feeling rage"],
    responses: [
      "It sounds like you're feeling quite angry. This is a natural emotion, though it can be uncomfortable. Taking a moment to step back and cool down before responding can be helpful. Would you like to talk about what triggered these feelings?",
      "Anger often masks other emotions like hurt, fear, or disappointment. When you feel ready, it might help to explore what's beneath the anger. Is there something specific that's contributing to how you're feeling right now?",
      "When we're angry, our bodies get charged with energy. Finding healthy outlets like physical exercise, journaling, or even screaming into a pillow can help release some of that tension. What ways have you found to express anger constructively in the past?"
    ]
  },
  {
    keywords: ["tired", "exhausted", "fatigue", "no energy", "burnout", "burnt out", "I am feeling tired", "I am feeling exhausted", "I am feeling fatigue", "I am feeling burnout", "I am feeling burnt out"],
    responses: [
      "Feeling exhausted can impact every aspect of life. Your body might be telling you it needs more rest or a different kind of care. How have your sleep patterns and self-care routines been lately?",
      "Burnout often happens when we've been pushing ourselves too hard for too long. It might be time to reassess your priorities and where your energy is going. Are there any responsibilities you could temporarily set aside to focus on recovery?",
      "Physical and mental exhaustion can feed into each other. Small changes to your routine, like short breaks throughout the day or time in nature, can help restore some energy. What small adjustments might be possible in your current situation?"
    ]
  },
  {
    keywords: ["scared", "frightened", "terrified", "fear", "panic", "phobia", "I am feeling scared", "I am feeling frightened", "I am feeling terrified", "I am feeling fear", "I am feeling panic"],
    responses: [
      "Fear is our brain's way of trying to protect us, though sometimes it can be overwhelming. Taking slow, deep breaths can help calm your nervous system when you're feeling scared. Would you like to share what specifically is causing you fear?",
      "When we're afraid, our thinking can become catastrophic - imagining the worst possible outcomes. Gently challenging these thoughts by asking 'What evidence do I have?' or 'What's most likely to happen?' can sometimes help provide perspective. Would you like to explore the thoughts behind your fear?",
      "It takes courage to face our fears. Sometimes, gradually exposing ourselves to what scares us (when safe to do so) can help reduce the fear over time. Is this something you've considered or tried before?"
    ]
  },
  {
    keywords: ["insomnia", "can't sleep", "trouble sleeping", "sleep problems", "nightmares", "I am feeling insomnia", "I am feeling can't sleep", "I am feeling trouble sleeping"],
    responses: [
      "Sleep difficulties can be really frustrating and affect your overall wellbeing. Establishing a calming bedtime routine and consistent sleep schedule can help. What does your current routine look like before bed?",
      "Many things can interfere with sleep, including screen time, caffeine, anxiety, or an uncomfortable sleep environment. Have you noticed any patterns or triggers that seem to affect your sleep quality?",
      "Relaxation techniques like progressive muscle relaxation or guided imagery can help prepare your body and mind for sleep. Would you like to hear about some specific techniques you could try tonight?"
    ]
  },
  {
    keywords: ["overwhelmed", "too much", "can't cope", "falling apart", "breaking down", "I am feeling overwhelmed", "I am feeling too much", "I am feeling can't cope", "I am feeling falling apart", "I am feeling breaking down"],
    responses: [
      "Feeling overwhelmed can be really distressing. Breaking things down into smaller, manageable tasks can sometimes help. What's one small thing you could focus on right now?",
      "When everything feels like too much, it's important to prioritize self-care and ask for help if possible. Are there any tasks you could delegate or postpone to create some breathing room?",
      "Sometimes we need to take a step back when we're feeling overwhelmed. A short mindfulness practice or even just a few minutes of focused breathing can help create a sense of calm. Would you like to try a brief grounding exercise together?"
    ]
  },
  {
    keywords: ["relationship", "partner", "spouse", "boyfriend", "girlfriend", "marriage", "I am feeling relationship problems],
    responses: [
      "Relationships can bring both joy and challenges. Open, honest communication is often key to working through difficulties. Have you been able to express your feelings to the other person involved?",
      "Sometimes in relationships, we can fall into patterns that aren't serving us well. Reflecting on these patterns can be a first step toward change. What kinds of patterns have you noticed in this relationship?",
      "It's important that relationships feel safe and respectful. Setting healthy boundaries is part of any good relationship. How do you feel about the boundaries in this relationship?"
    ]
  },
  {
    keywords: ["self-esteem", "confidence", "hate myself", "worthless", "not good enough", "I am feeling worthless", "I am feeling not good enough", "I am feeling low self-esteem", "I am feeling no confidence"],
    responses: [
      "I'm sorry you're experiencing these difficult feelings about yourself. Our inner critic can be very harsh, saying things we would never say to someone we care about. How might you respond if a friend was expressing these same feelings about themselves?",
      "Building self-compassion takes time and practice. One approach is to notice negative self-talk and gently challenge or reframe those thoughts. Would you be willing to share a specific thought you've been having about yourself?",
      "Our sense of worth doesn't depend on achievements or others' approval, though it can sometimes feel that way. You have inherent value as a person. What are some qualities or values you appreciate about yourself, even if they seem small?"
    ]
  },
  // General fallback for when no specific keywords match
  {
    keywords: ["help", "feeling", "feel", "mental", "health", "therapy", "need", "want", "I am feeling help", "I am feeling mental", "I am feeling health", "I am feeling therapy", "I am feeling need", "I am feeling want"],
    responses: [
      "Thank you for sharing with me. While I'm here to listen and offer support, everyone's situation is unique. Could you tell me more about what you're experiencing so I can better understand how to support you?",
      "I appreciate you reaching out. Talking about our mental health takes courage. I'm here to listen without judgment. Would you like to elaborate on what's been happening for you recently?",
      "I'm glad you're sharing your feelings. That's an important step. While I can offer a supportive space for reflection, remember that connecting with mental health professionals can provide more personalized guidance. Is there anything specific you'd like to explore today?"
    ]
  }
];

// Default responses when no keywords match
const defaultResponses = [
  "Thank you for sharing that with me. How long have you been feeling this way?",
  "I'm here to listen and support you. Could you tell me more about what's on your mind?",
  "I appreciate you opening up. Would it help to talk about what might have triggered these feelings?",
  "Your feelings are valid. Would you like to explore some coping strategies that might help with what you're experiencing?",
  "I'm listening. Sometimes putting our feelings into words can help us process them. Is there anything else you'd like to share?"
];

export const getResponse = async (userInput: string): Promise<string> => {
  const lowercaseInput = userInput.toLowerCase();
  
  // Check for crisis indicators and provide appropriate response
  const crisisKeywords = ["suicide", "kill myself", "end my life", "don't want to live", "want to die"];
  const hasCrisisKeyword = crisisKeywords.some(keyword => lowercaseInput.includes(keyword));
  
  if (hasCrisisKeyword) {
    return "I'm concerned about what you're sharing. If you're having thoughts of harming yourself, please reach out for immediate help. You can call the Suicide and Crisis Lifeline at 988 or 1-800-273-8255, or text HOME to 741741 to reach the Crisis Text Line. These services are available 24/7 with trained counselors ready to talk. Your life matters, and support is available.";
  }
  
  // Look for matching response categories
  const matchingCategories = responseCategories.filter(category => 
    category.keywords.some(keyword => lowercaseInput.includes(keyword))
  );
  
  if (matchingCategories.length > 0) {
    // If multiple categories match, randomly select one
    const category = matchingCategories[Math.floor(Math.random() * matchingCategories.length)];
    return category.responses[Math.floor(Math.random() * category.responses.length)];
  }
  
  // If no categories match, provide a default response
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};
