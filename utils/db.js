import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);
export const db = drizzle(sql,{schema});

const se=[
    {
      "question": "What is your online presence like? Do you have a website, social media presence, and how do you use them to drive sales?",
      "answer": "We have a user-friendly website with a comprehensive product catalog, integrated with our online payment system and shopping cart. We also actively utilize social media platforms like Facebook, Instagram, and TikTok to engage with potential customers, run targeted ads, and build brand awareness."
    },
    {
      "question": "What makes your electronics market unique compared to competitors? What is your competitive advantage?",
      "answer": "We differentiate ourselves through a curated selection of high-quality electronics at competitive prices, offering excellent customer service, providing detailed product information, and ensuring fast and reliable shipping. We also prioritize customer satisfaction with a flexible return policy and a dedicated customer support team."
    },
    {
      "question": "How have your three physical stores performed in the past two years? Can you provide revenue and customer growth data?",
      "answer": "Our physical stores have shown consistent growth in revenue and customer footfall. In the past year, our revenue has increased by [percentage]% and customer numbers have grown by [percentage]%. We are confident in our ability to continue this upward trajectory."
    },
    {
      "question": "What are your plans for future growth and expansion? What are your key financial projections for the next 3-5 years?",
      "answer": "We plan to expand our online presence by implementing targeted digital marketing campaigns, expanding our product range, and exploring new online sales channels. We also aim to open [number] more physical stores in key locations within the next [timeframe]. Our financial projections show a [percentage]% revenue growth annually, driven by strong online and physical sales."
    },
    {
      "question": "How will the investment you are seeking be used to fuel this growth? What specific initiatives will it support?",
      "answer": "The investment will be used to enhance our online infrastructure, develop a mobile app, expand our marketing efforts, and support the opening of new physical stores. This will allow us to reach a wider audience, improve customer experience, and accelerate our growth trajectory."
    }
  ]
