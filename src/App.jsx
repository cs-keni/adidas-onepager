import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';
import adidasLogo from './assets/adidas-logo.jpg';
import adidasShoe1 from './assets/adidasshoe-1.jpg';
import adidasShoe2 from './assets/adidasshoe-2.jpg';
import adidasShoe3 from './assets/adidasshoe-3.jpg';
import adidasShoe4 from './assets/adidasshoe-4.jpg';
import adidasShoe5 from './assets/adidasshoe-5.jpg';
import './global.css';

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #000 0%, #111 100%);
  cursor: pointer;
`;

const InitialLogoContainer = styled(motion.div)`
  position: relative;
  width: clamp(200px, 30vw, 400px);
  height: clamp(200px, 30vw, 400px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClickableLogo = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
`;

const DrawingArrow = styled(motion.path)`
  stroke: white;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const ClickPrompt = styled(motion.div)`
  position: absolute;
  right: -180px;
  top: 50%;
  transform: translateY(-50%);
`;

const CurvedArrow = styled(motion.svg)`
  width: 40px;
  height: 40px;
  transform: rotate(-45deg);
`;

const ContentContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 1rem;
`;

const BackgroundLogo = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vh;
  height: 100vh;
  border-radius: 50%;
  background: white;
  opacity: 0.1;
  filter: blur(10px);
  z-index: 0;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 1;
  text-align: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin-bottom: 2rem;
  text-align: center;
`;

const Text = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.8;
  max-width: 600px;
  text-align: center;
  margin: 1rem auto;
  opacity: 0.9;
`;

const InitialLogo = styled(motion.img)`
  width: 60%;
  height: 60%;
  object-fit: contain;
`;

const ClickText = styled(motion.p)`
  position: absolute;
  right: -20px;
  top: -30px;
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
`;

const PersonalSection = styled(motion.div)`
  margin-top: 4rem;
  padding-top: 4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
`;

const PersonalText = styled(motion.p)`
  font-size: clamp(1rem, 1.8vw, 1.1rem);
  line-height: 1.8;
  max-width: 700px;
  text-align: left;
  margin: 1.5rem auto;
  opacity: 0.85;
`;

const Section = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4rem 0;
  position: relative;
  
  &:not(:first-child)::before {
    content: '';
    position: absolute;
    top: -2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
  }
`;

const ShoeShowcase = styled(motion.div)`
  position: fixed;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
`;

const ShoeImage = styled.img`
  width: 80%;
  height: 80%;
  object-fit: contain;
  transform: rotate(-25deg);
`;

const FadeSection = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3],     // Input range
    [1, 0]        // Output range
  );
  
  return (
    <motion.div 
      style={{ 
        opacity,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        zIndex: 1
      }}
    >
      {children}
    </motion.div>
  );
};

const FloatingShoes = () => {
  const { scrollYProgress } = useScroll();
  const shoes = [
    { src: adidasShoe1, alt: 'Adidas Shoe 1', position: { right: '10%', top: '15%' } },
    { src: adidasShoe2, alt: 'Adidas Shoe 2', position: { left: '12%', top: '30%' } },
    { src: adidasShoe3, alt: 'Adidas Shoe 3', position: { right: '15%', top: '45%' } },
    { src: adidasShoe4, alt: 'Adidas Shoe 4', position: { left: '8%', top: '60%' } },
    { src: adidasShoe5, alt: 'Adidas Shoe 5', position: { right: '12%', top: '75%' } },
  ];

  return (
    <>
      {shoes.map((shoe, index) => {
        const yOffset = useTransform(
          scrollYProgress,
          [0, 1],
          [0, 150 * (index - 2)] // This will make them move at different speeds
        );

        return (
          <ShoeShowcase
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 * index }}
            style={{
              ...shoe.position,
              y: yOffset,
              position: 'absolute',
              zIndex: 0
            }}
          >
            <ShoeImage src={shoe.src} alt={shoe.alt} />
          </ShoeShowcase>
        );
      })}
    </>
  );
};

function App() {
  const [isRevealed, setIsRevealed] = useState(false);

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  return (
    <PageWrapper>
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <InitialLogoContainer
            key="initial-logo-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8 }}
          >
            <ClickableLogo
              onClick={() => setIsRevealed(true)}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <InitialLogo
                src={adidasLogo}
                alt="Adidas Logo"
              />
            </ClickableLogo>
            <ClickPrompt
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <ClickText
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Click Me!
              </ClickText>
              <motion.svg 
                width="160" 
                height="120" 
                viewBox="0 0 160 120" 
                fill="none"
              >
                <DrawingArrow
                  d="M 140 10 C 100 80, 40 50, 5 30 M 20 15 L 5 30 L 20 45"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                />
              </motion.svg>
            </ClickPrompt>
          </InitialLogoContainer>
        ) : (
          <ContentContainer
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <BackgroundLogo
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 0.1, scale: 1.2 }}
              transition={{ duration: 1.5 }}
            />
            <FloatingShoes />
            <Section>
              <Content>
                <Title
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  You Got This
                </Title>
                <Text
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Every athlete knows the moment. That split second when doubt creeps in, when the finish line seems too far, when the goal feels out of reach.
                </Text>
                <Text
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  But that's exactly when champions are made. In those moments when you choose to push forward, to break through, to prove to yourself that you're stronger than you thought.
                </Text>
              </Content>
            </Section>
            
            <Section>
              <Content>
                <PersonalText
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  Hi, I'm Kenny, a software engineering student with a strong foundation in programming languages like Python, C++, and JavaScript. I'm passionate about building web-based software systems and exploring the intersection of front-end and back-end development. Currently, I'm enhancing my skills in data structures, algorithms, and system design, while also diving into computer organization and architecture.
                </PersonalText>
                <PersonalText
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                >
                  I thrive on problem-solving and hands-on projects—whether it's contributing to open-source on GitHub, developing AI-powered tools for games like Minecraft, or experimenting with Docker, Flask, and MongoDB to build scalable solutions. My background in biology, specifically optometry, gives me a unique perspective on technical challenges, combining analytical thinking with creativity.
                </PersonalText>
                <PersonalText
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                >
                  I'm always looking to grow, collaborate, and apply my skills to meaningful work.
                </PersonalText>
              </Content>
            </Section>
          </ContentContainer>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}

export default App;