import { motion, AnimatePresence } from 'motion/react';
import styles from './styles.module.css';

const Modal = ({ children, onClick, showModal, size, bgColor, noPadding }) => (
  <AnimatePresence>
    {showModal && (
      <motion.div
        initial={{ opacity: 0, transform: 'scale(1.1)' }}
        animate={{
          opacity: 1,
        }}
        exit={{ opacity: 0, transform: 'scale(1.1)' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 z-30 w-screen h-screen overflow-x-hidden overflow-y-auto bg-black bg-opacity-50"
        onClick={onClick}
      >
        <div
          className={`${size === 'sm' ? styles.sm : styles.md} ${size === 'lg' ? styles.lg : ''} ${size === 'xl' ? styles.xl : ''} ${bgColor ? `${bgColor}` : 'bg-white'} ${noPadding ? 'p-0' : 'p-3'} z-40 relative max-h-[85vh] overflow-y-auto px-6 block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl`}
        >
          <div className="flex justify-end">
            <button
              data-testid="printed-username"
              className={`p-0 ${styles.close}`}
              onClick={onClick}
              type="button"
            >
              <span
                aria-hidden="true"
                className="p-0 text-3xl font-bold text-primary-color hover:text-black"
              >
                &times;
              </span>
            </button>
          </div>
          <div className={`modal-body ${noPadding ? 'p-0' : ''}`}>
            {children}
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Modal;
