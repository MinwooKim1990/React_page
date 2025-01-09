import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Snowfall from 'react-snowfall';
import { GlobalStyles } from './styles/GlobalStyles';
import { Header } from './components/Header';
import { ProjectNode } from './components/ProjectNode';
import { ThemeToggle } from './components/ThemeToggle';
import { projects, Project } from './data/projects';

/* 1) Define Light & Dark Themes */
const lightTheme = {
  backgroundColor: 'rgba(0, 32, 96, 0.7)',
  textColor: '#ffffff',
  primary: '#007bff',
};

const darkTheme = {
  backgroundColor: 'rgba(0, 16, 48, 0.8)',
  textColor: '#ffffff',
  primary: '#ff5722',
};

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, rgba(0, 32, 96, 0.8) 0%, rgba(0, 64, 128, 0.8) 100%);
  overflow-x: hidden;
`;

const SnowBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
`;

const MainContent = styled.main`
  width: 100%;
  position: relative;
  z-index: 1;
  background: transparent;
`;

const IntroSection = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  position: relative;
`;

const ProjectsSection = styled.section`
  width: 100%;
  padding: 60px 20px;
  background-color: transparent;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.backgroundColor};
    z-index: -1;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  color: ${props => props.theme.textColor};
  transition: color 0.3s ease;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  background-color: ${props => props.active ? props.theme.primary : 'transparent'};
  color: ${props => props.active ? '#fff' : '#fff'};
  border: 1px solid ${props => props.theme.primary};

  &:hover {
    background-color: ${props => props.theme.primary};
    color: #fff;
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

interface ProjectWithOrder extends Project {
  order: string;  // 'p1', 'p2', 'r1', 'r2' 등
}

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const projectsWithOrder: ProjectWithOrder[] = projects.map(project => ({
    ...project,
    order: project.title === "Reinforcement Learning Chess" ? "p1" :
           project.title === "Scouter - AI Vision Analysis Assistant Platform" ? "p2" :
           project.title === "JobPT - AI Job Searching Assistant" ? "p3" :
           project.title === "DINOv2 Backbone with TensorRT acceleration" ? "p4" :
           project.title === "Chain of Thought (CoT) Agent Model Research" ? "p5" :
           project.title === "Closetmate - AI Fashion Assistant" ? "p6" :
           project.title === "J.A.R.V.I.S - Multimodal General Assistant" ? "p7" :
           project.title === "Mamba Architecture Research" ? "r1" :
           project.title === "Monosemantic Neuron Research" ? "r2" :
           project.title === "Paged Attention Research (KV Cache)" ? "r3" :
           project.title === "Parametric Neural Networks Integration" ? "r4" :
           "r5"  // Quantum Mechanics Research
  }));

  const sortProjects = (projects: ProjectWithOrder[]) => {
    return [...projects].sort((a, b) => {
      // 'all' 필터에서는 p가 r보다 우선
      if (activeFilter === 'all') {
        if (a.order[0] !== b.order[0]) {
          return a.order[0] === 'p' ? -1 : 1;
        }
      }
      // 숫자가 작을수록 앞으로 (최신순)
      return parseInt(a.order.slice(1)) - parseInt(b.order.slice(1));
    });
  };

  const filteredProjects = sortProjects(
    activeFilter === 'all'
      ? projectsWithOrder
      : projectsWithOrder.filter(p => p.category.includes(activeFilter))
  );

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyles />
      <AppContainer>
        <SnowBackground>
          <Snowfall 
            snowflakeCount={200}
            style={{
              position: 'fixed',
              width: '100vw',
              height: '100vh',
            }}
          />
        </SnowBackground>

        <ThemeToggle isDark={isDarkTheme} toggleTheme={toggleTheme} />

        <div className="content-wrap">
          <MainContent>
            <IntroSection>
              <Header />
            </IntroSection>

            <ProjectsSection>
              <SectionTitle>Project & Research</SectionTitle>

              <FilterContainer>
                <FilterButton
                  active={activeFilter === 'all'}
                  onClick={() => setActiveFilter('all')}
                >
                  All
                </FilterButton>
                <FilterButton
                  active={activeFilter === 'vision'}
                  onClick={() => setActiveFilter('vision')}
                >
                  Vision
                </FilterButton>
                <FilterButton
                  active={activeFilter === 'nlp'}
                  onClick={() => setActiveFilter('nlp')}
                >
                  NLP
                </FilterButton>
                <FilterButton
                  active={activeFilter === 'research'}
                  onClick={() => setActiveFilter('research')}
                >
                  Research
                </FilterButton>
                <FilterButton
                  active={activeFilter === 'machine-learning'}
                  onClick={() => setActiveFilter('machine-learning')}
                >
                  Machine Learning
                </FilterButton>
                <FilterButton
                  active={activeFilter === 'physics'}
                  onClick={() => setActiveFilter('physics')}
                >
                  Physics
                </FilterButton>
              </FilterContainer>

              <ProjectsGrid
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {filteredProjects.map((project, i) => (
                  <ProjectNode key={i} {...(project as Project)} />
                ))}
              </ProjectsGrid>
            </ProjectsSection>
          </MainContent>
        </div>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
