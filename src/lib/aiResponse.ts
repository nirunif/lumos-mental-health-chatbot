
import { Sentiment } from "./sentimentAnalysis";

// Responses based on sentiment
const positiveResponses = [
  "It's wonderful to hear you're feeling good! Keep nurturing that positive energy.",
  "I'm so glad you're in a positive mood! What's been going well for you?",
  "That's great to hear! Positive emotions are worth celebrating.",
  "Your positive energy is contagious! What's made you feel this way?",
  "It's lovely to see you in good spirits! How can we maintain this positive feeling?"
];

const neutralResponses = [
  "I hear you. Would you like to talk more about what's on your mind?",
  "Thanks for sharing. How else have you been feeling lately?",
  "I appreciate you opening up. Is there anything specific you'd like to discuss?",
  "I'm here to listen. Would you like to explore your feelings more deeply?",
  "Thank you for sharing that with me. What else would you like to talk about today?"
];

const negativeResponses = [
  "I'm sorry to hear you're feeling this way. Remember that it's okay to not be okay sometimes.",
  "That sounds difficult. Would you like to talk more about what's troubling you?",
  "I'm here for you during this tough time. What might help you feel a bit better right now?",
  "It takes courage to express difficult emotions. Would some self-care activities help?",
  "I appreciate you sharing your feelings with me. Let's think about some small steps that might help."
];

// Self-care suggestions based on sentiment
const selfCareForNegative = [
  "Taking a few deep breaths might help center you.",
  "Perhaps a short walk outside could help clear your mind.",
  "Sometimes writing down your thoughts can provide relief.",
  "Consider reaching out to a trusted friend or family member.",
  "A warm shower or bath might help you relax.",
  "Try practicing mindfulness for just 5 minutes.",
  "It might help to listen to some calming music."
];

const selfCareForNeutral = [
  "Have you tried journaling lately? It can help process your thoughts.",
  "A short meditation session might help you connect with your feelings.",
  "Physical activity, even just stretching, can help improve your mood.",
  "Connecting with nature, even briefly, can be refreshing for your mind.",
  "Reading something inspiring might help shift your perspective."
];

const selfCareForPositive = [
  "This might be a good time to set some positive intentions for tomorrow.",
  "Consider sharing your positive energy with someone who might need it.",
  "Reflecting on what made you feel good can help you create more positive moments.",
  "Why not celebrate this good feeling with a small treat for yourself?",
  "Journaling about positive experiences can help reinforce them."
];

// Function to get a random item from an array
function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function getAIResponse(userMessage: string, sentiment: Sentiment): Promise<string> {
  // Select appropriate response based on sentiment
  let response: string;
  let selfCare: string;
  
  switch(sentiment) {
    case "positive":
      response = getRandomItem(positiveResponses);
      selfCare = getRandomItem(selfCareForPositive);
      break;
    case "negative":
      response = getRandomItem(negativeResponses);
      selfCare = getRandomItem(selfCareForNegative);
      break;
    default: // neutral
      response = getRandomItem(neutralResponses);
      selfCare = getRandomItem(selfCareForNeutral);
  }
  
  // Sometimes add self-care suggestions
  if (Math.random() > 0.5) {
    return `${response} ${selfCare}`;
  }
  
  return response;
}

// In a real implementation, we'd use the Hugging Face model:
/*
import { pipeline } from "@huggingface/transformers";

export async function getAIResponse(userMessage: string, sentiment: Sentiment): Promise<string> {
  try {
    // Generate base response with DialoGPT
    const generator = await pipeline("text-generation", "microsoft/DialoGPT-medium");
    
    // Generate a contextual prompt based on sentiment
    let prompt = "";
    
    switch(sentiment) {
      case "positive":
        prompt = `User is feeling positive: "${userMessage}" \nSupportive response: `;
        break;
      case "negative":
        prompt = `User is feeling down: "${userMessage}" \nEmpathetic response: `;
        break;
      default:
        prompt = `User: "${userMessage}" \nThoughtful response: `;
    }
    
    const result = await generator(prompt, {
      max_length: 100,
      temperature: 0.7,
      top_p: 0.9,
    });
    
    let response = result[0].generated_text;
    
    // Clean up the response
    response = response.replace(prompt, "");
    
    // Add self-care suggestion based on sentiment
    let selfCare = "";
    
    if (sentiment === "negative") {
      selfCare = getRandomItem(selfCareForNegative);
    } else if (sentiment === "neutral") {
      selfCare = getRandomItem(selfCareForNeutral);
    }
    
    if (selfCare) {
      response = `${response} ${selfCare}`;
    }
    
    return response;
  } catch (error) {
    console.error("Error generating response:", error);
    return "I'm here to listen. Can you tell me more about how you're feeling?";
  }
}
*/
