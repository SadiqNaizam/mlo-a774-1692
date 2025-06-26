import React from 'react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-4 flex items-center justify-center">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {currentYear} Dynamic Dots Animator. Created with{' '}
          <a
            href="https://morphic.sh"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Morphic
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;