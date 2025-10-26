import { GoogleGenerativeAI } from '@google/generative-ai';
import Project from '../models/Project.model.js';
import Skill from '../models/Skill.model.js';
import Profile from '../models/Profile.model.js';
import Experience from '../models/Experience.model.js';
import Education from '../models/Education.model.js';
import Course from '../models/Course.model.js';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Base portfolio context
const getPortfolioContext = async () => {
  try {
    // Fetch real data from database
    const [projects, skills, profile, experience, education, courses] = await Promise.all([
      Project.find().populate('categories').limit(10),
      Skill.find().limit(20),
      Profile.findOne(),
      Experience.find().sort({ startDate: -1 }),
      Education.find().sort({ startDate: -1 }),
      Course.find().sort({ date: -1 })
    ]);

    // Build projects section with real data
    let projectsInfo = 'PROJECTS:\n';
    if (projects && projects.length > 0) {
      projects.forEach(project => {
        projectsInfo += `\n- ${project.title.en}${project.title.ar ? ` (${project.title.ar})` : ''}\n`;
        projectsInfo += `  Description: ${project.shortDescription.en}\n`;
        projectsInfo += `  Technologies: ${project.technologies.join(', ')}\n`;
        if (project.githubUrl) {
          projectsInfo += `  GitHub: ${project.githubUrl}\n`;
        }
        if (project.liveUrl) {
          projectsInfo += `  Live Demo: ${project.liveUrl}\n`;
        }
        if (project.categories && project.categories.length > 0) {
          const cats = project.categories.map(c => c.name.en).join(', ');
          projectsInfo += `  Categories: ${cats}\n`;
        }
      });
    }

    // Build skills section
    let skillsInfo = 'TECHNICAL SKILLS:\n';
    if (skills && skills.length > 0) {
      const skillNames = skills.map(s => s.name.en).join(', ');
      skillsInfo += skillNames;
    }

    // Build profile info
    let profileInfo = 'ABOUT ZYAD:\n';
    if (profile) {
      profileInfo += `Name: ${profile.name.en}${profile.name.ar ? ` (${profile.name.ar})` : ''}\n`;
      if (profile.title) {
        profileInfo += `Title: ${profile.title.en}\n`;
      }
      if (profile.bio) {
        profileInfo += `Bio: ${profile.bio.en}\n`;
      }
      if (profile.email) {
        profileInfo += `Email: ${profile.email}\n`;
      }
      if (profile.github) {
        profileInfo += `GitHub: ${profile.github}\n`;
      }
      if (profile.linkedin) {
        profileInfo += `LinkedIn: ${profile.linkedin}\n`;
      }
    }

    // Build experience section
    let experienceInfo = 'WORK EXPERIENCE:\n';
    if (experience && experience.length > 0) {
      experience.forEach(exp => {
        if (exp.title?.en && exp.company) {
          experienceInfo += `\n- ${exp.title.en} at ${exp.company}\n`;
          if (exp.startDate) {
            experienceInfo += `  Duration: ${new Date(exp.startDate).getFullYear()}`;
            if (exp.endDate) {
              experienceInfo += ` - ${new Date(exp.endDate).getFullYear()}`;
            } else if (exp.current) {
              experienceInfo += ` - Present`;
            }
            experienceInfo += `\n`;
          }
          if (exp.location?.en) {
            experienceInfo += `  Location: ${exp.location.en}\n`;
          }
          if (exp.description?.en) {
            experienceInfo += `  Description: ${exp.description.en}\n`;
          }
        }
      });
    } else {
      experienceInfo += 'No work experience data available yet.\n';
    }

    // Build education section
    let educationInfo = 'EDUCATION:\n';
    if (education && education.length > 0) {
      education.forEach(edu => {
        if (edu.degree?.en && edu.fieldOfStudy?.en && edu.institution) {
          educationInfo += `\n- ${edu.degree.en} in ${edu.fieldOfStudy.en}\n`;
          educationInfo += `  Institution: ${edu.institution}\n`;
          if (edu.startDate) {
            educationInfo += `  Year: ${new Date(edu.startDate).getFullYear()}`;
            if (edu.endDate) {
              educationInfo += ` - ${new Date(edu.endDate).getFullYear()}`;
            }
            educationInfo += `\n`;
          }
          if (edu.location?.en) {
            educationInfo += `  Location: ${edu.location.en}\n`;
          }
          if (edu.description?.en) {
            educationInfo += `  Description: ${edu.description.en}\n`;
          }
        }
      });
    } else {
      educationInfo += 'No education data available yet.\n';
    }

    // Build courses section
    let coursesInfo = 'COURSES & CERTIFICATIONS:\n';
    if (courses && courses.length > 0) {
      courses.forEach(course => {
        if (course.name?.en && course.company) {
          coursesInfo += `\n- ${course.name.en}\n`;
          coursesInfo += `  Provider: ${course.company}\n`;
          if (course.date) {
            coursesInfo += `  Completed: ${new Date(course.date).getFullYear()}\n`;
          }
          if (course.location?.en) {
            coursesInfo += `  Location: ${course.location.en}\n`;
          }
          if (course.certificateUrl) {
            coursesInfo += `  Certificate: ${course.certificateUrl}\n`;
          }
          if (course.description?.en) {
            coursesInfo += `  Description: ${course.description.en}\n`;
          }
        }
      });
    } else {
      coursesInfo += 'No courses/certifications data available yet.\n';
    }

    return `
You are an AI assistant for Zyad Walid's portfolio website. You help visitors learn about Zyad's skills, projects, and experience.

IMPORTANT INSTRUCTIONS:
- Be friendly, professional, and helpful
- Answer in the same language the user asks (English or Arabic)
- Keep responses concise and engaging
- If asked about contact, direct them to the contact page
- Use the information provided below to answer questions about Zyad's background
- When asked about experience, education, skills, or projects, refer to the specific data provided below
- If specific details aren't in the data below, be honest and suggest they contact Zyad directly

=== PORTFOLIO DATA ===

${profileInfo}

${experienceInfo}

${educationInfo}

${coursesInfo}

${skillsInfo}

${projectsInfo}

=== END PORTFOLIO DATA ===

CONTACT:
- Available for freelance work and full-time opportunities
- Can be reached through the contact form on the website
- Active on GitHub, LinkedIn, and other professional platforms

Remember to be conversational and helpful while staying professional!

When users ask about projects, provide the GitHub links and live demo URLs if available.
`;
  } catch (error) {
    console.error('Error fetching portfolio context:', error);
    // Fallback to basic context if database fetch fails
    return `
You are an AI assistant for Zyad Walid's portfolio website.

IMPORTANT INSTRUCTIONS:
- Be friendly, professional, and helpful
- Answer in the same language the user asks (English or Arabic)
- Keep responses concise and engaging
- If asked about specific projects, suggest visiting the projects page
- If you don't know something specific, be honest

ABOUT ZYAD:
- Full-Stack Developer specializing in modern web technologies
- Experienced with React, Node.js, MongoDB, and more
- Passionate about creating beautiful web applications

CONTACT:
- Available for freelance work and opportunities
- Can be reached through the contact form on the website
`;
  }
};

export const chat = async (req, res) => {
  try {
    const { message, language, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: 'Gemini API key not configured',
        response: language === 'ar' 
          ? 'عذراً، المساعد الذكي غير متاح حالياً. يرجى المحاولة لاحقاً.'
          : 'Sorry, the AI assistant is currently unavailable. Please try again later.'
      });
    }

    // Initialize the model with fallback
    let model;
    let modelName = 'gemini-2.0-flash-exp';
    
    try {
      model = genAI.getGenerativeModel({ model: modelName });
    } catch (error) {
      // Fallback to stable model if experimental is unavailable
      modelName = 'gemini-1.5-flash';
      model = genAI.getGenerativeModel({ model: modelName });
    }

    // Get dynamic portfolio context
    const portfolioContext = await getPortfolioContext();
    
    // Build conversation history
    let conversationHistory = portfolioContext + '\n\n';
    
    if (history && history.length > 0) {
      conversationHistory += 'Previous conversation:\n';
      history.forEach(msg => {
        conversationHistory += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
      });
      conversationHistory += '\n';
    }

    // Add language instruction
    const languageInstruction = language === 'ar' 
      ? 'Please respond in Arabic (العربية).'
      : 'Please respond in English.';
    
    conversationHistory += `${languageInstruction}\n\nUser: ${message}\nAssistant:`;

    // Generate response with retry logic
    let result;
    try {
      result = await model.generateContent(conversationHistory);
    } catch (error) {
      // If overloaded, try fallback model
      if (error.status === 503 || error.message?.includes('overloaded')) {
        console.log('Primary model overloaded, trying fallback...');
        const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        result = await fallbackModel.generateContent(conversationHistory);
      } else {
        throw error;
      }
    }
    
    const response = result.response;
    const text = response.text();

    res.json({ response: text });

  } catch (error) {
    console.error('Chat error:', error);
    
    // Handle specific errors
    if (error.message?.includes('API key')) {
      return res.status(500).json({ 
        error: 'Invalid API key',
        response: req.body.language === 'ar'
          ? 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة لاحقاً.'
          : 'Sorry, there was a connection error. Please try again later.'
      });
    }

    res.status(500).json({ 
      error: 'Failed to generate response',
      response: req.body.language === 'ar'
        ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.'
        : 'Sorry, something went wrong. Please try again.'
    });
  }
};
