
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const FullScreenLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50"
    >
      <div className="w-50 h-50 flex items-center justify-center">
        <DotLottieReact
          src="https://lottie.host/e78bf92b-1262-4279-8854-4168542b4298/afmmVUtziy.lottie"
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </motion.div>
  );
};

export default FullScreenLoader;