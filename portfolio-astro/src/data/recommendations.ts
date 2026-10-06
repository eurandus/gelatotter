export interface Recommendation {
  name: string;
  /** the two ✦ lines on the card */
  facts: [string, string];
  /** short pull-quote shown on the card */
  quote: string;
  /** the author's headline, shown in the pop-up */
  role: string;
  /** relationship + date, shown in the pop-up */
  meta: string;
  /** full text, one entry per paragraph */
  body: string[];
}

export const recommendations: Recommendation[] = [
  {
    name: 'Khushi Agarwal',
    facts: ['Reported to Germaine directly', 'Phillip Nova · Oct 2026'],
    quote: '“She was much more than a manager to me, she was a mentor throughout the experience.”',
    role: 'MSBA @ NUS | Strategy & Decision Science | Ex-Lenskart, Mu Sigma, Genpact',
    meta: 'Reported to Germaine directly · October 5, 2026',
    body: [
      'I had the opportunity to work closely with Germaine during my six months at Phillip Nova, and she was much more than a manager to me, she was a mentor throughout the experience.',
      'What I appreciated most about Germaine was the balance she struck between guidance and trust. She gave me the space to own my work, question assumptions, explore different approaches, and make decisions independently, while always being there to challenge my thinking or help me find direction when I needed it.',
      'She also has a way of making complex conversations feel remarkably straightforward. Whether we were discussing product decisions, data, stakeholder expectations, or navigating ambiguity, she brought clarity and practicality to the table.',
      'Beyond the work, Germaine is incredibly approachable and generous with her advice. Some of my most valuable learning during the internship came from the conversations we had around it.',
      "I'm genuinely grateful to have had her as my manager and mentor. Any young professional would be lucky to have Germaine in their corner :)",
    ],
  },
  {
    name: 'Wei Kai Leow',
    facts: ['Same team', 'Phillip Nova · Aug 2024'],
    quote: '“A very reliable mentor and team member who was always able to be on top of things.”',
    role: 'Product Management Associate, User & Notification, Shopee',
    meta: 'Worked with Germaine on the same team · August 8, 2024',
    body: [
      'I was fortunate to have the opportunity to be mentored by Germaine during my internship at Phillip Nova. She was a very reliable mentor and team member who was always able to be on top of things even though she had many projects on hand concurrently.',
      'Another strength of hers is her knowledge of every step that needs to be done in the development timeline by the different team members, even outside of what is part of the current process, which allows her to guide the team towards a stable and better direction during the project development process.',
      'Germaine also has a cheery outlook which resonates throughout the team which helps to always keep team morale high but yet, she is always able to be serious and bring quality work to the team at the right moments.',
    ],
  },
  {
    name: 'Curtis Lee',
    facts: ['Managed Germaine directly', 'Plexus Corp · Jan 2024'],
    quote: '“Exceptional skills and dedication to providing excellent support across a wide range of applications.”',
    role: 'IT Global Development at Plexus Corp.',
    meta: 'Managed Germaine directly · January 2, 2024',
    body: [
      'Germaine is one of my recommendations because of her exceptional skills and dedication to providing excellent support across a wide range of applications including technical administration. She has three years hands-on experience and she constantly learning and growing in these areas. What sets Germaine apart is her willingness to help teammates, to engage in discussions to improve process efficiencies and to drive continuous improvement.',
      'Germaine is also a great communicator, building strong relationships with internal customers. She is aware of her strengths and is always looking for ways to enhance her skills, such as problem analysis, solution suggestions, and application knowledge. Her learning agility is remarkable, as she is always eager to learn new things and works well with teams from different regions to solve problems quickly.',
      "Germaine's proactive approach, positive mindset, and continuous efforts in supporting applications contribute significantly to the team's success. I have no doubt that her dedication and skills will be an asset in any role she takes on, and I highly recommend her for any position requiring a dynamic and capable team player.",
    ],
  },
  {
    name: 'Dilip Doraiswamy',
    facts: ['Senior colleague & mentor', 'Plexus Corp · Dec 2023'],
    quote: '“Great interpersonal and problem solving skills, evident in successfully managing 15000+ users.”',
    role: 'IT Manager @ Plexus Corp | Supply Chain - Kinaxis RapidResponse, Oracle PLM and Quality',
    meta: 'Senior to Germaine, did not manage her directly · December 30, 2023',
    body: [
      "I had the pleasure of mentoring and working with Germaine over the last 2 years at Plexus Corp. She is eager and always willing to learn and master technology related projects and tasks. Germain's ability to navigate and negotiate with the cross functional teams to get to the root cause of a problem and identify resolutions have always impressed me. Germaine has great interpersonal and problem solving skills, which is evident in successfully managing 15000+ users comprising several key ERP applications.",
      'Germaine is a great team player and always willing to jump in when solving problems. She will be a great asset to any organization and I wish her all the best!',
    ],
  },
  {
    name: 'Joyce Ong',
    facts: ['Same team · 3 years', 'Plexus Corp · Dec 2023'],
    quote: '“Her positive energy not only brightened our projects but also created a vibrant atmosphere.”',
    role: 'Senior Staff Engineer - IT Global Development',
    meta: 'Worked with Germaine on the same team · December 28, 2023',
    body: [
      'Over the past three years, I had the privilege of collaborating with Germaine within the same team. In her role as a JDE CNC, she played a crucial role in supporting deployment, troubleshooting, and configuration tasks. Germaine consistently demonstrated a humble attitude, maintaining a continuous learning mindset. Her cooperative spirit and willingness to contribute make her a standout team member.',
      "Germaine's positive energy not only brightened our projects but also created a vibrant atmosphere within the team. Without a doubt, I wholeheartedly recommend Germaine for her outstanding work ethic and her willingness to go the extra mile in all her contributions.",
    ],
  },
  {
    name: 'Alejandro Monárrez',
    facts: ['Same team · 1.5 years', 'Plexus Corp · Dec 2023'],
    quote: '“She is truly passionate about what she does. Totally a great co-worker and guide.”',
    role: 'Music Producer | Mix Engineer | Artist | Songwriter',
    meta: 'Worked with Germaine on the same team · December 23, 2023',
    body: [
      'Worked closely with Germaine for the last year and a half and I can really tell that she is truly passionate about what she does. High communication skills, great technical and troubleshooting skills and what I think it is the most important part; she is a great team player. Part of her process is to do great documentation and share time so knowledge is fully distributed through the team. Totally a great co-worker and guide.',
    ],
  },
  {
    name: 'Shao Hong Li',
    facts: ['Same team · 2 years', 'Plexus Corp · Dec 2023'],
    quote: '“Exceptional sense of responsibility and proactive nature, going beyond her designated responsibilities.”',
    role: 'Application Engineer at Applied Materials',
    meta: 'Worked with Germaine on the same team · December 21, 2023',
    body: [
      "During our two-year tenure as colleagues within the same group, I've had the privilege of working alongside Germaine. Her exceptional sense of responsibility and proactive nature consistently shone through as she generously offered assistance, going beyond her designated responsibilities to tackle challenges and provide valuable support to our team.",
    ],
  },
];
