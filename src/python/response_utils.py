import random
import sys
from typing import List, Dict, Any

class ResponseCategory:
    def __init__(self, keywords: List[str], responses: List[str]):
        self.keywords = keywords
        self.responses = responses

response_categories = [
    ResponseCategory(
        keywords=["anxious", "anxiety", "worried", "nervous", "stress", "stressed", "i am feeling anxious", 
                  "i am feeling anxiety", "i am feeling worried", "i am feeling nervous", 
                  "i am feeling stress", "i am feeling stressed"],
        responses=[
            "It sounds like you're feeling anxious. Remember that anxiety is a normal response to stress, but there are ways to manage it. Deep breathing can help - try breathing in for 4 counts, holding for 4, and exhaling for 6. Would you like to explore more coping strategies?",
            "I understand anxiety can be overwhelming. Consider grounding exercises: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This can help bring you back to the present moment. Would you like to share more about what's causing your anxiety?",
            "When you're feeling anxious, your body's stress response is activated. Physical exercise, even just a short walk, can help reduce those feelings by releasing tension. Would it be possible for you to take a brief break for some movement?",
            "Anxiety often involves racing thoughts about future concerns. Practicing mindfulness can help bring your attention back to the present moment. Would you like to try a simple mindfulness exercise?",
            "Sometimes writing down our anxious thoughts can help us examine them more objectively. Have you ever tried keeping an anxiety journal to track triggers and patterns?"
        ]
    ),
    ResponseCategory(
        keywords=["sad", "depressed", "depression", "unhappy", "miserable", "hopeless", 
                 "i am feeling sad", "i am feeling depressed", "i am feeling depression", 
                 "i am feeling unhappy", "i am feeling miserable", "i am feeling hopeless"],
        responses=[
            "I'm sorry you're feeling down. Depression can make even simple tasks feel difficult. Be gentle with yourself and recognize that small steps forward are significant achievements. Could you share one small thing you might be able to do today to care for yourself?",
            "When feelings of sadness persist, it's important to reach out. Connecting with supportive friends, family, or professionals can make a big difference. Is there someone in your life you might feel comfortable talking to about how you're feeling?",
            "Sometimes depression can cloud our view of the future. Try to remember that feelings, even intense ones, aren't permanent. Would it help to talk about some strategies for managing these difficult emotions?",
            "Depression often affects our energy levels and motivation. Setting very small, achievable goals can help build momentum. What's something small you could accomplish today that might bring even a moment of satisfaction?",
            "Regular movement, even just a short walk, can sometimes help lift our mood through the release of endorphins. Have you found any physical activities that feel manageable when you're feeling low?"
        ]
    ),
    ResponseCategory(
        keywords=["lonely", "alone", "isolated", "no friends", "no one understands", 
                 "i am feeling lonely", "i am feeling alone", "i am feeling isolated"],
        responses=[
            "Feeling lonely can be really difficult. Even in a crowded room, we can feel isolated when we don't feel understood. Would you like to explore ways to connect more deeply with others or find communities where you might feel more belonging?",
            "I hear that you're feeling alone right now. Many people experience loneliness at different points in their lives. What kinds of connections or relationships would feel meaningful to you?",
            "Social connections are important for our wellbeing. Even small interactions can help reduce feelings of loneliness. Could you think of a small way to reach out to someone today, even if it's just a brief message?",
            "Loneliness can sometimes be an opportunity to deepen our relationship with ourselves. Are there activities that help you feel connected to yourself when others aren't around?",
            "Online communities can sometimes provide connection around shared interests when in-person connection is difficult. Have you explored any groups or forums related to your interests?"
        ]
    ),
    ResponseCategory(
        keywords=["angry", "anger", "mad", "furious", "frustrated", "rage", 
                 "i am feeling angry", "i am feeling anger", "i am feeling mad", 
                 "i am feeling furious", "i am feeling frustrated", "i am feeling rage"],
        responses=[
            "It sounds like you're feeling quite angry. This is a natural emotion, though it can be uncomfortable. Taking a moment to step back and cool down before responding can be helpful. Would you like to talk about what triggered these feelings?",
            "Anger often masks other emotions like hurt, fear, or disappointment. When you feel ready, it might help to explore what's beneath the anger. Is there something specific that's contributing to how you're feeling right now?",
            "When we're angry, our bodies get charged with energy. Finding healthy outlets like physical exercise, journaling, or even screaming into a pillow can help release some of that tension. What ways have you found to express anger constructively in the past?",
            "Sometimes anger arises when our boundaries have been crossed or our needs aren't being met. Reflecting on this can help identify what's important to us. Would it help to explore what boundaries or needs might be related to your anger?",
            "Anger is often a signal that something needs our attention. Learning to listen to this emotion without being overwhelmed by it takes practice. Would you like to discuss some techniques for managing anger in the moment?"
        ]
    ),
    ResponseCategory(
        keywords=["tired", "exhausted", "fatigue", "no energy", "burnout", "burnt out", 
                 "i am feeling tired", "i am feeling exhausted", "i am feeling fatigue", 
                 "i am feeling burnout", "i am feeling burnt out"],
        responses=[
            "Feeling exhausted can impact every aspect of life. Your body might be telling you it needs more rest or a different kind of care. How have your sleep patterns and self-care routines been lately?",
            "Burnout often happens when we've been pushing ourselves too hard for too long. It might be time to reassess your priorities and where your energy is going. Are there any responsibilities you could temporarily set aside to focus on recovery?",
            "Physical and mental exhaustion can feed into each other. Small changes to your routine, like short breaks throughout the day or time in nature, can help restore some energy. What small adjustments might be possible in your current situation?",
            "Sometimes fatigue is our body's way of telling us that something is out of balance in our lives. Taking an honest inventory of where your energy is going might reveal areas that need adjustment. Would it help to talk about what's been demanding most of your energy lately?",
            "Rest is not just physical but mental and emotional too. Creating boundaries around work, technology, and even certain relationships can help prevent energy depletion. Have you identified any specific drains on your energy?"
        ]
    ),
    ResponseCategory(
        keywords=["scared", "frightened", "terrified", "fear", "panic", "phobia", 
                 "i am feeling scared", "i am feeling frightened", "i am feeling terrified", 
                 "i am feeling fear", "i am feeling panic"],
        responses=[
            "Fear is our brain's way of trying to protect us, though sometimes it can be overwhelming. Taking slow, deep breaths can help calm your nervous system when you're feeling scared. Would you like to share what specifically is causing you fear?",
            "When we're afraid, our thinking can become catastrophic - imagining the worst possible outcomes. Gently challenging these thoughts by asking 'What evidence do I have?' or 'What's most likely to happen?' can sometimes help provide perspective. Would you like to explore the thoughts behind your fear?",
            "It takes courage to face our fears. Sometimes, gradually exposing ourselves to what scares us (when safe to do so) can help reduce the fear over time. Is this something you've considered or tried before?",
            "Panic often involves physical sensations like racing heart, shortness of breath, or dizziness. Reminding yourself that these sensations, while uncomfortable, are not dangerous can sometimes help. Would it help to talk about specific physical sensations you experience?",
            "Some fears are based on past experiences that were genuinely threatening. Our bodies remember these experiences and can react as if we're back in that situation. Learning to recognize when we're responding to old threats can be helpful. Does your current fear remind you of anything from your past?"
        ]
    ),
    ResponseCategory(
        keywords=["insomnia", "can't sleep", "trouble sleeping", "sleep problems", "nightmares", 
                 "i am feeling insomnia", "i am feeling can't sleep", "i am feeling trouble sleeping"],
        responses=[
            "Sleep difficulties can be really frustrating and affect your overall wellbeing. Establishing a calming bedtime routine and consistent sleep schedule can help. What does your current routine look like before bed?",
            "Many things can interfere with sleep, including screen time, caffeine, anxiety, or an uncomfortable sleep environment. Have you noticed any patterns or triggers that seem to affect your sleep quality?",
            "Relaxation techniques like progressive muscle relaxation or guided imagery can help prepare your body and mind for sleep. Would you like to hear about some specific techniques you could try tonight?",
            "Sometimes lying in bed trying to force sleep can actually increase anxiety about not sleeping. Some experts recommend getting up after 20 minutes of not sleeping and doing something calming until you feel sleepy again. Have you tried this approach?",
            "Nightmares can be distressing and impact sleep quality. Some therapists suggest 'rewriting' the ending of recurring nightmares while awake to reduce their frequency and intensity. Would you like to hear more about this technique?"
        ]
    ),
    ResponseCategory(
        keywords=["overwhelmed", "too much", "can't cope", "falling apart", "breaking down", 
                 "i am feeling overwhelmed", "i am feeling too much", "i am feeling can't cope", 
                 "i am feeling falling apart", "i am feeling breaking down"],
        responses=[
            "Feeling overwhelmed can be really distressing. Breaking things down into smaller, manageable tasks can sometimes help. What's one small thing you could focus on right now?",
            "When everything feels like too much, it's important to prioritize self-care and ask for help if possible. Are there any tasks you could delegate or postpone to create some breathing room?",
            "Sometimes we need to take a step back when we're feeling overwhelmed. A short mindfulness practice or even just a few minutes of focused breathing can help create a sense of calm. Would you like to try a brief grounding exercise together?",
            "Being overwhelmed is often a sign that our resources are stretched too thin. Creating clear boundaries around your time and energy can help prevent this state. Would it help to discuss ways to establish healthier boundaries?",
            "When we're overwhelmed, our thinking can become clouded, making decision-making even harder. Writing things down can sometimes help clear mental space. Have you tried making a brain dump of everything on your mind?"
        ]
    ),
    ResponseCategory(
        keywords=["relationship", "partner", "spouse", "boyfriend", "girlfriend", "marriage", 
                 "i am feeling relationship problems"],
        responses=[
            "Relationships can bring both joy and challenges. Open, honest communication is often key to working through difficulties. Have you been able to express your feelings to the other person involved?",
            "Sometimes in relationships, we can fall into patterns that aren't serving us well. Reflecting on these patterns can be a first step toward change. What kinds of patterns have you noticed in this relationship?",
            "It's important that relationships feel safe and respectful. Setting healthy boundaries is part of any good relationship. How do you feel about the boundaries in this relationship?",
            "Different attachment styles and communication preferences can sometimes lead to misunderstandings in relationships. Learning about these differences can foster greater understanding. Would it help to explore how you and the other person might have different needs or styles?",
            "Conflict in relationships is normal and can even be healthy when approached constructively. Learning to disagree respectfully is a valuable skill. How do you and the other person typically handle disagreements?"
        ]
    ),
    ResponseCategory(
        keywords=["self-esteem", "confidence", "hate myself", "worthless", "not good enough", 
                 "i am feeling worthless", "i am feeling not good enough", "i am feeling low self-esteem", 
                 "i am feeling no confidence"],
        responses=[
            "I'm sorry you're experiencing these difficult feelings about yourself. Our inner critic can be very harsh, saying things we would never say to someone we care about. How might you respond if a friend was expressing these same feelings about themselves?",
            "Building self-compassion takes time and practice. One approach is to notice negative self-talk and gently challenge or reframe those thoughts. Would you be willing to share a specific thought you've been having about yourself?",
            "Our sense of worth doesn't depend on achievements or others' approval, though it can sometimes feel that way. You have inherent value as a person. What are some qualities or values you appreciate about yourself, even if they seem small?",
            "Sometimes low self-esteem develops from past experiences where others treated us poorly or we internalized negative messages. Understanding the roots of these feelings can help us recognize they're not truths about us. Does your inner critic remind you of messages you received growing up?",
            "Small acts of self-care and self-compassion can gradually help build a more positive relationship with yourself. What's one small way you could show yourself kindness today?"
        ]
    ),
    ResponseCategory(
        keywords=["trauma", "ptsd", "traumatic", "flashback", "trigger", "triggered", 
                 "i am feeling triggered", "i am having flashbacks"],
        responses=[
            "Trauma responses can be very overwhelming. When you're experiencing triggering moments, grounding techniques can help bring you back to the present. One simple technique is the 5-4-3-2-1 method: notice 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. Would you like to try this together?",
            "Flashbacks and triggering experiences can feel very real, as if the trauma is happening again. Reminding yourself that you are safe now and that you survived the past event can help. Would it help to talk about ways to reconnect with the present moment when this happens?",
            "Healing from trauma takes time and often benefits from professional support. Have you considered speaking with a trauma-informed therapist who specializes in approaches like EMDR or Somatic Experiencing?",
            "Our bodies often hold trauma memories. Gentle physical practices like yoga, tai chi, or even simple stretching can sometimes help release tension and reconnect with your body in a safe way. Have you explored any practices that help you feel safe in your body?",
            "Creating safety both internally and in your environment is important for trauma recovery. Are there specific things that help you feel safe and grounded when you're experiencing difficult trauma responses?"
        ]
    ),
    ResponseCategory(
        keywords=["addict", "addiction", "substance abuse", "alcoholic", "drinking too much", "using drugs", 
                 "i think i'm addicted", "i can't stop using", "i drink too much"],
        responses=[
            "Recognizing patterns of addiction takes courage. Many people find that addiction often begins as a way to cope with difficult emotions or experiences. Would you feel comfortable sharing more about what might be underlying your concerns?",
            "Recovery from addiction usually benefits from support. This might include professional help, support groups like AA/NA, or trusted friends and family. Have you considered what kind of support might feel helpful for you?",
            "Harm reduction approaches recognize that change often happens gradually. Small steps to reduce use or make use safer can be valuable even if you're not ready for abstinence. Would it help to talk about some harm reduction strategies?",
            "Addiction often affects our sense of identity and self-worth. Remembering that addiction is a health condition, not a moral failing, can be an important part of recovery. How do you tend to view yourself in relation to these concerns?",
            "Many people find that developing new coping skills is an important part of recovery. These might include stress management techniques, ways to process difficult emotions, or meaningful activities that provide fulfillment. What kinds of alternative coping strategies might interest you?"
        ]
    ),
    ResponseCategory(
        keywords=["ocd", "obsessive", "compulsive", "intrusive thoughts", "rituals", "checking", 
                 "i can't stop checking", "intrusive thoughts", "i have to do things a certain way"],
        responses=[
            "Obsessive-compulsive patterns often involve intrusive thoughts that cause distress, followed by behaviors aimed at reducing that distress. These patterns can be exhausting. Would you like to share more about what you're experiencing?",
            "With OCD, our brain sends false alarm signals that something is dangerous when it isn't. Learning to recognize these false alarms can be an important step. Have you been able to identify any patterns in your thoughts or behaviors?",
            "Evidence-based treatments for OCD often include exposure and response prevention (ERP), which involves gradually facing fears without engaging in compulsive behaviors. This is usually done with the support of a specialized therapist. Have you worked with a mental health professional on these concerns?",
            "Living with intrusive thoughts can be very distressing. It can help to remember that having the thoughts doesn't mean you want to act on them or that they reflect your true desires or values. Would it help to talk about ways to respond to intrusive thoughts?",
            "Self-compassion is especially important when dealing with OCD. The condition can be very critical and demanding. How might you show yourself some kindness today, knowing that these symptoms aren't your fault?"
        ]
    ),
    ResponseCategory(
        keywords=["bipolar", "mania", "manic", "hypomania", "mood swings", "high and low moods", 
                 "i think i'm bipolar", "extreme mood changes"],
        responses=[
            "Bipolar disorder involves significant changes in mood, energy, thinking, and behavior - from periods of elevation (mania or hypomania) to periods of depression. These shifts can be very disruptive. Would you like to share more about the patterns you've noticed?",
            "Managing bipolar disorder usually involves multiple approaches, including medication, therapy, regular routines, and stress management. Working with healthcare providers who specialize in mood disorders is important. Have you been able to connect with any professional support?",
            "Recognizing early warning signs of mood episodes can help with management. These might include changes in sleep, activity levels, speech patterns, or decision-making. Have you identified any patterns that might signal a shift in your mood state?",
            "Maintaining regular routines around sleep, meals, exercise, and social activities can help stabilize mood. Even during well periods, this consistency is protective. What does your typical daily routine look like?",
            "Living with bipolar disorder can feel overwhelming at times, but many people are able to manage the condition effectively with appropriate treatment and support. Would it help to talk about resources or strategies that others have found helpful?"
        ]
    ),
    ResponseCategory(
        keywords=["eating disorder", "anorexia", "bulimia", "binge", "purge", "starving myself", 
                 "i can't stop eating", "i make myself throw up", "i don't eat"],
        responses=[
            "Concerns about eating patterns and body image can be very distressing. Eating disorders are complex health conditions that affect both physical and mental wellbeing. Would you feel comfortable sharing more about what you're experiencing?",
            "Recovery from eating disorders typically requires professional support, including medical care, nutritional guidance, and therapy. These conditions can have serious health consequences, so reaching out for help is important. Have you considered speaking with a healthcare provider who specializes in eating disorders?",
            "Eating disorders often develop as ways to cope with difficult emotions or experiences. Understanding the function of these behaviors can be part of recovery. Would it help to explore what might be underlying these patterns for you?",
            "Healing your relationship with food and your body takes time and compassion. Small steps toward more balanced, flexible eating and self-acceptance are valuable. What might one small step toward caring for your wellbeing look like today?",
            "The cultural emphasis on certain body types and dieting can contribute to disordered eating. Developing a critical perspective on these messages can be helpful. How do external messages about bodies and food affect how you feel about yourself?"
        ]
    ),
    ResponseCategory(
        keywords=["adhd", "attention deficit", "can't focus", "distracted", "impulsive", "hyperactive", 
                 "i can't concentrate", "i am always distracted", "i think i have adhd"],
        responses=[
            "Challenges with attention, focus, impulse control, or hyperactivity can make daily tasks more difficult. ADHD is a neurodevelopmental condition that affects how our brains regulate attention and activity. Would you like to share more about the specific challenges you're experiencing?",
            "Many people with ADHD find it helpful to create environments that work with their brain rather than against it. This might include breaking tasks into smaller steps, using timers, creating visual reminders, or reducing distractions. Have you found any strategies that help you work with your attention patterns?",
            "ADHD often comes with strengths as well as challenges - things like creativity, hyperfocus on interesting topics, thinking outside the box, or high energy. Have you noticed any positive aspects of your attention or activity patterns?",
            "Managing ADHD often involves a combination of approaches, which might include medication, therapy, coaching, organizational strategies, and lifestyle factors like exercise and sleep. Have you explored any of these approaches?",
            "Living in a world designed for neurotypical attention patterns can be frustrating. Your brain works differently, not wrongly. How might you show yourself some compassion for the challenges you face?"
        ]
    ),
    ResponseCategory(
        keywords=["grief", "loss", "died", "death", "bereavement", "mourning", 
                 "i lost someone", "someone died", "dealing with loss"],
        responses=[
            "I'm so sorry for your loss. Grief is a deeply personal experience that can affect us emotionally, physically, mentally, and spiritually. There's no right way to grieve, and the process isn't linear. Would you like to share more about your experience or the person you've lost?",
            "Many people find that grief comes in waves - sometimes overwhelming, other times more manageable. These fluctuations are normal, though they can be disorienting. How have you been experiencing grief recently?",
            "Creating space to remember and honor your relationship with the person you've lost can be meaningful. This might include rituals, looking at photos, sharing stories, or keeping special objects nearby. Have you found ways to maintain your connection with the person who died?",
            "Taking care of basic needs like rest, nutrition, and gentle movement can help support you through grief, though these things often become more difficult during bereavement. What small act of self-care might feel manageable today?",
            "Sometimes well-meaning people say unhelpful things when we're grieving, like suggesting we should be 'moving on' or comparing our loss to others. Your grief journey is your own, and it takes the time it takes. Have you felt pressure about how you 'should' be grieving?"
        ]
    ),
    ResponseCategory(
        keywords=["autism", "asd", "autistic", "asperger", "neurodivergent", "sensory overload", 
                 "i think i'm autistic", "social difficulties", "special interests"],
        responses=[
            "Autism is a neurological difference that affects how people perceive and interact with the world. It involves differences in social communication, sensory processing, and patterns of thinking or interests. Would you like to share more about your experiences or questions related to autism?",
            "Sensory experiences can be different for autistic individuals - some sensations may feel more intense, while others might be less noticeable. Creating environments that accommodate your sensory needs is important. Have you identified particular sensory sensitivities or preferences?",
            "Many autistic people find deep value in their special interests - topics or activities they're passionately engaged with. These interests can provide joy, comfort, and expertise. Would you like to share about any areas of particular interest for you?",
            "Social communication differences are a core aspect of autism. This might include challenges with reading social cues, different patterns of eye contact or body language, or difficulty with unwritten social rules. How have social interactions been for you?",
            "Learning about autism from autistic perspectives can be very valuable. Many autistic adults share their experiences through blogs, books, videos, and online communities. Would you be interested in exploring some of these resources?"
        ]
    ),
    ResponseCategory(
        keywords=["self-harm", "cutting", "hurt myself", "injure myself", "i want to hurt myself", 
                 "i cut myself", "i injure myself", "i burn myself"],
        responses=[
            "I'm concerned about what you're sharing. Self-harm is often a way to cope with overwhelming emotions or experiences. While it may provide temporary relief, there are healthier coping strategies that can help in the long term. Would you like to talk about what's been triggering these urges?",
            "When the urge to self-harm arises, delaying the impulse can sometimes help it pass. Some alternatives include holding ice cubes, snapping a rubber band on your wrist, intense exercise, or loud vocalizing - these create intense sensation without causing harm. Have you tried any alternative coping strategies?",
            "Self-harm often happens in moments of intense emotion when we don't have other ways to express or manage those feelings. Learning to identify and name emotions, along with developing emotional regulation skills, can help. Would it help to talk about ways to work with difficult emotions?",
            "Many people who self-harm benefit from professional support. A therapist with experience in this area can help develop personalized coping strategies and address underlying concerns. Have you considered reaching out to a mental health professional?",
            "It takes courage to talk about self-harm. Please know that you deserve support and that recovery is possible. Would you like information about crisis resources that you could reach out to when urges are strong?"
        ]
    ),
    ResponseCategory(
        keywords=["help", "feeling", "feel", "mental", "health", "therapy", "need", "want", 
                 "i am feeling help", "i am feeling mental", "i am feeling health", 
                 "i am feeling therapy", "i am feeling need", "i am feeling want"],
        responses=[
            "Thank you for sharing with me. While I'm here to listen and offer support, everyone's situation is unique. Could you tell me more about what you're experiencing so I can better understand how to support you?",
            "I appreciate you reaching out. Talking about our mental health takes courage. I'm here to listen without judgment. Would you like to elaborate on what's been happening for you recently?",
            "I'm glad you're sharing your feelings. That's an important step. While I can offer a supportive space for reflection, remember that connecting with mental health professionals can provide more personalized guidance. Is there anything specific you'd like to explore today?",
            "It takes strength to talk about mental health concerns. I'm here to listen and offer support. Could you share a bit more about what prompted you to reach out today?",
            "Thank you for trusting me with your feelings. I'm here to listen and offer perspective. Would it help to explore specific aspects of what you're experiencing?"
        ]
    )
]

# Default responses when no keywords match
default_responses = [
    "Thank you for sharing that with me. How long have you been feeling this way?",
    "I'm here to listen and support you. Could you tell me more about what's on your mind?",
    "I appreciate you opening up. Would it help to talk about what might have triggered these feelings?",
    "Your feelings are valid. Would you like to explore some coping strategies that might help with what you're experiencing?",
    "I'm listening. Sometimes putting our feelings into words can help us process them. Is there anything else you'd like to share?",
    "Thank you for reaching out. Sharing how we're feeling is often the first step toward feeling better. What else would be helpful for me to know about your situation?",
    "I'm glad you're expressing your feelings. Would it be helpful to discuss potential next steps or resources that might support you?",
    "I appreciate your willingness to share your experience. Would you like to explore this further or would you prefer to talk about something else for now?"
]

def get_response(user_input: str) -> str:
    lowercase_input = user_input.lower()
    
    # Check for crisis indicators and provide appropriate response
    crisis_keywords = ["suicide", "kill myself", "end my life", "don't want to live", "want to die", 
                      "taking my life", "better off dead", "no reason to live", "suicide plan", 
                      "suicidal thoughts", "planning to kill myself"]
    has_crisis_keyword = any(keyword in lowercase_input for keyword in crisis_keywords)
    
    if has_crisis_keyword:
        return "I'm concerned about what you're sharing. If you're having thoughts of harming yourself, please reach out for immediate help. You can call the Suicide and Crisis Lifeline at 988 or 1-800-273-8255, or text HOME to 741741 to reach the Crisis Text Line. These services are available 24/7 with trained counselors ready to talk. Your life matters, and support is available."
    
    # Look for matching response categories
    matching_categories = [
        category for category in response_categories
        if any(keyword in lowercase_input for keyword in category.keywords)
    ]
    
    if matching_categories:
        # If multiple categories match, randomly select one
        category = random.choice(matching_categories)
        return random.choice(category.responses)
    
    # If no categories match, provide a default response
    return random.choice(default_responses)

# Command line interface for the script
if __name__ == "__main__":
    if len(sys.argv) >= 3:
        input_file = sys.argv[1]
        output_file = sys.argv[2]
        
        try:
            # Read input from file
            with open(input_file, 'r') as f:
                user_input = f.read().strip()
            
            # Generate response
            response = get_response(user_input)
            
            # Write output to file
            with open(output_file, 'w') as f:
                f.write(response)
                
        except Exception as e:
            print(f"Error: {e}")
            sys.exit(1)
    else:
        print("Usage: python response_utils.py input_file output_file")
        sys.exit(1)
