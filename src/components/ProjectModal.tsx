import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { FaChevronLeft, FaChevronRight, FaTimes, FaGithub, FaFilePdf } from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    images: string[];
    link: string;
    category: string[];
    techStack: string[];
    details: string[];
    pdfUrl?: string;
  };
}

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background-color: var(--card-light);
  border-radius: 15px;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 30px;

  .dark-theme & {
    background-color: var(--card-dark);
  }

  @media (max-width: 768px) {
    width: 95%;
    padding: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 24px;
  cursor: pointer;
  z-index: 2;

  .dark-theme & {
    color: var(--text-dark);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  margin-bottom: 30px;
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const NavigationButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${props => props.direction === 'left' ? 'left: 20px;' : 'right: 20px;'}
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const ProjectTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--primary-color);
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tag = styled.span<{ variant: 'category' | 'tech' }>`
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  background-color: ${props => 
    props.variant === 'category' ? 'var(--primary-color)' : 'var(--secondary-color)'};
  color: white;
`;

const MarkdownContent = styled.div`
  color: var(--text-light);
  line-height: 1.6;

  h1, h2, h3 {
    color: var(--primary-color);
    margin: 1em 0 0.5em;
  }

  ul, ol {
    margin-left: 20px;
  }

  .dark-theme & {
    color: var(--text-dark);
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
`;

const TechTag = styled.span`
  background: var(--primary-color);
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
`;

const PdfLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--primary-color);
  text-decoration: none;
  margin-top: 20px;
  padding: 8px 16px;
  border: 2px solid var(--primary-color);
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-color);
    color: white;
  }
`;

const GithubLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 25px;
  text-decoration: none;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>
              <FaTimes />
            </CloseButton>

            <ImageContainer>
              <img 
                src={project.images[currentImageIndex]} 
                alt={`${project.title} - Image ${currentImageIndex + 1}`} 
              />
              {project.images.length > 1 && (
                <>
                  <NavigationButton direction="left" onClick={handlePrevious}>
                    <FaChevronLeft />
                  </NavigationButton>
                  <NavigationButton direction="right" onClick={handleNext}>
                    <FaChevronRight />
                  </NavigationButton>
                </>
              )}
            </ImageContainer>

            <ProjectTitle>{project.title}</ProjectTitle>

            <TagsContainer>
              {project.category.map((cat, index) => (
                <Tag key={`cat-${index}`} variant="category">{cat}</Tag>
              ))}
              {project.techStack.map((tech, index) => (
                <Tag key={`tech-${index}`} variant="tech">{tech}</Tag>
              ))}
            </TagsContainer>

            <MarkdownContent>
              <ReactMarkdown>{project.description}</ReactMarkdown>
            </MarkdownContent>

            <TechStack>
              {project.techStack.map((tech, index) => (
                <TechTag key={index}>{tech}</TechTag>
              ))}
            </TechStack>

            <MarkdownContent>
              <ReactMarkdown>{project.details.join('\n')}</ReactMarkdown>
            </MarkdownContent>

            {project.pdfUrl && (
              <PdfLink href={project.pdfUrl} target="_blank" rel="noopener noreferrer">
                <FaFilePdf /> View PDF
              </PdfLink>
            )}

            <GithubLink href={project.link} target="_blank" rel="noopener noreferrer">
              <FaGithub /> View on GitHub
            </GithubLink>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};
