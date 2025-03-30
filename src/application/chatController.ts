import { Request, Response } from 'express';
import OpenAI from 'openai';
import Hotel from '../infrastucture/schemas/HotelModel'; // ✅ FIXED: Corrected import path

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateResponse = async (req: Request, res: Response) => {
  try {
    const { prompt, chatHistory = [] } = req.body;

    const messages = [
      { role: 'system', content: 'You are a helpful travel assistant. Help users find hotels.' },
      ...chatHistory,
      { role: 'user', content: prompt },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;
    let suggestedHotels: any[] = [];  // ✅ FIXED: Explicitly defined type

    // Check if the query mentions hotels
    if (/hotel|stay|accommodation/i.test(prompt)) {
      suggestedHotels = await Hotel.find({
        $or: [
          { name: { $regex: prompt, $options: 'i' } },
          { location: { $regex: prompt, $options: 'i' } },
        ],
      }).limit(5);
    }

    res.status(200).json({
      success: true,
      message: {
        role: 'assistant',
        content: aiResponse,
      },
      suggestedHotels,
    });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating AI response',
    });
  }
};
