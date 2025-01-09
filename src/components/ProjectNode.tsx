import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../data/projects';
import { FaGithub, FaExpand, FaTimes } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeMathJax from 'rehype-mathjax';
import remarkMath from 'remark-math';

const ProjectCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }
`;

const ProjectImage = styled.div<{ isVideo: boolean }>`
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: #f0f0f0;
  cursor: pointer;

  img, iframe {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }

  iframe {
    border: none;
  }

  ${props => !props.isVideo && `
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
    }

    &:hover .overlay {
      opacity: 1;
    }
  `}
`;

const ProjectContent = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.5rem;
  color: #333333;
`;

const ProjectDescription = styled.p`
  margin: 0 0 15px 0;
  color: #666666;
  flex: 1;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
`;

const TechBadge = styled.span`
  background: ${props => props.theme.primary};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: auto;
  padding-top: 20px;
`;

const ActionButton = styled.button`
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  background: ${props => props.theme.backgroundColor};
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  max-width: 1000px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    width: 95%;
    padding: 20px;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: ${props => props.theme.textColor};
  cursor: pointer;
  font-size: 1.2rem;
  padding: 5px;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const ModalContent = styled.div`
  margin-top: 20px;
  color: ${props => props.theme.textColor};
  line-height: 1.6;

  /* MathJax 스타일링 */
  .math-inline {
    padding: 0 0.2em;
  }

  .math-display {
    overflow-x: auto;
    margin: 1em 0;
    padding: 1em;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  /* 기존 스타일 유지 */
  h1, h2, h3, h4, h5, h6 {
    margin: 1.5em 0 0.5em;
    color: ${props => props.theme.primary};
    font-weight: 600;
  }

  h1 {
    font-size: 2.5em;
    border-bottom: 2px solid ${props => props.theme.primary};
    padding-bottom: 0.3em;
  }

  h2 {
    font-size: 2em;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 0.3em;
  }

  h3 { font-size: 1.5em; }
  h4 { font-size: 1.25em; }

  p {
    margin: 1em 0;
    font-size: 1.1em;
  }

  ul, ol {
    margin: 1em 0;
    padding-left: 2em;
  }

  li {
    margin: 0.5em 0;
  }

  code {
    background: rgba(0, 0, 0, 0.1);
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-family: 'Consolas', monospace;
    font-size: 0.9em;
  }

  pre {
    background: rgba(0, 0, 0, 0.1);
    padding: 1em;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1em 0;
    
    code {
      background: none;
      padding: 0;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1em 0;
    display: block;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
    background: rgba(255, 255, 255, 0.05);
    
    th, td {
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.8em;
      text-align: left;
    }

    th {
      background: rgba(0, 0, 0, 0.2);
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: rgba(255, 255, 255, 0.02);
    }
  }

  blockquote {
    margin: 1em 0;
    padding: 0.5em 1em;
    border-left: 4px solid ${props => props.theme.primary};
    background: rgba(0, 0, 0, 0.1);
    font-style: italic;
  }

  hr {
    border: none;
    border-top: 2px solid rgba(255, 255, 255, 0.1);
    margin: 2em 0;
  }
`;

const ImageModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  cursor: pointer;

  img {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    cursor: default;
  }
`;

const getDetailFileName = (title: string) => {
  const fileMap: { [key: string]: string } = {
    'Scouter - AI Vision Analysis Assistant Platform': 'Scouter.md',
    'JobPT - AI Job Searching Assistant': 'JobPT.md',
    'DINOv2 Backbone with TensorRT acceleration': 'DINOv2.md',
    'Chain of Thought (CoT) Agent Model Research': 'CoT.md',
    'Closetmate - AI Fashion Assistant': 'Closetmate.pdf',
    'J.A.R.V.I.S - Multimodal General Assistant': 'JARVIS.md',
    'Quantum Mechanics Research': 'Quantum.md',
    'Mamba Architecture Research': 'Mamba.md',
    'Paged Attention Research (KV Cache)': 'PA_Report.md',
    'Monosemantic Neuron Research': 'MN_Report.md',
    'Parametric Neural Networks Integration': 'PNNI.pdf',
    'Reinforcement Learning Chess': 'RLChess.md'
  };
  return fileMap[title] || '';
};

export const ProjectNode: React.FC<Project> = (project) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [detailContent, setDetailContent] = useState('');
  const [isPdf, setIsPdf] = useState(false);

  useEffect(() => {
    const loadDetailContent = async () => {
      if (isModalOpen) {
        try {
          const fileName = getDetailFileName(project.title);
          if (!fileName) {
            setDetailContent(project.details);
            setIsPdf(false);
            return;
          }

          if (fileName.endsWith('.pdf')) {
            const pdfUrl = `${window.location.origin}${import.meta.env.BASE_URL}details/${fileName}`;
            console.log('Loading PDF from:', pdfUrl);
            setDetailContent(pdfUrl);
            setIsPdf(true);
            return;
          }

          try {
            const markdownUrl = `${window.location.origin}${import.meta.env.BASE_URL}details/${fileName}`;
            console.log('Loading Markdown from:', markdownUrl);
            const response = await fetch(markdownUrl);
            if (response.ok) {
              const content = await response.text();
              setDetailContent(content);
              setIsPdf(false);
            } else {
              throw new Error(`Failed to load markdown: ${response.status}`);
            }
          } catch (error) {
            console.error('Error loading markdown:', error);
            setDetailContent(project.details);
            setIsPdf(false);
          }
        } catch (error) {
          console.error('Error in loadDetailContent:', error);
          setDetailContent(project.details);
          setIsPdf(false);
        }
      }
    };

    loadDetailContent();
  }, [isModalOpen, project]);

  useEffect(() => {
    // @ts-ignore
    if (window.MathJax) {
      // @ts-ignore
      window.MathJax.typesetPromise?.();
    }
  }, [detailContent]);

  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch')) {
      const videoId = new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtu.be')) {
      const videoId = url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const hasVideo = project.images && project.images.length > 0 && isYouTubeUrl(project.images[0]);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasVideo && project.images && project.images.length > 0) {
      setIsImageModalOpen(true);
    }
  };

  const renderMedia = () => {
    if (!project.images || project.images.length === 0) {
      return null;
    }

    const url = project.images[0];
    if (isYouTubeUrl(url)) {
      return (
        <iframe
          src={getYouTubeEmbedUrl(url)}
          title={project.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
    return (
      <div onClick={handleImageClick} style={{ cursor: 'pointer', width: '100%', height: '100%' }}>
        <img src={url} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="overlay"><FaExpand /></div>
      </div>
    );
  };

  return (
    <>
      <ProjectCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        layout
      >
        <ProjectImage isVideo={hasVideo}>
          {renderMedia()}
        </ProjectImage>

        <ProjectContent>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectDescription>{project.description}</ProjectDescription>
          <TechStack>
            {project.techStack.map((tech, index) => (
              <TechBadge key={index}>{tech}</TechBadge>
            ))}
          </TechStack>
          <ButtonContainer>
            {project.link && (
              <ActionButton onClick={() => window.open(project.link, '_blank')}>
                <FaGithub /> GitHub
              </ActionButton>
            )}
            <ActionButton onClick={() => setIsModalOpen(true)}>
              <FaExpand /> Details
            </ActionButton>
          </ButtonContainer>
        </ProjectContent>
      </ProjectCard>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <ModalOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            />
            <Modal
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setIsModalOpen(false)}>
                <FaTimes />
              </CloseButton>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ModalContent>
                {isPdf ? (
                  <embed
                    src={detailContent}
                    type="application/pdf"
                    style={{
                      width: '100%',
                      height: '80vh',
                    }}
                  />
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[
                      rehypeRaw,
                      [rehypeMathJax, {
                        tex: {
                          inlineMath: [['$', '$'], ['\\(', '\\)']],
                          displayMath: [['$$', '$$'], ['\\[', '\\]']],
                          processEscapes: true,
                        }
                      }]
                    ]}
                    components={{
                      table: ({node, ...props}) => (
                        <div style={{overflowX: 'auto', margin: '1em 0'}}>
                          <table {...props} style={{minWidth: '100%'}} />
                        </div>
                      ),
                      td: ({node, ...props}) => (
                        <td {...props} style={{padding: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)'}} />
                      ),
                      th: ({node, ...props}) => (
                        <th {...props} style={{
                          padding: '12px 8px',
                          borderBottom: '2px solid rgba(255,255,255,0.2)',
                          background: 'rgba(0,0,0,0.2)'
                        }} />
                      ),
                      code: ({node, inline, ...props}: any) => (
                        inline ? 
                          <code {...props} style={{
                            background: 'rgba(0, 0, 0, 0.1)',
                            padding: '0.2em 0.4em',
                            borderRadius: '4px',
                            fontFamily: 'Consolas, monospace',
                            fontSize: '0.9em'
                          }} /> :
                          <pre style={{
                            background: 'rgba(0, 0, 0, 0.1)',
                            padding: '1em',
                            borderRadius: '8px',
                            overflowX: 'auto',
                            margin: '1em 0'
                          }}>
                            <code {...props} />
                          </pre>
                      )
                    }}
                  >
                    {detailContent || project.details}
                  </ReactMarkdown>
                )}
              </ModalContent>
            </Modal>
          </>
        )}

        {isImageModalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageModalOpen(false)}
          >
            <Modal
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{ 
                padding: 0, 
                background: 'none', 
                boxShadow: 'none',
                maxWidth: '95vw',
                maxHeight: '95vh',
                width: 'auto',
                height: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <img 
                src={project.images?.[0]} 
                alt={project.title}
                style={{
                  maxWidth: '95vw',
                  maxHeight: '95vh',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '8px'
                }}
              />
            </Modal>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};
